import { type Dispatch, type FC, type SetStateAction } from "react"

import { getDate } from "@/helpers/get-date"
import { getRGB } from "@/constants/colors"
import type { RegistrationDataType } from "@/pages/admin-page"
import type { RegistrationType } from "@/types/registration.type"
import { getPaymentColor, getPaymentStatus } from "@/helpers/get-payment-status"

interface Props {
  registration: RegistrationType
  setIsPaymentModalOpen: Dispatch<SetStateAction<boolean>>
  setIsParticipationModalOpen: Dispatch<SetStateAction<boolean>>
  setRegistrationData: Dispatch<SetStateAction<RegistrationDataType>>
}

const RegistrationItem: FC<Props> = ({
  registration,
  setRegistrationData,
  setIsPaymentModalOpen,
  setIsParticipationModalOpen,
}) => {
  const { user, course, createdAt, paymentStatus, paymentReceipt } = registration

  const color = getPaymentColor(paymentStatus)

  const onRegistrationClick = (type: "payment" | "free") => {
    if (type === "payment") setIsPaymentModalOpen(true)
    if (type === "free") setIsParticipationModalOpen(true)
    setRegistrationData({
      id: registration.id,
      paymentReceipt: registration.paymentReceipt,
      freeParticipation: registration.freeParticipation,
    })
  }

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

      <div className="flex flex-col min-[520px]:flex-row md:flex-col gap-2 items-start min-[520px]:items-end">
        <span
          className="truncate inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
          style={{ background: getRGB(color as any, 0.1), color: getRGB(color as any) }}
        >
          {getPaymentStatus(paymentStatus)}
        </span>

        <div className="flex flex-col min-[520px]:flex-row gap-2 min-[520px]:gap-1 items-start min-[520px]:items-center">
          {registration.freeParticipation && (
            <button
              onClick={() => onRegistrationClick("free")}
              className={
                "truncate cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-xs " +
                "font-medium text-primary"
              }
              style={{ background: getRGB("primary", 0.1) }}
            >
              Безкоштовна участь
            </button>
          )}

          <button
            onClick={() => onRegistrationClick("payment")}
            className="truncate cursor-pointer inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: paymentReceipt ? getRGB("primary", 0.1) : getRGB("destructive", 0.1),
              color: paymentReceipt ? getRGB("primary") : getRGB("destructive"),
            }}
          >
            {paymentReceipt ? "Переглянути" : "Не завантажена"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegistrationItem
