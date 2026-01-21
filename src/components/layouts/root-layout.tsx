import { Toaster } from 'sonner'
import { Outlet, useLocation } from 'react-router'

import Header from '../common/header'
import { Footer } from '../common/footer'
import TanstackLayout from './tanstack-layout'

export const RootLayout = () => {
  const location = useLocation()

  return (
    <TanstackLayout>
      <div className="min-h-screen">
        {location.pathname !== '/auth' && <Header />}
        <Outlet />
        {location.pathname === '/' && <Footer />}

        <Toaster />
      </div>
    </TanstackLayout>
  )
}
