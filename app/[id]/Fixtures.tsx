"use client"
import AllFixtures from "@/data/fixtures.json"
import CheckMarkSVG from "@/public/svgs/check-mark"
import Image from "next/image"
import TeamIds from "@/data/team-ids.json"
import { useSearchParams } from "next/navigation"
import XMarkSVG from "@/public/svgs/x-mark"
import CircleSVG from "@/public/svgs/circle"
import { format, fromUnixTime } from "date-fns"

export default function Fixtures({ predictionGroupStage }: { predictionGroupStage: any }) {
  const searchParams = useSearchParams()
  const correctPredictionsArray = searchParams.get("correctPredictionsArray")?.split("") // Gets the string of url and splits it into an array

  console.log("predictionGroupStage", predictionGroupStage)

  const renderFixtures = () => {
    const idx = 1
    const fixture = AllFixtures.response[idx]

    const teamId = predictionGroupStage[idx]
    const isCorrectPrediction = (correctPredictionsArray ?? [])[idx] === "1" ? true : false

    return (
      <div key={fixture.fixture.id} className="flex bg-secondary p-4 my-2">
        <div className="w-10 text-xl text-gray-400 text-center">
          {fixture.fixture.status.short === "FT" ? (
            isCorrectPrediction ? (
              <CheckMarkSVG className="text-green-400 mx-auto mb-1" />
            ) : (
              <XMarkSVG className="text-red-400 text-3xl mx-auto mb-1" />
            )
          ) : (
            <CircleSVG className="text-gray-400 mx-auto mb-1" />
          )}

          {/* <div className="text-xs">{"|"}</div>
          <div className="text-xs">{"|"}</div>
          <div className="text-xs">{"|"}</div>
          <div className="text-xs">{"|"}</div> */}
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="mb-2">{TeamIds[teamId as keyof typeof TeamIds]}</h2>
            {fixture.fixture.status.short === "FT" && (isCorrectPrediction ? <span>+1</span> : <span>+0</span>)}
          </div>

          {renderFixture(fixture)}
        </div>
      </div>
    )

    // return AllFixtures.response.map((fixture: any) => {
    //   return (
    //     <div key={fixture.fixture.id} className="flex justify-between items-center bg-secondary p-4 rounded-md my-2 text-sm">
    //       <div className="flex items-center">
    //         {renderFlag(fixture.teams.home)}
    //         <span className="ml-2">{fixture.teams.home.name}</span>
    //       </div>
    //       <div className="flex items-center">
    //         <span>{fixture.goals.home}</span>
    //         <span> - </span>
    //         <span>{fixture.goals.away}</span>
    //       </div>
    //       <div className="flex items-center">
    //         <span className="mr-2">{fixture.teams.away.name}</span>
    //         {renderFlag(fixture.teams.away)}
    //       </div>
    //     </div>
    //   )
    // })
  }
  return (
    <div>
      <div className="text-3xl m-5 ">Fixtures</div>
      {renderFixtures()}
    </div>
  )
}

const renderFixture = (fixture: any) => {
  return (
    <div className="flex justify-between p-2 bg-gray-800 rounded-md w-full">
      <div>
        <h2 className="mb-1">{fixture.teams.home.name}</h2>
        <h2>{fixture.teams.away.name}</h2>
      </div>
      {fixture.fixture.status.short === "FT" ? (
        <div className="flex">
          <div className="border-r-2 border-gray-600 pr-4">
            <h2 className="mb-1">{fixture.goals.home}</h2>
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
