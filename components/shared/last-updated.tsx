import { cn } from "@/lib/utils"
import { format } from "date-fns"

export default function LastUpdated({ className }: { className?: string }) {
  const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  const formattedDate = format(date, "'Last Update:' MMMM d, 'at'  h:mm:ss aaa ")
  return <div className={cn("text-gray-400 text-sm", className)}>{formattedDate}</div>
}
