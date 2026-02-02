import { createAuthClient } from "better-auth/react"
import { createAccessControl } from "better-auth/plugins"
import { adminClient, multiSessionClient } from "better-auth/client/plugins"
import { adminAc, defaultStatements } from "better-auth/plugins/organization/access"

// const statement = {
//   ...defaultStatements,
//   project: ["create", "share", "update", "delete"],
// } as const

// const ac = createAccessControl(statement)

// export const user = ac.newRole({ project: ["create"] })
// const admin = ac.newRole({ project: ["create", "update"], ...adminAc.statements })

// /*  */

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:7777",
  basePath: "/auth",
  plugins: [
    // { roles: { admin, user } }
    adminClient(),
    multiSessionClient(),
  ],
})

export const { signIn, signUp, signOut, useSession, multiSession } = authClient
