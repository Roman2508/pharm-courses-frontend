import type { FC, PropsWithChildren } from "react"
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { handleGlobalError } from "@/helpers/handle-global-error"

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      handleGlobalError(error)
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      handleGlobalError(error)
    },
  }),
  defaultOptions: {
    queries: { retry: 1 },
  },
})

const TanstackLayout: FC<PropsWithChildren> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default TanstackLayout
