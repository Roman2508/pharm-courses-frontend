import * as XLSX from "xlsx"
import { Upload } from "lucide-react"
import { useState, type FC } from "react"

import { Button } from "@/components/ui/button"
import { useManyRegistrations } from "@/api/hooks/use-registration"
import { toast } from "sonner"

interface Props {
  registrations: any
}

const DownloadRegistrationsButton: FC<Props> = ({ registrations }) => {
  const [isDisabled, setIsDisabled] = useState(false)

  const getRegistrations = useManyRegistrations()

  const fetchData = async () => {
    try {
      if (!registrations || !registrations.length) {
        toast.warning("Реєстрації не вибрано")
        return
      }

      setIsDisabled(true)

      const data = await getRegistrations.mutateAsync(registrations)

      if (!data.length) {
        toast.warning("Реєстрації не знайдено")
        return
      }

      const newData = data.map((reg) => {
        const { course, user, type } = reg

        return {
          ["Реєстраційний номер Провайдера"]: 0,
          ["Реєстраційний номер заходу"]: course.numberOfInclusionToBpr,
          ["Номер сертифіката"]: 0,
          ["Прізвище, власне ім'я, по батькові (за наявності) учасника"]: user.name,
          ["Бали БПР"]: type === "TRAINER" ? course.pointsBpr * 2 : course.pointsBpr,
          ["Дата народження"]: 0,
          ["Засоби зв’язку (електронна адреса)"]: user.email,
          ["Освіта"]: user.education,
          ["Місце роботи"]: user.workplace,
          ["Найменування займаної посади"]: user.jobTitle,
          ["Результати оцінювання за проходження заходу БПР учасників заходу, які отримали сертифікати"]: 0,
        }
      })

      return newData.filter((el: any) => !!Object.keys(el).length)
    } catch (error) {
      console.log(error)
    } finally {
      setIsDisabled(false)
    }
  }

  const handleExportFile = async () => {
    const wb = XLSX.utils.book_new()
    const data = (await fetchData()) as any[]
    const ws = XLSX.utils.json_to_sheet(data)

    let newObj: any = {}
    // Видаляю всі undefined з об`єкта
    for (var k in newObj) {
      if (!newObj[k]) {
        delete newObj[k]
      }
    }
    XLSX.utils.book_append_sheet(wb, ws, "Лист 1")
    XLSX.writeFile(wb, "data.xlsx")
  }

  return (
    <Button
      size="sm"
      variant="primary"
      disabled={isDisabled}
      className="rounded-lg"
      onClick={handleExportFile}
      title="Завантажити реєстрації в xlsx"
    >
      <Upload />
    </Button>
  )
}

export default DownloadRegistrationsButton
