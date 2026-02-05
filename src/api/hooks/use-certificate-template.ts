import { toast } from "sonner"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { axiosClient } from "../client"
import type { CertificateTemplateType } from "@/types/certificate-template.type"

export const useGetCertificateTemplate = (id?: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["certificate-template", { id }],
    queryFn: async () => {
      const { data } = await axiosClient.get<CertificateTemplateType>(`/certificate-template/${id}`)
      return data
    },
  })
}

export const useGetAllCertificateTemplates = () => {
  return useQuery({
    queryKey: ["certificate-templates"],
    queryFn: async () => {
      const { data } = await axiosClient.get<CertificateTemplateType[]>("/certificate-template")
      return data
    },
  })
}

export const useCreateCertificateTemplate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["create-certificate-template"],
    mutationFn: async (formData: FormData) => {
      const { data } = await axiosClient.post("/certificate-template", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return data
    },
    onSuccess: () => {
      toast.success("Шаблон сертифіката успішно створено")
      queryClient.invalidateQueries({ queryKey: ["certificate-templates"] })
    },
    onError: (error: any) => {
      toast.error(`Помилка створення шаблону. ${error?.response?.data?.message || error?.message}`)
    },
  })
}

export const useUpdateCertificateTemplate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["update-certificate-template"],
    mutationFn: async ({ id, formData }: { id: number; formData: FormData }) => {
      const { data } = await axiosClient.patch(`/certificate-template/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return data
    },
    onSuccess: () => {
      toast.success("Шаблон сертифіката успішно оновлено")
      queryClient.invalidateQueries({ queryKey: ["certificate-templates"] })
    },
    onError: (error: any) => {
      toast.error(`Помилка оновлення шаблону. ${error?.response?.data?.message || error?.message}`)
    },
  })
}

export const useDeleteCertificateTemplate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ["delete-certificate-template"],
    mutationFn: async (id: number) => {
      const { data } = await axiosClient.delete(`/certificate-template/${id}`)
      return data
    },
    onSuccess: () => {
      toast.success("Шаблон сертифіката успішно видалено")
      queryClient.invalidateQueries({ queryKey: ["certificate-templates"] })
    },
    onError: (error: any) => {
      toast.error(`Помилка видалення шаблону. ${error?.response?.data?.message || error?.message}`)
    },
  })
}
