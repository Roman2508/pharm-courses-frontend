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

// Перегляд заявки на безкоштовну участь у заході
const FreeParticipationDialog: FC<Props> = ({ open, onOpenChange, registrationData, setRegistrationData }) => {
  const isPending = false

  const { data: currentRegistration } = useRegistrationById(registrationData?.id)
  const updatePaymentStatus = useUpdateRegistrationPayment()

  const handleSubmit = () => {
    if (!registrationData) return
    updatePaymentStatus.mutate({ id: registrationData.id, status: "PAID" })
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
          <DialogTitle>Підтвердження статусу</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 px-2 border-y">
          {registrationData.freeParticipation ? (
            <img src={`${import.meta.env.VITE_BASE_URL}${registrationData.freeParticipation}`} />
          ) : (
            <p className="text-center text-base pt-4">Файл не завантажено</p>
          )}
        </DialogDescription>

        <DialogFooter className="w-full gap-2 pt-2">
          <Button
            size="lg"
            className="flex-1"
            disabled={updatePaymentStatus.isPending || currentRegistration?.paymentStatus === "PAID"}
            onClick={handleSubmit}
          >
            {updatePaymentStatus.isPending
              ? "Завантаження..."
              : currentRegistration?.paymentStatus === "PAID"
                ? "Реєстрацію підтверджено"
                : "Підтвердити реєстрацію"}
          </Button>

          <Button size="lg" variant="ghost" className="w-40" disabled={isPending} onClick={onDialogClose}>
            Закрити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FreeParticipationDialog
