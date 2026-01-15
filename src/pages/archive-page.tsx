import { Title } from '@/components/custom/title'
import CourseCard from '@/components/common/course-card'

export const ArchivePage = () => {
  return (
    <div className="my-16">
      <Title className="mb-12 mx-auto max-w-7xl px-4">Архів заходів</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto px-4">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  )
}
