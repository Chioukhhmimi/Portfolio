import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const Sheet = React.forwardRef(({ ...props }, ref) => <div ref={ref} {...props} />)
Sheet.displayName = "Sheet"

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = "SheetOverlay"

const SheetPortal = ({ children, ...props }) => <div {...props}>{children}</div>

const SheetTrigger = React.forwardRef(({ asChild, ...props }, ref) => {
  if (asChild) {
    return <div ref={ref} {...props} />
  }
  return <button ref={ref} {...props} />
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <div
      ref={ref}
      className={cn(
        "fixed z-50 gap-4 bg-zinc-900 p-6 shadow-lg inset-y-0 right-0 w-full max-w-sm border-l border-zinc-800 transition-transform duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      {children}
    </div>
  </SheetPortal>
))
SheetContent.displayName = "SheetContent"

export { Sheet, SheetPortal, SheetOverlay, SheetTrigger, SheetContent }