import { useState } from "react"
import { BookSearch, Captions, LayoutDashboard, Users } from "lucide-react"

import { Title } from "@/components/custom/title"
import PageLoader from "@/components/custom/page-loader"
import { useAllRegistrations } from "@/api/hooks/use-registration"
import RegistrationItem from "@/components/common/registration-item"
import AdminActionCard from "@/components/features/admin-page/admin-action-card"
import PaymentReceiptDialog from "@/components/features/admin-registration-page/payment-receipt-dialog"

const AdminPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [registrationPayment, setRegistrationPayment] = useState<{ id: number; paymentReceipt: string } | null>(null)

  const { data: { data: lastRegistrations } = { data: [] }, isLoading } = useAllRegistrations({
    limit: 20,
    page: 1,
    orderBy: "createdAt",
    orderType: "desc",
  })

  return (
    <>
      <PaymentReceiptDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        registrationPayment={registrationPayment}
        setRegistrationPayment={setRegistrationPayment}
      />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <Title className="mb-12">Адміністрування</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <AdminActionCard
            link="/admin/courses"
            icon={<LayoutDashboard className="w-7 h-7 text-primary" />}
            title="Управління заходами"
            description="Створювати та налаштувати заходи"
            color="primary"
          />

          <AdminActionCard
            link="/admin/registrations"
            icon={<BookSearch className="w-7 h-7 text-secondary" />}
            title="Переглянути реєстрації"
            description="Відстежувати реєстрації та платежі студентів"
            color="secondary"
          />

          <AdminActionCard
            link="/admin/certificates"
            icon={<Captions className="w-7 h-7 text-secondary" />}
            title="Управління сертифікатами"
            description="Створювати та налаштовувати шаблони сертифікатів"
            color="success"
          />

          <AdminActionCard
            link="/admin/users"
            icon={<Users className="w-7 h-7 text-warning" />}
            title="Управління користувачами"
            description="Створювати, оновити або видалити користувача"
            color="warning"
          />
        </div>

        <div className="bg-surface rounded-2xl border border-border p-4 sm:p-6 md:p-8">
          <h2 className="text-xl font-bold text-text-primary mb-6">Останні реєстрації</h2>

          {isLoading ? (
            <PageLoader />
          ) : (
            <div className="space-y-4 text-sm sm:text-base">
              {(lastRegistrations || []).map((registration) => {
                return (
                  <RegistrationItem
                    key={registration.id}
                    setIsOpen={setIsOpen}
                    registration={registration}
                    setRegistrationPayment={setRegistrationPayment}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default AdminPage
