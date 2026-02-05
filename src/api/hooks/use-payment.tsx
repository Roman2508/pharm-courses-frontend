import { toast } from "sonner"
import { useMutation  } from "@tanstack/react-query"

import { axiosClient } from "../client"

export const usePayment = () => {
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
    },
    onError: () => {
      toast.error(`Сталась помилка під час завантаження квитанції про оплату. Спробуйте пізніше!`)
    },
  })
}
