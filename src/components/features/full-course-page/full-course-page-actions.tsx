import { Link } from "react-router"
import type { Dispatch, FC, SetStateAction } from "react"

import { Button } from "../../ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { CourseType } from "@/types/course.type"
import { useCreateRegistration } from "@/api/hooks/use-registration"
import { CertificateDownloadButton } from "./certificate-download-button"

interface Props {
  userId?: string
  amount?: number
  courseId?: number
  isLoading: boolean
  registration: any
  setIsOpen: Dispatch<SetStateAction<boolean>>
  course?: CourseType
  userName?: string
}

export const FullCoursePageActions: FC<Props> = ({
  userId,
  courseId,
  registration,
  isLoading,
  amount,
  setIsOpen,
  course,
  userName,
}) => {
  const { mutate: createRegistration, isPending: isCreateRegistrationPending } = useCreateRegistration()

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Spinner className="w-10 h-10 text-primary" />
      </div>
    )
  }

  if (!userId) {
    return (
      <Link to="/auth/login">
        <Button className="w-full" size="lg">
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
    // Реєстрація є, статус - не оплачено
    return (
      <Button
        size="lg"
        className="w-full"
        disabled={isCreateRegistrationPending}
        onClick={() => createRegistration({ userId, courseId, amount }, { onSuccess: () => setIsOpen(true) })}
      >
        Зареєструватись
      </Button>
    )
  }

  if (registration && (registration.paymentStatus !== "PAID" || registration.paymentStatus !== "PENDING")) {
    return (
      <Button size="lg" className="w-full" onClick={() => setIsOpen(true)}>
        Оплатити
      </Button>
    )
  }

  if (registration && registration.paymentStatus === "NONE") {
    // Або можливо краще тут нічого не показувати, а просто змінити інф. в блоку вище: Статус: Перевірка оплати (або якось так)
    return <div>Реєстрація є, статус - очікується оплата</div>
  }

  if (registration && registration.paymentStatus === "PAID" && registration.certificateEnabled) {
    // Certificate is available for download
    return (
      <>
        <div className="mt-3 text-sm text-success font-medium flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Сертифікат доступний
        </div>

        {course && userName && (
          <CertificateDownloadButton course={course} registration={registration} userName={userName} />
        )}
      </>
    )
  }

  if (registration && registration.paymentStatus === "PENDING") {
    return <div>Реєстрація є, квитанцію завантажено але ще не перевірено</div>
  }

  if (registration && registration.paymentStatus === "PAID") {
    return <div>Реєстрація є, статус - оплачено</div>
  }

  if (!registration) {
    return <div>реєстрації немає - показую кнопку реєстрації</div>
  }

  return null
}
