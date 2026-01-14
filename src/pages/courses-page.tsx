import { Link, useLocation } from 'react-router'

export const CoursesPage = () => {
  const location = useLocation()

  return (
    <div>
      <Link to="/" className={`mr-4 ${location.pathname === '/' ? 'text-primary font-bold' : ''}`}>
        Головна сторінка
      </Link>
      <Link to="/courses" className={`mr-4 ${location.pathname === '/courses' ? 'text-primary font-bold' : ''}`}>
        Курси
      </Link>
      dsiudsaid
    </div>
  )
}
