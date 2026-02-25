import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { axiosClient } from "../client"

export const usePayment = (courseId?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["payment"],
    mutationFn: async (payload: { id: number; formData: FormData }) => {
      const { id, formData } = payload
      const { data } = await axiosClient.patch(`/registration/payment-receipt/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return data
    },
    onSuccess: () => {
      toast.success(
        'Квитанцію про оплату відправлено на перевірку адміністратору. Ви можете відслідкувати статус перевірки на сторінці "Мої заходи"',
      )
      queryClient.invalidateQueries({ queryKey: ["registration", courseId] })
    },
    onError: () => {
      toast.error(`Сталась помилка під час завантаження квитанції про оплату. Спробуйте пізніше!`)
    },
  })
}

// type QrCodeResponse = {
//   response: { status: boolean }
//   resultData: { qr: string; link: string; pagePaymentLink: string }
// }

// export const useGetQrCode = (amount?: number) => {
//   return useQuery({
//     enabled: !!amount,
//     queryKey: ["qr-code", amount],
//     queryFn: async () => {
//       const { data } = await axiosClient.get<QrCodeResponse>("/auth/qr-code", { params: { amount } })
//       return data
//     },
//     refetchOnWindowFocus: false,
//   })
// }
