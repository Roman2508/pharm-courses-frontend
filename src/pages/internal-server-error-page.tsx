import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import errorImage from "../assets/500-error.png"

const InternalServerErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6">
      <img className="w-[16rem] sm:w-[20rem] md:w-[24rem]" src={errorImage} alt="internal server error image" />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-2 text-center">Щось пішло не так</h1>
      <p className="text-sm sm:text-base md:text-lg mb-4 text-center">
        Ми вже працюємо над виправленням. Спробуйте зайти трохи пізніше
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

export default InternalServerErrorPage
