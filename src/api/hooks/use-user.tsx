import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { axiosClient } from "../client"

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["users-avatar"],
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosClient.patch("/users/avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data
    },
    onSuccess: () => {
      toast.success("Аватар профіля успішно створено")
      queryClient.invalidateQueries({ queryKey: ["session"] })
    },
    onError: (error: any) => {
      toast.error(`Помилка оновлення аватара. ${error?.response?.data?.message || error?.message}`)
    },
  })
}

export const useEmailVerificationStatus = (email?: string) => {
  return useQuery({
    enabled: !!email,
    queryKey: ["email-verification", email],
    queryFn: async () => {
      const { data } = await axiosClient.get<boolean>("/auth/verification-status", { params: { email } })
      return data
    },
    staleTime: 0,
  })
}
