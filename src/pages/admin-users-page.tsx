import { useEffect, useState } from "react"

import { authClient } from "@/api/auth-client"
import type { UserType } from "@/types/user.type"
import { Title } from "@/components/custom/title"
import FormField from "@/components/custom/form-field"
import PageLoader from "@/components/custom/page-loader"
import { Pagination } from "@/components/custom/pagination"
import AdminUsersDialog from "@/components/features/admin-users-page/admin-users-dialog"
import AdminUserPageTable from "@/components/features/admin-users-page/admin-user-page-table"

type GetUsersQuery = {
  page: number
  limit: number
  search?: string
  orderType?: "asc" | "desc"
  orderBy?: "name" | "email" | "phone" | "createdAt" | "role"
}

const initialParams = {
  page: 1,
  limit: 20,
  search: "",
  orderBy: "createdAt",
  orderType: "desc",
} as const

const AdminUsersPage = () => {
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<UserType[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [params, setParams] = useState<GetUsersQuery>(initialParams)
  const [editedUser, setEditedUser] = useState<UserType | null>(null)

  const onEditUser = (user: UserType) => {
    setEditedUser(user)
    setIsDialogOpen(true)
  }

  const handleChangeParams = (key: keyof GetUsersQuery, value: any) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const responce = await authClient.admin.listUsers({
          query: {
            limit: params.limit,
            offset: (params.page - 1) * params.limit,
            searchValue: params.search,
            searchField: "name",
          },
        })
        const users = responce.data ? (responce.data.users as UserType[]) : []
        setUsers(users)
        const totalPages = responce.data ? responce.data.total : 1
        setTotalPages(totalPages)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [params])

  return (
    <>
      <AdminUsersDialog
        open={isDialogOpen}
        editedUser={editedUser}
        setEditedUser={setEditedUser}
        onOpenChange={setIsDialogOpen}
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Title>Управління користувачами</Title>
          </div>

          <div className="flex items-center gap-2">
            <Pagination
              total={totalPages}
              page={params.page}
              limit={params.limit}
              handleChangeParams={handleChangeParams}
            />

            <FormField
              name="name"
              type="text"
              defaultValue="0"
              className="w-50 !h-9"
              placeholder="Пошук..."
              value={params.search ? params.search : ""}
              onChange={(value) => handleChangeParams("search", value)}
            />
          </div>
        </div>

        {isLoading ? (
          <PageLoader />
        ) : users && !!users.length ? (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <AdminUserPageTable users={users} onEditUser={onEditUser} />
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-surface rounded-2xl border border-border">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-surface-hover mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">Немає користувачів</h3>
              <p className="text-text-secondary">Користувачів не знайдено. Змініть фільтри та спробуйте ще раз</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminUsersPage
