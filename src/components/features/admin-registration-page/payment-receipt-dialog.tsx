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
import testImg from "../../../assets/medical-laboratory.jpg"

interface Props {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
}

const PaymentReceiptDialog: FC<Props> = ({ open, onOpenChange }) => {
  const isPending = false

  const handleSubmit = () => {}

  const onDialogClose = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Квитанція про оплату</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 px-2 border-y">
          <img src={testImg} />
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
