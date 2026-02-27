import { Link } from "react-router"
import { Archive, ArrowRight, BadgeCheck } from "lucide-react"

import { COLORS, getRGB } from "@/constants/colors"
import { useCourses } from "@/api/hooks/use-courses"
import bgImage from "../assets/medical-laboratory.jpg"
import SectionHeader from "@/components/common/section-header"
import { CoursesList } from "@/components/common/courses-list"
import { StatIcons } from "@/components/features/home-page/stat-icons"

const stats = [
  { title: "Проведених заходів", value: "4+", icon: <StatIcons type="users" />, color: "primary" },
  { title: "Учасників заходів", value: "3500+", icon: <StatIcons type="members" />, color: "secondary" },
  { title: "Задоволених", value: "98%", icon: <StatIcons type="reviews" />, color: "success" },
] as const

const HomePage = () => {
  const { data: plannedCourses, isLoading: isPlannedLoading } = useCourses("PLANNED")
  const { data: archivedCourses, isLoading: isArchivedLoading } = useCourses("ARCHIVED", { limit: 3 })

  return (
    <main>
      <section className="relative overflow-hidden min-h-[90svh] flex items-center">
        <div className="absolute inset-0">
          <img src={bgImage} className="w-full h-full object-cover" />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom right, ${getRGB("primary", 0.95)}, ${getRGB("primary", 0.85)}, ${getRGB("secondary", 0.9)})`,
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 50%, ${getRGB("white", 0.1)}, transparent 70%)`,
            }}
          />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 1}s`,
                background: `${getRGB("white", 0.5)}`,
              }}
            />
          ))}
        </div>

        <div className="max-w-[1300px] w-full mx-auto px-4 pb-20 relative z-10 max-w-7xl">
          <div className="max-w-full lg:max-w-3xl">
            <h1
              className={
                "max-[420px]:text-2xl max-[500px]:text-3xl text-4xl md:text-5xl lg:text-6xl text-center lg:text-left " +
                "font-black text-white max-[500px]:mb-5 mb-8 text-balance leading-[1.1] tracking-tight"
              }
            >
              Підвищуйте кваліфікацію з провідними експертами
            </h1>

            <p
              className={
                "max-[500px]:text-base text-lg md:text-xl text-center lg:text-left " +
                "text-pretty max-[500px]:mb-8 mb-12 max-w-2xl mx-auto lg:mx-0 leading-5 sm:leading-relaxed"
              }
              style={{ color: `${getRGB("white", 0.9)}` }}
            >
              Сертифіковані програми для фармацевтів та медичних працівників. Інвестуйте в майбутнє своєї кар'єри.
            </p>

            <div className="flex justify-center lg:justify-start flex-wrap gap-5">
              <a
                href="#events"
                className={
                  "inline-flex items-center justify-center gap-3 rounded-2xl bg-white " +
                  "text-primary font-bold hover:bg-white/95 transition-all hover:scale-105 hover:shadow-2xl " +
                  "sm:w-auto py-2 min-[500px]:py-3 sm:py-5 px-6 min-[500px]:px-8 sm:px-10 text-base sm:text-lg"
                }
              >
                Переглянути заходи
                <ArrowRight className="w-5 min-[500px]:w-6 h-5 min-[500px]:h-6" />
              </a>

              <Link
                to="/archive"
                className={
                  "inline-flex items-center justify-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md " +
                  "border-2 text-white font-bold hover:bg-white/20 transition-all hover:scale-105 " +
                  "sm:w-auto py-2 min-[500px]:py-3 sm:py-5 px-6 min-[500px]:px-8 sm:px-10 text-base sm:text-lg"
                }
                style={{ borderColor: `${getRGB("white", 0.3)}` }}
              >
                <Archive className="w-5 min-[500px]:w-6 h-5 min-[500px]:h-6" />
                Архів заходів
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-2px] left-0 right-0">
          <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
            <path
              d="M0,60 C150,90 350,0 600,60 C850,120 1050,30 1200,60 L1200,120 L0,120 Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      <section className="max-w-[1300px] mx-auto px-4 py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={
                "group relative p-6 lg:p-8 rounded-3xl backdrop-blur-sm border transition-all " +
                `md:hover:scale-105 md:hover:shadow-xl border-${stat.color}`
              }
              style={{
                borderColor: `${getRGB("border", 0.5)}`,
                background: `linear-gradient(to bottom right, ${getRGB("white", 0.8)}, ${getRGB("white", 0.4)})`,
              }}
            >
              <div
                className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}
                style={{
                  background: `linear-gradient(to bottom right, ${getRGB(stat.color, 0.05)}, transparent)`,
                }}
              />

              <div className="relative flex gap-6 md:gap-4 flex-row md:flex-col">
                <div
                  className={
                    `w-16 h-16 rounded-2xl flex items-center ` +
                    "justify-center mx-0 md:mx-auto group-hover:scale-110 transition-transform"
                  }
                  style={{ background: `${getRGB(stat.color, 0.1)}` }}
                >
                  {stat.icon}
                </div>

                <div className="flex flex-col">
                  <div
                    className={`text-2xl max-[500px]:text-3xl text-4xl sm:text-5xl font-black mb-2`}
                    style={{ color: `${getRGB(stat.color)}` }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-secondary font-semibold uppercase tracking-wide">{stat.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="events" />

      <SectionHeader
        color="success"
        bageText="Доступно зараз"
        title="Заплановані заходи"
        icon={<BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-success" />}
        description="Оберіть програму та розпочніть своє професійне зростання"
      />

      <div className="mb-20">
        <CoursesList courses={plannedCourses} isLoading={isPlannedLoading} />
      </div>

      <SectionHeader
        color="secondary"
        bageText="Архів заходів"
        title="Проведені заходи"
        icon={<BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />}
        description="Ознайомтеся з нашими попередніми програмами"
      />

      <CoursesList courses={archivedCourses} isLoading={isArchivedLoading} />
    </main>
  )
}

export default HomePage
