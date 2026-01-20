import z from 'zod'
import { useState, type Dispatch, type FC, type MouseEvent, type SetStateAction } from 'react'

import { Button } from '../ui/button'
import BaseField from '../custom/base-field'
import { useNavigate } from 'react-router'
import { signIn } from '@/api/auth-client'
import { toast } from 'sonner'
import { getFormErrors } from '@/helpers/get-form-errors'

const initialFormData = { email: '', password: '' }

const formSchema = z.object({
  email: z.email({ message: 'Не правильний формат пошти' }),
  password: z
    .string()
    .min(8, { message: 'Мінімальна довжина пароля - 8 символів' })
    .max(30, { message: 'Максимальна довжина пароля - 30 символів' }),
})

export type FormData = z.infer<typeof formSchema>

interface Props {
  setAuthType: Dispatch<SetStateAction<'login' | 'register'>>
}

const LoginForm: FC<Props> = ({ setAuthType }) => {
  const navigate = useNavigate()

  const [isPending, setIsPanding] = useState(false)
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
    setIsPanding(true)
    const errors = validate()
    if (errors) {
      setShowErrors(true)
      setIsPanding(false)
      return
    }
    await signIn.email(
      { ...formData, callbackURL: '/' },
      {
        onRequest: (ctx) => {
          setIsPanding(true)
        },
        onSuccess: (ctx) => {
          setIsPanding(false)
          navigate('/', { replace: true })
        },
        onError: (ctx) => {
          setIsPanding(false)
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
      <BaseField
        label="Email"
        type="email"
        placeholder="Введіть email"
        value={formData.email}
        onChange={(value) => changeUserFormData('email', value)}
        className="mb-4"
      />

      <BaseField
        label="Пароль"
        type="password"
        placeholder="Введіть пароль"
        value={formData.password}
        onChange={(value) => changeUserFormData('password', value)}
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
        {isPending ? 'Завантаження...' : 'Увійти'}
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary flex gap-1 justify-center">
          Не маєте облікового запису?
          <div
            onClick={() => setAuthType('register')}
            className="text-primary font-medium hover:text-primary-hover transition-colors cursor-pointer"
          >
            Зареєструватися
          </div>
        </p>
      </div>
    </form>
  )
}

export default LoginForm
