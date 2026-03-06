import { toast, Toaster } from "sonner"
import { Outlet, useLocation } from "react-router"

import Header from "../common/header"
import { Footer } from "../common/footer"
import ScrollToTop from "./scroll-to-top"
import TanstackLayout from "./tanstack-layout"
import PermissionsLayout from "./permissions-layout"

import { useEffect } from "react"
import { useNavigate } from "react-router"
import { SWUpdateListener } from "../common/sw-update-listener"

export const RootLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    let timeout: number

    const handleOffline = () => {
      clearTimeout(timeout)
      // Дебаунс 1.5 сек перед редіректом
      timeout = setTimeout(() => {
        if (!navigator.onLine) {
          toast.error("Ви втратили інтернет-зʼєднання")
          if (location.pathname !== "/offline") {
            navigate("/offline")
          }
        }
      }, 1500)
    }

    const handleOnline = () => {
      clearTimeout(timeout)
      // Тільки якщо ми стабільно в мережі 1 сек
      timeout = setTimeout(() => {
        if (navigator.onLine) {
          toast.success("Зʼєднання відновлено")
        }
      }, 1000)
    }

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    // Повідомляємо index.html, що React успішно завантажився
    if (typeof window !== "undefined") {
      ;(window as any).__REACT_HYDRATED__ = true
    }

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
      clearTimeout(timeout)
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
          <SWUpdateListener />
        </div>
      </PermissionsLayout>
    </TanstackLayout>
  )
}
