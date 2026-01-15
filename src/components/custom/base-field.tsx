import type { FC } from 'react'

import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

interface Props {
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'select'
  placeholder?: string
  value: string
  required?: boolean
  onChange: (value: string) => void
  className?: string
  [props: string]: any
}

const BaseField: FC<Props> = ({ label, type, placeholder, required, value, onChange, className, ...props }) => {
  if (type === 'select') {
    return <div className={cn('', className)}></div>
  }

  return (
    <div className={cn('', className)}>
      <label className="block text-sm font-medium text-text-primary mb-2">
        {label}
        {required ? ' *' : ''}
      </label>
      <Input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  )
}

export default BaseField
