import { Title } from '@/components/custom/title'
import { useCourses } from '@/api/hooks/use-courses'
import { CoursesList } from '@/components/common/courses-list'

export const ArchivePage = () => {
  const { data: courses, isLoading } = useCourses('ARCHIVED')

  return (
    <div className="my-16">
      <Title className="mb-12 mx-auto max-w-7xl px-4">Архів заходів</Title>
      <CoursesList courses={courses} isLoading={isLoading} />
    </div>
  )
}
