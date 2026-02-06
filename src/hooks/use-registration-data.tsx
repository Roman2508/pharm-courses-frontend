import { useMemo, useState } from "react"

import type { UserType } from "@/types/user.type"
import type { CourseType } from "@/types/course.type"
import type { RegistrationType, RegistrationTypeType } from "@/types/registration.type"

interface IFields {
  name: keyof RegistrationType
  required: boolean
  type: "text" | "email" | "password" | "number" | "date" | "tel" | "url" | "select" | "rich-text"
  label: string
  value: any
  defaultValue?: string
  placeholder?: string
  className?: string
  items?: { label: string; value: string }[]
  onChange: (value: string) => void
}

const defaultFormData: Partial<RegistrationType> = {
  userId: "",
  courseId: 0,
  amount: 0,
  type: "TRAINER",
}

const useRegistrationData = (users: UserType[] = [], courses: CourseType[] = []) => {
  const [userFormData, setUserFormData] = useState<Partial<RegistrationType>>({})

  const formData = {
    ...defaultFormData,
    ...userFormData,
  }

  const usersList = users ? users.map((el) => ({ label: el.name, value: String(el.id) })) : []

  const coursesList = courses ? courses.map((el) => ({ label: el.name, value: String(el.id) })) : []

  const fields: IFields[] = useMemo(
    () => [
      {
        name: "userId",
        required: false,
        type: "select",
        label: "Користувач",
        value: formData.userId,
        defaultValue: String(formData.userId),
        items: usersList,
        onChange: (value) => setUserFormData({ ...formData, userId: value }),
      },

      {
        name: "courseId",
        required: false,
        type: "select",
        label: "Захід",
        value: formData.courseId,
        defaultValue: String(formData.courseId),
        items: coursesList,
        onChange: (value) => {
          const course = courses.find((el) => el.id === +value)
          setUserFormData({ ...formData, courseId: +value, amount: course?.price })
        },
      },

      {
        name: "type",
        required: true,
        type: "select",
        label: "Тип реєстрації",
        value: formData.type,
        defaultValue: formData.type ? formData.type : "TRAINER",
        onChange: (value) => setUserFormData({ ...formData, type: value as RegistrationTypeType }),
        items: [
          { label: "Тренер", value: "TRAINER" },
          { label: "Учасник", value: "USER" },
        ],
      },
    ],
    [formData, usersList, coursesList],
  )

  return { formData, fields }
}

export default useRegistrationData
