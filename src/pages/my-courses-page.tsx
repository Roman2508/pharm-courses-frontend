import { Title } from '@/components/custom/title'
import MyCourseCard from '@/components/common/my-course-card'

const MyCoursesPage = () => {
  return (
    <div className="my-16">
      <Title className="mb-12 mx-auto max-w-7xl px-4">Мої заходи</Title>

      <div className="grid grid-cols-1 gap-8 mb-24 max-w-7xl mx-auto px-4">
        <MyCourseCard />
        <MyCourseCard />
        <MyCourseCard />
        <MyCourseCard />
      </div>
    </div>
  )
}

export default MyCoursesPage
