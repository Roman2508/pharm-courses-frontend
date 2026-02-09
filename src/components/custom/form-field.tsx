import type { FC } from "react"

import { cn } from "@/lib/utils"
import { Input } from "../ui/input"
import { AsyncSelect } from "../ui/async-select"
import type { UserType } from "@/types/user.type"
import { RichTextEditor } from "./rich-text-editor"
import { DateTimePicker } from "../ui/datetime-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FormFieldTypes =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "tel"
  | "url"
  | "select"
  | "async-select"
  | "rich-text"

interface Props {
  label?: string
  name: string
  type: FormFieldTypes
  placeholder?: string
  value: string
  required?: boolean
  defaultValue?: string
  items?: { label: string; value: string }[]
  error?: string[]
  onChange: (value: string) => void
  fetcher?: (query?: string | undefined) => Promise<any[]>
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
  fetcher = async (query?: string | undefined): Promise<any> => {
    query
  },
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

  if (type === "async-select") {
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
        <AsyncSelect<UserType>
          fetcher={fetcher}
          renderOption={(user) => (
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground">{user.role}</div>
              </div>
            </div>
          )}
          getOptionValue={(user) => user.id}
          getDisplayValue={(user) => (
            <div className="flex items-center gap-2 text-left">
              <div className="flex flex-col leading-tight">
                <div className="font-medium">{user.name}</div>
                <div className="text-xxs text-muted-foreground">{user.role}</div>
              </div>
            </div>
          )}
          notFound={<div className="py-6 text-center text-sm">Нічого не знайдено</div>}
          label="Пошук"
          placeholder="Пошук..."
          value={defaultValue || value}
          onChange={onChange}
        />
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
