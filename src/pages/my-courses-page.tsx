import { useState } from "react"

import { useSession } from "@/api/auth-client"
import { Title } from "@/components/custom/title"
import type { UserType } from "@/types/user.type"
import PageLoader from "@/components/custom/page-loader"
import { Pagination } from "@/components/custom/pagination"
import MyCourseCard from "@/components/common/my-course-card"
import { useUserRegistrations } from "@/api/hooks/use-registration"

const MyCoursesPage = () => {
  const [params, setParams] = useState({ page: 1, limit: 20 })

  const { data: session } = useSession()

  const { data: { data: registrations, totalCount } = { data: [], totalCount: 0 }, isLoading } =
    useUserRegistrations(params)

  const handleChangeParams = (key: keyof typeof params, value: any) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="my-16">
      <div className="flex items-center justify-between gap-6 sm:gap-0 flex-col sm:flex-row px-4 mb-12 max-w-[1500px] mx-auto">
        <Title>Мої заходи</Title>

        <Pagination
          total={totalCount}
          limit={params.limit}
          page={params.page}
          handleChangeParams={handleChangeParams}
        />
      </div>

      {isLoading ? (
        <PageLoader />
      ) : !!registrations?.length && session ? (
        <div className="grid grid-cols-1 gap-2 mb-24 max-w-[1500px] mx-auto px-4">
          {registrations.map((registration) => (
            <MyCourseCard
              key={registration.id}
              registration={registration}
              user={session?.user as unknown as UserType}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-[1500px] mx-auto px-4">
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
              <h3 className="text-xl font-semibold text-text-primary mb-2">Немає заходів</h3>
              <p className="text-text-secondary">
                Поки що ви не зареєстровані на жоден захід. Перейдіть до розділу «Заходи», оберіть цікавий захід і
                натисніть Зареєструватись
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyCoursesPage
