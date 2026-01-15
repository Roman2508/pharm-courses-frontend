import type { Dispatch, FC, SetStateAction } from 'react'

import { Button } from '../ui/button'
import BaseField from '../custom/base-field'

interface Props {
  setAuthType: Dispatch<SetStateAction<'login' | 'register'>>
}

const LoginForm: FC<Props> = ({ setAuthType }) => {
  return (
    <form className="">
      <BaseField label="Email" type="email" placeholder="Введіть email" value="" onChange={() => {}} className="mb-4" />

      <BaseField
        label="Пароль"
        type="password"
        placeholder="Введіть пароль"
        value=""
        onChange={() => {}}
        className="mb-4"
      />

      <Button type="submit" className="w-full mt-4" size="lg">
        Увійти
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
