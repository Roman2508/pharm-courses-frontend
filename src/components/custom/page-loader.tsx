import type { FC } from "react"

import { cn } from "@/lib/utils"

interface Props {
  className?: string
  fullPage?: boolean
}

const PageLoader: FC<Props> = ({ className = "", fullPage = true }) => {
  if (fullPage) {
    return (
      <div
        className={cn("bg-background flex flex-col items-center justify-center", className)}
        style={{
          position: "fixed",
          top: "64px",
          left: 0,
          width: "100%",
          height: "calc(100vh - 64px)",
          zIndex: 9999,
        }}
      >
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Loading..."
            className="w-20 h-20 mx-auto mb-5"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <p className="text-text-secondary text-lg">Завантаження...</p>
        </div>
        <style>{`
          @supports (height: 1svh) {
            .bg-background {
              height: calc(100svh - 64px) !important;
            }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className={cn("bg-background flex items-center justify-center", className)}>
      <div className="max-w-[1300px] mx-auto px-4 py-12 flex items-center justify-center text-center">
        <div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Завантаження...</p>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
