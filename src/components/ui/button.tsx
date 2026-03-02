import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { getRGB } from "@/constants/colors"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover transition-all hover:shadow-lg",
        outline:
          "text-center px-7 py-4 backdrop-blur-sm border-2 border-border text-text-secondary font-bold text-base hover:bg-surface-hover hover:text-text-primary transition-all duration-300",
        destructive:
          "text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        primary: "text-primary hover:bg-primary/20",
        secondary: "text-secondary hover:bg-secondary/20",
        success: "text-success hover:bg-success/20",
        ghost: "bg-surface-hover text-text-secondary hover:bg-border transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-12 rounded-xl text-base gap-1.5 px-3 has-[>svg]:px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

const variantStyles: Record<string, React.CSSProperties> = {
  default: { boxShadow: `0 10px 15px -3px ${getRGB("primary", 0.2)}` },
  outline: { background: getRGB("surface-hover", 0.7), borderColor: getRGB("border") },
  destructive: { background: getRGB("destructive", 0.1) },
  primary: { background: getRGB("primary", 0.1) },
  secondary: { background: getRGB("secondary", 0.1) },
  success: { background: getRGB("success", 0.1) },
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  style,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      style={{ ...variantStyles[variant ?? "default"], ...style }}
      {...props}
    />
  )
}

export { Button, buttonVariants }
