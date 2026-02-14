import { toast } from "sonner"
import { useParams } from "react-router"
import { Plus, Trash } from "lucide-react"
import { useEffect, useState } from "react"

import {
  useAllRegistrations,
  useUpdateRegistration,
  useRemoveManyRegistrations,
  type GetRegistrationsQuery,
} from "@/api/hooks/use-registration"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Title } from "@/components/custom/title"
import FormField from "@/components/custom/form-field"
import PageLoader from "@/components/custom/page-loader"
import { Pagination } from "@/components/custom/pagination"
import { useCourses, useFullCourse } from "@/api/hooks/use-courses"
import PaymentReceiptDialog from "@/components/features/admin-registration-page/payment-receipt-dialog"
import AdminRegistrationTable from "@/components/features/admin-registration-page/admin-registration-table"
import CreateRegistrationDialog from "@/components/features/admin-registration-page/create-registration-dialog"
import DownloadRegistrationsButton from "@/components/features/admin-registration-page/download-registrations-button"

const initialParams = { page: 1, limit: 20, orderBy: "createdAt", orderType: "desc" } as const

const AdminRegistrationsPage = () => {
  const pageParams = useParams()

  const [paymentDialogIsOpen, setPaymentDialogIsOpen] = useState(false)
  const [createRegistrationDialogIsOpen, setCreateRegistrationDialogIsOpen] = useState(false)

  const [params, setParams] = useState<GetRegistrationsQuery>(initialParams)
  const [selectedRegistrations, setSelectedRegistrations] = useState<number[]>([])
  const [registrationPayment, setRegistrationPayment] = useState<{ id: number; paymentReceipt: string } | null>(null)

  // В фільтрі реєстрацій можна вибрати лише заходи, які є запланованими
  const { data: courses } = useCourses("PLANNED")
  // const { data: courses } = useAllCourses()

  const { data: fullCourse } = useFullCourse(pageParams.id)
  const { data: { data: registrations, totalCount } = { data: [], totalCount: 0 }, isLoading } =
    useAllRegistrations(params)

  const updateEnabled = useUpdateRegistration(params)
  const removeRegistrations = useRemoveManyRegistrations(params)

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

  const onRemoveRegistrations = () => {
    if (!selectedRegistrations || !selectedRegistrations.length) {
      toast.warning("Реєстрації не вибрано")
      return
    }
    if (!window.confirm("Видалити обрані реєстрації?")) return
    removeRegistrations.mutate(selectedRegistrations)
  }

  useEffect(() => {
    if (pageParams.id) {
      handleChangeParams("courseId", pageParams.id)
    }
  }, [pageParams.id])

  return (
    <>
      <PaymentReceiptDialog
        open={paymentDialogIsOpen}
        onOpenChange={setPaymentDialogIsOpen}
        registrationPayment={registrationPayment}
        setRegistrationPayment={setRegistrationPayment}
      />

      <CreateRegistrationDialog
        open={createRegistrationDialogIsOpen}
        onOpenChange={setCreateRegistrationDialogIsOpen}
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex gap-4 items-center justify-between mb-8 flex-col lg:flex-row">
          <Title>Всі реєстрації</Title>

          <div
            className={cn("flex items-center gap-2 flex-col sm:flex-row", {
              "items-center lg:items-end sm:flex-col 2xl:items-center 2xl:justify-center 2xl:flex-row":
                selectedRegistrations.length,
            })}
          >
            <div className="flex gap-2 items-center">
              {!!selectedRegistrations.length && (
                <>
                  <Button
                    variant="success"
                    className="rounded-xl h-9"
                    disabled={updateEnabled.isPending}
                    onClick={() => updateEnabled.mutate({ ids: selectedRegistrations, certificateEnabled: true })}
                  >
                    Відкрити доступ ({selectedRegistrations.length})
                  </Button>

                  <Button
                    variant="destructive"
                    className="rounded-xl h-9"
                    disabled={updateEnabled.isPending}
                    onClick={() => updateEnabled.mutate({ ids: selectedRegistrations, certificateEnabled: false })}
                  >
                    Закрити доступ
                  </Button>
                </>
              )}
            </div>

            <div className="flex gap-2 items-center flex-col sm:flex-row">
              <div className="flex gap-2 items-center">
                <Button
                  size="sm"
                  variant="destructive"
                  className="rounded-lg"
                  title="Видалити реєстрацію"
                  onClick={onRemoveRegistrations}
                  disabled={removeRegistrations.isPending}
                >
                  <Trash />
                </Button>

                <DownloadRegistrationsButton registrations={selectedRegistrations} />

                <Button
                  size="sm"
                  className="rounded-lg"
                  title="Створити нову реєстрацію"
                  onClick={() => setCreateRegistrationDialogIsOpen(true)}
                >
                  <Plus />
                </Button>
              </div>

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
        </div>

        {!!fullCourse && (
          <h2 className="font-bold text-lg mb-4 text-center">{`Реєстрації на захід: ${fullCourse?.name}`}</h2>
        )}

        {isLoading ? (
          <PageLoader />
        ) : registrations?.length ? (
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className={cn("overflow-x-auto", { "opacity-[0.5]": removeRegistrations.isPending })}>
              <AdminRegistrationTable
                params={params}
                setParams={setParams}
                registrations={registrations}
                setIsOpen={setPaymentDialogIsOpen}
                selectedRegistrations={selectedRegistrations}
                setRegistrationPayment={setRegistrationPayment}
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
