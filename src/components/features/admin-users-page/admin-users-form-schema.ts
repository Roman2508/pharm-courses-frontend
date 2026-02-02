import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const userFormSchema = z
  .object({
    name: z
      .string()
      .min(8, { message: "Занадто короткий ПІБ" })
      .max(100, { message: "Занадто довгий ПІБ" })
      .regex(
        /^[A-Za-zА-Яа-яІіЇїЄєҐґ'`\-\s]+$/,
        "ПІБ може містити лише літери, пробіли та дефіс",
      ),

    email: z.email({ message: "Не правильний формат пошти" }).max(120),

    phone: z.string().regex(phoneRegex, "Не правильний формат телефону"),

    password: z
      .string()
      .min(8, "Пароль має містити мінімум 8 символів")
      .max(30, "Пароль занадто довгий")
      .optional()
      .or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),

    role: z.enum(["user", "admin"], "Оберіть роль користувача"),

    region_city: z
      .string("Вкажіть місто / область")
      .trim()
      .min(2, "Місто / область - занадто коротке")
      .max(120, "Місто / область - занадто довге"),

    education: z.enum(
      [
        "Неповна вища (молодший спеціаліст / фаховий молодший бакалавр / бакалавр)",
        "Вища фармацевтична",
        "Вища медична",
      ],
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

    jobTitle: z
      .string("Вкажіть посаду")
      .trim()
      .min(2, "Вкажіть посаду")
      .max(120, "Поле 'Посада' занадто довге"),
  })
  .superRefine((data, ctx) => {
    const password = data.password?.trim();
    const confirm = data.confirmPassword?.trim();

    const hasOne = !!password || !!confirm;

    // якщо хоч щось введено → обидва обов'язкові
    if (hasOne) {
      if (!password) {
        ctx.addIssue({
          path: ["password"],
          code: z.ZodIssueCode.custom,
          message: "Введіть пароль",
        });
      }

      if (!confirm) {
        ctx.addIssue({
          path: ["confirmPassword"],
          code: z.ZodIssueCode.custom,
          message: "Підтвердіть пароль",
        });
      }

      if (password && confirm && password !== confirm) {
        ctx.addIssue({
          path: ["confirmPassword"],
          code: z.ZodIssueCode.custom,
          message: "Паролі не співпадають",
        });
      }
    }
  });

export type UserFormData = z.infer<typeof userFormSchema>;
