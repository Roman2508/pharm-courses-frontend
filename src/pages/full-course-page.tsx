import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { BookOpen, Calendar, ChevronLeft, Users } from "lucide-react"

import { getDate } from "@/helpers/get-date"
import { useSession } from "@/api/auth-client"
import { Button } from "@/components/ui/button"
import type { UserType } from "@/types/user.type"
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
  ARCHIVED: "bg-destructive/10 text-destructive border-destructive/20",
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

  const { data: registration, isLoading: isRegistrationLoading } = useCurrentRegistration(course?.id)

  const [isOpen, setIsOpen] = useState(false)

  if (isLoading) {
    return <PageLoader />
  }

  if (!course) {
    return (
      <div className="min-h-[calc(100vh-150px)] bg-background flex items-center justify-center">
        <div className="max-w-[1500px] mx-auto px-4 py-12 text-center">
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

  const isEndDate = course.endDate && course.endDate !== course.startDate

  return (
    <>
      <PaymentModal open={isOpen} onOpenChange={setIsOpen} registration={registration} />

      <div className="max-w-[1500px] mx-auto px-0 sm:px-4 py-12 md:py-16">
        <Button variant="ghost" className="mb-8 gap-2" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4" />
          Повернутись назад
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course description */}
            <div className="bg-surface rounded-2xl border border-border p-6 xl:p-8">
              <div>
                <h1
                  className={
                    "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-text-primary mb-6 text-balance leading-tight " +
                    "text-center lg:text-left"
                  }
                >
                  {course.name}
                </h1>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`min-w-9 sm:w-10 h-9 sm:h-10 rounded-full bg-${color}/10 flex items-center justify-center`}
                >
                  <BookOpen className={`w-4 sm:w-5 h-4 sm:h-5 text-${color}`} />
                </div>
                <h2 className={`text-sm sm:text-base lg:text-lg xl:text-xl leading-[1.3] font-bold text-${color}`}>
                  Цільова аудиторія: {getTargetAudience(course.targetAudience)}
                </h2>
              </div>

              {course.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: course.description }}
                  className={
                    "prose prose-lg max-w-none text-text-secondary leading-relaxed max-[500px]:text-sm " +
                    "[&>ol]:list-decimal [&>ol]:ml-4 [&>h1]:text-2xl [&>h2]:text-xl [&>h3]:text-lg"
                  }
                />
              ) : (
                <p className="text-text-secondary italic">Опис відсутній</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-3xl border border-border p-6 xl:p-8 sticky top-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-base xl:text-lg">Вартість участі:</p>
                  <div className="flex gap-1 items-end">
                    <div className="text-2xl xl:text-3xl font-bold text-primary">{course.price}</div>
                    <div className="text-lg text-text-muted">грн.</div>
                  </div>
                </div>

                <span
                  className={`inline-flex items-center px-2 xl:px-4 py-1 xl:py-2 rounded-full text-[12px] xl:text-sm font-medium border ${
                    course.registrationOpen === "OPEN" ? statusColors[course.status] : statusColors["ARCHIVED"]
                  }`}
                >
                  {course.registrationOpen === "OPEN" ? statusLabels[course.status] : "Реєстрація закрита"}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-3 xl:p-4 rounded-xl bg-background border border-border">
                  <div className="w-9 xl:w-10 h-9 xl:h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 xl:w-5 h-4 xl:h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-muted mb-0 xl:mb-1">Дата проведення</div>
                    <div className="font-medium text-text-primary text-sm xl:text-base">
                      {isEndDate && <span className="pr-3">з</span>}

                      {getDate(course.startDate)}
                      {isEndDate && (
                        <>
                          <br />
                          <span>по</span> {getDate(course.endDate)}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {!!course.maxMembers && (
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                    <div className="w-9 xl:w-10 h-9 xl:h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 xl:w-5 h-4 xl:h-5 text-secondary" />
                    </div>

                    <div>
                      <div className="text-xs text-text-muted mb-0 xl:mb-1">Макс. учасників</div>
                      <div className="font-medium text-text-primary text-sm xl:text-base">{course.maxMembers}</div>
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
                registration={registration}
                isLoading={isRegistrationLoading}
                user={session?.user as unknown as UserType}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FullCoursePage
