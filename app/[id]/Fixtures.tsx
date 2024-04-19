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

export default function Fixtures({ predictionGroupStage }: { predictionGroupStage: any }) {
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
              <h2 className="mb-2">{TeamIds[predictionGroupStage[idx] as keyof typeof TeamIds]}</h2>
              {fixture.fixture.status.short === "FT" &&
                ((isCorrectPredictionArray ?? [])[idx] ? <span>+1</span> : <span>+0</span>)}
            </div>

            {renderFixture(fixture)}
          </div>
        </div>
      )
    })
  }
  return <div className="max-w-[700px] mx-auto bg-secondary">{renderFixtures()}</div>
}

const renderFixture = (fixture: any) => {
  return (
    <div className="flex justify-between p-2 bg-gray-800 rounded-md w-full">
      <div>
        <div className="mb-2 flex items-center space-x-3">
          <span>{renderFlag(fixture.teams.home)}</span>
          <span>{fixture.teams.home.name}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>{renderFlag(fixture.teams.away)}</span>
          <span>{fixture.teams.away.name}</span>
        </div>
      </div>
      {fixture.fixture.status.short === "FT" ? (
        <div className="flex">
          <div className="border-r-2 border-gray-600 pr-4 flex flex-col justify-between my-1">
            <h2>{fixture.goals.home}</h2>
            <h2>{fixture.goals.away}</h2>
          </div>
          <div className="flex items-center text-sm">
            <div className="px-4">
              <div>Final</div>
              <span>Score</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-end text-gray-300 text-sm">
          {String(format(fromUnixTime(fixture.fixture.timestamp), "MMMM dd, h aaa"))}
        </div>
      )}
    </div>
  )
}

const renderFlag = (team: any) => {
  const teamsWithFlags = [2382, 7, 26, 6]
  const height = teamsWithFlags.includes(team.id) ? 20 : 32
  return <Image src={team.logo} alt={team.name} width={32} height={height} className="w-full h-auto" />
}
