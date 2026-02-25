import { createAuthClient } from "better-auth/react"
import { adminClient, multiSessionClient } from "better-auth/client/plugins"

const fetchWith5xxRedirect: typeof fetch = async (input, init) => {
  const res = await fetch(input, init)

  if (res.status >= 500 && res.status < 600) {
    // if (res.status === 500) {
    if (typeof window !== "undefined") {
      window.location.replace("/500")
    }
  }

  return res
}

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7777",
  basePath: "/auth",
  plugins: [adminClient(), multiSessionClient()],
  fetch: fetchWith5xxRedirect,
})

export const { signIn, signUp, signOut, useSession, multiSession } = authClient
