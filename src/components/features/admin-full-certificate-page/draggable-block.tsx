// import { GripVertical } from 'lucide-react'
import { CSS } from "@dnd-kit/utilities"
import { useDraggable } from "@dnd-kit/core"
import type { TextBlock } from "./draggable-initial-blocks"

function DraggableBlock({
  block,
  isSelected,
  onSelect,
}: {
  block: TextBlock
  isSelected: boolean
  onSelect: () => void
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: block.id, data: block })

  const style = {
    position: "absolute" as const,
    left: block.x,
    top: block.y,
    width: block.width,
    height: block.height,
    // transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transform: CSS.Translate.toString(transform),
    border: isSelected ? "2px solid #3b82f6" : "2px dashed #94a3b8",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    cursor: "move",
    display: "flex",
    alignItems: "center",
    justifyContent: block.textAlign,
    padding: "8px",
    fontSize: block.fontSize,
    fontFamily: block.fontFamily,
    color: block.color,
    textAlign: block.textAlign,
    boxShadow: isSelected ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
    transition: "box-shadow 0.2s",
  }

  return (
    <div ref={setNodeRef} style={style} onMouseDown={onSelect} {...listeners} {...attributes}>
      {/* <GripVertical className="mr-2 flex-shrink-0" size={16} style={{ color: '#64748b' }} /> */}
      <span className="truncate">{block.label}</span>
    </div>
  )
}

export default DraggableBlock
