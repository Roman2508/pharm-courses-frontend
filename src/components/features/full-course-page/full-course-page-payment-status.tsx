import { Award } from "lucide-react"

import { cn } from "@/lib/utils"
import { getRGB } from "@/constants/colors"
import type { RegistrationType } from "@/types/registration.type"

interface Props {
  registration: RegistrationType
}

export const FullCoursePagePaymentStatus = ({ registration }: Props) => {
  return (
    <div
      className={cn("p-4 rounded-xl border mb-4")}
      style={{
        background: registration.paymentStatus === "PAID" ? getRGB("success", 0.1) : getRGB("destructive", 0.1),
        borderColor: registration.paymentStatus === "PAID" ? getRGB("success", 0.2) : getRGB("destructive", 0.2),
      }}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5")}
          style={{
            background: registration.paymentStatus === "PAID" ? getRGB("success", 0.2) : getRGB("destructive", 0.2),
          }}
        >
          <Award
            className={cn("w-4 h-4", registration.paymentStatus === "PAID" ? "text-success" : "text-destructive")}
          />
        </div>
        <div>
          <div
            className={cn(
              "text-sm xl:text-base font-medium",
              registration.paymentStatus === "PAID" ? "text-success" : "text-destructive",
            )}
          >
            Ви зареєстровані
          </div>
          <p className="text-sm text-text-destructive">
            Статус:{" "}
            <span
              className={cn("font-medium", registration.paymentStatus === "PAID" ? "text-success" : "text-destructive")}
            >
              {registration.paymentStatus === "PAID"
                ? "Оплачено"
                : registration.paymentStatus === "PENDING"
                  ? "Опрацьовується адміністратором"
                  : "Очікується оплата"}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
