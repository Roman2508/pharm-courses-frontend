import { Bus, CirclePower } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Input } from './components/ui/input'
import { Title } from './components/custom/title'
import { Link, useLocation, useNavigate } from 'react-router'

function App() {
  const location = useLocation()

  return (
    <>
      <Link to="/" className={`mr-4 ${location.pathname === '/' ? 'text-primary font-bold' : ''}`}>
        Головна сторінка
      </Link>
      <Link to="/courses" className={`mr-4 ${location.pathname === '/courses' ? 'text-primary font-bold' : ''}`}>
        Курси
      </Link>

      <Button variant="default">default</Button>
      <Button variant="outline">outline</Button>
      <Button variant="destructive" size="lg">
        destructive
      </Button>
      <Button variant="primary">primary</Button>
      <Button variant="secondary">secondary</Button>

      <Input className="w-50" placeholder="example" />

      <Title>Заголовок 1</Title>
      <Title>Заголовок 2</Title>
      <Title>Заголовок 3</Title>
      <Title>Заголовок 4</Title>
      <Title>329032409342932498</Title>
      <Title>dsfoifsjofdsiiojsdf</Title>
    </>
  )
}

export default App
