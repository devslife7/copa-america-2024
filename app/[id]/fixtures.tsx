"use client"
import CheckMarkSVG from "@/public/svgs/check-mark"
import TeamIds from "@/data/team-ids.json"
import { usePathname } from "next/navigation"
import XMarkSVG from "@/public/svgs/x-mark"
import CircleSVG from "@/public/svgs/circle"
import { cn } from "@/lib/utils"
import RenderFixture from "@/components/shared/render-fixture"
import { useState } from "react"
import { useFixturesContext } from "@/context/fixtures"

export default function Fixtures() {
  const [sortBy, setSortBy] = useState("Groups")
  const { users, fixtures, quarterFinalsArray, winners } = useFixturesContext()

  const pathname = usePathname()
  const id = pathname.split("/")[1]
  const user = users.find(user => user.id == id)
  if (user === undefined) return null

  const RenderSortingMenu = () => {
    const sortByOptions = ["All", "Groups", "Quarters", "Semis", "Finals"]
    return (
      <div className="flex mb-4 ml-4 gap-2 overflow-auto text-sm text-gray-200">
        {sortByOptions.map(option => {
          return (
            <div
              key={option}
              className={cn(
                "bg-secondary py-2 px-4 rounded-lg",
                { "bg-gray-100 text-secondary": option == sortBy },
                "cursor-pointer"
              )}
              onClick={() => setSortBy(option)}
            >
              {option}
            </div>
          )
        })}
      </div>
    )
  }
  const renderGroupFixtures = () => {
    // Gets the string of url and splits it into an array of strings
    const correctPredictionsArrayString = user.correctPredictionsArray?.split("")
    const isCorrectPredictionArray = correctPredictionsArrayString?.map((item: string) => item === "1")
    const totalCorrectPredictions = isCorrectPredictionArray?.filter((item: boolean) => item === true).length

    return fixtures.groupFixtures.map((fixture: any, idx: number) => {
      return (
        <div key={fixture.fixture.id} className="relative flex h-[140px] p-4 pr-6">
          <span className={cn("absolute bg-gray-700 px-4 py-1 rounded-md top-2 right-6", { hidden: idx !== 0 })}>
            {`+${totalCorrectPredictions} pts`}
          </span>

          <div className="relative w-10 text-xl text-gray-400 text-center flex justify-center">
            {fixture.fixture.status.short === "FT" || fixture.fixture.status.short === "PEN" ? (
              (isCorrectPredictionArray ?? [])[idx] ? (
                <CheckMarkSVG className="text-green-400 " />
              ) : (
                <XMarkSVG className="text-red-400" />
              )
            ) : (
              <CircleSVG className="text-gray-400" />
            )}

            <div className={cn("absolute left-4 top-[1.4rem]", { hidden: fixtures.groupFixtures.length - 1 === idx })}>
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
              <h2 className="mb-2">{TeamIds[user.predictions.group_stage[idx] as keyof typeof TeamIds]}</h2>
              <div className="text-sm">{idx !== 0 && fixture.league.round}</div>
            </div>

            <RenderFixture fixture={fixture} />
          </div>
        </div>
      )
    })
  }
  const renderQuarterFinalsStage = () => {
    let stageFixtures = []
    let userPredictions = []

    // if (stageFixtures.length === 0) return <div className="text-center text-xl mt-10">To Be Determined</div>
    stageFixtures = fixtures.quarterFinalFixtures
    userPredictions = user.predictions.quarter_final

    // stageFixtures?.map((fixture: any) => {
    //   teamsInQuarterFinals?.push(fixture.teams.home.id)
    //   teamsInQuarterFinals?.push(fixture.teams.away.id)
    // })

    return (
      <div className="pb-[40px]">
        <div className="relative pt-4 px-[22.5px] pb-2">
          <span className="absolute bg-gray-700 px-4 py-1 rounded-md top-2 right-6">
            +{user.correctPredictionsQuarterFinals} pts
          </span>
          {userPredictions.map((team: string, idx: number) => {
            return (
              <div key={idx} className="flex">
                <div className="text-center">
                  {quarterFinalsArray.includes(+team) ? (
                    <CheckMarkSVG className="text-green-400" />
                  ) : (
                    <XMarkSVG className="text-red-400" />
                  )}
                  <div className={cn("text-xs", { hidden: userPredictions.length == idx + 1 })}>{"|"}</div>
                </div>
                <div className="ml-2">
                  <h2>{TeamIds[team as keyof typeof TeamIds]}</h2>
                </div>
              </div>
            )
          })}
        </div>
        {stageFixtures.map((fixture: any, idx: number) => {
          return (
            <div key={fixture.fixture.id} className="flex px-6 py-3">
              <RenderFixture fixture={fixture} />
            </div>
          )
        })}
      </div>
    )
  }
  const renderSemiFinals = () => {
    let teamsInQuarterFinals: any = []
    let stageFixtures = []
    let userPredictions = []

    stageFixtures = fixtures.semiFinalFixtures
    userPredictions = user.predictions.semi_final

    // Get teams in semi finals
    fixtures.quarterFinalFixtures.map((fixture: any) => {
      if (fixture.fixture.status.short === "FT" || fixture.fixture.status.short === "PEN") {
        if (fixture.teams.home.winner) {
          teamsInQuarterFinals?.push(fixture.teams.home.id)
        } else {
          teamsInQuarterFinals?.push(fixture.teams.away.id)
        }
      } else {
        teamsInQuarterFinals?.push(fixture.teams.home.id)
        teamsInQuarterFinals?.push(fixture.teams.away.id)
      }
    })

    return (
      <div className="pb-[40px]">
        <div className="relative pt-4 px-[22.5px] pb-2">
          <span className="absolute bg-gray-700 px-4 py-1 rounded-md top-2 right-6">
            +{user.correctPredictionsSemiFinals} pts
          </span>
          {userPredictions.map((team: string, idx: number) => {
            return (
              <div key={idx} className="flex">
                <div className="text-center">
                  {winners.quarterFinals.includes(+team) ? (
                    <CheckMarkSVG className="text-green-400" />
                  ) : teamsInQuarterFinals.includes(+team) ? (
                    <CircleSVG className="text-gray-400" />
                  ) : (
                    <XMarkSVG className="text-red-400" />
                  )}
                  <div className={cn("text-xs", { hidden: userPredictions.length == idx + 1 })}>{"|"}</div>
                </div>
                <div className="ml-2">
                  <h2>{TeamIds[team as keyof typeof TeamIds]}</h2>
                </div>
              </div>
            )
          })}
        </div>
        {stageFixtures.map((fixture: any, idx: number) => {
          return (
            <div key={fixture.fixture.id} className="flex px-6 py-3">
              <RenderFixture fixture={fixture} />
            </div>
          )
        })}
      </div>
    )
  }
  const renderFinals = () => {
    let officialChampion: string = ""
    const teamsInFinals: number[] = []
    const championPrediction: string = user.predictions.champion
    const finalsPredictions: string[] = user.predictions.final

    // Final matches
    const finalMatch = fixtures.finalFixtures[1] ? fixtures.finalFixtures[1] : {}
    const thirdPlaceMatch = fixtures.finalFixtures[0] ? fixtures.finalFixtures[0] : {}

    // Get teams in finals
    fixtures.semiFinalFixtures.map((fixture: any) => {
      if (fixture.fixture.status.short === "FT" || fixture.fixture.status.short === "PEN") {
        if (fixture.teams.home.winner) {
          teamsInFinals.push(fixture.teams.home.id)
        } else {
          teamsInFinals.push(fixture.teams.away.id)
        }
      }
    })

    // Get champion
    if (finalMatch.fixture) {
      if (
        finalMatch.fixture.status.short === "FT" ||
        finalMatch.fixture.status.short === "PEN" ||
        finalMatch.fixture.status.short === "AET"
      ) {
        if (finalMatch.teams.home.winner) {
          officialChampion = finalMatch.teams.home.id
        } else {
          officialChampion = finalMatch.teams.away.id
        }
      } else {
        officialChampion = finalMatch.teams.home.id
        officialChampion = finalMatch.teams.away.id
      }
    }

    return (
      <>
        <div className="relative pt-4 px-[22.5px] pb-6">
          <span className="absolute bg-gray-700 px-4 py-1 rounded-md top-2 right-6">
            +{user.correctPredictionsFinals + user.correctPredictionsChampion} pts
          </span>

          <div className="space-y-2 mb-8">
            <h2 className="text-xl">Champion</h2>
            <div className="flex space-x-2 text-center">
              {championPrediction == officialChampion ? (
                <CheckMarkSVG className="text-green-400" />
              ) : (
                <XMarkSVG className="text-red-400" />
              )}
              {/* {championPrediction == officialChampion ? (
                <CheckMarkSVG className="text-green-400" />
              ) : false ? (
                <XMarkSVG className="text-red-400" />
              ) : (
                <CircleSVG className="text-gray-400" />
              )} */}
              <h2>{TeamIds[championPrediction as keyof typeof TeamIds]}</h2>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-xl mb-2">Final</h2>
            <div className="flex space-x-2">
              {teamsInFinals.includes(+finalsPredictions[0]) ? (
                <CheckMarkSVG className="text-green-400" />
              ) : (
                <XMarkSVG className="text-red-400" />
              )}
              <h2>{TeamIds[finalsPredictions[0] as keyof typeof TeamIds]}</h2>
            </div>
            {/* <div className="text-xs ml-[9.5px] mb-[2px]">{"|"}</div> */}
            <div className="flex space-x-2 mt-2">
              {teamsInFinals.includes(+finalsPredictions[1]) ? (
                <CheckMarkSVG className="text-green-400" />
              ) : (
                <XMarkSVG className="text-red-400" />
              )}
              <h2>{TeamIds[finalsPredictions[1] as keyof typeof TeamIds]}</h2>
            </div>
            <div className=" py-3">
              <RenderFixture fixture={finalMatch} />
            </div>
          </div>

          {/* <div className="py-3">
            <h2 className="text-xl mb-2">3rd Place</h2>
            <RenderFixture fixture={thirdPlaceMatch} />
          </div> */}
        </div>
      </>
    )
  }

  return (
    <>
      <RenderSortingMenu />
      <div className="max-w-[700px] mx-auto bg-secondary">
        {sortBy === "Groups" && renderGroupFixtures()}
        {sortBy === "Quarters" && renderQuarterFinalsStage()}
        {sortBy === "Semis" && renderSemiFinals()}
        {sortBy === "Finals" && renderFinals()}
        {sortBy === "All" && (
          <>
            {renderGroupFixtures()}
            <div className="px-6 text-xl mt-8">Quarter Finals</div>
            {renderQuarterFinalsStage()}
            <div className="px-6 text-xl mt-10">Semi Finals</div>
            {renderSemiFinals()}
            {renderFinals()}
          </>
        )}
      </div>
    </>
  )
}
