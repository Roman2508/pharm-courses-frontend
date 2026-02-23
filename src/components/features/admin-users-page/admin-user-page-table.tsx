import { ArrowUp } from "lucide-react"
import type { Dispatch, FC, SetStateAction } from "react"

import { cn } from "@/lib/utils"
import { getDate } from "@/helpers/get-date"
import type { UserType } from "@/types/user.type"
import type { GetUsersQuery } from "@/pages/admin-users-page"
import { Table, TableRow, TableBody, TableCell, TableHead, TableHeader } from "@/components/ui/table"

const tableColumns = [
  { label: "ПІБ", key: "name" },
  { label: "Email", key: "email" },
  { label: "Телефон", key: "phone" },
  { label: "Дата реєстрації", key: "createdAt" },
  { label: "Роль", key: "role" },
] as const

interface Props {
  users: UserType[]
  params: GetUsersQuery
  onEditUser: (user: UserType) => void
  setParams: Dispatch<SetStateAction<GetUsersQuery>>
}

const AdminUserPageTable: FC<Props> = ({ users, onEditUser, params, setParams }) => {
  const onSortChange = (key: GetUsersQuery["orderBy"]) => {
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
          {tableColumns.map((col) => (
            <TableHead className="text-left px-2 lg:px-4 py-4 text-sm font-semibold text-text-primary" key={col.key}>
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

          <TableHead className="text-left px-2 lg:px-4 py-4 text-sm font-semibold text-text-primary">Дії</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} className="border-b border-border last:border-0 hover:bg-surface-hover/50">
            <TableCell className="!text-[12px] !lg:text-base px-2 lg:px-4 py-2">
              <div className="text-sm font-medium text-text-primary">{user.name}</div>
            </TableCell>

            <TableCell className="!text-[12px] !lg:text-base px-2 lg:px-4 py-4 text-text-primary max-w-xs break-words whitespace-normal">
              <div className="text-sm text-text-secondary">{user.email}</div>
            </TableCell>

            <TableCell className="!text-[12px] !lg:text-base px-2 lg:px-4 py-2">
              <div className="text-sm text-text-secondary">{user.phone || "-"}</div>
            </TableCell>

            <TableCell className="!text-[12px] !lg:text-base px-2 lg:px-4 py-2">
              <span className="text-sm text-text-secondary truncate">{getDate(user.createdAt)}</span>
            </TableCell>

            <TableCell className="!text-[12px] !lg:text-base px-2 lg:px-4 py-2">
              {user.role === "user" ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary border border-secondary/20">
                  Користувач
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  Адміністратор
                </span>
              )}
            </TableCell>

            <TableCell className="!text-[12px] !lg:text-base px-2 lg:px-4 py-2">
              <button
                onClick={() => onEditUser(user)}
                className="cursor-pointer text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Редагувати
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AdminUserPageTable
