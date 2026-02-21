import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { axiosClient } from "../client"
import type { PaymentStatus, RegistrationType } from "@/types/registration.type"

export type GetRegistrationsQuery = {
  page: number
  limit: number
  courseId?: number
  orderType?: "asc" | "desc"
  orderBy?:
    | "createdAt"
    | "course.name"
    | "user.name"
    | "amount"
    | "certificateEnabled"
    | "paymentReceipt"
    | "paymentStatus"
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

export const useCurrentRegistration = (courseId?: number) => {
  return useQuery({
    enabled: !!courseId,
    queryKey: ["registration", courseId],
    queryFn: async () => {
      const { data } = await axiosClient.get<RegistrationType>(`/registration/course/current/${courseId}`)
      return data
    },
  })
}

export const useUserRegistrations = (params?: Pick<GetRegistrationsQuery, "page" | "limit">) => {
  return useQuery({
    queryKey: ["user-registrations"],
    queryFn: async () => {
      const { data } = await axiosClient.get<{ data: RegistrationType[]; totalCount: number }>(`/registration/user`, {
        params,
      })
      return data
    },
  })
}

export const useManyRegistrations = () => {
  return useMutation({
    mutationKey: ["many-registrations"],
    mutationFn: async (ids: number[]) => {
      const { data } = await axiosClient.post<RegistrationType[]>(`/registration/many`, { ids })
      return data
    },
  })
}

export const useRemoveManyRegistrations = (params?: GetRegistrationsQuery) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["remove-many-registrations"],
    mutationFn: async (ids: number[]) => {
      const { data } = await axiosClient.post<number[]>(`/registration/remove/many`, { ids })
      return data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["all-registrations", params] })
    },
  })
}

export const useExportRegistrations = () => {
  return useMutation({
    mutationKey: ["export-registrations"],
    mutationFn: async (ids: number[]) => {
      const { data } = await axiosClient.post(`/registration/export-registrations`, { ids })
      return data
    },
  })
}

export const useCoursesCountRegistrations = (courseId?: number) => {
  return useQuery({
    enabled: !!courseId,
    queryKey: ["course-count-registrations", courseId],
    queryFn: async () => {
      const { data } = await axiosClient.get<number>(`/registration/course/count/${courseId}`)
      return data
    },
  })
}

export const useCreateRegistration = (params?: GetRegistrationsQuery) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["create-registration"],
    mutationFn: async (payload: { userId: string; courseId: number; amount: number; type?: RegistrationType }) => {
      const { data } = await axiosClient.post(`/registration`, payload)
      return data
    },
    onSuccess(_, payload) {
      queryClient.invalidateQueries({ queryKey: ["all-registrations", params] })
      queryClient.invalidateQueries({ queryKey: ["registration", payload.courseId] })
      toast.success("Реєстрація успішно виконана")
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
    mutationFn: async (payload: { ids: number[]; certificateEnabled: boolean }) => {
      const { data } = await axiosClient.patch(`/registration`, payload)
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

export const useUpdateRegistrationPayment = (params?: GetRegistrationsQuery) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["update-registration-payment"],
    mutationFn: async (payload: { id: number; status: PaymentStatus }) => {
      const { data } = await axiosClient.patch(`/registration/payment/${payload.id}`, {
        status: payload.status,
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

export const useDeleteRegistration = (courseId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["delete-registration"],
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.delete(`/registration/${id}`)
      return data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["all-registrations"] })
      queryClient.invalidateQueries({ queryKey: ["user-registrations"] })
      queryClient.invalidateQueries({ queryKey: ["registration", courseId] })
      toast.success("Реєстрацію на захід було скасовано!")
    },
    onError(error) {
      toast.error(`Помилка видалення реєстрації. ${error?.message}`)
    },
  })
}

export const useFreeParticipation = (courseId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["free-participation"],
    mutationFn: async (payload: { id: number; formData: FormData }) => {
      const { id, formData } = payload
      const { data } = await axiosClient.patch(`/registration/free-participation/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data
    },
    onSuccess: () => {
      toast.success("Запит на безкоштовну участь відправлено, очікуйте на перевірку адміністратором")
      queryClient.invalidateQueries({ queryKey: ["user-registrations"] })
      queryClient.invalidateQueries({ queryKey: ["registration", courseId] })
    },
    onError: () => {
      toast.error(`Сталась помилка. Спробуйте пізніше!`)
    },
  })
}
