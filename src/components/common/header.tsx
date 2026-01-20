import { Link, useNavigate } from 'react-router'
import logo from '../../assets/logo.png'

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { signOut, useSession } from '@/api/auth-client'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Spinner } from '../ui/spinner'
import { Button } from '../ui/button'

const Header = () => {
  const navigate = useNavigate()

  const { data: session, isPending } = useSession()

  return (
    <header className="sticky top-0 z-50 flex items-center w-full px-4 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full">
        <div className="hidden"></div>

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-10" />
          <h3 className="font-bold text-xl">ЖБФФК</h3>
        </Link>

        <div className="flex items-center gap-6">
          <ul className="flex gap-6">
            <li className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              <Link to="/">Заходи</Link>
            </li>
            <li className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              <Link to="/archive">Архів</Link>
            </li>
            <li className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              <Link to="/my-courses">Мої заходи</Link>
            </li>
            <li className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
              <Link to="/admin">Адміністрування</Link>
            </li>
          </ul>

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
                    navigate('/', { replace: true })
                  }}
                >
                  Вийти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Link to="/auth">
                <Button variant="primary" size="sm">
                  Увійти
                </Button>
              </Link>

              <Link to="/auth">
                <Button size="sm">Зареєструватись</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
