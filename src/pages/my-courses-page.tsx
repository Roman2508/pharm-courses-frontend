import { useSession } from "@/api/auth-client"
import { Title } from "@/components/custom/title"
import PageLoader from "@/components/custom/page-loader"
import MyCourseCard from "@/components/common/my-course-card"
import { useUserRegistrations } from "@/api/hooks/use-registration"

const MyCoursesPage = () => {
  const { data: session } = useSession()

  const { data: registrations, isLoading } = useUserRegistrations(session?.user?.id)

  return (
    <div className="my-16">
      <Title className="mb-12 mx-auto max-w-7xl px-4">Мої заходи</Title>

      {isLoading ? (
        <PageLoader />
      ) : !!registrations?.length && session ? (
        <div className="grid grid-cols-1 gap-2 mb-24 max-w-7xl mx-auto px-4">
          {registrations.map((registration) => (
            <MyCourseCard
              key={registration.id}
              userId={session.user.id}
              registration={registration}
              userName={session.user.name}
            />
          ))}
        </div>
      ) : (
        <div className="container max-w-7xl mx-auto px-4">
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
