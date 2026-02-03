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
import type { RegistrationType } from "@/types/registration.type"
import { useUpdateRegistrationPayment } from "@/api/hooks/use-registration"

interface Props {
  open: boolean
  registrationPayment: RegistrationType | null
  onOpenChange: Dispatch<SetStateAction<boolean>>
  setRegistrationPayment: Dispatch<SetStateAction<RegistrationType | null>>
}

const PaymentReceiptDialog: FC<Props> = ({ open, onOpenChange, registrationPayment, setRegistrationPayment }) => {
  const isPending = false

  const uddatePaymentStatus = useUpdateRegistrationPayment()

  const handleSubmit = () => {
    if (!registrationPayment) return
    uddatePaymentStatus.mutate({ id: registrationPayment.id, status: "PAID" })
  }

  const onDialogClose = () => {
    onOpenChange(false)
    setRegistrationPayment(null)
  }

  if (!registrationPayment) return

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Квитанція про оплату</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 px-2 border-y">
          <img src={`${import.meta.env.VITE_BASE_URL}${registrationPayment.paymentReceipt}`} />
        </DialogDescription>

        <DialogFooter className="w-full gap-2 pt-2">
          <Button size="lg" className="flex-1" disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Завантаження..." : "Підтвердити оплату"}
          </Button>

          <Button size="lg" variant="ghost" className="w-40" disabled={isPending} onClick={onDialogClose}>
            Закрити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentReceiptDialog
