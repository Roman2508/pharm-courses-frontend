export type CourseStatusType = 'DRAFT' | 'PLANNED' | 'ARCHIVED'

export type CourseType = {
  id: number
  name: string
  price: number
  startDate: Date
  endDate: Date
  description: any
  status: CourseStatusType
  registrationOpen: boolean
  certificateTemplate: any
  certificateTemplateId: number
  registrations: any
  updatedAt: Date
  createdAt: Date
}
