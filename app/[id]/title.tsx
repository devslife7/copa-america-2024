"use client"
import { useFixturesContext } from "@/context/fixtures"
import { usePathname } from "next/navigation"

export default function Title() {
  const { users } = useFixturesContext()
  const pathname = usePathname()
  const id = pathname.split("/")[1]
  const user = users.find(user => user.id == id)

  return <h2 className="font-bold text-3xl pt-2 text-center">{user?.name}</h2>
}
