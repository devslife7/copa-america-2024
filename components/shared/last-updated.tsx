"use client"
import { useFixturesContext } from "@/context/fixtures"
import { cn } from "@/lib/utils"

export default function LastUpdated({ className }: { className?: string }) {
  const { lastUpdated } = useFixturesContext()
  return <div className={cn("text-gray-400 text-sm", className)}>{lastUpdated}</div>
}
