
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva} from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
 
  {
  variants: {
    variant: {
      default: "bg-blue-900 text-white hover:bg-blue-800 transition-colors",
      destructive: "bg-red-600 text-white hover:bg-red-700 transition-colors",
      outline:
        "border border-white text-white bg-transparent hover:bg-blue-800 hover:border-blue-700 transition-colors",
      secondary:
        "bg-white text-blue-900 hover:bg-gray-100 transition-colors",
      ghost:
        "bg-transparent text-white hover:bg-blue-800 transition-colors",
      link: "text-blue-700 underline-offset-4 hover:underline transition-colors",
      success: "bg-green-600 text-white hover:bg-green-700 transition-colors",
    },
    size: {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 rounded-md px-3 text-sm",
      lg: "h-11 rounded-md px-8 text-base",
      icon: "h-10 w-10 p-2 flex items-center justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
}

)



const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
