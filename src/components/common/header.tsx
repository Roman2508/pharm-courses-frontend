import { Link } from 'react-router'
import logo from '../../assets/logo.png'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center w-full px-4 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between w-full">
        <div className="hidden"></div>

        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-10" />
          <h3 className="font-bold text-xl">ЖБФФК</h3>
        </Link>

        <div>
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
        </div>
      </div>
    </header>
  )
}

export default Header
