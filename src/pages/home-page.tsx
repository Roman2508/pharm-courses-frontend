import { Link } from 'react-router'
import { Archive, ArrowRight, BadgeCheck } from 'lucide-react'

import { useCourses } from '@/api/hooks/use-coueses'
import bgImage from '../assets/medical-laboratory.jpg'
import CourseCard from '@/components/common/course-card'
import SectionHeader from '@/components/common/section-header'
import type { CourseType } from '@/types/course.type'

const HomePage = () => {
  const { data: plannedCourses } = useCourses('PLANNED')
  const { data: archivedCourses } = useCourses('ARCHIVED')

  return (
    <main className="">
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img src={bgImage} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-secondary/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 1}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 pb-20 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 text-balance leading-[1.1] tracking-tight">
              Підвищуйте кваліфікацію з провідними експертами
            </h1>

            <p className="text-xl md:text-2xl text-white/90 text-pretty mb-12 max-w-2xl leading-relaxed">
              Сертифіковані програми для фармацевтів та медичних працівників. Інвестуйте в майбутнє своєї кар'єри.
            </p>

            <div className="flex gap-5">
              <Link
                to=""
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-primary font-bold text-lg hover:bg-white/95 transition-all hover:scale-105 hover:shadow-2xl"
              >
                Переглянути заходи
                <ArrowRight />
              </Link>

              <Link
                to="/archive"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 text-white font-bold text-lg hover:bg-white/20 transition-all hover:scale-105"
              >
                <Archive />
                Архів курсів
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
            <path
              d="M0,60 C150,90 350,0 600,60 C850,120 1050,30 1200,60 L1200,120 L0,120 Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:scale-105 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <div className="text-5xl font-black text-primary mb-2">{4}+</div>
              <div className="text-sm text-text-secondary font-semibold uppercase tracking-wide">Проведених курсів</div>
            </div>
          </div>

          <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-sm border border-border/50 hover:border-secondary/50 transition-all hover:scale-105 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div className="text-5xl font-black text-secondary mb-2">3500+</div>
              <div className="text-sm text-text-secondary font-semibold uppercase tracking-wide">Слухачів курсів</div>
            </div>
          </div>

          <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-surface/80 to-surface/40 backdrop-blur-sm border border-border/50 hover:border-success/50 transition-all hover:scale-105 hover:shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="text-5xl font-black text-success mb-2">98%</div>
              <div className="text-sm text-text-secondary font-semibold uppercase tracking-wide">Задоволених</div>
            </div>
          </div>
        </div>
      </section>

      <SectionHeader
        title="Заплановані заходи"
        description="Оберіть програму та розпочніть своє професійне зростання"
        color="success"
        icon={<BadgeCheck className="text-success" />}
        bageText="Доступно зараз"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto px-4">
        {plannedCourses?.map((course) => (
          <CourseCard {...course} />
        ))}
      </div>

      <SectionHeader
        title="Проведені заходи"
        description="Ознайомтеся з нашими попередніми програмами"
        color="secondary"
        icon={<BadgeCheck className="text-secondary" />}
        bageText="Архів курсів"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto px-4">
        {archivedCourses?.map((course) => (
          <CourseCard {...course} />
        ))}
      </div>
    </main>
  )
}

export default HomePage
