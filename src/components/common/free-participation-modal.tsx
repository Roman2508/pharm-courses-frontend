import { Upload } from "lucide-react"
import { useRef, type ChangeEvent, type Dispatch, type SetStateAction } from "react"

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import type { RegistrationType } from "@/types/registration.type"
import { useFreeParticipation } from "@/api/hooks/use-registration"

interface Props {
  open: boolean
  registration?: RegistrationType
  onOpenChange: Dispatch<SetStateAction<boolean>>
  onPaymentOpenChange: Dispatch<SetStateAction<boolean>>
}

const FreeParticipationModal = ({ open, registration, onOpenChange, onPaymentOpenChange }: Props) => {
  const fileRef = useRef<HTMLInputElement | null>(null)

  const uploadFreeParticipation = useFreeParticipation(registration?.courseId)

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !registration) return

    const formData = new FormData()
    formData.append("freeParticipation", file)
    uploadFreeParticipation.mutate({ id: registration.id, formData })
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false)
        onPaymentOpenChange(true)
      }}
    >
      <DialogContent className="min-w-sm md:min-w-xl lg:min-w-2xl px-2 sm:px-6">
        <DialogHeader>
          <DialogTitle className="font-bold border-b border-border pb-4">Безкоштовна участь у заході</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100svh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 text-base">
          <div className="leading-normal">
            <p className="text-base">
              Безкоштовна участь у заходах БПР для працівників сфери охорони здоров’я, які перебувають на службі у
              Збройних Силах України та інших військових формуваннях.
            </p>

            <h3 className="text-base font-bold mt-4 mb-1 text-black">Для отримання безкоштовної участі необхідно:</h3>

            <ol className="list-decimal list-inside">
              <li>Зареєструватися на обраний захід.</li>
              <li>Надати підтвердження відповідного статусу.</li>
            </ol>

            <p className="text-base mt-4">Участь надається за умови наявності вільних місць.</p>

            <p className="text-base mt-4">
              Якщо у вас виникли запитання — звертайтеся до організаційного комітету за вказаними на сайті контактами.
            </p>
          </div>
        </DialogDescription>

        <DialogFooter className="flex !flex-col border-t border-border">
          {registration?.freeParticipation && (
            <p className="text-center pt-4">
              Ваш запит на безкоштовну участь у заході відправлений адміністратору на перевірку. Ви можете відслідкувати
              статус перевірки на сторінці "Мої заходи"
            </p>
          )}

          <div className="flex flex-col lg:flex-row gap-2 w-full mt-4">
            <input type="file" className="hidden" accept="image/*" ref={fileRef} onChange={handleUpload} />

            <Button
              className="flex-1 min-h-10"
              onClick={() => fileRef?.current?.click()}
              disabled={uploadFreeParticipation.isPending || registration?.paymentStatus === "PAID"}
            >
              <Upload />

              {uploadFreeParticipation.isPending
                ? "Завантаження..."
                : registration?.freeParticipation
                  ? "Завантажити інший файл"
                  : "Підтвердити статус"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default FreeParticipationModal
