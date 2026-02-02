import { type FC } from 'react'

import type { RegistrationType } from '@/types/registration.type'
import { getDate } from '@/helpers/get-date'
import { getPaymentStatus } from '@/helpers/get-payment-status'

const RegistrationItem: FC<RegistrationType> = ({ user, course, createdAt, paymentStatus }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div className="flex gap-4">
        <div>
          <div className="font-medium">
            <span className="font-bold">Учасник:</span>{' '}
            <span className="text-text-primary">
              {user?.name}
              {', '}
            </span>
            <span className="text-text-primary text-sm opacity-[0.7]">
              {user?.email}
              {', '}
            </span>
            <span className="text-text-primary text-sm opacity-[0.7]">{user?.phone ? user?.phone : '-'}</span>
          </div>

          <div className="text-medium">
            <span className="font-bold">Захід:</span> <span className="text-text-primary">{course?.name}</span>
          </div>
          <div className="text-sm mt-0.5 text-text-secondary">Дата реєстрації: {getDate(createdAt)}</div>
        </div>
      </div>

      <div className="text-right">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            paymentStatus === 'PAID'
              ? 'bg-success/10 text-success'
              : paymentStatus === 'FAILED'
                ? 'bg-destructive/10 text-destructive'
                : 'bg-secondary/10 text-secondary'
          }`}
        >
          {getPaymentStatus(paymentStatus)}
        </span>
      </div>
    </div>
  )
}

export default RegistrationItem
