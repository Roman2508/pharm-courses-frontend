import type { FC } from "react"
import { Link, useLocation } from "react-router"

import { cn } from "@/lib/utils"
import { useSession } from "@/api/auth-client"

interface Props {
  className?: string
  onLinkClick?: () => void
}

const Navigation: FC<Props> = ({ className = "", onLinkClick }) => {
  const location = useLocation()

  const { data: session } = useSession()

  return (
    <ul className={className}>
      <li
        onClick={() => onLinkClick && onLinkClick()}
        className={cn(
          "text-lg sm:text-sm mb-2 sm:mb-0 font-medium text-text-secondary hover:text-primary transition-colors",
          { "text-primary": location.pathname === "/" },
        )}
      >
        <Link to="/">Заходи</Link>
      </li>

      <li
        onClick={() => onLinkClick && onLinkClick()}
        className={cn(
          "text-lg sm:text-sm mb-2 sm:mb-0 font-medium text-text-secondary hover:text-primary transition-colors",
          { "text-primary": location.pathname === "/archive" },
        )}
      >
        <Link to="/archive">Архів</Link>
      </li>

      {session?.user && (
        <li
          onClick={() => onLinkClick && onLinkClick()}
          className={cn(
            "text-lg sm:text-sm mb-2 sm:mb-0 font-medium text-text-secondary hover:text-primary transition-colors",
            { "text-primary": location.pathname === "/my-courses" },
          )}
        >
          <Link to="/my-courses">Мої заходи</Link>
        </li>
      )}

      {session?.user.role === "admin" && (
        <li
          onClick={() => onLinkClick && onLinkClick()}
          className={cn(
            "text-lg sm:text-sm mb-2 sm:mb-0 font-medium text-text-secondary hover:text-primary transition-colors",
            { "text-primary": location.pathname === "/admin" },
          )}
        >
          <Link to="/admin">Адміністрування</Link>
        </li>
      )}
    </ul>
  )
}

export default Navigation
