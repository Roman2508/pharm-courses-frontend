import { toast, Toaster } from "sonner"
import { Outlet, useLocation } from "react-router"

import Header from "../common/header"
import { Footer } from "../common/footer"
import ScrollToTop from "./scroll-to-top"
import TanstackLayout from "./tanstack-layout"
import PermissionsLayout from "./permissions-layout"

export const RootLayout = () => {
  const location = useLocation()

  window.addEventListener("offline", () => {
    toast.error("Ви втратили інтернет-зʼєднання")
  })

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
