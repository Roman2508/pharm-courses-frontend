import { useParams } from "react-router"
import { useEffect, useState } from "react"

import FormField from "@/components/custom/form-field"
import PageLoader from "@/components/custom/page-loader"
import { Pagination } from "@/components/custom/pagination"
import { useAllCourses, useFullCourse } from "@/api/hooks/use-courses"
import AdminRegistrationTable from "@/components/features/admin-registration-page/admin-registration-table"
import { useAllRegistrations, useUpdateRegistration, type GetRegistrationsQuery } from "@/api/hooks/use-registration"
import PaymentReceiptDialog from "@/components/features/admin-registration-page/payment-receipt-dialog"

const initialParams = { page: 1, limit: 20, orderBy: "createdAt", orderType: "desc" } as const

const AdminRegistrationsPage = () => {
  const pageParams = useParams()

  const [isOpen, setIsOpen] = useState(false)
  const [params, setParams] = useState<GetRegistrationsQuery>(initialParams)
  const [selectedRegistrations, setSelectedRegistrations] = useState<number[]>([])

  const { data: courses } = useAllCourses()
  const { data: fullCourse } = useFullCourse(pageParams.id)
  const { data: { data: registrations, totalCount } = { data: [], totalCount: 0 }, isLoading } =
    useAllRegistrations(params)
  const updateEnabled = useUpdateRegistration(params)

  const handleChangeParams = (key: keyof GetRegistrationsQuery, value: any) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const handleChangeCourseId = (id: string) => {
    if (+id) {
      handleChangeParams("courseId", +id)
    } else {
      handleChangeParams("courseId", undefined)
    }
  }

  useEffect(() => {
    if (pageParams.id) {
      handleChangeParams("courseId", pageParams.id)
    }
  }, [pageParams.id])

  return (
    <>
      <PaymentReceiptDialog open={isOpen} onOpenChange={setIsOpen} />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
            <h1 className="text-3xl font-bold text-text-primary">Всі реєстрації</h1>
          </div>

          <div className="flex items-center gap-2">
            {!!selectedRegistrations.length && (
              <>
                <button
                  disabled={updateEnabled.isPending}
                  onClick={() => updateEnabled.mutate({ id: selectedRegistrations[0], certificateEnabled: true })}
                  className="cursor-pointer px-4 h-9 rounded-xl bg-success/10 text-success font-medium hover:bg-success/20 transition-colors"
                >
                  Відкрити доступ ({selectedRegistrations.length})
                </button>
                <button
                  disabled={updateEnabled.isPending}
                  onClick={() => updateEnabled.mutate({ id: selectedRegistrations[0], certificateEnabled: false })}
                  className="cursor-pointer px-4 h-9 rounded-xl bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
                >
                  Закрити доступ
                </button>
              </>
            )}

            <Pagination
              total={totalCount}
              limit={params.limit}
              page={params.page}
              handleChangeParams={handleChangeParams}
            />

            {!pageParams.id && (
              <FormField
                label=""
                name="name"
                type="select"
                defaultValue="0"
                placeholder="Захід"
                className="w-60 !h-9"
                value={String(params.courseId)}
                onChange={handleChangeCourseId}
                items={[
                  { label: "Всі", value: "0" },
                  ...(courses ? courses.map((el) => ({ label: el.name, value: String(el.id) })) : []),
                ]}
              />
            )}
          </div>
        </div>

        {fullCourse ? (
          <h2 className="font-bold text-lg mb-4 text-center">{`Реєстрації на захід: ${fullCourse?.name}`}</h2>
        ) : (
          ""
        )}

        {isLoading ? (
          <PageLoader />
        ) : registrations?.length ? (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <AdminRegistrationTable
                params={params}
                setParams={setParams}
                setIsOpen={setIsOpen}
                registrations={registrations}
                selectedRegistrations={selectedRegistrations}
                setSelectedRegistrations={setSelectedRegistrations}
              />
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
              <h3 className="text-xl font-semibold text-text-primary mb-2">Немає реєстрацій</h3>
              <p className="text-text-secondary">Реєстрації з'являться тут, коли студенти запишуться на заходи.</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AdminRegistrationsPage
