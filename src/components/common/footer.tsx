import { Link } from 'react-router'

import logo from '../../assets/logo.png'

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="ЖБФФК" className="h-10 w-auto" />
              <span className="font-bold text-lg text-text-primary">ЖБФФК</span>
            </div>
            <p className="text-text-secondary text-sm max-w-md mb-4">
              Платформа для підвищення кваліфікації фармацевтів та медичних працівників. Сертифіковані програми від
              провідних експертів.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-text-primary mb-4">Навігація</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Головна
                </Link>
              </li>
              <li>
                <Link to="/#courses" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Заходи
                </Link>
              </li>
              <li>
                <Link to="/archive" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Архів
                </Link>
              </li>
              <li>
                <Link to="/my-courses" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Мої заходи
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-text-primary mb-4">Акаунт</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/auth/login" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Увійти
                </Link>
              </li>
              <li>
                <Link to="/auth/sign-up" className="text-sm text-text-secondary hover:text-primary transition-colors">
                  Реєстрація
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">© {new Date().getFullYear()} ЖБФФК. Всі права захищені.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
              Політика конфіденційності
            </Link>
            <Link to="#" className="text-sm text-text-secondary hover:text-primary transition-colors">
              Умови використання
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
