import { toast } from "sonner"
import { useState } from "react"
import fontkit from "@pdf-lib/fontkit"
import { PDFDocument, rgb } from "pdf-lib"
import { Download, File } from "lucide-react"

import { axiosClient } from "@/api/client"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import type { CourseType } from "@/types/course.type"
import type { RegistrationType } from "@/types/registration.type"
import { splitTextIntoLines } from "@/helpers/split-text-into-lines"

const BLOCK_PADDING = 8

interface CertificateDownloadButtonProps {
  userName: string
  course?: CourseType
  registration?: RegistrationType
  size?: "lg" | "sm"
  isLoading?: boolean
  onButtonClick?: () => void
  variant?: "default" | "icon"
  className?: string
}

export const CertificateDownloadButton = ({
  course,
  userName,
  size = "lg",
  registration,
  onButtonClick,
  isLoading = false,
  variant = "default",
  className = "w-full",
}: CertificateDownloadButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateCertificate = async () => {
    try {
      if (!course || !registration) return

      setIsGenerating(true)

      if (!course.certificateTemplate) {
        toast.error("Шаблон сертифіката не знайдено для цього курсу")
        return
      }

      // Fetch the PDF template
      const templateUrl = course.certificateTemplate.templateUrl
      const templateResponse = await fetch(templateUrl)

      if (!templateResponse.ok) {
        throw new Error("Не вдалося завантажити шаблон сертифіката")
      }

      const templateBytes = await templateResponse.arrayBuffer()
      const pdfDoc = await PDFDocument.load(templateBytes)

      // Register fontkit for custom font support
      pdfDoc.registerFontkit(fontkit)

      const pages = pdfDoc.getPages()
      const firstPage = pages[0]

      const pdfWidth = firstPage.getWidth()
      const pdfHeight = firstPage.getHeight()
      const displayWidth = 900
      const scale = pdfWidth / displayWidth

      // Embed a font that supports Cyrillic characters
      // Using Roboto font stored locally
      const regularFontUrl = "/fonts/Roboto-Regular.ttf"
      const boldFontUrl = "/fonts/Roboto-Bold.ttf"

      const regularFontBytes = await fetch(regularFontUrl).then((res) => res.arrayBuffer())
      const boldFontBytes = await fetch(boldFontUrl).then((res) => res.arrayBuffer())

      const regularFont = await pdfDoc.embedFont(regularFontBytes)
      const boldFont = await pdfDoc.embedFont(boldFontBytes)

      const { data } = await axiosClient.get(`/certificate-numbers/${registration.id}`)

      // Prepare data for text blocks
      // const certificateNumber = `${course.yearOfInclusionToBpr}-${course.numberOfInclusionToBpr}-${registration.id}`
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
        certificateNumberPosition: data && data.certificateNumber ? data.certificateNumber : "",
        durationPosition: course.duration.toString(),
        pointsPosition: course.pointsBpr.toString(),
        yearOfInclusionPosition: course.yearOfInclusionToBpr.toString(),
        numberOfInclusionPosition: course.numberOfInclusionToBpr.toString(),
        eventTypePosition: course.type,
        certificateTypePosition: registration.type === "TRAINER" ? "СЕРТИФІКАТ ТРЕНЕРА" : "СЕРТИФІКАТ УЧАСНИКА",
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

        const { x, y, fontSize, color, textAlign, fontWeight } = block.position

        // Вибираємо шрифт в залежності від жирності
        const selectedFont = fontWeight === "bold" ? boldFont : regularFont

        const colorHex = color || "#000000"
        const r = parseInt(colorHex.slice(1, 3), 16) / 255
        const g = parseInt(colorHex.slice(3, 5), 16) / 255
        const b = parseInt(colorHex.slice(5, 7), 16) / 255

        const scaledX = x * scale
        const scaledY = y * scale
        const scaledFontSize = (fontSize || 12) * scale
        const scaledPadding = BLOCK_PADDING * scale
        const scaledWidth = (block.position.width || 200) * scale
        const scaledHeight = (block.position.height || 40) * scale

        const maxTextWidth = scaledWidth - scaledPadding * 2
        const lineHeight = scaledFontSize * 1.2 // відстань між рядками

        // Розбиваємо текст на рядки
        const lines = splitTextIntoLines(block.text, selectedFont, scaledFontSize, maxTextWidth)

        // Загальна висота всього тексту
        const totalTextHeight = lines.length * lineHeight

        // Починаємо з вертикального центру блоку
        const blockCenterY = scaledY + scaledHeight / 2
        const startY = blockCenterY - totalTextHeight / 2

        lines.forEach((line, index) => {
          const lineWidth = selectedFont.widthOfTextAtSize(line, scaledFontSize)
          const lineY = startY + index * lineHeight

          let xPosition = scaledX + scaledPadding
          if (textAlign === "center") {
            xPosition = scaledX + scaledWidth / 2 - lineWidth / 2
          } else if (textAlign === "right") {
            xPosition = scaledX + scaledWidth - scaledPadding - lineWidth
          }

          // Конвертація Y з екранної в PDF систему координат
          const yPosition = pdfHeight - lineY - scaledFontSize

          firstPage.drawText(line, {
            x: xPosition,
            y: yPosition,
            size: scaledFontSize,
            font: selectedFont,
            color: rgb(r, g, b),
          })
        })
      })

      // Save and download the PDF
      const pdfBytes = await pdfDoc.save()
      // @ts-ignore
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

  if (variant === "default") {
    return (
      <Button
        size={size}
        className={className}
        onClick={() => {
          onButtonClick && onButtonClick()
          generateCertificate()
        }}
        disabled={isGenerating || !course?.certificateTemplate || isLoading}
      >
        {isGenerating || isLoading ? (
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

  return (
    <Button
      size={size}
      className={className}
      onClick={() => {
        onButtonClick && onButtonClick()
        generateCertificate()
      }}
      disabled={isGenerating || !course?.certificateTemplate || isLoading}
    >
      {isGenerating || isLoading ? <Spinner /> : <File />}
    </Button>
  )
}
