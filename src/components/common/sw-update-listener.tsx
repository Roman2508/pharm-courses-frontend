/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner"
import { useEffect } from "react"
import { RefreshCcw } from "lucide-react"
import { useRegisterSW } from "virtual:pwa-register/react"

import { Button } from "@/components/ui/button"

export const SWUpdateListener = () => {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      console.log("SW Registered:", r)
    },
    onRegisterError(error: any) {
      console.error("SW registration error", error)
    },
  })

  useEffect(() => {
    if (needRefresh) {
      toast("Доступна нова версія сайту", {
        description: "Оновіть сторінку, щоб отримати останні зміни.",
        duration: Infinity,
        action: (
          <Button
            size="sm"
            variant="default"
            onClick={() => {
              updateServiceWorker(true)
            }}
            className="flex items-center gap-2"
          >
            <RefreshCcw className="h-4 w-4" />
            Оновити
          </Button>
        ),
        closeButton: false,
        dismissible: false,
        className: "sw-update-toast",
        onDismiss: () => setNeedRefresh(false),
      })
    }
  }, [needRefresh, setNeedRefresh, updateServiceWorker])

  return null
}
