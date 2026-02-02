import type { CourseType } from "./course.type"

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED"

export type RegistrationType = {
  id: number
  paymentStatus: PaymentStatus
  paymentId: string
  liqpayOrderId: string
  amount: number
  certificateEnabled: boolean

  course: CourseType
  courseId: number

  user: any
  userId: string

  createdAt: Date
  updatedAt: Date
}
