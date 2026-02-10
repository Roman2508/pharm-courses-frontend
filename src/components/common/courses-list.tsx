import type { FC } from "react"

import CourseCard from "./course-card"
import PageLoader from "../custom/page-loader"
import type { CourseType } from "@/types/course.type"

interface Props {
  isLoading?: boolean
  courses?: CourseType[]
}

export const CoursesList: FC<Props> = ({ courses, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : courses && !!courses.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-0 max-w-7xl mx-auto px-4">
          {courses.map((course) => (
            <CourseCard {...course} />
          ))}
        </div>
      ) : (
        <section className="container mx-auto px-4 pb-20 text-center max-w-7xl">
          <div className="max-w-md mx-auto">
            <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-3xl bg-primary/10 mx-auto mb-4 sm:mb-8 flex items-center justify-center">
              <svg
                className="w-10 h-10sm:w-16 sm:h-16 text-primary/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-0 sm:mb-2">Заходи тимчасово відсутні</h3>
            <p className="text-base sm:text-lg text-text-secondary mb-8">Незабаром тут з'являться нові заходи</p>
          </div>
        </section>
      )}
    </>
  )
}
