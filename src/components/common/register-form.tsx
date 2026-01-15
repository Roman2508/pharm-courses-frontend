import type { Dispatch, FC, SetStateAction } from 'react'

import { Button } from '../ui/button'
import BaseField from '../custom/base-field'

interface Props {
  setAuthType: Dispatch<SetStateAction<'login' | 'register'>>
}

const RegisterForm: FC<Props> = ({ setAuthType }) => {
  return (
    <form className="">
      <BaseField
        label="ПІБ"
        type="text"
        placeholder="Прізвище Ім'я Побатькові"
        value=""
        onChange={() => {}}
        className="mb-4"
      />

      <BaseField
        label="Email"
        type="email"
        placeholder="Введіть свій email"
        value=""
        onChange={() => {}}
        className="mb-4"
      />

      <BaseField
        label="Телефон"
        type="tel"
        placeholder="Введіть номер телефону"
        value=""
        onChange={() => {}}
        className="mb-4"
      />

      <BaseField
        label="Пароль"
        type="password"
        placeholder="Введіть пароль"
        value=""
        onChange={() => {}}
        className="mb-4"
      />

      <Button type="submit" className="w-full mt-4" size="lg">
        Зареєструватись
      </Button>

      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary flex gap-1 justify-center">
          Вже маєте акаунт?
          <div
            onClick={() => setAuthType('login')}
            className="text-primary font-medium hover:text-primary-hover transition-colors cursor-pointer"
          >
            Увійти
          </div>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm
