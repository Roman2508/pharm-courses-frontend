import * as XLSX from "xlsx"
import { toast } from "sonner"
import { Upload } from "lucide-react"
import { useState, type FC } from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { useExportRegistrations } from "@/api/hooks/use-registration"

interface Props {
  registrations: number[]
}

const DownloadRegistrationsButton: FC<Props> = ({ registrations }) => {
  const [isDisabled, setIsDisabled] = useState(false)

  const exportRegistrations = useExportRegistrations()

  const fetchData = async () => {
    try {
      if (!registrations || !registrations.length) {
        toast.warning("Реєстрації не вибрано")
        return
      }
      setIsDisabled(true)
      const results = await exportRegistrations.mutateAsync(registrations)
      return results
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
      {isDisabled ? <Spinner /> : <Upload />}
    </Button>
  )
}

export default DownloadRegistrationsButton
