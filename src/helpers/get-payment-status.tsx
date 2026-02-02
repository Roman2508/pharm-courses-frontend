import type { PaymentStatus } from '@/types/registration.type'

export const getPaymentStatus = (status: PaymentStatus) => {
  switch (status) {
    case 'PAID':
      return 'Оплачено'
    case 'PENDING':
      return 'Очікується'
    case 'FAILED':
      return 'Помилка'
    case 'REFUNDED':
      return 'Скасовано'
    default:
      return 'Невідомий статус'
  }
}
