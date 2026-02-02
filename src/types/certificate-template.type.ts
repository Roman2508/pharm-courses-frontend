import type { TextBlock } from "@/components/features/admin-full-certificate-page/draggable-initial-blocks"

export type CertificateTemplateType = {
  id: number

  name: string
  templateUrl: string

  namePosition: TextBlock
  courseNamePosition: TextBlock
  courseDatePosition: TextBlock
  certificateNumberPosition: TextBlock
  durationPosition: TextBlock
  pointsPosition: TextBlock
  yearOfInclusionPosition: TextBlock
  numberOfInclusionPosition: TextBlock
  eventTypePosition: TextBlock
  certificateTypePosition: TextBlock

  updatedAt: Date
  createdAt: Date
}
