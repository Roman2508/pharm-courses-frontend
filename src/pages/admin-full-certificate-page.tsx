import { toast } from "sonner"
import { Loader2, Move } from "lucide-react"
import { Document, Page, pdfjs } from "react-pdf"
import { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { DndContext, useDroppable, type DragEndEvent } from "@dnd-kit/core"

import {
  type TextBlock,
  DRAGGABLE_INITIAL_BLOCKS,
} from "@/components/features/admin-full-certificate-page/draggable-initial-blocks"
import {
  useGetCertificateTemplate,
  useCreateCertificateTemplate,
  useUpdateCertificateTemplate,
} from "@/api/hooks/use-certificate-template"
import { Button } from "@/components/ui/button"
import FormField from "@/components/custom/form-field"
import DraggableBlock from "@/components/features/admin-full-certificate-page/draggable-block"
import { PositionInputGroup } from "@/components/features/admin-full-certificate-page/position-input-group"

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const AdminFullCertificatePage = () => {
  const params = useParams()
  const navigate = useNavigate()

  const isUpdate = !isNaN(Number(params.id))

  const { data: template, isLoading: isTemplateLoading } = useGetCertificateTemplate(isUpdate ? params?.id : undefined)

  const createTemplate = useCreateCertificateTemplate()
  const updateTemplate = useUpdateCertificateTemplate()

  const pageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [templateName, setTemplateName] = useState("")
  const [pdfFile, setPdfFile] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [blocks, setBlocks] = useState<TextBlock[]>(DRAGGABLE_INITIAL_BLOCKS)
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  const { setNodeRef } = useDroppable({ id: "canvas" })

  // Load template data if editing
  useEffect(() => {
    if (template && isUpdate) {
      setTemplateName(template.name)
      setPdfFile(template.templateUrl)

      // Load text block positions from template
      const loadedBlocks: TextBlock[] = [
        template.namePosition as TextBlock,
        template.courseNamePosition as TextBlock,
        template.courseDatePosition as TextBlock,
        template.certificateNumberPosition as TextBlock,
        template.durationPosition as TextBlock,
        template.pointsPosition as TextBlock,
        template.yearOfInclusionPosition as TextBlock,
        template.numberOfInclusionPosition as TextBlock,
        template.eventTypePosition as TextBlock,
        template.certificateTypePosition as TextBlock,
      ]

      setBlocks(loadedBlocks)
    }
  }, [template, isUpdate])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event

    setBlocks(
      blocks.map((block) => {
        if (block.id === active.id) {
          return {
            ...block,
            x: Math.max(0, block.x + delta.x),
            y: Math.max(0, block.y + delta.y),
          }
        }
        return block
      }),
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file)
      setPdfFile(url)
      setUploadedFile(file)
    } else if (file) {
      toast.error("Будь ласка, виберіть PDF файл")
    }
  }

  const updateBlock = (id: string, key: keyof TextBlock, value: any) => {
    setBlocks((prev) => {
      return prev.map((block) => {
        if (block.id === id) {
          return { ...block, [key]: value }
        }

        return block
      })
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!templateName.trim()) {
      toast.error("Будь ласка, вкажіть назву шаблону")
      return
    }

    if (!isUpdate && !uploadedFile) {
      toast.error("Будь ласка, завантажте PDF файл")
      return
    }

    // Create FormData
    const formData = new FormData()
    formData.append("name", templateName)

    if (uploadedFile) {
      formData.append("templateFile", uploadedFile)
    }

    // Append each text block position as JSON string
    const blockMap = {
      name_position: "namePosition",
      course_name_position: "courseNamePosition",
      course_date_position: "courseDatePosition",
      certificate_number_position: "certificateNumberPosition",
      duration: "durationPosition",
      points: "pointsPosition",
      year_of_inclusion_to_BPR: "yearOfInclusionPosition",
      number_of_inclusion_to_BPR: "numberOfInclusionPosition",
      event_type: "eventTypePosition",
      certificate_type: "certificateTypePosition",
    }

    blocks.forEach((block) => {
      const fieldName = blockMap[block.id as keyof typeof blockMap]
      if (fieldName) {
        formData.append(fieldName, JSON.stringify(block))
      }
    })

    try {
      if (isUpdate && params.id) {
        await updateTemplate.mutateAsync({ id: +params.id, formData })
        navigate(-1)
      } else {
        await createTemplate.mutateAsync(formData)
        navigate(-1)
      }
    } catch (error) {
      // Error handling is done in the mutation hooks
      console.error(error)
    }
  }

  const isLoading = createTemplate.isPending || updateTemplate.isPending

  if (isTemplateLoading && isUpdate) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6 px-4 py-8">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">
          {isUpdate ? "Редагувати шаблон сертифіката" : "Новий шаблон сертифіката"}
        </h1>
        <p className="text-text-secondary mt-2">Змініть налаштування шаблону та розташування полів.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Editor Column */}
        <div className="flex-1 space-y-6">
          <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border p-8">
            <div className="space-y-6">
              <div>
                <FormField
                  name="name"
                  value={templateName}
                  type="text"
                  label="Назва шаблону"
                  onChange={(value) => setTemplateName(value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Завантажити PDF шаблон</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <Button type="button" className="w-full" onClick={() => fileInputRef.current?.click()}>
                  {pdfFile ? "Змінити шаблон" : "Вибрати PDF"}
                </Button>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Налаштування полів</h3>
                <div className="space-y-4">
                  {blocks.map((block) => (
                    <PositionInputGroup
                      block={block}
                      key={block.id}
                      label={block.label}
                      updateBlock={updateBlock}
                      isSelected={selectedBlockId === block.id}
                      onSelect={() => setSelectedBlockId(block.id)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" size="lg" className="flex-3" disabled={isLoading}>
                  {isLoading ? "Збереження..." : template ? "Оновити шаблон" : "Створити шаблон"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  Скасувати
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Preview Column */}
        <div className="flex-3">
          <div className="sticky top-20 bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-surface-hover flex justify-between items-center">
              <h3 className="font-semibold text-text-primary">Попередній перегляд</h3>
              <p className="text-xs text-text-muted">Перетягніть елементи для позиціонування</p>
            </div>
            <div
              className="relative bg-gray-100 overflow-auto min-h-[600px] flex justify-center items-center p-4"
              ref={containerRef}
            >
              {pdfFile ? (
                <div className="relative shadow-lg">
                  <Document
                    file={pdfFile}
                    loading={
                      <div className="flex flex-col items-center justify-center h-64 w-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                        <span className="text-sm text-text-secondary">Завантаження PDF...</span>
                      </div>
                    }
                    error={
                      <div className="flex flex-col items-center justify-center h-64 w-full text-destructive">
                        <span className="font-medium">Помилка завантаження PDF</span>
                        <span className="text-xs mt-1">Перевірте URL або файл</span>
                      </div>
                    }
                  >
                    <Page
                      pageNumber={1}
                      width={900}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      inputRef={pageRef}
                    />
                  </Document>

                  {/* Overlays */}
                  <DndContext onDragEnd={handleDragEnd}>
                    <div ref={setNodeRef}>
                      {blocks.map((block) => (
                        <DraggableBlock
                          key={block.id}
                          block={block}
                          isSelected={selectedBlockId === block.id}
                          onSelect={() => setSelectedBlockId(block.id)}
                        />
                      ))}
                    </div>
                  </DndContext>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-text-muted h-full py-10">
                  <Move className="w-12 h-12 mb-4 opacity-20" />
                  <p>Завантажте PDF шаблон для перегляду</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminFullCertificatePage
