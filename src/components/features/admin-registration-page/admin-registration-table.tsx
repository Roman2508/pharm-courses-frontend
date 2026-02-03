import { ArrowUp } from "lucide-react"
import type { Dispatch, FC, SetStateAction } from "react"

import { cn } from "@/lib/utils"
import { getDate } from "@/helpers/get-date"
import { getPaymentStatus } from "@/helpers/get-payment-status"
import type { RegistrationType } from "@/types/registration.type"
import type { GetRegistrationsQuery } from "@/api/hooks/use-registration"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Props {
  params: GetRegistrationsQuery
  selectedRegistrations: number[]
  registrations: RegistrationType[]
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setParams: Dispatch<SetStateAction<GetRegistrationsQuery>>
  setSelectedRegistrations: Dispatch<SetStateAction<number[]>>
  setRegistrationPayment: Dispatch<SetStateAction<RegistrationType | null>>
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

  const onChangeSort = (key: GetRegistrationsQuery["orderBy"]) => {
    setParams((prev) => {
      if (key === prev.orderBy) {
        const orderType = prev.orderType === "asc" ? "desc" : "asc"
        return { ...prev, orderType }
      } else {
        return { ...prev, orderBy: key }
      }
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
          <TableHead className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
            <span className="flex items-center inline-flex cursor-pointer" onClick={() => onChangeSort("user.name")}>
              Студент
              {params.orderBy === "user.name" && (
                <ArrowUp
                  className={cn("h-4 transition-all duration-300 ", { "rotate-180": params.orderType === "desc" })}
                />
              )}
            </span>
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            onClick={() => onChangeSort("course.name")}
          >
            Захід
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            onClick={() => onChangeSort("amount")}
          >
            Вартість
          </TableHead>
          <TableHead className="text-left px-6 py-4 text-sm font-semibold text-text-primary">Статус оплати</TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            onClick={() => onChangeSort("certificateEnabled")}
          >
            Сертифікат
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            onClick={() => onChangeSort("certificateEnabled")}
          >
            Квитанція
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            onClick={() => onChangeSort("createdAt")}
          >
            Дата реєстрації
          </TableHead>
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
                className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                  reg.paymentStatus === "PAID"
                    ? "bg-success/10 text-success"
                    : reg.paymentStatus === "FAILED"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-secondary/10 text-secondary"
                }`}
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
                  setRegistrationPayment(reg)
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
