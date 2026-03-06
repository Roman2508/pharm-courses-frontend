import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router"

import { RootLayout } from "./components/layouts/root-layout"
import { useRouteError, isRouteErrorResponse } from "react-router"
import PageLoader from "./components/custom/page-loader"

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/home-page"))
const AuthPage = lazy(() => import("./pages/auth-page"))
const ProfilePage = lazy(() => import("./pages/profile-page"))
const ArchivePage = lazy(() => import("./pages/archive-page").then((m) => ({ default: m.ArchivePage })))
const MyCoursesPage = lazy(() => import("./pages/my-courses-page"))
const FullCoursePage = lazy(() => import("./pages/full-course-page"))
const TermsOfUsePage = lazy(() => import("./pages/terms-of-use-page"))
const PrivacyPolicyPage = lazy(() => import("./pages/privacy-policy-page"))
const NotFoundErrorPage = lazy(() => import("./pages/not-found-error-page"))
const InternalServerErrorPage = lazy(() => import("./pages/internal-server-error-page"))
const OfflinePage = lazy(() => import("./pages/offline-page"))

// Admin pages
const AdminPage = lazy(() => import("./pages/admin-page"))
const AdminUsersPage = lazy(() => import("./pages/admin-users-page"))
const AdminCoursesPage = lazy(() => import("./pages/admin-courses-page"))
const AdminFullCoursePage = lazy(() => import("./pages/admin-full-course-page"))
const AdminCertificatesPage = lazy(() => import("./pages/admin-certificates-page"))
const AdminRegistrationsPage = lazy(() => import("./pages/admin-registrations-page"))
const AdminFullCertificatePage = lazy(() => import("./pages/admin-full-certificate-page"))

const RootErrorBoundary = () => {
  const error = useRouteError()
  console.error("Root Error Boundary caught:", error)

  if (!navigator.onLine) {
    return (
      <Suspense fallback={<PageLoader className="h-screen" />}>
        <OfflinePage />
      </Suspense>
    )
  }

  // Якщо це 404 або інша відповідь роутера
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <Suspense fallback={<PageLoader className="h-screen" />}>
          <NotFoundErrorPage />
        </Suspense>
      )
    }
    return (
      <Suspense fallback={<PageLoader className="h-screen" />}>
        <InternalServerErrorPage />
      </Suspense>
    )
  }

  return (
    <Suspense fallback={<PageLoader className="h-screen" />}>
      <InternalServerErrorPage />
    </Suspense>
  )
}

const PageSuspense = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader className="h-screen" />}>{children}</Suspense>
)

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: "/",
        element: (
          <PageSuspense>
            <HomePage />
          </PageSuspense>
        ),
      },
      {
        path: "/archive",
        element: (
          <PageSuspense>
            <ArchivePage />
          </PageSuspense>
        ),
      },
      {
        path: "/my-courses",
        element: (
          <PageSuspense>
            <MyCoursesPage />
          </PageSuspense>
        ),
      },
      {
        path: "/profile",
        element: (
          <PageSuspense>
            <ProfilePage />
          </PageSuspense>
        ),
      },
      {
        path: "/courses/:id",
        element: (
          <PageSuspense>
            <FullCoursePage />
          </PageSuspense>
        ),
      },

      // Admin routes
      {
        path: "/admin",
        element: (
          <PageSuspense>
            <AdminPage />
          </PageSuspense>
        ),
      },
      {
        path: "/admin/courses",
        element: (
          <PageSuspense>
            <AdminCoursesPage />
          </PageSuspense>
        ),
      },
      {
        path: "/admin/courses/:id",
        element: (
          <PageSuspense>
            <AdminFullCoursePage />
          </PageSuspense>
        ),
      },
      {
        path: "/admin/courses/:id/registrations",
        element: (
          <PageSuspense>
            <AdminRegistrationsPage />
          </PageSuspense>
        ),
      },
      {
        path: "/admin/registrations",
        element: (
          <PageSuspense>
            <AdminRegistrationsPage />
          </PageSuspense>
        ),
      },
      {
        path: "/admin/certificates",
        element: (
          <PageSuspense>
            <AdminCertificatesPage />
          </PageSuspense>
        ),
      },
      {
        path: "/admin/certificates/:id",
        element: (
          <PageSuspense>
            <AdminFullCertificatePage />
          </PageSuspense>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <PageSuspense>
            <AdminUsersPage />
          </PageSuspense>
        ),
      },

      //
      {
        path: "/privacy-policy",
        element: (
          <PageSuspense>
            <PrivacyPolicyPage />
          </PageSuspense>
        ),
      },
      {
        path: "/terms-of-use",
        element: (
          <PageSuspense>
            <TermsOfUsePage />
          </PageSuspense>
        ),
      },

      // auth
      {
        path: "/auth/login",
        element: (
          <PageSuspense>
            <AuthPage defaultAuthType="login" />
          </PageSuspense>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <PageSuspense>
            <AuthPage defaultAuthType="register" />
          </PageSuspense>
        ),
      },
      {
        path: "/auth/verify-email",
        element: (
          <PageSuspense>
            <AuthPage defaultAuthType="verify-email" />
          </PageSuspense>
        ),
      },
      {
        path: "/auth/verified",
        element: (
          <PageSuspense>
            <AuthPage defaultAuthType="verified" />
          </PageSuspense>
        ),
      },

      {
        path: "/500",
        element: (
          <PageSuspense>
            <InternalServerErrorPage />
          </PageSuspense>
        ),
      },
      {
        path: "/offline",
        element: (
          <PageSuspense>
            <OfflinePage />
          </PageSuspense>
        ),
      },
      {
        path: "*",
        element: (
          <PageSuspense>
            <NotFoundErrorPage />
          </PageSuspense>
        ),
      },
    ],
  },
])
