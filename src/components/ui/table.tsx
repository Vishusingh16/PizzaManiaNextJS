import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div 
    className={cn(
      "relative w-full overflow-hidden", // Changed overflow to hidden for potential inner animations
      "rounded-xl shadow-xl border-2 border-amber-300/70 dark:border-slate-700/50", // More pronounced rounding and shadow
      "bg-white/70 dark:bg-slate-800/40 backdrop-blur-sm" // Subtle background with blur
    )}
  >
    <div className="overflow-auto"> {/* Inner div for scroll, allows outer div to have overflow:hidden */}
      <table
        ref={ref}
        className={cn(
          "w-full caption-bottom text-sm",
          className
        )}
        {...props}
      />
    </div>
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead 
    ref={ref} 
    className={cn(
      // Richer header with a subtle gradient or distinct color
      "sticky top-0 z-10", // Make header sticky if table scrolls
      "bg-gradient-to-br from-amber-300 to-orange-400 dark:from-amber-700 dark:to-orange-800",
      "[&_tr]:border-b-2 [&_tr]:border-orange-500/50 dark:[&_tr]:border-orange-600/50",
      className
    )} 
    {...props} 
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      "divide-y divide-amber-200/60 dark:divide-slate-700/30", // Subtle row dividers
      className
    )}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t-2 border-amber-300 dark:border-slate-600",
      "bg-amber-100/80 dark:bg-slate-700/60 font-semibold", // Slightly more opaque footer
      "[&>tr]:last:border-b-0",
      "text-orange-800 dark:text-amber-300",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-amber-200/60 dark:border-slate-700/30",
      "transition-all duration-200 ease-in-out", // Transition for multiple properties
      // Hover effects:
      "hover:bg-orange-100/90 dark:hover:bg-orange-800/40",
      "hover:shadow-md", // Add a subtle shadow lift on hover
      "hover:scale-[1.01] hover:z-[5]", // Slight scale up and bring to front on hover
      // Selected state:
      "data-[state=selected]:bg-orange-200/90 dark:data-[state=selected]:bg-orange-700/50",
      "data-[state=selected]:shadow-lg data-[state=selected]:scale-[1.02]",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-16 px-5 text-left align-middle font-bold", // Increased height and padding
      "text-white dark:text-yellow-100", // Header text that contrasts with the gradient
      "font-['Nunito',_sans-serif] tracking-wider text-shadow-sm", // Clear font, tracking, subtle shadow
      // "uppercase text-xs", // Optional styling
      "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle min-w-[120px]", // Increased padding, min-width for better layout
      "text-slate-800 dark:text-slate-200",
      "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "py-6 text-lg font-semibold text-orange-700 dark:text-orange-300", // Increased padding, bolder caption
      className
    )}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}