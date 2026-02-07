import { Link } from "react-router"
import type { Dispatch, FC, SetStateAction } from "react"

import { Button } from "../ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { UserType } from "@/types/user.type"
import type { CourseType } from "@/types/course.type"
import { useCoursesCountRegistrations, useCreateRegistration } from "@/api/hooks/use-registration"
import { CertificateDownloadButton } from "../features/full-course-page/certificate-download-button"

interface Props {
  user?: UserType
  amount?: number
  courseId?: number
  isLoading: boolean
  registration: any
  setIsOpen: Dispatch<SetStateAction<boolean>>
  course?: CourseType
  userName?: string
  className?: string
  size?: "lg" | "sm"
}

export const CourseActions: FC<Props> = ({
  user,
  amount,
  courseId,
  isLoading,
  setIsOpen,
  registration,
  course,
  size = "lg",
  className = "w-full",
}) => {
  const { data: registrationCount } = useCoursesCountRegistrations(courseId)

  const { mutate: createRegistration, isPending: isCreateRegistrationPending } = useCreateRegistration()

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner className="w-10 h-10 text-primary" />
      </div>
    )
  }

  if (!user) {
    if (course && typeof course.maxMembers === "number" && registrationCount) {
      if (course.maxMembers >= registrationCount) {
        return (
          <Button className={className} size={size} disabled>
            Всі місця зайняті
          </Button>
        )
      }
    }

    return (
      <Link to="/auth/login">
        <Button className={className} size={size}>
          Авторизуйтесь для реєстрації
        </Button>
      </Link>
    )
  }
  // return (
  //   <>
  //     {course && userName && (
  //       <CertificateDownloadButton course={course} registration={registration} userName={userName} />
  //     )}
  //   </>
  // )

  if (!registration && courseId && amount) {
    // Закінчились доступні реєстрації
    if (course && typeof course.maxMembers === "number" && registrationCount) {
      if (course.maxMembers >= registrationCount) {
        return (
          <Button className={className} size={size} disabled>
            Всі місця зайняті
          </Button>
        )
      }
    }

    const requiredFields = ["region_city", "education", "specialty", "workplace", "jobTitle"] as const

    const isSomeRequiredFildAreEmpty = requiredFields.every((field) => {
      const value = user[field]
      return value !== null && value !== undefined && value !== ""
    })

    // Якщо юзер хоче зареєструватись на захід, в нього мають бути заповненими всі обовязкові поля
    if (isSomeRequiredFildAreEmpty) {
      //
    }

    // Немає реєстрації
    return (
      <Button
        size={size}
        className={className}
        disabled={isCreateRegistrationPending}
        onClick={() => createRegistration({ userId: user.id, courseId, amount }, { onSuccess: () => setIsOpen(true) })}
      >
        Зареєструватись
      </Button>
    )
  }

  if (registration) {
    //
    // Реєстрація є, квитанцію НЕ завантажено завантажено
    if (registration.paymentStatus !== "PAID" && registration.paymentStatus !== "PENDING") {
      return (
        <Button size={size} className={className} onClick={() => setIsOpen(true)}>
          Оплатити
        </Button>
      )
    }

    //
    // Реєстрація є, квитанцію завантажено але ще не перевірено
    if (registration.paymentStatus === "PENDING") {
      return (
        <Button size={size} className={className} onClick={() => setIsOpen(true)}>
          Завантажити іншу квитанцію
        </Button>
      )
    }

    //
    // Реєстрація є, статус - оплачено. Сертифікат доступний для завантаження
    if (registration.paymentStatus === "PAID" && registration.certificateEnabled) {
      return (
        <>
          <div className="mt-3 text-sm text-success font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Сертифікат доступний
          </div>

          {course && user && (
            <CertificateDownloadButton
              course={course}
              userName={user.name}
              className={className}
              registration={registration}
            />
          )}
        </>
      )
    }

    //
    // Реєстрація є, статус - оплачено. Сертифікат НЕ доступний для завантаження
    if (registration.paymentStatus === "PAID" && !registration.certificateEnabled) {
      return (
        <div className="mt-3 text-sm text-success font-medium flex items-center gap-2">
          <span className="border border-success/50 rounded-xl p-4 bg-success/10 text-center">
            Після завершення заходу, тут ви зможете завантажити сертифікат про участь
          </span>
        </div>
      )
    }
  }

  return null
}
