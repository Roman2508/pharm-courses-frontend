import { Link } from 'react-router'

import { Card } from '../ui/card'
import { Calendar, Clock } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const MyCourseCard = () => {
  return (
    <Card className="mb-2 px-4 gap-0">
      <div className="mb-2 flex items-center justify-between">
        <Link to="/course/1">
          <h3 className="text-xl font-bold text-text-primary">Назва курсу</h3>
        </Link>

        <p className="text-xl font-bold text-primary">1 300 грн</p>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">{'19 грудня 2025'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Зареєстровано {'19 грудня 2025'}</span>
          </div>
        </div>

        <Badge>Очікує оплати</Badge>
      </div>

      <div className="">
        <Button>Оплатити зараз</Button>
      </div>
    </Card>
  )
}

export default MyCourseCard
