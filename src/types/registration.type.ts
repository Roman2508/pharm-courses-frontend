import type { CourseType } from "./course.type"

export type PaymentStatus = "NONE" | "PENDING" | "PAID" | "FAILED" | "REFUNDED"
export type RegistrationTypeType = "TRAINER" | "MEMBER"

export type RegistrationType = {
  id: number
  paymentStatus: PaymentStatus
  paymentReceipt: string
  amount: number
  certificateEnabled: boolean
  type: RegistrationTypeType

  course: CourseType
  courseId: number

  user: any
  userId: string

  createdAt: Date
  updatedAt: Date
}
