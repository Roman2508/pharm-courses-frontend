import { createAuthClient } from "better-auth/react"
import { adminClient, multiSessionClient } from "better-auth/client/plugins"

const fetchWith500Redirect: typeof fetch = async (input, init) => {
  const res = await fetch(input, init);

  if (res.status === 500) {
    if (typeof window !== "undefined") {
      window.location.href = "/500";
    }
  }

  return res;
};

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7777",
  basePath: "/auth",
  plugins: [adminClient(), multiSessionClient()],
   fetch: fetchWith500Redirect,
})

export const { signIn, signUp, signOut, useSession, multiSession } = authClient
