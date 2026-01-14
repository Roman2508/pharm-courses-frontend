import { createBrowserRouter } from 'react-router'
import HomePage from './pages/home-page'
import { CoursesPage } from './pages/courses-page'
import { RootLayout } from './components/layouts/root-layout'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/courses',
        element: <CoursesPage />,
      },
    ],
  },
])
