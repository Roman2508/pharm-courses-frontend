import { toast } from "sonner"
import { HttpError, NetworkError } from "./api-error"

// Sonner підтримує стабільний toastId — якщо тост з таким id вже відображається,
// новий виклик просто оновить його замість створення дубля.
const TOAST_IDS = {
  NETWORK: "error-network",
  SERVER: "error-server",
  UNKNOWN: "error-unknown",
} as const

export const handleGlobalError = (error: unknown): void => {
  if (error instanceof NetworkError) {
    toast.error("Сервер недоступний. Спробуйте пізніше.", {
      id: TOAST_IDS.NETWORK,
    })
    return
  }

  if (error instanceof HttpError) {
    if (error.status === 401) {
      // Redirect — не показуємо тост, бо юзер побачить login page
      window.location.href = "/login"
      return
    }

    if (error.status >= 500) {
      toast.error("Помилка сервера. Спробуйте пізніше.", {
        id: TOAST_IDS.SERVER,
      })
      return
    }

    // 4xx — унікальний тост для кожного повідомлення (різні помилки валідації тощо)
    // Дедуплікуємо по тексту помилки щоб паралельні однакові запити не спамили
    toast.error(error.message, {
      id: `error-${error.status}-${error.message}`,
    })
    return
  }

  toast.error("Невідома помилка", {
    id: TOAST_IDS.UNKNOWN,
  })
}

// import { toast } from "sonner"

// type ApiError = { type: "NETWORK_ERROR"; message?: string } | { type: "HTTP_ERROR"; status: number; message?: string }

// export const handleGlobalError = (error: unknown) => {
//   const err = error as ApiError

//   if (err?.type === "NETWORK_ERROR") {
//     toast.error("Сервер недоступний. Спробуйте пізніше.")
//     return
//   }

//   if (err?.type === "HTTP_ERROR") {
//     if (err.status === 401) {
//       window.location.href = "/login"
//       return
//     }

//     if (err.status && err.status >= 500) {
//       window.location.href = "/500"
//       return
//     }

//     toast.error(err.message || "Сталася помилка")
//     return
//   }

//   // fallback
//   toast.error("Невідома помилка")
// }
