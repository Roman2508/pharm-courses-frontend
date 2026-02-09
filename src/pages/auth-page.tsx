import { useEffect, useState, type FC } from "react"

import logo from "../assets/logo.png"
import LoginForm from "@/components/common/login-form"
import RegisterForm from "@/components/common/register-form"

interface Props {
  defaultAuthType: "login" | "register"
}

const AuthPage: FC<Props> = ({ defaultAuthType }) => {
  const [authType, setAuthType] = useState<"login" | "register">(defaultAuthType)

  useEffect(() => {
    setAuthType(defaultAuthType)
  }, [defaultAuthType])

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-2xl border border-border shadow-xl py-8 px-6 min-[500px]:p-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-12 h-12" />
            </div>

            <h1 className="text-2xl font-bold text-text-primary mb-2">
              {authType === "login" ? "Ласкаво просимо" : "Створити акаунт"}
            </h1>

            <p className="text-sm text-text-secondary">
              {authType === "login"
                ? "Увійдіть до свого облікового запису"
                : "Зареєструйтесь для доступу до наших заходів"}
            </p>
          </div>

          {authType === "login" ? <LoginForm setAuthType={setAuthType} /> : <RegisterForm setAuthType={setAuthType} />}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
