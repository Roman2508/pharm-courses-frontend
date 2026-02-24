import { Link } from "react-router"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"

import { Button } from "../ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { UserType } from "@/types/user.type"
import type { CourseType } from "@/types/course.type"
import AdminUsersDialog from "../features/admin-users-page/admin-users-dialog"
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
  course,
  courseId,
  isLoading,
  setIsOpen,
  registration,
  size = "lg",
  className = "w-full",
}) => {
  const { data: registrationCount } = useCoursesCountRegistrations(courseId)

  const { mutate: createRegistration, isPending: isCreateRegistrationPending } = useCreateRegistration()

  const [isModalOpen, setIsModalOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner className="w-10 h-10 text-primary" />
      </div>
    )
  }

  // Реєстрацію на курс закрито
  if (course?.registrationOpen === "CLOSE") return

  // Закінчились доступні реєстрації
  if (course && typeof course.maxMembers === "number" && registrationCount) {
    if (!!course.maxMembers && course.maxMembers <= registrationCount) {
      return (
        <Button className={className} size={size} disabled>
          Всі місця зайняті
        </Button>
      )
    }
  }

  if (!user) {
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
  //     {course && user.name && (
  //       <div className="max-w-[260px]">
  //         <CertificateDownloadButton course={course} registration={registration} userName={user.name} size="sm" />
  //       </div>
  //     )}
  //   </>
  // )

  if (!registration && courseId && amount) {
    // Закінчились доступні реєстрації
    // if (course && typeof course.maxMembers === "number" && registrationCount) {
    //   if (course.maxMembers <= registrationCount) {
    //     return (
    //       <Button className={className} size={size} disabled>
    //         Всі місця зайняті
    //       </Button>
    //     )
    //   }
    // }

    const requiredFields = ["region_city", "education", "specialty", "workplace", "jobTitle"] as const

    const isAllRequiredFieldsFilled = requiredFields.every((field) => {
      const value = user[field]
      if (typeof value === "string") return value.trim().length > 0
      return value !== null && value !== undefined
    })

    // Немає реєстрації
    return (
      <>
        <AdminUsersDialog
          editedUser={user}
          open={isModalOpen}
          setEditedUser={() => {}}
          onOpenChange={setIsModalOpen}
          disabledFields={["role", "name", "email", "phone", "password", "oldPassword"]}
        />

        <Button
          size={size}
          className={className}
          disabled={isCreateRegistrationPending}
          onClick={() => {
            console.log("isAllRequiredFieldsFilled", isAllRequiredFieldsFilled)
            if (isAllRequiredFieldsFilled) {
              // Немає реєстрації
              createRegistration({ userId: user.id, courseId, amount }, { onSuccess: () => setIsOpen(true) })
            } else {
              setIsModalOpen(true)
              // Якщо юзер хоче зареєструватись на захід, в нього мають бути заповненими всі обовязкові поля
            }
          }}
        >
          Зареєструватись
        </Button>
      </>
    )
  }

  //
  // Реєстрація є, квитанцію НЕ завантажено завантажено
  if (registration) {
    if (registration.paymentStatus !== "PAID" && registration.paymentStatus !== "PENDING") {
      return (
        <Button size={size} className={className} onClick={() => setIsOpen(true)}>
          Оплатити
        </Button>
      )
    }

    //
    // Реєстрація є, квитанцію завантажено але ще не перевірено
    // if (registration.paymentStatus === "PENDING") {
    if (registration.paymentReceipt || registration.freeParticipation) {
      return (
        <Button size={size} className={className} onClick={() => setIsOpen(true)}>
          {registration.paymentReceipt ? "Завантажити іншу квитанцію" : "Завантажити інший файл"}
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
