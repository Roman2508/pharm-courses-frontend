import z from "zod"
import { toast } from "sonner"
import { Link } from "react-router"
import { useState, type Dispatch, type FC, type MouseEvent, type SetStateAction } from "react"

import { Button } from "../../ui/button"
import FormField from "../../custom/form-field"
import { authClient, signUp } from "@/api/auth-client"
import { getFormErrors } from "@/helpers/get-form-errors"
import type { AuthPageVariants } from "@/pages/auth-page"

const initialFormData = { name: "", email: "", phone: "", password: "" }

// const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/)
const phoneRegex = new RegExp(/^(\+380|380|0)(39|50|63|66|67|68|73|91|92|93|94|95|96|97|98|99)\d{7}$/)

const formSchema = z.object({
  name: z.string().min(8, { message: "Занадто короткий ПІБ" }).max(100, { message: "Занадто довгий ПІБ" }),
  email: z.email({ message: "Не правильний формат пошти" }),
  phone: z.string().regex(phoneRegex, "Не правильний формат телефону"),
  password: z
    .string()
    .min(8, { message: "Мінімальна довжина пароля - 8 символів" })
    .max(30, { message: "Максимальна довжина пароля - 30 символів" }),
})

export type FormData = z.infer<typeof formSchema>

interface Props {
  setEmail: Dispatch<SetStateAction<string>>
  setAuthType: Dispatch<SetStateAction<AuthPageVariants>>
}

const RegisterForm: FC<Props> = ({ setAuthType, setEmail }) => {
  const [isPending, setIsPending] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const [userFormData, setUserFormData] = useState(initialFormData)

  const formData = {
    ...initialFormData,
    ...userFormData,
  }

  const validate = () => {
    const res = formSchema.safeParse(formData)
    if (res.success) return
    return res.error.format()
  }

  const errors = showErrors ? validate() : undefined

  const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsPending(true)
    const errors = validate()
    if (errors) {
      setShowErrors(true)
      setIsPending(false)
      return
    }
    await signUp.email(
      { ...formData, callbackURL: "/auth/verify-email" },
      {
        onRequest: () => {
          setIsPending(true)
        },
        onSuccess: ({ data }) => {
          setIsPending(false)
          if (data?.user?.email) {
            setEmail(data.user.email)
            authClient.sendVerificationEmail({ email: data.user.email, callbackURL: "/auth/verify-email" })
            setAuthType("verify-email")
          } else {
            toast.error("Помилка реєстрації")
          }
        },
        onError: (ctx) => {
          setIsPending(false)
          toast.error(ctx.error.message)
        },
      },
    )
  }

  const changeUserFormData = (key: keyof FormData, value: string) => {
    setUserFormData((prev) => ({ ...prev, [key]: value }))
    setShowErrors(false)
  }

  return (
    <form className="">
      <FormField
        name="name"
        label="ПІБ"
        type="text"
        placeholder="Прізвище Ім'я Побатькові"
        value={formData.name}
        onChange={(value) => changeUserFormData("name", value)}
        className="mb-4"
      />

      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="Введіть свій email"
        value={formData.email}
        onChange={(value) => changeUserFormData("email", value)}
        className="mb-4"
      />

      <FormField
        name="phone"
        label="Телефон"
        type="tel"
        placeholder="Введіть номер телефону"
        value={formData.phone}
        onChange={(value) => changeUserFormData("phone", value)}
        className="mb-4"
      />

      <FormField
        name="password"
        label="Пароль"
        type="password"
        placeholder="Введіть пароль"
        value={formData.password}
        onChange={(value) => changeUserFormData("password", value)}
        className="mb-4"
      />

      <p className={`text-[14px] text-text-secondary ${showErrors ? "mb-4" : "mb-0"}`}>
        Реєструючись на сайті ви погоджуєтесь з{" "}
        <Link to="/privacy-policy" className="text-primary hover:underline">
          Політикою конфіденційності
        </Link>{" "}
        та{" "}
        <Link to="/terms-of-use" className="text-primary hover:underline">
          Умовами використання
        </Link>
      </p>

      {showErrors && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          {getFormErrors(errors).map((error) => (
            <p className="text-sm text-destructive">{error}</p>
          ))}
        </div>
      )}

      <Button type="button" className="w-full mt-4" size="lg" onClick={handleRegister} disabled={isPending}>
        {isPending ? "Завантаження..." : "Зареєструватись"}
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary flex gap-1 justify-center">
          Вже маєте акаунт?
          <Link
            to="/auth/login"
            onClick={() => setAuthType("login")}
            className="text-primary font-medium hover:text-primary-hover transition-colors cursor-pointer"
          >
            Увійти
          </Link>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm
