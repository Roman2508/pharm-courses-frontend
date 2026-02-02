import type { FC } from "react"

import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { RichTextEditor } from "./rich-text-editor"
import { DateTimePicker } from "../ui/datetime-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Props {
  label?: string
  name: string
  type: "text" | "email" | "password" | "number" | "date" | "tel" | "url" | "select" | "rich-text"
  placeholder?: string
  value: string
  required?: boolean
  defaultValue?: string
  items?: { label: string; value: string }[]
  error?: string[]
  onChange: (value: string) => void
  className?: string
  [props: string]: any
}

const FormField: FC<Props> = ({
  label,
  type,
  name,
  placeholder,
  required,
  value,
  error,
  onChange,
  defaultValue = "",
  items = [],
  className,
  ...props
}) => {
  if (type === "select") {
    return (
      <div>
        {label && (
          <label
            htmlFor={name}
            className={cn("block text-sm font-medium text-text-primary mb-2", { "text-destructive": error })}
          >
            {label}
            {required ? " *" : ""}
          </label>
        )}
        <Select defaultValue={defaultValue} onValueChange={onChange}>
          <SelectTrigger className={cn({ "border-destructive": error }, className)} id={name}>
            <SelectValue placeholder={placeholder ? placeholder : defaultValue} />
          </SelectTrigger>

          <SelectContent position="popper">
            {items.map((el) => (
              <SelectItem value={el.value}>{el.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  if (type === "rich-text") {
    return (
      <div className="my-6">
        {label && (
          <label
            htmlFor={name}
            className={cn("block text-sm font-medium text-text-primary mb-2", { "text-destructive": error })}
          >
            {label}
            {required ? " *" : ""}
          </label>
        )}
        <RichTextEditor
          content={value}
          onChange={(content) => onChange(content)}
          className={cn({ "border-destructive": error })}
          placeholder="Введіть детальний опис заходу..."
        />
        <p className="text-xs text-text-muted mt-2 opacity-70">
          *Використовуйте панель інструментів для форматування тексту, додавання списків та таблиць
        </p>
      </div>
    )
  }

  if (type === "date") {
    return (
      <div className="my-6">
        {label && (
          <label
            htmlFor={name}
            className={cn("block text-sm font-medium text-text-primary mb-2", { "text-destructive": error })}
          >
            {label}
            {required ? " *" : ""}
          </label>
        )}
        <DateTimePicker
          id={name}
          required={required}
          value={value as unknown as Date}
          onChange={(date) => onChange(date as any)}
          className={cn({ "border-destructive": error })}
        />
      </div>
    )
  }

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className={cn("block text-sm font-medium text-text-primary mb-2", { "text-destructive": error })}
        >
          {label}
          {required ? " *" : ""}
        </label>
      )}
      <Input
        id={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(className, { "border-destructive": error })}
        {...props}
      />
    </div>
  )
}

export default FormField
