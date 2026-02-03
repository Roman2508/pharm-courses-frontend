import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import errorImage from "../assets/404-error.png"

const NotFoundErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <img className="w-[16rem] sm:w-[20rem] md:w-[24rem]" src={errorImage} alt="internal server error image" />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-2 text-center">Сторінку не знайдено</h1>
      <p className="text-sm sm:text-base md:text-lg mb-4 text-center">
        Перевірте правильність введеного адресу або повторіть запит пізніше
      </p>

      <Link to="/">
        <Button variant="success">
          <ArrowLeft />
          Повернутись на головну
        </Button>
      </Link>
    </div>
  )
}

export default NotFoundErrorPage
