import { Outlet } from 'react-router'
import Header from '../common/header'

export const RootLayout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <footer>footer</footer>
    </>
  )
}
