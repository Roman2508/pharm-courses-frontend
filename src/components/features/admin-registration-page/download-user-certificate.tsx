import { toast } from "sonner"
import { useEffect, useState } from "react"

import { useFullCourse } from "@/api/hooks/use-courses"
import type { RegistrationType } from "@/types/registration.type"
import { CertificateDownloadButton } from "../full-course-page/certificate-download-button"

interface Props {
  selectedRegistrations: number[]
  registrations: RegistrationType[]
}

const DownloadUserCertificate = ({ selectedRegistrations, registrations }: Props) => {
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationType>()

  const { data: course, isLoading } = useFullCourse(
    selectedRegistration?.courseId ? String(selectedRegistration.courseId) : undefined,
  )

  useEffect(() => {
    if (!selectedRegistrations.length) {
      setSelectedRegistration(undefined)
    } else {
      const selectedRegistration = registrations.find((reg) => reg.id === selectedRegistrations[0])
      if (selectedRegistration) setSelectedRegistration(selectedRegistration)
    }
  }, [selectedRegistrations])

  const onDownloadCertificate = () => {
    if (selectedRegistrations.length > 1) {
      toast.error("Виберіть лише одну реєстрацію для завантаження сертифіката")
      return
    }
  }

  return (
    <span title="Завантажити сертифікат">
      <CertificateDownloadButton
        size="sm"
        className=""
        variant="icon"
        course={course}
        isLoading={isLoading}
        registration={selectedRegistration}
        onButtonClick={onDownloadCertificate}
        userName={selectedRegistration?.user?.name || ""}
      />
    </span>
  )
}

export default DownloadUserCertificate
