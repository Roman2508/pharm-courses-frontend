import { cn } from '@/lib/utils'
import type { FC, PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export const Title: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={cn(`flex items-center gap-3`, className)}>
      <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  )
}
