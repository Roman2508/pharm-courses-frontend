import { Toaster } from 'sonner'
import { Outlet, useLocation } from 'react-router'

import Header from '../common/header'
import { Footer } from '../common/footer'

export const RootLayout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen">
      {location.pathname !== '/auth' && <Header />}
      <Outlet />
      {location.pathname === '/' && <Footer />}

      <Toaster />
    </div>
  )
}
