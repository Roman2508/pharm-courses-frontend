import { BookSearch, Captions, LayoutDashboard, Users } from 'lucide-react'

import { Title } from '@/components/custom/title'
import AdminActionCard from '@/components/common/admin-action-card'

const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <Title className="mb-12">Адміністратрування</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <AdminActionCard
          link="/admin/courses"
          icon={<LayoutDashboard className="w-7 h-7 text-primary" />}
          title="Управління курсами"
          description="Створювати та налаштувати курси"
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

      <div className="bg-surface rounded-2xl border border-border p-8">
        <h2 className="text-xl font-bold text-text-primary mb-6">Останні реєстрації</h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((reg) => {
            return (
              <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex gap-4">
                  <div>
                    <div className="font-medium">
                      <span className="font-bold">Студент:</span>{' '}
                      <span className="text-text-primary">{'reg.user?.name'}</span>
                    </div>

                    <div className="text-medium">
                      <span className="font-bold">Захід:</span>{' '}
                      <span className="text-text-primary">{'reg.course?.name'}</span>
                    </div>

                    <div className="text-sm mt-0.5 text-text-secondary">Дата реєстрації: 28 жовтня 2026 - 12:30</div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      'PAID' === 'PAID' ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'
                    }`}
                  >
                    {'PAID' === 'PAID' ? 'Оплачено' : 'Очікує оплати'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
