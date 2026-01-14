import { Link } from 'react-router'
import logo from '../../assets/logo.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const Header = () => {
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
            <li>
              <Link to="/">Заходи</Link>
            </li>
            <li>
              <Link to="/archive">Архів</Link>
            </li>
            <li>
              <Link to="/my-courses">Мої заходи</Link>
            </li>
            <li>
              <Link to="/admin">Адміністрування</Link>
            </li>
          </ul>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-text-primary">Admin</p>
                <p className="text-xs text-text-secondary">admin@mail.com</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Профіль</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Вийти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default Header
