import { useState } from "react"
import { useNavigate, useParams } from "react-router"

import { Button } from "@/components/ui/button"
import { findError } from "@/helpers/find-error"
import { Spinner } from "@/components/ui/spinner"
import useCourseData from "@/hooks/use-course-data"
import type { CourseType } from "@/types/course.type"
import FormField from "@/components/custom/form-field"
import { getFormErrors } from "@/helpers/get-form-errors"
import { useGetAllCertificateTemplates } from "@/api/hooks/use-certificate-template"
import { useCreateCourse, useFullCourse, useUpdateCourse } from "@/api/hooks/use-courses"
import { courseFormSchema } from "@/components/features/admin-full-course-page/admin-full-course-page-form-schema"
import PageLoader from "@/components/custom/page-loader"
import { Title } from "@/components/custom/title"

const AdminFullCoursePage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const isUpdate = !isNaN(Number(params.id))

  const { data: course } = useFullCourse(isUpdate ? params?.id : undefined)
  const { data: certificateTemplates } = useGetAllCertificateTemplates()

  const createCourse = useCreateCourse()
  const updateCourse = useUpdateCourse()

  const { fields, formData } = useCourseData(course, certificateTemplates)

  const [showErrors, setShowErrors] = useState(false)

  const validate = () => {
    const res = courseFormSchema.safeParse(formData)
    if (res.success) return
    return res.error.format()
  }

  const errors = showErrors ? validate() : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors = validate()
    if (errors) {
      setShowErrors(true)
      return
    }

    if (isUpdate) {
      if (!params.id) return
      updateCourse.mutate(
        { ...(formData as CourseType), id: +params.id },
        { onSuccess: () => navigate("/admin/courses") },
      )
    } else {
      createCourse.mutate(formData as CourseType, {
        onSuccess: () => navigate("/admin/courses"),
      })
    }
  }

  const isLoading = createCourse.isPending || updateCourse.isPending
  const error = createCourse.error || updateCourse.error

  return (
    <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <Title>{isUpdate ? "Редагувати захід" : "Новий захід"}</Title>
      </div>

      {isUpdate && !course ? (
        <PageLoader />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-surface rounded-2xl border-[0] min-[500px]:border min-[500px]:border-border min-[500px]:p-8 space-y-6"
        >
          {fields.slice(0, 4).map((field) => (
            <FormField
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              items={field.items}
              value={field.value}
              onChange={field.onChange}
              required={field.required}
              className={field.className}
              defaultValue={field.defaultValue}
              error={findError(field.name, errors)}
            />
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {fields.slice(4).map((field) => (
              <FormField
                key={field.name}
                name={field.name}
                type={field.type}
                label={field.label}
                items={field.items}
                value={field.value}
                onChange={field.onChange}
                required={field.required}
                className={field.className}
                defaultValue={field.defaultValue}
                error={findError(field.name, errors)}
              />
            ))}
          </div>

          <div className="space-y-6">
            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error.message}</p>
              </div>
            )}

            {showErrors && !!getFormErrors(errors).length && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                {getFormErrors(errors).map((error) => (
                  <p className="text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
              </div>
            )}

            <div className="flex gap-3 pt-4 flex-col min-[500px]:flex-row">
              <Button disabled={isLoading} onClick={handleSubmit} className="flex-1 min-h-12" size="lg">
                {isLoading ? "Збереження..." : course ? "Оновити захід" : "Створити захід"}
              </Button>

              <Button disabled={isLoading} onClick={() => navigate(-1)} variant="ghost" size="lg" className="min-w-40">
                Скасувати
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default AdminFullCoursePage
