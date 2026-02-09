import { useNavigate } from "react-router"
import { useEffect, useState, type FC } from "react"

import { authClient } from "@/api/auth-client"
import { Button } from "@/components/ui/button"
import { useEmailVerificationStatus } from "@/api/hooks/use-user"
import { getCooldown, startCooldown } from "@/helpers/email-verification-cooldown"

interface Props {
  email?: string
}

const EmailConfirmation: FC<Props> = ({ email }) => {
  const navigate = useNavigate()

  const [seconds, setSeconds] = useState(getCooldown())

  const { data: verified } = useEmailVerificationStatus(email)

  const onVerifiEmail = async () => {
    if (!email) return
    await authClient.sendVerificationEmail({ email, callbackURL: "/" })
    startCooldown(60)
    setSeconds(60)
  }

  useEffect(() => {
    startCooldown(60)
    setSeconds(60)
  }, [])

  useEffect(() => {
    if (!seconds) return
    const id = setInterval(() => {
      setSeconds(getCooldown())
    }, 1000)
    return () => clearInterval(id)
  }, [seconds])

  useEffect(() => {
    if (verified) {
      navigate("/", { replace: true })
    }
  }, [verified])

  return (
    <div className="space-y-3">
      <Button size="lg" className="w-full" onClick={onVerifiEmail} disabled={seconds > 0 || verified}>
        {verified ? "Email вже підтверджено" : seconds > 0 ? `Повторити через ${seconds}с` : "Відправити ще раз"}
      </Button>

      {seconds > 0 && (
        <p className="text-xs text-center text-text-secondary">Повторна відправка доступна через {seconds} секунд</p>
      )}
    </div>
  )
}

export default EmailConfirmation
