import { Title } from "@/components/custom/title"
import MyCourseCard from "@/components/common/my-course-card"
import { useUserRegistrations } from "@/api/hooks/use-registration"
import { useSession } from "@/api/auth-client"

const MyCoursesPage = () => {
  const { data: session } = useSession()

  const { data: registrations, isLoading } = useUserRegistrations(session?.user?.id)

  if (isLoading) {
    return <div>Завантаження...</div>
  }

  return (
    <div className="my-16">
      <Title className="mb-12 mx-auto max-w-7xl px-4">Мої заходи</Title>

      <div className="grid grid-cols-1 gap-2 mb-24 max-w-7xl mx-auto px-4">
        {registrations?.map((registration) => (
          <MyCourseCard key={registration.id} {...registration} />
        ))}
      </div>
    </div>
  )
}

export default MyCoursesPage
