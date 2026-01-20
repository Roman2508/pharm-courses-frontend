import { createBrowserRouter } from 'react-router'

import HomePage from './pages/home-page'
import { ArchivePage } from './pages/archive-page'
import MyCoursesPage from './pages/my-courses-page'
import { RootLayout } from './components/layouts/root-layout'
import AuthPage from './pages/auth-page'
import NotFoundPage from '../../examples/front/src/pages/not-found-page'
import InternalServerError from '../../examples/front/src/pages/internal-server-error'
import AdminPage from './pages/admin-page'
import AdminCoursesPage from './pages/admin-courses-page'
import AdminRegistrationsPage from './pages/admin-registrations-page'
import AdminCertificatesPage from './pages/admin-certificates-page'
import AdminUsersPage from './pages/admin-users-page'
import ProfilePage from './pages/profile-page'

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
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/admin/courses',
        element: <AdminCoursesPage />,
      },
      {
        path: '/admin/registrations',
        element: <AdminRegistrationsPage />,
      },
      {
        path: '/admin/certificates',
        element: <AdminCertificatesPage />,
      },
      {
        path: '/admin/users',
        element: <AdminUsersPage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
      },
    ],
  },
])
