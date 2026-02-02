import type { FC } from "react";

import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { getDate } from "@/helpers/get-date";
import type { UserType } from "@/types/user.type";

interface Props {
  users: UserType[];
  onEditUser: (user: UserType) => void;
}

const AdminUserPageTable: FC<Props> = ({ users, onEditUser }) => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="bg-surface-hover border-b border-border">
          <TableHead className="text-left px-6 py-4 text-sm font-semibold text-text-primary">
            <span
              className="flex items-center inline-flex cursor-pointer" /* onClick={() => onChangeSort('user.name')} */
            >
              ПІБ
              {/* {params.orderBy === 'user.name' && (
                <ArrowUp
                  className={cn('h-4 transition-all duration-300 ', { 'rotate-180': params.orderType === 'desc' })}
                />
              )} */}
            </span>
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            /* onClick={() => onChangeSort('course.name')} */
          >
            Email
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            /* onClick={() => onChangeSort('amount')} */
          >
            Телефон
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            /* onClick={() => onChangeSort('certificateEnabled')} */
          >
            Дата реєстрації
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            /* onClick={() => onChangeSort('certificateEnabled')} */
          >
            Роль
          </TableHead>

          <TableHead
            className="text-left px-6 py-4 text-sm font-semibold text-text-primary"
            /* onClick={() => onChangeSort('createdAt')} */
          >
            Дії
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            className="border-b border-border last:border-0 hover:bg-surface-hover/50"
          >
            <TableCell className="px-6 py-2">
              <div className="text-sm font-medium text-text-primary">
                {user.name}
              </div>
            </TableCell>

            <TableCell className="px-6 py-4 text-text-primary max-w-xs break-words whitespace-normal">
              <div className="text-sm text-text-secondary">{user.email}</div>
            </TableCell>

            <TableCell className="px-6 py-2">
              <div className="text-sm text-text-secondary">
                {user.phone || "-"}
              </div>
            </TableCell>

            <TableCell className="px-6 py-2">
              <span className="text-sm text-text-secondary truncate">
                {getDate(user.createdAt)}
              </span>
            </TableCell>

            <TableCell className="px-6 py-2">
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

            <TableCell className="px-6 py-2">
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
  );
};

export default AdminUserPageTable;
