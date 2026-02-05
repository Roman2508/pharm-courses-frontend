import type { PaymentStatus } from "@/types/registration.type"

export const getPaymentStatus = (status: PaymentStatus) => {
  switch (status) {
    case "NONE":
      return "Очікується оплата"

    case "PENDING":
      return "Квитанцію надіслано"

    case "PAID":
      return "Оплату підтверджено"

    case "FAILED":
      return "Оплату відхилено"

    case "REFUNDED":
      return "Повернення коштів"

    default:
      return "Невідомий статус"
  }
}

export const getPaymentColor = (status: PaymentStatus) => {
  switch (status) {
    case "NONE":
      return "secondary"

    case "PENDING":
      return "primary"

    case "PAID":
      return "success"

    case "FAILED":
      return "destructive"

    case "REFUNDED":
      return "destructive"

    default:
      return "ghost"
  }
}
