import type { FC, PropsWithChildren } from 'react'

export const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full" />
      <h1 className="text-3xl font-bold">{children}</h1>
    </div>
  )
}
