// import { z } from "zod"

import * as z from "zod"

z.config(z.locales.uk())

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)

export const userFormSchema = z.object({
  name: z
    .string()
    .min(8, { message: "Занадто короткий ПІБ" })
    .max(100, { message: "Занадто довгий ПІБ" })
    .regex(/^[A-Za-zА-Яа-яІіЇїЄєҐґ'`\-\s]+$/, "ПІБ може містити лише літери, пробіли та дефіс"),

  email: z.email({ message: "Не правильний формат пошти" }).max(120),

  phone: z.string().regex(phoneRegex, "Не правильний формат телефону"),

  role: z.enum(["user", "admin"], "Оберіть роль користувача"),

  region_city: z
    .string("Вкажіть місто / область")
    .trim()
    .min(2, "Місто / область - занадто коротке")
    .max(120, "Місто / область - занадто довге"),

  education: z.enum(
    ["Неповна вища (молодший спеціаліст / фаховий молодший бакалавр / бакалавр)", "Вища фармацевтична", "Вища медична"],
    "Оберіть рівень освіти",
  ),

  specialty: z
    .string("Вкажіть спеціальність")
    .trim()
    .min(2, "Вкажіть спеціальність")
    .max(120, "Поле 'Спеціальність' занадто довге"),

  workplace: z
    .string("Вкажіть місце роботи")
    .trim()
    .min(2, "Вкажіть місце роботи")
    .max(120, "Поле 'Місце роботи' занадто довге"),

  jobTitle: z.string("Вкажіть посаду").trim().min(2, "Вкажіть посаду").max(120, "Поле 'Посада' занадто довге"),
})

const requiredPasswordSchema = z.object({
  password: z.string().min(8, "Пароль має містити мінімум 8 символів").max(30),
})

// const requiredPasswordSchema = z
//   .object({
//     password: z.string().min(8, "Пароль має містити мінімум 8 символів").max(30, "Пароль занадто довгий"),
//     confirmPassword: z.string().min(8, "Пароль має містити мінімум 8 символів").max(30, "Пароль занадто довгий"),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Паролі не співпадають",
//     path: ["confirmPassword"],
//   })

// const optionalPasswordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, "Пароль має містити мінімум 8 символів")
//       .max(30, "Пароль занадто довгий")
//       .optional()
//       .or(z.literal("")),
//     confirmPassword: z.string().optional().or(z.literal("")),
//   })
//   .refine(
//     (data) => {
//       // Якщо пароль введено, confirmPassword також має бути введений
//       if (data.password && data.password !== "") {
//         return data.confirmPassword && data.confirmPassword !== ""
//       }
//       return true
//     },
//     {
//       message: "Підтвердіть пароль",
//       path: ["confirmPassword"],
//     },
//   )
//   .refine(
//     (data) => {
//       // Якщо обидва паролі введені, вони мають співпадати
//       if (data.password && data.password !== "" && data.confirmPassword && data.confirmPassword !== "") {
//         return data.password === data.confirmPassword
//       }
//       return true
//     },
//     {
//       message: "Паролі не співпадають",
//       path: ["confirmPassword"],
//     },
//   )

export const createUserSchema = userFormSchema.merge(requiredPasswordSchema)
export type CreateUserFormData = z.infer<typeof createUserSchema>

// export const updateUserSchema = userFormSchema.merge(optionalPasswordSchema)
export const updateUserSchema = userFormSchema
  .extend({
    password: z.string().optional().or(z.literal("")),
    oldPassword: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    const hasNewPassword = !!data.password && data.password !== ""
    const hasCurrentPassword = !!data.oldPassword && data.oldPassword !== ""

    if (hasNewPassword && !hasCurrentPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Введіть поточний пароль",
        path: ["oldPassword"],
      })
    }

    if (hasCurrentPassword && !hasNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Введіть новий пароль",
        path: ["password"],
      })
    }

    if (hasNewPassword && data.password!.length < 8) {
      ctx.addIssue({
        code: "custom",
        message: "Новий пароль має містити мінімум 8 символів",
        path: ["password"],
      })
    }

    if (hasCurrentPassword && data.oldPassword!.length < 8) {
      ctx.addIssue({
        code: "custom",
        message: "Поточний пароль має містити мінімум 8 символів",
        path: ["oldPassword"],
      })
    }

    if (hasNewPassword && data.password!.length > 30) {
      ctx.addIssue({
        code: "custom",
        message: "Новий пароль занадто довгий",
        path: ["password"],
      })
    }

    if (hasCurrentPassword && hasNewPassword && data.oldPassword === data.password) {
      ctx.addIssue({
        code: "custom",
        message: "Новий пароль має відрізнятися від поточного",
        path: ["password"],
      })
    }
  })

export type UpdateUserFormData = z.infer<typeof updateUserSchema>
