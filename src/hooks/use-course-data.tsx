import { useMemo, useState } from "react"

import type {
  CourseType,
  CourseStatusType,
  CourseTargetAudienceType,
  CourseRegistrationStatusType,
} from "@/types/course.type"
import type { FormFieldTypes } from "@/components/custom/form-field"
import type { CertificateTemplateType } from "@/types/certificate-template.type"

interface IFields {
  name: keyof CourseType
  required: boolean
  type: FormFieldTypes
  label: string
  value: any
  defaultValue?: string
  placeholder?: string
  className?: string
  items?: { label: string; value: string }[]
  onChange: (value: string) => void
}

const defaultFormData: Partial<CourseType> = {
  name: "",
  certificateTemplateId: undefined,
  link: "",
  description: "",
  startDate: new Date(),
  endDate: undefined,
  price: 0,
  maxMembers: 0,
  status: "DRAFT",
  registrationOpen: "OPEN",
  targetAudience: "PHARMACISTS",
  duration: 0,
  pointsBpr: 0,
  yearOfInclusionToBpr: new Date().getFullYear(),
  numberOfInclusionToBpr: 0,
}

const useCourseData = (course: Partial<CourseType> = {}, certificateTemplates: CertificateTemplateType[] = []) => {
  const [userFormData, setUserFormData] = useState<Partial<CourseType>>({})

  const { certificateTemplate, ...courseData } = course

  const formData = {
    ...defaultFormData,
    ...courseData,
    ...userFormData,
  }

  const certificateTemplatesList = certificateTemplates
    ? certificateTemplates.map((el) => ({ label: el.name, value: String(el.id) }))
    : []

  const fields: IFields[] = useMemo(
    () => [
      {
        name: "name",
        required: true,
        type: "text",
        label: "Назва заходу",
        value: formData.name,
        onChange: (value) => setUserFormData({ ...formData, name: value }),
      },
      {
        name: "certificateTemplateId",
        required: false,
        type: "select",
        label: "Сертифікат",
        value: formData.certificateTemplateId,
        defaultValue: String(formData.certificateTemplateId),
        items: certificateTemplatesList,
        onChange: (value) => setUserFormData({ ...formData, certificateTemplateId: +value }),
      },
      {
        name: "link",
        required: false,
        type: "url",
        label: "Покликання на захід",
        value: formData.link,
        onChange: (value) => setUserFormData({ ...formData, link: value }),
      },
      {
        name: "description",
        required: true,
        type: "rich-text",
        label: "Програма заходу",
        value: formData.description,
        onChange: (value) => setUserFormData({ ...formData, description: value }),
      },
      {
        name: "startDate",
        required: true,
        type: "date-time",
        label: "Дата початку",
        value: formData.startDate,
        onChange: (value) => setUserFormData({ ...formData, startDate: value as unknown as Date }),
      },
      {
        name: "endDate",
        required: false,
        type: "date-time",
        label: "Дата закінчення",
        value: formData.endDate,
        onChange: (value) => setUserFormData({ ...formData, endDate: value as unknown as Date }),
      },
      {
        name: "price",
        required: true,
        type: "number",
        label: "Ціна (грн)",
        value: formData.price,
        onChange: (value) => setUserFormData({ ...formData, price: +value }),
      },
      {
        name: "maxMembers",
        required: false,
        type: "number",
        label: "Максимум учасників",
        value: formData.maxMembers,
        onChange: (value) => setUserFormData({ ...formData, maxMembers: +value }),
      },
      {
        name: "status",
        required: true,
        type: "select",
        label: "Статус ",
        value: formData.status,
        defaultValue: formData.status ? formData.status : "DRAFT",
        onChange: (value) => setUserFormData({ ...formData, status: value as CourseStatusType }),
        items: [
          { label: "Чернетка", value: "DRAFT" },
          { label: "Очікується", value: "PLANNED" },
          { label: "Архів", value: "ARCHIVE" },
        ],
      },
      {
        name: "registrationOpen",
        required: true,
        type: "select",
        label: "Статус реєстрації",
        value: formData.registrationOpen,
        defaultValue: formData.registrationOpen ? formData.registrationOpen : "OPEN",
        onChange: (value) => setUserFormData({ ...formData, registrationOpen: value as CourseRegistrationStatusType }),
        items: [
          { label: "Відкрито", value: "OPEN" },
          { label: "Закрито", value: "CLOSE" },
        ],
      },
      {
        name: "targetAudience",
        required: true,
        type: "select",
        label: "Цільова аудиторія",
        value: formData.targetAudience,
        defaultValue: formData.targetAudience ? formData.targetAudience : "PHARMACISTS",
        onChange: (value) => setUserFormData({ ...formData, targetAudience: value as CourseTargetAudienceType }),
        items: [
          { label: "Фармація", value: "PHARMACISTS" },
          { label: "Лабораторна діагностика", value: "LABORATORY_ASSISTANTS" },
          { label: "Фармація та лабораторна діагностика", value: "PHARMACISTS_AND_LABORATORY_ASSISTANTS" },
        ],
      },
      {
        name: "duration",
        required: true,
        type: "number",
        label: "Тривалість заходу (годин)",
        value: formData.duration,
        onChange: (value) => setUserFormData({ ...formData, duration: +value }),
      },
      {
        name: "pointsBpr",
        required: true,
        type: "number",
        label: "Балів БПР (годин)",
        value: formData.pointsBpr,
        onChange: (value) => setUserFormData({ ...formData, pointsBpr: +value }),
      },
      {
        name: "yearOfInclusionToBpr",
        required: true,
        type: "number",
        label: "Захід внесено до Переліку заходів БПР (рік)",
        value: formData.yearOfInclusionToBpr,
        onChange: (value) => setUserFormData({ ...formData, yearOfInclusionToBpr: +value }),
      },
      {
        name: "numberOfInclusionToBpr",
        required: true,
        type: "number",
        label: "Захід внесено до Переліку заходів БПР (номер)",
        value: formData.numberOfInclusionToBpr,
        onChange: (value) => setUserFormData({ ...formData, numberOfInclusionToBpr: +value }),
      },
    ],
    [formData, /* userFormData, */ certificateTemplatesList],
  )

  return { formData, fields }
}

export default useCourseData
