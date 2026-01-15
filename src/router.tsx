import { createBrowserRouter } from 'react-router'

import HomePage from './pages/home-page'
import { ArchivePage } from './pages/archive-page'
import MyCoursesPage from './pages/my-courses-page'
import { RootLayout } from './components/layouts/root-layout'
import AuthPage from './pages/auth-page'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/archive',
        element: <ArchivePage />,
      },
      {
        path: '/my-courses',
        element: <MyCoursesPage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
])
