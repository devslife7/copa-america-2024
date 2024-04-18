"use client"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  return (
    <div className="text-5xl font-bold ml-4 absolute" onClick={router.back}>
      {"<"}
    </div>
  )
}
