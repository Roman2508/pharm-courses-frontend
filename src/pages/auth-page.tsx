import { Link, useNavigate } from "react-router"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState, type FC } from "react"

import logo from "../assets/logo.png"
import { Button } from "@/components/ui/button"
import LoginForm from "@/components/features/auth-page/login-form"
import RegisterForm from "@/components/features/auth-page/register-form"
import EmailConfirmation from "@/components/features/auth-page/email-confirmation"
import { getAuthText, getAuthTitle } from "@/components/features/auth-page/get-auth-text"

export type AuthPageVariants = "login" | "register" | "verify-email" | "verified"

interface Props {
  defaultAuthType: AuthPageVariants
}

const AuthPage: FC<Props> = ({ defaultAuthType }) => {
  const [authType, setAuthType] = useState<AuthPageVariants>(defaultAuthType)
  const [email, setEmail] = useState("")

  useEffect(() => {
    setAuthType(defaultAuthType)
  }, [defaultAuthType])

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center flex-col justify-center px-4 py-12">
      <div className="flex justify-start w-full max-w-md">
        <Link to="/">
          <Button variant="ghost" className="mb-4 gap-2">
            <ChevronLeft className="h-4 w-4" />
            Повернутись на головну
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-2xl border border-border shadow-xl py-8 px-6 min-[500px]:p-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-12 h-12" />
            </div>

            <h1 className="text-2xl font-bold text-text-primary mb-2">{getAuthTitle(authType)}</h1>
            <p className="text-sm text-text-secondary">{getAuthText(authType)}</p>
          </div>

          {authType === "login" && <LoginForm setAuthType={setAuthType} setEmail={setEmail} />}

          {authType === "register" && <RegisterForm setAuthType={setAuthType} setEmail={setEmail} />}

          {authType === "verify-email" && <EmailConfirmation email={email} />}

          {authType === "verified" && (
            <Link to="/auth/login">
              <Button className="w-full">Продовжити</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
