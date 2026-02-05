import { useMemo, useState } from "react"

import type { UserType } from "@/types/user.type"

interface IFields {
  name: keyof UserType
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

const defaultFormData: Partial<UserType> = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: "user",
  education: "",
  jobTitle: "",
  specialty: "",
  workplace: "",
  region_city: "",
  image: "",
}

const useUserData = (user: UserType | null) => {
  const [userFormData, setUserFormData] = useState<UserType>({} as UserType)

  const formData = {
    ...defaultFormData,
    ...(user ? user : {}),
    ...userFormData,
  }

  const fields: IFields[] = useMemo(
    () => [
      {
        name: "name",
        required: true,
        type: "text",
        label: "ПІБ",
        value: formData.name,
        onChange: (value) => setUserFormData({ ...formData, name: value }),
      },
      {
        name: "email",
        required: true,
        type: "email",
        label: "Email",
        value: formData.email,
        onChange: (value) => setUserFormData({ ...formData, email: value }),
      },
      {
        name: "phone",
        required: true,
        type: "tel",
        label: "Номер телефону",
        value: formData.phone,
        onChange: (value) => setUserFormData({ ...formData, phone: value }),
      },
      {
        name: "password",
        required: true,
        type: "text",
        label: "Пароль (необов'язково)",
        placeholder: "Залиште поле пустим, щоб не змінювати",
        value: formData.password,
        onChange: (value) => setUserFormData({ ...formData, password: value }),
      },
      {
        name: "role",
        required: true,
        type: "select",
        label: "Роль",
        value: formData.role,
        defaultValue: String(formData.role),
        items: [
          { label: "Користувач", value: "user" },
          { label: "Адміністратор", value: "admin" },
        ],
        onChange: (value) => setUserFormData({ ...formData, role: value as "user" | "admin" }),
      },
      {
        name: "region_city",
        required: true,
        type: "text",
        label: "Місто / Область",
        value: formData.region_city,
        onChange: (value) => setUserFormData({ ...formData, region_city: value }),
      },
      {
        name: "education",
        required: true,
        type: "select",
        label: "Рівень освіти",
        value: formData.education,
        defaultValue: String(formData.education),
        items: [
          {
            label: "Неповна вища (молодший спеціаліст / фаховий молодший бакалавр / бакалавр)",
            value: "Неповна вища (молодший спеціаліст / фаховий молодший бакалавр / бакалавр)",
          },
          { label: "Вища фармацевтична", value: "Вища фармацевтична" },
          { label: "Вища медична", value: "Вища медична" },
        ],
        onChange: (value) => setUserFormData({ ...formData, education: value }),
      },
      {
        name: "specialty",
        required: true,
        type: "text",
        label: "Спеціальність",
        value: formData.specialty,
        onChange: (value) => setUserFormData({ ...formData, specialty: value }),
      },
      {
        name: "workplace",
        required: true,
        type: "text",
        label: "Місце роботи",
        value: formData.workplace,
        onChange: (value) => setUserFormData({ ...formData, workplace: value }),
      },
      {
        name: "jobTitle",
        required: true,
        type: "text",
        label: "Посада",
        value: formData.jobTitle,
        onChange: (value) => setUserFormData({ ...formData, jobTitle: value }),
      },
    ],
    [formData, userFormData],
  )

  return { formData, fields }
}

export default useUserData
