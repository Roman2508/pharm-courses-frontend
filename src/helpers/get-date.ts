import { format } from 'date-fns'
import { uk } from 'date-fns/locale'

export const getDate = (date: Date, variant: 'short' | 'long' = 'long') => {
  const dateFormat = variant === 'short' ? 'dd.mm.yyyy' : 'dd MMMM yyyy - HH:mm'
  return format(date, dateFormat, { locale: uk })
}
