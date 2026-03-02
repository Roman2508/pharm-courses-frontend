import { Link, useNavigate } from "react-router"
import { getRGB } from "@/constants/colors"

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import Navigation from "./navigation"
import { Spinner } from "../ui/spinner"
import logo from "../../assets/logo.png"
import { HeaderDrawer } from "./header-drawer"
import { signOut, useSession } from "@/api/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const Header = () => {
  const navigate = useNavigate()

  const { data: session, isPending } = useSession()

  return (
    <header
      className="sticky top-0 z-50 flex items-center w-full px-4 h-16 border-b border-border backdrop-blur"
      style={{ background: getRGB("background", 0.95) }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="hidden"></div>

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-10" />
          <div className="hidden sm:block mt-1">
            <h3 className="font-bold text-lg leading-none">ЖБФФК</h3>
            <h3 className="text-sm text-muted-foreground">Заходи БПР</h3>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <Navigation className="hidden sm:flex gap-6" />

          {isPending ? (
            <div className="w-9">
              <Spinner className="w-5 h-5" />
            </div>
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session.user.image ? session.user.image : undefined} alt="avatar" />
                  <AvatarFallback className="uppercase">{session.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium text-text-primary">{session.user.name}</p>
                  <p className="text-xs text-text-secondary">{session.user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem>Профіль</DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    signOut()
                    navigate("/", { replace: true })
                  }}
                >
                  Вийти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth/login">
                <Button variant="primary" size="sm">
                  Увійти
                </Button>
              </Link>

              <Link to="/auth/register" className="hidden sm:inline-flex">
                <Button size="sm">Зареєструватись</Button>
              </Link>
            </div>
          )}

          <HeaderDrawer />
        </div>
      </div>
    </header>
  )
}

export default Header
