import { cn } from "@/lib/utils"
import type { FC } from "react"

interface Props {
  className?: string
}

const PageLoader: FC<Props> = ({ className = "" }) => {
  return (
    <div className={cn("bg-background flex items-center justify-center", className)}>
      {/* <div className="min-h-[calc(100vh-200px)] bg-background flex items-center justify-center"> */}
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Завантаження...</p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
