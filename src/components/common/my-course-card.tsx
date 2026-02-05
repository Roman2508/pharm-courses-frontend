import { Link } from "react-router"
import { useState, type FC } from "react"
import { Calendar, Clock } from "lucide-react"

import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { getDate } from "@/helpers/get-date"
import { PaymentModal } from "./payment-modal"
import type { RegistrationType } from "@/types/registration.type"
import { CourseActions } from "./course-actions"
import { getPaymentColor, getPaymentStatus } from "@/helpers/get-payment-status"

type Props = {
  userId: string
  userName: string
  registration: RegistrationType
}

const MyCourseCard: FC<Props> = ({ registration, userId, userName }) => {
  const [isOpen, setIsOpen] = useState(false)

  const color = getPaymentColor(registration.paymentStatus)

  return (
    <>
      <PaymentModal open={isOpen} onOpenChange={setIsOpen} registration={registration} />

      <Card className="mb-2 px-4 gap-0">
        <div className="mb-2 flex items-start md:items-center justify-between flex-col md:flex-row">
          <Link to={`/courses/${registration.course.id}`}>
            <h3 className="text-base min-[420px]:text-lg sm:text-xl font-bold text-text-primary hover:underline">
              {registration.course.name}
            </h3>
          </Link>

          <p className="text-lg min-[420px]:text-xl font-bold text-primary whitespace-nowrap">
            {registration.course.price} грн
          </p>
        </div>

        <div className="flex items-start md:items-center justify-between gap-2 mb-4 flex-col md:flex-row border-b md:border-none">
          <div className="flex items-start md:items-center gap-1 md:gap-4 text-muted-foreground flex-col md:flex-row">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-[14px] min-[420px]:text-sm">Початок: {getDate(registration.course.startDate)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-[14px] min-[420px]:text-sm">
                Зареєстрований(на): {getDate(registration.course.createdAt)}
              </span>
            </div>
          </div>

          <Badge className={`bg-${color}/10 text-${color} mb-4 md:mb-0`}>
            {getPaymentStatus(registration.paymentStatus)}
          </Badge>
        </div>

        {/* <div>{registration.paymentStatus !== "PAID" && <Button>Оплатити зараз</Button>}</div> */}

        <div>
          <CourseActions
            size="sm"
            className=""
            userId={userId}
            courseId={registration.course.id}
            registration={registration}
            isLoading={false}
            amount={registration.course.price}
            setIsOpen={setIsOpen}
            course={registration.course}
            userName={userName}
          />
        </div>
      </Card>
    </>
  )
}

export default MyCourseCard
