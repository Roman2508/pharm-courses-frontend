import type { RegistrationType } from "./registration.type"

export type CourseStatusType = "DRAFT" | "PLANNED" | "ARCHIVED"
export type CourseRegistrationStatusType = "OPEN" | "CLOSE"
export type CourseTargetAudienceType = "PHARMACISTS" | "LABORATORY_ASSISTANTS" | "PHARMACISTS_AND_LABORATORY_ASSISTANTS"

export type CourseType = {
  id: number
  name: string
  price: number
  startDate: Date
  endDate: Date
  description: any
  link: string
  maxMembers?: number
  status: CourseStatusType
  registrationOpen: CourseRegistrationStatusType
  targetAudience?: CourseTargetAudienceType
  certificateTemplate: any
  certificateTemplateId: number
  registrations: RegistrationType[]

  paymentQrCode?: string

  duration: number
  pointsBpr: number
  yearOfInclusionToBpr: number
  numberOfInclusionToBpr: number

  updatedAt: Date
  createdAt: Date
}
