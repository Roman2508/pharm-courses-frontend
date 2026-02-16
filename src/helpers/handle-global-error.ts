import { toast } from "sonner"

type ApiError = { type: "NETWORK_ERROR"; message?: string } | { type: "HTTP_ERROR"; status: number; message?: string }

export const handleGlobalError = (error: unknown) => {
  const err = error as ApiError

  if (err?.type === "NETWORK_ERROR") {
    toast.error("Сервер недоступний. Спробуйте пізніше.")
    return
  }

  if (err?.type === "HTTP_ERROR") {
    if (err.status === 401) {
      window.location.href = "/login"
      return
    }

    if (err.status && err.status >= 500) {
      window.location.href = "/500"
      return
    }

    toast.error(err.message || "Сталася помилка")
    return
  }

  // fallback
  toast.error("Невідома помилка")
}
