import { createBrowserRouter } from 'react-router'
import App from './App'
import { CoursesPage } from './pages/courses-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/courses',
    element: <CoursesPage />,
  },
])
