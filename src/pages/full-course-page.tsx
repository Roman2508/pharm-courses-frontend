import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { BookOpen, Calendar, ChevronLeft, Users } from "lucide-react"

import { getDate } from "@/helpers/get-date"
import { useSession } from "@/api/auth-client"
import { Button } from "@/components/ui/button"
import { useFullCourse } from "@/api/hooks/use-courses"
import PageLoader from "@/components/custom/page-loader"
import { PaymentModal } from "@/components/common/payment-modal"
import { getTargetAudience } from "@/helpers/get-target-audience"
import { CourseActions } from "@/components/common/course-actions"
import { useCurrentRegistration } from "@/api/hooks/use-registration"
import { FullCoursePagePaymentStatus } from "@/components/features/full-course-page/full-course-page-payment-status"

const statusColors = {
  PLANNED: "bg-success/10 text-success border-success/20",
  DRAFT: "bg-text-muted/10 text-text-muted border-text-muted/20",
  ARCHIVED: "bg-text-muted/10 text-text-muted border-text-muted/20",
}
const statusLabels = {
  PLANNED: "Очікується",
  DRAFT: "Закрито",
  ARCHIVED: "Архів",
}

const FullCoursePage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const { data: course, isLoading } = useFullCourse(params?.id)

  const { data: session } = useSession()

  const { data: registration, isLoading: isRegistrationLoading } = useCurrentRegistration(session?.user.id, course?.id)

  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return <PageLoader />
  }

  if (!course) {
    return (
      <div className="min-h-[calc(100vh-150px)] bg-background flex items-center justify-center">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Захід не знайдено</h1>
          <Button onClick={() => navigate("/")}>Повернутися на головну</Button>
        </div>
      </div>
    )
  }

  const color =
    course.targetAudience === "PHARMACISTS"
      ? "primary"
      : course.targetAudience === "LABORATORY_ASSISTANTS"
        ? "success"
        : "secondary"

  return (
    <>
      <PaymentModal open={isOpen} onOpenChange={setIsOpen} registration={registration} />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <Button variant="ghost" className="mb-8 gap-2" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4" />
          Повернутись назад
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course description */}
            <div className="bg-surface rounded-2xl border border-border p-8 md:p-8">
              <div>
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-6 text-balance leading-tight">
                  {course.name}
                </h1>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-full bg-${color}/10 flex items-center justify-center`}>
                  <BookOpen className={`w-5 h-5 text-${color}`} />
                </div>
                <h2 className={`text-xl font-bold text-${color}`}>
                  Цільова аудиторія: {getTargetAudience(course.targetAudience)}
                </h2>
              </div>

              {course.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: course.description }}
                  className="prose prose-lg max-w-none text-text-secondary leading-relaxed"
                />
              ) : (
                <p className="text-text-secondary italic">Опис відсутній</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-3xl border border-border p-6 md:p-8 sticky top-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-lg">Вартість участі:</p>
                  <div className="flex gap-1 items-end">
                    <div className="text-3xl font-bold text-primary">{course.price}</div>
                    <div className="text-lg text-text-muted">грн.</div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${
                    statusColors[course.status]
                  }`}
                >
                  {statusLabels[course.status]}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-1">Дата проведення</div>
                    <div className="font-medium text-text-primary">
                      {getDate(course.startDate)}
                      {course.endDate && course.endDate !== course.startDate && <> - {getDate(course.endDate)}</>}
                    </div>
                  </div>
                </div>

                {!!course.maxMembers && (
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <div className="text-xs text-text-muted mb-1">Макс. учасників</div>
                      <div className="font-medium text-text-primary">{course.maxMembers}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Registration status */}
              {registration && <FullCoursePagePaymentStatus registration={registration} />}

              {/* Action buttons */}
              <CourseActions
                course={course}
                courseId={course.id}
                setIsOpen={setIsOpen}
                amount={course.price}
                userId={session?.user.id}
                registration={registration}
                userName={session?.user.name}
                isLoading={isRegistrationLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FullCoursePage
