import type { FC, PropsWithChildren } from "react"
import { Navigate, useLocation } from "react-router"

import { useSession } from "@/api/auth-client"
import PageLoader from "../custom/page-loader"

const PermissionsLayout: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation()

  const { data, isPending } = useSession()

  const user = data?.user

  if (user && (location.pathname.startsWith("/auth/login") || location.pathname.startsWith("/auth/register"))) {
    return <Navigate to="/" replace />
  }

  if (location.pathname.includes("/profile")) {
    if (isPending) {
      return <PageLoader className="h-screen" />
    }

    if (!data || !data.session) {
      return <Navigate to="/" replace />
    }
  }

  const isAdminPage = location.pathname.includes("/admin")

  if (isAdminPage) {
    if (isPending) {
      return <PageLoader className="h-screen" />
    }

    if (!data || !data.session) {
      return <Navigate to="/" replace />
    }

    if (user?.role !== "admin") {
      return <Navigate to="/" replace />
    }
  }

  return <>{children}</>
}

export default PermissionsLayout
