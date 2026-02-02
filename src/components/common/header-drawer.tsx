import { useState } from "react"
import { Menu, X } from "lucide-react"

import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Navigation from "./navigation"
import { Button } from "@/components/ui/button"

export const HeaderDrawer = () => {
  const [open, onOpenChange] = useState(false)

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button className="block sm:hidden" variant="ghost" onClick={() => onOpenChange(true)}>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b">
          <DrawerTitle className="text-xl flex justify-between items-center">
            Меню
            <Button variant="ghost" className="!p-0 w-10" onClick={() => onOpenChange(false)}>
              <X className="!w-6 !h-6" />
            </Button>
          </DrawerTitle>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto p-4">
          <Navigation onLinkClick={() => onOpenChange(false)} />
        </div>

        <DrawerFooter className="border-t">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Закрити
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
