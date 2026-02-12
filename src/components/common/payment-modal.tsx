import { Upload } from "lucide-react"
import { useRef, type ChangeEvent } from "react"

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { usePayment } from "@/api/hooks/use-payment"
import type { RegistrationType } from "@/types/registration.type"
import { useDeleteRegistration } from "@/api/hooks/use-registration"

const bankAccountNumber = "UA528201720314271004202020020"

const paymentDetails = [
  { label: "Отримувач", value: "Державна казначейська служба України, м. Київ" },
  { label: "Рахунок (IBAN)", value: bankAccountNumber },
  { label: "Код ЄДРПОУ", value: "02011261" },
  { label: "Призначення платежу", value: "Плата за БПР, ПІБ учасника" },
]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  registration?: RegistrationType
}

export const PaymentModal = ({ open, onOpenChange, registration }: Props) => {
  const fileRef = useRef<HTMLInputElement | null>(null)

  const uploadPaymentReceipt = usePayment()
  const deleteRegistration = useDeleteRegistration(registration?.courseId)

  const handleUploadPaymentReceipt = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !registration) return

    const formData = new FormData()
    formData.append("paymentReceipt", file)
    uploadPaymentReceipt.mutate({ id: registration.id, formData })
  }

  const handleCancelRegistration = () => {
    if (!registration) return
    if (!window.confirm("Ви впевнені, що хочете відмінити реєстрацію (цю дію не можна відмінити)?")) return
    deleteRegistration.mutate(registration.id)
  }

  if (!registration) return

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-sm md:min-w-xl lg:min-w-2xl px-2 sm:px-6">
        <DialogHeader>
          <DialogTitle className="font-bold border-b border-border pb-4">Оплата заходу</DialogTitle>
        </DialogHeader>

        <DialogDescription className="max-h-[calc(100svh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 text-base">
          <div className="leading-normal">
            <p className="text-base">
              Дякуємо за реєстрацію на захід! Щоб завершити реєстрацію, будь ласка, здійсніть оплату.
            </p>

            <h3 className="text-base font-bold mt-4 mb-1 text-black">Реквізити для оплати:</h3>
            <div className="flex flex-col gap-2">
              {paymentDetails.map((detail) => (
                <div key={detail.label} className="flex flex-col sm:flex-row gap-0 sm:gap-2">
                  <span className="font-bold min-w-[200px]">{detail.label}:</span>
                  <span>{detail.value}</span>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-0 sm:gap-2">
                <span className="font-bold min-w-[200px]">Сума:</span>
                <span>{registration.amount} грн.</span>
              </div>
            </div>

            <h3 className="mt-4 mb-1 text-base font-bold text-black">Покрокова інструкція:</h3>
            <ol className="list-decimal list-inside">
              <li>Відкрийте ваш інтернет-банкінг або мобільний додаток банку.</li>
              <li>Створіть новий переказ на реквізити вище.</li>
              <li>У призначенні платежу обовʼязково вкажіть своє імʼя та назву заходу.</li>
              <li>
                Після здійснення платежу натисніть кнопку <strong>"Підтвердити оплату"</strong> та завантажте
                підтвердження (скріншот або PDF).
              </li>
              <li>Наш адміністратор підтвердить оплату протягом 1–2 робочих днів.</li>
            </ol>

            <h3 className="mt-4 mb-1 text-base font-bold text-black">Примітка!</h3>
            <p>Якщо здійснюєте оплату через додаток банку, то необхідно обрати:</p>
            <p>
              Платежі → за реквізитами → {bankAccountNumber} → обрати послугу <b>ЗА МЕТОДИЧНУ ПРОДУКЦІЮ</b>
            </p>

            {registration.course.paymentQrCode && (
              <>
                <h3 className="mt-4 mb-1 text-base font-bold text-black">Оплата через QR-код:</h3>
                <p>Скануйте QR-код у вашому банківському додатку для швидкої оплати:</p>
                <div className="flex justify-center my-4">
                  <img
                    className="max-w-80"
                    alt="QR Code для оплати"
                    src={`${import.meta.env.VITE_BASE_URL}/${registration.course.paymentQrCode}`}
                    // src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UA1234567800000000000000000000;1000;Оплата+заходу+БПР+-+Тестовий"
                  />
                </div>
              </>
            )}

            <p>
              Після сплати ваш захід буде підтверджено, і ви отримаєте доступ до матеріалів. Підтвердження оплати може
              зайняти деякий час.
            </p>
          </div>
        </DialogDescription>

        <DialogFooter className="flex !flex-col border-t border-border">
          {registration.paymentReceipt && (
            <p className="text-center pt-4">
              Ваша квитанція завантажена та відправлена адміністратору на перевірку. Ви можете відслідкувати статус
              перевірки на сторінці "Мої заходи"
            </p>
          )}

          <div className="flex max-[500px]:flex-col flex-row gap-2 w-full mt-4">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              ref={fileRef}
              onChange={handleUploadPaymentReceipt}
            />
            <Button
              className="flex-1 min-h-10"
              onClick={() => fileRef?.current?.click()}
              disabled={uploadPaymentReceipt.isPending || registration.paymentStatus === "PAID"}
            >
              <Upload />
              {uploadPaymentReceipt.isPending
                ? "Завантаження..."
                : registration.paymentReceipt
                  ? "Завантажити іншу квитанцію"
                  : "Підтвердити оплату"}
            </Button>

            <Button variant="destructive" onClick={handleCancelRegistration}>
              Відмінити реєстрацію
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
