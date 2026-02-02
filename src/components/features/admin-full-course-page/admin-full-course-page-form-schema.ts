import { z } from "zod"

export const courseFormSchema = z
  .object({
    name: z.string().trim().min(1, "Назва заходу обовʼязкова"),

    certificateTemplateId: z.coerce.number().int().optional().nullable(),

    link: z
      .string()
      .trim()
      .optional()
      .refine((v) => !v || /^https?:\/\/.+/.test(v), "Некоректне посилання"),

    description: z.string().trim().min(1, "Програма заходу обовʼязкова"),

    startDate: z.coerce.date().refine((d) => d instanceof Date && !isNaN(+d), "Дата початку обовʼязкова"),

    endDate: z.coerce.date().optional().nullable(),

    price: z.coerce.number().positive("Ціна має бути більше 0").min(0, "Ціна не може бути відʼємною"),

    maxMembers: z.coerce.number().int().optional().nullable(),

    status: z.enum(["DRAFT", "PLANNED", "ARCHIVE"], "Статус заходу не вибрано"),

    registrationOpen: z.enum(["OPEN", "CLOSE"], "Статус реєстрації не вибрано"),

    targetAudience: z.enum(["PHARMACISTS", "LABORATORY_ASSISTANTS"], "Цільову аудиторію не вибрано"),

    duration: z.coerce
      .number()
      .positive("Тривалість заходу має бути більше 0")
      .min(0, "Тривалість заходу не може бути відʼємною"),

    pointsBpr: z.coerce
      .number()
      .positive("Кількість балів БПР має бути більше 0")
      .min(0, "Кількість балів БПР не може бути відʼємною"),

    yearOfInclusionToBpr: z.coerce
      .number()
      .positive("Ціна має бути більше 0")
      .int("Рік повинен бути цілим числом")
      .min(1000, "Рік повинен містити 4 цифри")
      .max(9999, "Рік повинен містити 4 цифри"),

    numberOfInclusionToBpr: z.coerce
      .number()
      .positive("Номер заходу БПР має не правильний формат")
      .min(0, "Номер заходу БПР має не правильний формат"),
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    path: ["endDate"],
    message: "Дата закінчення не може бути раніше дати початку",
  })

export type CourseFormData = z.infer<typeof courseFormSchema>
