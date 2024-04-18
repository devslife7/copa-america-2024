"use client"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()
  return (
    <div className="text-5xl font-bold px-4 pb-4 absolute cursor-pointer" onClick={router.back}>
      {"<"}
    </div>
  )
}
