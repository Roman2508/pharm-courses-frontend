import type { FC } from "react"
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react"
import { getRGB } from "@/constants/colors"
import type { TextBlock } from "./draggable-initial-blocks"

interface Props {
  label: string
  block: TextBlock
  isSelected: boolean
  onSelect: () => void
  updateBlock: (id: string, key: keyof TextBlock, value: any) => void
}

const PositionInputGroup: FC<Props> = ({ label, block, updateBlock, isSelected, onSelect }) => {
  return (
    <div
      className="p-4 rounded-xl border transition-all"
      style={{
        background: isSelected ? getRGB("primary", 0.05) : getRGB("secondary", 0.05),
        borderColor: isSelected ? getRGB("primary") : getRGB("secondary", 0.1),
        ...(isSelected ? { boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" } : {}),
      }}
      onClick={onSelect}
    >
      <h4 className="font-medium text-text-primary mb-3 flex items-center justify-between">
        {label}
        {isSelected && (
          <span
            className="text-xs text-primary font-normal px-2 py-0.5 rounded-full"
            style={{ background: getRGB("primary", 0.1) }}
          >
            Активний
          </span>
        )}
      </h4>

      <div className="flex flex-col gap-3">
        {/* <div className="grid grid-cols-2 lg:grid-cols-6 gap-3"> */}
        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-20 text-text-secondary mb-1">X</label>
          <input
            type="number"
            value={Math.round(block.x)}
            onChange={(e) => updateBlock(block.id, "x", Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg border border-border bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-20 text-text-secondary mb-1">Y</label>
          <input
            type="number"
            value={Math.round(block.y)}
            onChange={(e) => updateBlock(block.id, "y", Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg border border-border bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-20 text-text-secondary mb-1">Ширина</label>
          <input
            type="number"
            value={Math.round(block.width)}
            onChange={(e) => updateBlock(block.id, "width", Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg border border-border bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-20 text-text-secondary mb-1">Висота</label>
          <input
            type="number"
            value={Math.round(block.height)}
            onChange={(e) => updateBlock(block.id, "height", Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg border border-border bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-20 text-text-secondary mb-1">Розмір</label>
          <input
            type="number"
            value={block.fontSize}
            onChange={(e) => updateBlock(block.id, "fontSize", Number(e.target.value))}
            className="w-full px-2 py-1.5 rounded-lg border border-border bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-20 text-text-secondary mb-1">Шрифт</label>
          <select
            value={block.fontFamily}
            onChange={(e) => updateBlock(block.id, "fontFamily", e.target.value)}
            className="w-full px-2 py-1.5 rounded-lg border border-border bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="Helvetica">Helvetica</option>
            <option value="Times-Roman">Times New Roman</option>
            <option value="Courier">Courier</option>
          </select>
        </div>

        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-20 text-text-secondary mb-1">Жирність</label>
          <select
            value={block.fontWeight || "regular"}
            onChange={(e) => updateBlock(block.id, "fontWeight", e.target.value)}
            className="w-full px-2 py-1.5 rounded-lg border border-border bg-input text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="regular">Regular</option>
            <option value="bold">Bold</option>
          </select>
        </div>

        <div className="lg:col-span-1 flex items-center">
          <label className="block text-sm w-15.5 text-text-secondary mb-1">Колір</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={block.color || "#000000"}
              onChange={(e) => updateBlock(block.id, "color", e.target.value)}
              className="h-8 w-8 rounded cursor-pointer border-0 p-0"
            />
          </div>
        </div>

        <div className="col-span-2 lg:col-span-1 flex items-center">
          <label className="block text-sm w-28 text-text-secondary mb-1">Вирівнювання</label>
          <div className="flex bg-input border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                updateBlock(block.id, "textAlign", "left")
              }}
              className={`flex-1 py-1.5 px-3 cursor-pointer flex justify-center hover:bg-surface-hover ${
                block.textAlign === "left" ? "text-primary" : "text-text-muted"
              } ${block.textAlign === "left" ? "" : ""}`}
              style={block.textAlign === "left" ? { background: getRGB("primary", 0.1) } : {}}
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <div className="w-px bg-border" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                updateBlock(block.id, "textAlign", "center")
              }}
              className={`flex-1 py-1.5 px-3 cursor-pointer flex justify-center hover:bg-surface-hover ${
                block.textAlign === "center" ? "text-primary" : "text-text-muted"
              } ${block.textAlign === "center" ? "" : ""}`}
              style={block.textAlign === "center" ? { background: getRGB("primary", 0.1) } : {}}
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <div className="w-px bg-border" />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                updateBlock(block.id, "textAlign", "right")
              }}
              className={`flex-1 py-1.5 px-3 cursor-pointer flex justify-center hover:bg-surface-hover ${
                block.textAlign === "right" ? "text-primary" : "text-text-muted"
              } ${block.textAlign === "right" ? "" : ""}`}
              style={block.textAlign === "right" ? { background: getRGB("primary", 0.1) } : {}}
            >
              <AlignRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { PositionInputGroup }
