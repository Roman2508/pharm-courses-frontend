import { toast, Toaster } from "sonner"
import { Outlet, useLocation } from "react-router"

import Header from "../common/header"
import { Footer } from "../common/footer"
import ScrollToTop from "./scroll-to-top"
import TanstackLayout from "./tanstack-layout"
import PermissionsLayout from "./permissions-layout"

import { useEffect } from "react"
import { useNavigate } from "react-router"

export const RootLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleOffline = () => {
      toast.error("Ви втратили інтернет-зʼєднання")
    }

    const handleOnline = () => {
      toast.success("Зʼєднання відновлено")
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    // Якщо шлях змінився і ми не в мережі - робимо редірект
    if (!navigator.onLine && location.pathname !== "/offline") {
      navigate("/offline")
    }

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [location.pathname, navigate])

  return (
    <TanstackLayout>
      <PermissionsLayout>
        <ScrollToTop />

        <div className="min-h-screen">
          {!location.pathname.includes("/auth") && <Header />}

          <Outlet />

          {location.pathname === "/" && <Footer />}

          <Toaster duration={5000} closeButton />
        </div>
      </PermissionsLayout>
    </TanstackLayout>
  )
}
