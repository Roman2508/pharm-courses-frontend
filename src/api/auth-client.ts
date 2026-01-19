import { createAuthClient } from 'better-auth/react'
import { adminClient, multiSessionClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:7777',
  basePath: '/auth',
  plugins: [adminClient(), multiSessionClient()],
})

export const { signIn, signUp, signOut, useSession, multiSession } = authClient
