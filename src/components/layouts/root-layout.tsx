import { Toaster } from "sonner"
import { Outlet, useLocation } from "react-router"

import Header from "../common/header"
import { Footer } from "../common/footer"
import TanstackLayout from "./tanstack-layout"
import PermissionsLayout from "./permissions-layout"

export const RootLayout = () => {
  const location = useLocation()

  return (
    <TanstackLayout>
      <PermissionsLayout>
        <div className="min-h-screen">
          {!location.pathname.includes("/auth") && <Header />}
          <Outlet />
          {location.pathname === "/" && <Footer />}

          <Toaster />
        </div>
      </PermissionsLayout>
    </TanstackLayout>
  )
}
