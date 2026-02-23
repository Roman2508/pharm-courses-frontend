import { useState } from "react"
import { Link } from "react-router"
import { Pencil, Trash, Users } from "lucide-react"

import { getDate } from "@/helpers/get-date"
import { Button } from "@/components/ui/button"
import { Title } from "@/components/custom/title"
import PageLoader from "@/components/custom/page-loader"
import { Pagination } from "@/components/custom/pagination"
import { getCourseStatus } from "@/helpers/get-course-status"
import { useAllCourses, useDeleteCourse, type GetCoursesQuery } from "@/api/hooks/use-courses"

const AdminCoursesPage = () => {
  const [params, setParams] = useState<GetCoursesQuery>({ page: 1, limit: 20 })

  const deleteCourse = useDeleteCourse(params)
  const { data: { data: courses, totalCount } = { data: [], totalCount: 0 }, isLoading } = useAllCourses(params)

  const handleChangeParams = (key: keyof GetCoursesQuery, value: any) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const handleDelete = (id: number) => {
    if (!id) return
    if (!confirm("Ви впевнені, що хочете видалити цей захід?")) return
    deleteCourse.mutate(id)
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-12 md:py-16">
      <div className="flex gap-4 items-start sm:items-center justify-between mb-8 flex-col lg:flex-row">
        <Title>Управління заходами</Title>

        <div className="flex items-start sm:items-center gap-2 sm:gap-4 flex-col-reverse sm:flex-row">
          <Pagination
            total={totalCount}
            page={params.page || 1}
            limit={params.limit || 20}
            handleChangeParams={handleChangeParams}
          />

          <Link
            to="/admin/courses/new"
            className="px-4 lg:px-6 py-2 lg:py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/20"
          >
            Створити захід
          </Link>
        </div>
      </div>

      {isLoading ? (
        <PageLoader />
      ) : courses && courses.length > 0 ? (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-surface rounded-2xl border border-border p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 flex-col-reverse lg:flex-row">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Link to={`/courses/${course.id}`}>
                      <h3 className="text-base min-[500px]:text-lg sm:text-xl font-bold text-text-primary">
                        {course.name}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-text-secondary">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                        course.status === "PLANNED"
                          ? "bg-success/10 text-success"
                          : course.status === "ARCHIVED"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-text-muted/10 text-text-muted"
                      }`}
                    >
                      Статус: {getCourseStatus(course.status)}
                    </span>

                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${
                        course.registrationOpen === "CLOSE"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-success/10 text-success"
                      }`}
                    >
                      Реєстрацію: {course.registrationOpen === "CLOSE" ? "закрито" : "відкрито"}
                    </span>

                    <span>
                      {getDate(course.startDate)}
                      {course.endDate && course.endDate !== course.startDate && <> - {getDate(course.endDate)}</>}
                    </span>

                    <span className="font-semibold text-primary text-base sm:text-lg">{course.price} грн</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Link to={`/admin/courses/${course.id}`}>
                    <Button variant="primary">
                      <span className="inline-block max-[500px]:hidden">Редагувати</span>
                      <Pencil className="hidden max-[500px]:inline-block" />
                    </Button>
                  </Link>

                  <Link to={`/admin/courses/${course.id}/registrations`}>
                    <Button variant="secondary">
                      <span className="inline-block max-[500px]:hidden">Реєстрації</span>
                      <Users className="hidden max-[500px]:inline-block" />
                    </Button>
                  </Link>

                  <Button variant="destructive" onClick={() => handleDelete(course.id)}>
                    <span className="inline-block max-[500px]:hidden">Видалити</span>
                    <Trash className="hidden max-[500px]:inline-block" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-surface mx-auto mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            <h3 className="text-xl font-semibold text-text-primary mb-2">Заходів ще немає</h3>
            <p className="text-text-secondary mb-6">Створіть свій перший захід, щоб почати.</p>
            <Link
              to="/admin/courses/new"
              className="inline-block px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-all hover:shadow-lg hover:shadow-primary/20"
            >
              Створити захід
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCoursesPage
