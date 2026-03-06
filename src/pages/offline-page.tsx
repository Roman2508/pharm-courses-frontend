import { Link } from "react-router"
import { WifiOff } from "lucide-react"

import { Button } from "@/components/ui/button"

const OfflinePage = () => {
  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 bg-background text-foreground">
      <div className="bg-muted rounded-full p-6 mb-6">
        <WifiOff size={64} className="text-muted-foreground" />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center">Офлайн</h1>
      <p className="text-sm sm:text-base md:text-lg mb-8 text-center text-muted-foreground max-w-md">
        Перевірте підключення до інтернету. Ми покажемо цю сторінку, як тільки ви повернетесь у мережу.
      </p>

      <div className="flex justify-center w-full max-w-md">
        <Link to="/">
          <Button variant="success" className="px-6">
            На головну
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default OfflinePage
