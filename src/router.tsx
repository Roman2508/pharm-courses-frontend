import { createBrowserRouter } from 'react-router'
import App from './App'
import { CoursesPage } from './pages/courses-page'
import { RootLayout } from './components/layouts/root-layout'

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/courses',
        element: <CoursesPage />,
      },
    ],
  },
])
