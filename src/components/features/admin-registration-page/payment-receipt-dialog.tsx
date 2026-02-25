import { type Dispatch, type FC, type SetStateAction } from "react"

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { RegistrationDataType } from "@/pages/admin-page"
import { useRegistrationById, useUpdateRegistrationPayment } from "@/api/hooks/use-registration"

interface Props {
  open: boolean
  registrationData: RegistrationDataType
  onOpenChange: Dispatch<SetStateAction<boolean>>
  setRegistrationData: Dispatch<SetStateAction<RegistrationDataType>>
}

// Перевірка квитанції про оплату
const PaymentReceiptDialog: FC<Props> = ({ open, onOpenChange, registrationData, setRegistrationData }) => {
  const { data: currentRegistration } = useRegistrationById(registrationData?.id)
  const isPaid = currentRegistration?.paymentStatus === "PAID"

  const uddatePaymentStatus = useUpdateRegistrationPayment()

  const handleSubmit = () => {
    if (!registrationData) return
    uddatePaymentStatus.mutate({ id: registrationData.id, status: "PAID" })
  }

  const onDialogClose = () => {
    onOpenChange(false)
    setRegistrationData(null)
  }

  if (!registrationData) return

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Квитанція про оплату</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 px-2 border-y">
          {registrationData.paymentReceipt ? (
            <img src={`${import.meta.env.VITE_BASE_URL}${registrationData.paymentReceipt}`} />
          ) : (
            <p className="text-center text-base pt-4">Квитанція не завантажена</p>
          )}
        </DialogDescription>

        <DialogFooter className="w-full gap-2 pt-2">
          <Button
            size="lg"
            className="flex-1"
            onClick={handleSubmit}
            disabled={uddatePaymentStatus.isPending || isPaid}
          >
            {uddatePaymentStatus.isPending
              ? "Завантаження..."
              : isPaid
                ? "Реєстрацію підтверджено"
                : "Підтвердити оплату"}
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-40"
            onClick={onDialogClose}
            disabled={uddatePaymentStatus.isPending}
          >
            Закрити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentReceiptDialog
