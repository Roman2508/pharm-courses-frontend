import { type FC } from "react"

import { getDate } from "@/helpers/get-date"
import type { RegistrationType } from "@/types/registration.type"
import { getPaymentColor, getPaymentStatus } from "@/helpers/get-payment-status"

const RegistrationItem: FC<RegistrationType> = ({ user, course, createdAt, paymentStatus }) => {
  const color = getPaymentColor(paymentStatus)

  return (
    <div className="flex gap-2 items-start md:items-center justify-between py-3 border-b border-border last:border-0 flex-col md:flex-row">
      <div className="flex gap-4">
        <div>
          <div className="font-medium">
            <span className="font-bold">Учасник:</span>{" "}
            <span className="text-text-primary">
              {user?.name}
              {", "}
            </span>
            <span className="text-text-primary text-sm opacity-[0.7]">
              {user?.email}
              {", "}
            </span>
            <span className="text-text-primary text-sm opacity-[0.7]">{user?.phone ? user?.phone : "-"}</span>
          </div>

          <div className="text-medium">
            <span className="font-bold">Захід:</span> <span className="text-text-primary">{course?.name}</span>
          </div>
          <div className="text-[12px] sm:text-sm mt-0.5 text-text-secondary">Дата реєстрації: {getDate(createdAt)}</div>
        </div>
      </div>

      <div className="text-right">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${color}/10 text-${color}`}
        >
          {getPaymentStatus(paymentStatus)}
        </span>
      </div>
    </div>
  )
}

export default RegistrationItem
