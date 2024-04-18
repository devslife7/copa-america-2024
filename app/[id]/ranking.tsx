"use client"
import { useSearchParams } from "next/navigation"

export function Position() {
  const searchParams = useSearchParams()
  const ranking = searchParams.get("ranking")
  const superscript = searchParams.get("superscript")
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
export function Points() {
  const searchParams = useSearchParams()
  const points = searchParams.get("points")
  return (
    <div className="bg-secondary p-6 rounded-md">
      <div className="text-lg text-gray-200">Points</div>
      <p className="text-2xl">{points}/39</p>
    </div>
  )
}

export function Percentage() {
  const searchParams = useSearchParams()
  const points = searchParams.get("points")

  const percentage = Math.round((parseInt(points!) / 39) * 100)
  return (
    <div className="bg-secondary p-6 rounded-md">
      <div className="text-lg text-gray-200">Percentage</div>
      <p className="text-2xl">{percentage}%</p>
    </div>
  )
}
