import type { CourseTargetAudienceType } from "@/types/course.type"

export const getTargetAudience = (status?: CourseTargetAudienceType) => {
  switch (status) {
    case "PHARMACISTS":
      return "Фармація"

    case "LABORATORY_ASSISTANTS":
      return "Лабораторна діагностика"

    case "PHARMACISTS_AND_LABORATORY_ASSISTANTS":
      return "Фармація та лабораторна діагностика"

    default:
      return "-"
  }
}
