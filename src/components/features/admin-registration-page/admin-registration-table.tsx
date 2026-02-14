import { ArrowUp } from "lucide-react"
import type { Dispatch, FC, SetStateAction } from "react"

import { cn } from "@/lib/utils"
import { getDate } from "@/helpers/get-date"
import { getPaymentColor, getPaymentStatus } from "@/helpers/get-payment-status"
import type { RegistrationType } from "@/types/registration.type"
import type { GetRegistrationsQuery } from "@/api/hooks/use-registration"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const tableColumns = [
  { label: "Студент", key: "user.name" },
  { label: "Захід", key: "course.name" },
  { label: "Вартість", key: "amount" },
  { label: "Статус оплати", key: "paymentStatus" },
  { label: "Сертифікат", key: "certificateEnabled" },
  { label: "Квитанція", key: "paymentReceipt" },
  { label: "Дата реєстрації", key: "createdAt" },
] as const

interface Props {
  params: GetRegistrationsQuery
  selectedRegistrations: number[]
  registrations: RegistrationType[]
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setParams: Dispatch<SetStateAction<GetRegistrationsQuery>>
  setSelectedRegistrations: Dispatch<SetStateAction<number[]>>
  setRegistrationPayment: Dispatch<SetStateAction<{ id: number; paymentReceipt: string } | null>>
}

const AdminRegistrationTable: FC<Props> = ({
  params,
  setParams,
  setIsOpen,
  registrations,
  selectedRegistrations,
  setRegistrationPayment,
  setSelectedRegistrations,
}) => {
  const handleSelectAll = () => {
    setSelectedRegistrations((prev) => {
      if (prev.length) return []
      return (registrations || []).map((el) => el.id)
    })
  }

  const handleSelectOne = (id: number) => {
    setSelectedRegistrations((prev) => {
      const isExist = prev.some((el) => el === id)
      if (isExist) return prev.filter((el) => el !== id)
      return [...prev, id]
    })
  }

  const checkIsSelected = (id: number) => {
    return !!selectedRegistrations.find((el) => el === id)
  }

  const onSortChange = (key: GetRegistrationsQuery["orderBy"]) => {
    setParams((prev) => {
      if (prev.orderBy === key) {
        switch (prev.orderType) {
          case undefined:
            return { ...prev, orderBy: key, orderType: "desc" }
          case "desc":
            return { ...prev, orderBy: key, orderType: "asc" }
          case "asc":
            return { ...prev, orderBy: undefined, orderType: undefined }
        }
      }
      return { ...prev, orderBy: key, orderType: "desc" }
    })
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="bg-surface-hover border-b border-border">
          <TableHead className="w-12 px-6 py-4">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedRegistrations.length === registrations.length && registrations.length > 0}
              className="rounded border-border bg-input text-primary focus:ring-primary cursor-pointer"
            />
          </TableHead>

          {tableColumns.map((col) => (
            <TableHead className="text-left px-6 py-4 text-sm font-semibold text-text-primary" key={col.key}>
              <span className="flex items-center inline-flex cursor-pointer" onClick={() => onSortChange(col.key)}>
                {col.label}
                {params.orderBy === col.key && (
                  <ArrowUp
                    className={cn("h-4 transition-all duration-300 ", { "rotate-180": params.orderType === "desc" })}
                  />
                )}
              </span>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {registrations.map((reg: RegistrationType) => (
          <TableRow key={reg.id} className="border-b border-border last:border-0 hover:bg-surface-hover/50">
            <TableCell className="px-2 xl:px-6 py-2 xl:py-2 text-center">
              <input
                type="checkbox"
                checked={checkIsSelected(reg.id)}
                onChange={() => handleSelectOne(reg.id)}
                className="rounded border-border bg-input text-primary focus:ring-primary cursor-pointer"
              />
            </TableCell>

            <TableCell className="px-2 xl:px-6 py-2 xl:py-2">
              <div className="font-medium text-text-primary">{reg.user.name}</div>
              <div className="text-sm text-text-secondary">{reg.user.email}</div>
            </TableCell>

            <TableCell className="px-2 xl:px-6 py-2 xl:py-4 text-text-primary max-w-xs break-words whitespace-normal">
              <span className="line-clamp-3" title={reg.course.name}>
                {reg.course.name}
              </span>
            </TableCell>

            <TableCell className="px-2 xl:px-6 py-2 xl:py-2">
              <span className="font-semibold text-primary truncate">{reg.amount} грн.</span>
            </TableCell>

            <TableCell className="px-2 xl:px-6 py-2 xl:py-2">
              <span
                className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium 
                  bg-${getPaymentColor(reg.paymentStatus)}/10 text-${getPaymentColor(reg.paymentStatus)}`}
              >
                {getPaymentStatus(reg.paymentStatus)}
              </span>
            </TableCell>

            <TableCell className="px-2 xl:px-6 py-2 xl:py-2">
              <button
                // onClick={() => toggleCertificate.mutate({ id: reg.id, enabled: !reg.certificate_enabled })}
                // disabled={toggleCertificate.isPending}
                className={`truncate cursor-pointer inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  reg.certificateEnabled
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "bg-surface-hover text-text-secondary hover:bg-border"
                }`}
              >
                {reg.certificateEnabled ? "Доступно" : "Немає доступу"}
              </button>
            </TableCell>

            <TableCell className="px-2 xl:px-6 py-2 xl:py-2">
              <button
                onClick={() => {
                  setIsOpen(true)
                  setRegistrationPayment({ id: reg.id, paymentReceipt: reg.paymentReceipt })
                }}
                className={`truncate cursor-pointer inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium transition-colors ${
                  reg.paymentReceipt
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "bg-destructive/10 text-destructive hover:bg-destructive/20"
                }`}
              >
                {reg.paymentReceipt ? "Переглянути" : "Не завантажена"}
              </button>
            </TableCell>

            <TableCell className="px-2 xl:px-6 py-2 xl:py-2">
              <span className="text-sm text-text-secondary truncate">{getDate(reg.createdAt)}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AdminRegistrationTable
