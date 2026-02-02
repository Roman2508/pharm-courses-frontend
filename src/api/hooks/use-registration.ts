import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { axiosClient } from "../client"
import type { RegistrationType } from "@/types/registration.type"

export type GetRegistrationsQuery = {
  page: number
  limit: number
  courseId?: number
  orderType?: "asc" | "desc"
  orderBy?: "createdAt" | "course.name" | "user.name" | "amount" | "certificateEnabled"
}

export const useAllRegistrations = (params?: GetRegistrationsQuery) => {
  return useQuery({
    queryKey: ["all-registrations", params],
    queryFn: async () => {
      const { data } = await axiosClient.get<{ data: RegistrationType[]; totalCount: number }>("/registration", {
        params,
      })
      return data
    },
  })
}

export const useCurrentRegistration = (userId?: string, courseId?: number) => {
  return useQuery({
    enabled: !!userId && !!courseId,
    queryKey: ["registration", { userId, courseId }],
    queryFn: async () => {
      const { data } = await axiosClient.get<RegistrationType>(`/registration/current/${userId}/${courseId}`)
      return data
    },
  })
}

export const useUserRegistrations = (userId?: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["user-registrations", { userId }],
    queryFn: async () => {
      const { data } = await axiosClient.get<RegistrationType[]>(`/registration/user/${userId}`)
      return data
    },
  })
}

export const useCreateRegistration = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["create-registration"],
    mutationFn: async (payload: { userId: string; courseId: number; amount: number }) => {
      const { data } = await axiosClient.post(`/registration`, payload)
      return data
    },
    onSuccess(_, payload) {
      queryClient.invalidateQueries({
        queryKey: ["registration", { userId: payload.userId, courseId: payload.courseId }],
      })
      toast.success("Ви успішно зареєструвалися на захід!")
    },
    onError(error) {
      toast.error(`Помилка реєстрації. ${error?.message}`)
    },
  })
}

export const useUpdateRegistration = (params?: GetRegistrationsQuery) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-registration"],
    mutationFn: async (payload: { id: number; certificateEnabled: boolean }) => {
      const { data } = await axiosClient.patch(`/registration/${payload.id}`, {
        certificateEnabled: payload.certificateEnabled,
      })
      return data
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["all-registrations", params],
      })
      toast.success("Оновлено доступ до сертифікатів!")
    },
    onError(error) {
      toast.error(`Помилка реєстрації. ${error?.message}`)
    },
  })
}
