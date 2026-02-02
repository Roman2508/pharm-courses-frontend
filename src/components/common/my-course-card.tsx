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
      <div className="mb-2 flex items-center justify-between">
        <Link to={`/courses/${course.id}`}>
          <h3 className="text-xl font-bold text-text-primary hover:underline">{course.name}</h3>
        </Link>

        <p className="text-xl font-bold text-primary">{course.price} грн</p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Початок: {getDate(course.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Зареєстрований(на): {getDate(course.createdAt)}</span>
          </div>
        </div>

        {paymentStatus === "PENDING" && <Badge className="bg-warning">Очікує оплати</Badge>}
        {paymentStatus === "PAID" && <Badge className="bg-success">Оплачено</Badge>}
        {paymentStatus === "REFUNDED" && <Badge className="bg-destructive">Скасовано</Badge>}
      </div>

      <div>{paymentStatus !== "PAID" && <Button>Оплатити зараз</Button>}</div>
    </Card>
  )
}

export default MyCourseCard
