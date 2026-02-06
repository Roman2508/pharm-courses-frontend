import { Link } from "react-router"

import { getDate } from "@/helpers/get-date"
import { Button } from "@/components/ui/button"
import PageLoader from "@/components/custom/page-loader"
import { useDeleteCertificateTemplate, useGetAllCertificateTemplates } from "@/api/hooks/use-certificate-template"
import { Title } from "@/components/custom/title"

const AdminCertificatesPage = () => {
  const { data: certificateTemplates, isLoading } = useGetAllCertificateTemplates()

  const deleteTemplates = useDeleteCertificateTemplate()

  const onDeleteTemplate = (id: number) => {
    if (!confirm("Ви дійсно хочете видалити шаблон сертифіката")) return
    deleteTemplates.mutate(id)
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
        <Title>Шаблони сертифікатів</Title>

        <Link
          to="/admin/certificates/new"
          className="px-6 py-2 sm:py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          Створити шаблон
        </Link>
      </div>

      <div className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
        <div className="flex gap-3">
          <svg
            className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 hidden min-[450px]:inline-flex"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <div className="text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Налаштування шаблону сертифіката</p>
            <p>
              Завантажте PDF шаблон сертифіката та вкажіть точні позиції, де повинні відображатися ПІБ студента, назва
              заходу, номер сертифіката, дата заходу, та інші текстові блоки. Система згенерує персоналізовані
              сертифікати для кожного студента.
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : !!certificateTemplates?.length ? (
        <div className="grid gap-6">
          {certificateTemplates.map((template) => (
            <div key={template.id} className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm min-[500px]:text-base sm:text-xl font-bold text-text-primary mb-2">
                    {template.name}
                  </h3>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p className="truncate max-w-[200px] min-[420px]:max-w-[300px] min-[500px]:max-w-[400px] sm:max-w-[500px] md:max-w-[300px] min-[840px]:max-w-[400px]">
                      URL шаблону: {template.templateUrl}
                    </p>
                    <p>Створено: {getDate(template.createdAt)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="destructive" onClick={() => onDeleteTemplate(template.id)}>
                    Видалити
                  </Button>

                  <Link to={`/admin/certificates/${template.id}`}>
                    <Button variant="primary">Редагувати</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Шаблонів ще немає</h3>
            <p className="text-text-secondary mb-6">Створіть свій перший шаблон сертифіката.</p>
            <Link
              to="/admin/certificates/new"
              className="inline-block px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Створити шаблон
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCertificatesPage
