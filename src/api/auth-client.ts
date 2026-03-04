import { toast } from "sonner"
import { createAuthClient } from "better-auth/react"
import { adminClient, multiSessionClient } from "better-auth/client/plugins"

const TOAST_IDS = {
  NETWORK: "error-network",
  SERVER: "error-server",
} as const

const fetchWithErrorHandling: typeof fetch = async (input, init) => {
  let res: Response

  try {
    res = await fetch(input, init)
  } catch {
    // ERR_CONNECTION_REFUSED, ERR_NETWORK, offline тощо
    toast.error("Сервер недоступний. Спробуйте пізніше.", {
      id: TOAST_IDS.NETWORK,
    })
    throw new Error("NetworkError")
  }

  if (res.status >= 500) {
    toast.error("Помилка сервера. Спробуйте пізніше.", {
      id: TOAST_IDS.SERVER,
    })
    window.location.replace("/500")
  }

  return res
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7777",
  basePath: "/auth",
  plugins: [adminClient(), multiSessionClient()],
  fetch: fetchWithErrorHandling,
})

export const { signIn, signUp, signOut, useSession, multiSession } = authClient
