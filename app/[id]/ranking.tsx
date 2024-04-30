"use client"
import { useFixturesContext } from "@/context/fixtures"
import { usePathname } from "next/navigation"

export default function UserStats() {
  const { users } = useFixturesContext()
  const pathname = usePathname()
  const id = pathname.split("/")[1]
  const user = users.find(user => user.id == id)

  if (user === undefined) return null

  return (
    <>
      <Position user={user} />
      <Points user={user} />
      <Percentage user={user} />
    </>
  )
}

export function Position({ user }: { user?: any }) {
  const ranking = user.userRanking.ranking
  const superscript = user.userRanking.superscript
  return (
    <div className="bg-secondary p-6 rounded-md">
      <div className="text-lg text-gray-200">Position</div>
      <p className="text-2xl">
        {ranking}
        <sup>{superscript}</sup>
      </p>
    </div>
  )
}
export function Points({ user }: { user: any }) {
  const points = user.correctPredictions
  return (
    <div className="bg-secondary p-6 rounded-md">
      <div className="text-lg text-gray-200">Points</div>
      <p className="text-2xl">{points}/39</p>
    </div>
  )
}

export function Percentage({ user }: { user: any }) {
  const points = user.correctPredictions

  const percentage = Math.round((parseInt(points!) / 39) * 100)
  return (
    <div className="bg-secondary p-6 rounded-md">
      <div className="text-lg text-gray-200">Percentage</div>
      <p className="text-2xl">{percentage}%</p>
    </div>
  )
}
