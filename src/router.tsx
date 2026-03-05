import { createBrowserRouter } from "react-router"

import HomePage from "./pages/home-page"
import AuthPage from "./pages/auth-page"
import AdminPage from "./pages/admin-page"
import ProfilePage from "./pages/profile-page"
import { ArchivePage } from "./pages/archive-page"
import MyCoursesPage from "./pages/my-courses-page"
import AdminUsersPage from "./pages/admin-users-page"
import FullCoursePage from "./pages/full-course-page"
import TermsOfUsePage from "./pages/terms-of-use-page"
import AdminCoursesPage from "./pages/admin-courses-page"
import PrivacyPolicyPage from "./pages/privacy-policy-page"
import NotFoundErrorPage from "./pages/not-found-error-page"
import { RootLayout } from "./components/layouts/root-layout"
import AdminFullCoursePage from "./pages/admin-full-course-page"
import AdminCertificatesPage from "./pages/admin-certificates-page"
import AdminRegistrationsPage from "./pages/admin-registrations-page"
import InternalServerErrorPage from "./pages/internal-server-error-page"
import AdminFullCertificatePage from "./pages/admin-full-certificate-page"

import OfflinePage from "./pages/offline-page"
import { useRouteError, isRouteErrorResponse } from "react-router"

const RootErrorBoundary = () => {
  const error = useRouteError()
  console.error("Root Error Boundary caught:", error)

  if (!navigator.onLine) {
    return <OfflinePage />
  }

  // Якщо це 404 або інша відповідь роутера
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundErrorPage />
    }
    return <InternalServerErrorPage />
  }

  return <InternalServerErrorPage />
}

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/archive",
        element: <ArchivePage />,
      },
      {
        path: "/my-courses",
        element: <MyCoursesPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/courses/:id",
        element: <FullCoursePage />,
      },

      //
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/admin/courses",
        element: <AdminCoursesPage />,
      },
      {
        path: "/admin/courses/:id",
        element: <AdminFullCoursePage />,
      },
      {
        path: "/admin/courses/:id/registrations",
        element: <AdminRegistrationsPage />,
      },
      {
        path: "/admin/registrations",
        element: <AdminRegistrationsPage />,
      },
      {
        path: "/admin/certificates",
        element: <AdminCertificatesPage />,
      },
      {
        path: "/admin/certificates/:id",
        element: <AdminFullCertificatePage />,
      },
      {
        path: "/admin/users",
        element: <AdminUsersPage />,
      },

      //
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/terms-of-use",
        element: <TermsOfUsePage />,
      },

      // auth
      {
        path: "/auth/login",
        element: <AuthPage defaultAuthType="login" />,
      },
      {
        path: "/auth/register",
        element: <AuthPage defaultAuthType="register" />,
      },
      {
        path: "/auth/verify-email",
        element: <AuthPage defaultAuthType="verify-email" />,
      },
      {
        path: "/auth/verified",
        element: <AuthPage defaultAuthType="verified" />,
      },

      {
        path: "/500",
        element: <InternalServerErrorPage />,
      },
      {
        path: "/offline",
        element: <OfflinePage />,
      },
      {
        path: "*",
        element: <NotFoundErrorPage />,
      },
    ],
  },
])
