"use client"
import AllFixtures from "@/data/fixtures.json"
import CheckMarkSVG from "@/public/svgs/check-mark"
import Image from "next/image"
import TeamIds from "@/data/team-ids.json"
import { useSearchParams } from "next/navigation"
import XMarkSVG from "@/public/svgs/x-mark"
import CircleSVG from "@/public/svgs/circle"
import { format, fromUnixTime } from "date-fns"
import { cn } from "@/lib/utils"
import RenderFixture from "@/components/shared/render-fixture"

export default function Fixtures({ user }: { user: any }) {
  const searchParams = useSearchParams()
  // Gets the string of url and splits it into an array of strings
  const correctPredictionsArrayString = searchParams.get("correctPredictionsArray")?.split("")
  // Converts the array of strings into an array of booleans where 1 is true and 0 is false
  const isCorrectPredictionArray = correctPredictionsArrayString?.map(item => item === "1")

  const renderFixtures = () => {
    return AllFixtures.response.map((fixture: any, idx: number) => {
      return (
        <div key={fixture.fixture.id} className="flex h-[140px] p-4 pr-6">
          <div className="relative w-10 text-xl text-gray-400 text-center">
            {fixture.fixture.status.short === "FT" || fixture.fixture.status.short === "PEN" ? (
              (isCorrectPredictionArray ?? [])[idx] ? (
                <CheckMarkSVG className="text-green-400 mx-auto mb-1" />
              ) : (
                <XMarkSVG className="text-red-400 text-3xl mx-auto mb-1" />
              )
            ) : (
              <CircleSVG className="text-gray-400 mx-auto mb-1" />
            )}

            <div className={cn("absolute left-4 top-[1.4rem]", { hidden: AllFixtures.response.length - 1 === idx })}>
              <div className="text-xs">{"|"}</div>
              <div className="text-xs">{"|"}</div>
              <div className="text-xs">{"|"}</div>
              <div className="text-xs">{"|"}</div>
              <div className="text-xs">{"|"}</div>
              <div className="text-xs">{"|"}</div>
              <div className="text-xs">{"|"}</div>
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-between">
              <h2 className="mb-2">{TeamIds[user.predictionGroupStage[idx] as keyof typeof TeamIds]}</h2>
              {fixture.fixture.status.short === "FT" &&
                ((isCorrectPredictionArray ?? [])[idx] ? <span>+1</span> : <span>+0</span>)}
            </div>

            <RenderFixture fixture={fixture} />
          </div>
        </div>
      )
    })
  }
  return <div className="max-w-[700px] mx-auto bg-secondary">{renderFixtures()}</div>
}
