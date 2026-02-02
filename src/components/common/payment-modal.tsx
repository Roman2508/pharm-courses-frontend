import { useRef } from 'react'
import { Upload } from 'lucide-react'

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'

const bankAccountNumber = 'UA528201720314271004202020020'

const paymentDetails = [
  { label: 'Отримувач', value: 'Державна казначейська служба України, м. Київ' },
  { label: 'Рахунок (IBAN)', value: bankAccountNumber },
  { label: 'Код ЄДРПОУ', value: '02011261' },
  { label: 'Призначення платежу', value: 'Плата за БПР, ПІБ учасника' },
]

interface Props {
  open: boolean
  price: number
  onOpenChange: (open: boolean) => void
}

export const PaymentModal = ({ open, onOpenChange, price }: Props) => {
  const fileRef = useRef<HTMLInputElement | null>(null)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-sm md:min-w-xl lg:min-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-bold border-b border-border pb-4">Оплата заходу</DialogTitle>
        </DialogHeader>
        <DialogDescription className="max-h-[calc(100vh-240px)] overflow-x-hidden overflow-y-auto pt-4 pb-8 text-base">
          <div className="leading-normal">
            <p className="text-base">
              Дякуємо за реєстрацію на захід! Щоб завершити реєстрацію, будь ласка, здійсніть оплату.
            </p>

            <h3 className="text-base font-bold mt-4 mb-1 text-black">Реквізити для оплати:</h3>
            <div className="flex flex-col gap-2">
              {paymentDetails.map((detail) => (
                <div key={detail.label} className="flex gap-2">
                  <span className="font-bold min-w-[200px]">{detail.label}:</span>
                  <span>{detail.value}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <span className="font-bold min-w-[200px]">Сума:</span>
                <span>{price} грн.</span>
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

            <h3 className="mt-4 mb-1 text-base font-bold text-black">Оплата через QR-код:</h3>
            <p>Скануйте QR-код у вашому банківському додатку для швидкої оплати:</p>
            <div className="flex justify-center my-4">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=UA1234567800000000000000000000;1000;Оплата+заходу+БПР+-+Тестовий"
                alt="QR Code для оплати"
              />
            </div>

            <p>
              Після сплати ваш захід буде підтверджено, і ви отримаєте доступ до матеріалів. Підтвердження оплати може
              зайняти деякий час.
            </p>
          </div>
        </DialogDescription>

        <DialogFooter className="border-t border-border">
          <input type="file" className="hidden" ref={fileRef} />

          <Button onClick={() => fileRef?.current?.click()} className="mt-4 w-full">
            <Upload />
            Підтвердити оплату
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
