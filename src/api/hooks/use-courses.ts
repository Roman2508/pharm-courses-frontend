import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { axiosClient } from "../client"
import type { CourseType } from "@/types/course.type"

export type GetCoursesQuery = {
  page?: number
  limit?: number
}

export const useCourses = (status: "PLANNED" | "ARCHIVED", params?: GetCoursesQuery) => {
  return useQuery({
    queryKey: ["courses", { status, params }],
    queryFn: async () => {
      const { data } = await axiosClient.get<CourseType[]>(`/course/status/${status}`, { params })
      return data
    },
  })
}

export const useAllCourses = (params?: GetCoursesQuery) => {
  return useQuery({
    queryKey: ["all-courses", params],
    queryFn: async () => {
      const { data } = await axiosClient.get<{ data: CourseType[]; totalCount: number }>(`/course`, { params })
      return data
    },
  })
}

export const useFullCourse = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["full-course", id],
    queryFn: async () => {
      const { data } = await axiosClient.get<CourseType>(`/course/${id}`)
      return data
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  })
}

export const useCreateCourse = () => {
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (payload: Omit<CourseType, "id" | "createdAt" | "updatedAt">) => {
      const { data } = await axiosClient.post(`/course`, payload)
      return data
    },
    onError(error) {
      toast.error(`Помилка створення заходу. ${error?.message}`)
    },
  })
}

export const useUpdateCourse = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-course"],
    mutationFn: async (payload: CourseType) => {
      const { id, createdAt, updatedAt, ...rest } = payload
      const { data } = await axiosClient.patch(`/course/${id}`, rest)
      return data
    },
    onSuccess: (updatedCourse) => {
      // queryClient.setQueryData(["full-course", updatedCourse.id], updatedCourse)
      queryClient.invalidateQueries({ queryKey: ["full-course", updatedCourse.id] })
    },
    onError: (error) => toast.error(`Помилка оновлення заходу. ${error?.message}`),
  })
}

export const useDeleteCourse = (params?: GetCoursesQuery) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["delete-course"],
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.delete(`/course/${id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-courses", params] })
    },
    onError: (error) => toast.error(`Помилка видалення заходу. ${error?.message}`),
  })
}
