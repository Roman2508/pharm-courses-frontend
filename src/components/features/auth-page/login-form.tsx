import z from "zod"
import { toast } from "sonner"
import { Link, useNavigate } from "react-router"
import { useState, type Dispatch, type FC, type MouseEvent, type SetStateAction } from "react"

import { Button } from "@/components/ui/button"
import { authClient, signIn } from "@/api/auth-client"
import FormField from "@/components/custom/form-field"
import type { AuthPageVariants } from "@/pages/auth-page"
import { getFormErrors } from "@/helpers/get-form-errors"
import { startCooldown } from "@/helpers/email-verification-cooldown"

const initialFormData = { email: "", password: "" }

const formSchema = z.object({
  email: z.email({ message: "Не правильний формат пошти" }),
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

const LoginForm: FC<Props> = ({ setAuthType, setEmail }) => {
  const navigate = useNavigate()

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

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsPending(true)
    const errors = validate()
    if (errors) {
      setShowErrors(true)
      setIsPending(false)
      return
    }
    await signIn.email(
      { ...formData, callbackURL: "/" },
      {
        onRequest: () => {
          setIsPending(true)
        },
        onSuccess: () => {
          setIsPending(false)
          navigate("/", { replace: true })
        },
        onError: async (ctx) => {
          setIsPending(false)

          const { error, request } = ctx

          if (error.code !== "EMAIL_NOT_VERIFIED") {
            toast.error(error.message)
            return
          }

          const email = JSON.parse(request?.body)?.email

          if (!email) {
            toast.error(error.message)
            return
          }

          try {
            await authClient.sendVerificationEmail({ email, callbackURL: "/" })
            setEmail(email)
            startCooldown()
            navigate("/auth/verify-email", { replace: true })
            toast.error("Підтвердіть свою електронну пошту")
          } catch {
            toast.error("Не вдалося надіслати лист для підтвердження")
          }
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
        name="email"
        label="Email"
        type="email"
        placeholder="Введіть email"
        value={formData.email}
        onChange={(value) => changeUserFormData("email", value)}
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

      {showErrors && (
        <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          {getFormErrors(errors).map((error) => (
            <p className="text-sm text-destructive">{error}</p>
          ))}
        </div>
      )}

      <Button type="submit" className="w-full mt-4" size="lg" disabled={isPending} onClick={handleLogin}>
        {isPending ? "Завантаження..." : "Увійти"}
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary flex flex-col min-[500px]:flex-row gap-1 justify-center">
          <span>Не маєте облікового запису?</span>
          <Link
            to="/auth/register"
            onClick={() => setAuthType("register")}
            className="text-primary font-medium hover:text-primary-hover transition-colors cursor-pointer"
          >
            Зареєструватися
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
