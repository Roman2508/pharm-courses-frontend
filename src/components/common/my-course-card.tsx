import type { FC } from "react"
import { Link } from "react-router"
import { Calendar, Clock } from "lucide-react"

import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { getDate } from "@/helpers/get-date"
import type { RegistrationType } from "@/types/registration.type"

type Props = RegistrationType

const MyCourseCard: FC<Props> = ({ course, paymentStatus }) => {
  return (
    <Card className="mb-2 px-4 gap-0">
      <div className="mb-2 flex items-start md:items-center justify-between flex-col md:flex-row">
        <Link to={`/courses/${course.id}`}>
          <h3 className="text-base min-[420px]:text-lg sm:text-xl font-bold text-text-primary hover:underline">
            {course.name}
          </h3>
        </Link>

        <p className="text-lg min-[420px]:text-xl font-bold text-primary whitespace-nowrap">{course.price} грн</p>
      </div>

      <div className="flex items-start md:items-center justify-between gap-2 mb-4 flex-col md:flex-row border-b md:border-none">
        <div className="flex items-start md:items-center gap-1 md:gap-4 text-muted-foreground flex-col md:flex-row">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-[14px] min-[420px]:text-sm">Початок: {getDate(course.startDate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-[14px] min-[420px]:text-sm">Зареєстрований(на): {getDate(course.createdAt)}</span>
          </div>
        </div>

        {paymentStatus === "PENDING" && <Badge className="bg-warning mb-4 md:mb-0">Очікує оплати</Badge>}
        {paymentStatus === "PAID" && <Badge className="bg-success mb-4 md:mb-0">Оплачено</Badge>}
        {paymentStatus === "REFUNDED" && <Badge className="bg-destructive mb-4 md:mb-0">Скасовано</Badge>}
      </div>

      <div>{paymentStatus !== "PAID" && <Button>Оплатити зараз</Button>}</div>
    </Card>
  )
}

export default MyCourseCard
