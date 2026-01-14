import { Outlet } from 'react-router'
import Header from '../common/header'

export const RootLayout = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <Outlet />

      <footer>footer</footer>
    </div>
  )
}
