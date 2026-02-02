import type { CourseStatusType } from "@/types/course.type"

export const getCourseStatus = (status: CourseStatusType) => {
  switch (status) {
    case "DRAFT":
      return "Чернетка"
    case "PLANNED":
      return "Заплановано"
    case "ARCHIVED":
      return "Архів"
    default:
      return "Невідомий статус"
  }
}
