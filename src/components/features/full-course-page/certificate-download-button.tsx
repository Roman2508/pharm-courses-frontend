import { useState } from "react"
import { PDFDocument, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import { Download } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import type { CourseType } from "@/types/course.type"
import type { RegistrationType } from "@/types/registration.type"

interface CertificateDownloadButtonProps {
  course: CourseType
  registration: RegistrationType
  userName: string
  size?: "lg" | "sm"
  className?: string
}

export const CertificateDownloadButton = ({ course, registration, userName, size = "lg", className = "w-full" }: CertificateDownloadButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCertificate = async () => {
    try {
      setIsGenerating(true)

      if (!course.certificateTemplate) {
        toast.error("Шаблон сертифіката не знайдено для цього курсу")
        return
      }

      // Fetch the PDF template
      const templateUrl = course.certificateTemplate.templateUrl
      const templateResponse = await fetch(templateUrl)
      // const templateResponse = await fetch(`${import.meta.env.VITE_BASE_URL}${templateUrl}`, { credentials: "include" })

      if (!templateResponse.ok) {
        throw new Error("Не вдалося завантажити шаблон сертифіката")
      }

      const templateBytes = await templateResponse.arrayBuffer()
      const pdfDoc = await PDFDocument.load(templateBytes)

      // Register fontkit for custom font support
      pdfDoc.registerFontkit(fontkit)

      const pages = pdfDoc.getPages()
      const firstPage = pages[0]

      // Embed a font that supports Cyrillic characters
      // Using Roboto font stored locally
      const fontUrl = "/fonts/Roboto-Regular.ttf"
      const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer())
      const customFont = await pdfDoc.embedFont(fontBytes)

      // Prepare data for text blocks
      const certificateNumber = `${course.yearOfInclusionToBpr}-${course.numberOfInclusionToBpr}-${registration.id}`
      const courseDate = course.startDate
        ? new Date(course.startDate).toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : ""

      const textBlocksData = {
        namePosition: userName,
        courseNamePosition: course.name,
        courseDatePosition: courseDate,
        certificateNumberPosition: certificateNumber,
        durationPosition: course.duration.toString(),
        pointsPosition: course.pointsBpr.toString(),
        yearOfInclusionPosition: course.yearOfInclusionToBpr.toString(),
        numberOfInclusionPosition: course.numberOfInclusionToBpr.toString(),
        eventTypePosition: "майстер-класу",
        certificateTypePosition: "СЕРТИФІКАТ",
      }

      // Draw text blocks on PDF
      const template = course.certificateTemplate
      const blocks = [
        { position: template.namePosition, text: textBlocksData.namePosition },
        { position: template.courseNamePosition, text: textBlocksData.courseNamePosition },
        { position: template.courseDatePosition, text: textBlocksData.courseDatePosition },
        { position: template.certificateNumberPosition, text: textBlocksData.certificateNumberPosition },
        { position: template.durationPosition, text: textBlocksData.durationPosition },
        { position: template.pointsPosition, text: textBlocksData.pointsPosition },
        { position: template.yearOfInclusionPosition, text: textBlocksData.yearOfInclusionPosition },
        { position: template.numberOfInclusionPosition, text: textBlocksData.numberOfInclusionPosition },
        { position: template.eventTypePosition, text: textBlocksData.eventTypePosition },
        { position: template.certificateTypePosition, text: textBlocksData.certificateTypePosition },
      ]

      blocks.forEach((block) => {
        if (!block.position || !block.text) return

        const { x, y, fontSize, color, textAlign } = block.position

        // Parse color (expecting hex format like "#000000")
        const colorHex = color || "#000000"
        const r = parseInt(colorHex.slice(1, 3), 16) / 255
        const g = parseInt(colorHex.slice(3, 5), 16) / 255
        const b = parseInt(colorHex.slice(5, 7), 16) / 255

        // Calculate text width for alignment using the custom font
        const textWidth = customFont.widthOfTextAtSize(block.text, fontSize || 12)
        let xPosition = x
        if (textAlign === "center") {
          xPosition = x - textWidth / 2
        } else if (textAlign === "right") {
          xPosition = x - textWidth
        }

        // Draw text on page
        // Note: PDF coordinates start from bottom-left, so we need to invert Y
        const pageHeight = firstPage.getHeight()
        const yPosition = pageHeight - y - fontSize

        firstPage.drawText(block.text, {
          x: xPosition,
          y: yPosition,
          size: fontSize || 12,
          font: customFont,
          color: rgb(r, g, b),
        })
      })

      // Save and download the PDF
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: "application/pdf" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `Сертифікат_${course.name}_${userName}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success("Сертифікат успішно завантажено")
    } catch (error) {
      console.error("Error generating certificate:", error)
      toast.error("Помилка генерації сертифіката")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      size={size}
      className={className}
      onClick={generateCertificate}
      disabled={isGenerating || !course.certificateTemplate}
    >
      {isGenerating ? (
        "Генерація сертифіката..."
      ) : (
        <>
          <Download className="w-5 h-5 mr-2" />
          Завантажити сертифікат
        </>
      )}
    </Button>
  )
}
