import type { FC } from "react"
import { Link } from "react-router"
import { Archive, Clock4 } from "lucide-react"

import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { getDate } from "@/helpers/get-date"
import type { CourseType } from "@/types/course.type"
import { getTargetAudience } from "@/helpers/get-target-audience"

type Props = CourseType

const CourseCard: FC<Props> = ({
  id,
  name,
  price,
  description,
  startDate,
  endDate,
  status,
  registrationOpen,
  targetAudience,
}) => {
  const isEndDate = endDate && endDate !== startDate

  const statusColor = registrationOpen === "OPEN" ? "success" : "destructive"

  return (
    <article className="group relative h-full">
      <div
        className={
          "absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/20 to-secondary/0 rounded-[2rem] opacity-0 " +
          "group-hover:opacity-30 blur-xl transition-all duration-700"
        }
      />

      <div
        className={
          "relative h-full bg-gradient-to-br from-surface via-surface/95 to-surface/90 rounded-[1.75rem] border-2 " +
          "border-border/60 overflow-hidden transition-all duration-500 group-hover:border-primary/40 " +
          "group-hover:-translate-y-1.5 group-hover:shadow-2xl"
        }
      >
        <div className="absolute inset-0 opacity-[0.02] bg-grid-pattern" />
        <div
          className={
            "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 " +
            "group-hover:opacity-100 transition-opacity duration-500"
          }
        />
        <div
          className={
            "absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/[0.03] via-secondary/[0.02] to-transparent " +
            "rounded-bl-[5rem] transition-opacity duration-500 group-hover:from-primary/[0.06] group-hover:via-secondary/[0.04]"
          }
        />

        <div className="relative p-6 lg:p-8 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            {status === "PLANNED" && (
              <Badge
                className={`border-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-${statusColor}/10 text-${statusColor} border-${statusColor}/20`}
              >
                <Clock4 />
                {registrationOpen === "OPEN" ? "Відкрито" : "Закрито"}
              </Badge>
            )}

            {status === "ARCHIVED" && (
              <Badge className="border-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-secondary/10 text-secondary border-secondary/20">
                <Archive />
                Архів
              </Badge>
            )}
            <div className="text-2xl sm:text-3xl font-black text-primary">{price} грн</div>
          </div>

          <span
            className={`text-sm font-bold mb-2 ${targetAudience === "LABORATORY_ASSISTANTS" ? "text-secondary" : "text-primary"}`}
          >
            {getTargetAudience(targetAudience)}
          </span>

          <Link to={`/courses/${id}`}>
            <h2
              className={
                "text-lg lg:text-xl xl:text-2xl font-black text-text-primary mb-4 text-balance leading-tight tracking-tight " +
                "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary " +
                "group-hover:to-secondary transition-all duration-300 truncate text-ellipsis line-clamp-3"
              }
            >
              {name}
            </h2>
          </Link>

          <p
            dangerouslySetInnerHTML={{ __html: description }}
            className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed min-h-[4.5rem]"
          />

          <div className="relative mb-6 p-4 rounded-2xl bg-gradient-to-br from-primary/[0.04] to-secondary/[0.02] border border-primary/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-[3rem]" />

            <div className="flex items-center gap-4 relative">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-lg shadow-primary/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-primary/70 mb-1 tracking-wider uppercase">Дата заходу</div>
                <div className={`${isEndDate ? "text-sm" : "text-base"} font-black text-text-primary truncate`}>
                  {isEndDate && <span className="pr-3">з</span>}

                  {getDate(startDate)}
                  {isEndDate && (
                    <>
                      <br />
                      <span>по</span> {getDate(endDate)}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link to={`/courses/${id}`}>
            <Button variant="outline" className="bg-muted h-15 w-full">
              Детальна інформація
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default CourseCard
