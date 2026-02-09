import { useEffect, useState, type FC } from "react"

import logo from "../assets/logo.png"
import { authClient } from "@/api/auth-client"
import { Button } from "@/components/ui/button"
import LoginForm from "@/components/common/login-form"
import RegisterForm from "@/components/common/register-form"

const KEY = "verificationCooldownUntil"

export function getCooldown() {
  const until = Number(localStorage.getItem(KEY) || 0)
  const diff = Math.ceil((until - Date.now()) / 1000)
  return diff > 0 ? diff : 0
}

// Після редаректа з логіна треба запускати кулдаун
export function startCooldown(seconds: number) {
  localStorage.setItem(KEY, String(Date.now() + seconds * 1000))
}

interface Props {
  defaultAuthType: "login" | "register" | "confirm-email"
}

const AuthPage: FC<Props> = ({ defaultAuthType }) => {
  const [seconds, setSeconds] = useState(getCooldown())
  const [authType, setAuthType] = useState<"login" | "register" | "confirm-email">(defaultAuthType)

  useEffect(() => {
    setAuthType(defaultAuthType)
  }, [defaultAuthType])

  useEffect(() => {
    if (!seconds) return

    const id = setInterval(() => {
      setSeconds(getCooldown())
    }, 1000)

    return () => clearInterval(id)
  }, [seconds])

  const authTitle =
    authType === "login" ? "Ласкаво просимо" : authType === "register" ? "Створити акаунт" : "Підтвердження пошти"

  const authText =
    authType === "login" ? (
      "Увійдіть до свого облікового запису"
    ) : authType === "register" ? (
      "Зареєструйтесь для доступу до наших заходів"
    ) : (
      <div className="flex flex-col space-y-2 text-justify">
        <p>Ми надіслали лист із посиланням для підтвердження на адресу, яку ви вказали під час реєстрації.</p>
        <p>Щоб завершити створення облікового запису, перейдіть за посиланням у цьому листі.</p>
        <p>Якщо ви не бачите листа у вхідних, перевірте папку «Спам»</p>
      </div>
    )

  const onVerifiEmail = async () => {
    await authClient.sendVerificationEmail({
      email: "ptashnyk.roman@pharm.zt.ua",
      callbackURL: "/",
    })
    startCooldown(60)
    setSeconds(60)
  }

  return (
    <div className="min-h-[100svh] bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-surface rounded-2xl border border-border shadow-xl py-8 px-6 min-[500px]:p-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 rounded-xl bg-primary mx-auto mb-4 flex items-center justify-center">
              <img src={logo} alt="logo" className="w-12 h-12" />
            </div>

            <h1 className="text-2xl font-bold text-text-primary mb-2">{authTitle}</h1>
            <p className="text-sm text-text-secondary">{authText}</p>
          </div>

          {authType === "login" && <LoginForm setAuthType={setAuthType} />}
          {authType === "register" && <RegisterForm setAuthType={setAuthType} />}
          {authType === "confirm-email" && (
            <div className="space-y-3">
              <Button className="w-full" size="lg" disabled={seconds > 0} onClick={onVerifiEmail}>
                {seconds > 0 ? `Повторити через ${seconds}с` : "Відправити ще раз"}
              </Button>

              {seconds > 0 && (
                <p className="text-xs text-center text-text-secondary">
                  Повторна відправка доступна через {seconds} секунд
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
