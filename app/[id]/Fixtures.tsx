"use client"
import AllFixtures from "@/data/fixtures.json"
import CheckMarkSVG from "@/public/svgs/check-mark"
import Image from "next/image"
import TeamIds from "@/data/team-ids.json"
import { useSearchParams } from "next/navigation"
import XMarkSVG from "@/public/svgs/x-mark"
import CircleSVG from "@/public/svgs/circle"
import { cn } from "@/lib/utils"
import RenderFixture from "@/components/shared/render-fixture"
import { useState } from "react"

export default function Fixtures({ user }: { user: any }) {
  const searchParams = useSearchParams()
  // const sortBy = searchParams.get("sortBy")
  const [sortBy, setSortBy] = useState("Groups")
  // Gets the string of url and splits it into an array of strings
  const correctPredictionsArrayString = searchParams.get("correctPredictionsArray")?.split("")
  // Converts the array of strings into an array of booleans where 1 is true and 0 is false
  const isCorrectPredictionArray = correctPredictionsArrayString?.map(item => item === "1")

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
                { "bg-gray-100 text-secondary": option === sortBy },
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

  const renderFixtures = (sortBy: string) => {
    if (sortBy === "All") {
      return renderGroupFixtures("All")
    } else if (sortBy === "Groups") {
      return renderGroupFixtures("Group")
    } else if (sortBy === "Quarters") {
      return renderGroupFixtures("Quarter-finals")
    } else if (sortBy === "Semis") {
      return renderGroupFixtures("Semi-finals")
    } else if (sortBy === "Finals") {
      return renderGroupFixtures("Final")
    }
  }

  const filterByGroup = (fixtures: any, filterBy: string) => {
    if (filterBy === "All") return fixtures.response
    return fixtures.response.filter((fixture: any) => {
      return fixture.league.round.includes(filterBy)
    })
  }

  const renderGroupFixtures = (filterBy: string) => {
    let sortedFixtures = filterByGroup(AllFixtures, filterBy)

    return sortedFixtures.map((fixture: any, idx: number) => {
      return (
        <div key={fixture.fixture.id} className="flex h-[140px] p-4 pr-6">
          <div className="relative w-10 text-xl text-gray-400 text-center flex justify-center">
            {fixture.fixture.status.short === "FT" || fixture.fixture.status.short === "PEN" ? (
              (isCorrectPredictionArray ?? [])[idx] ? (
                <CheckMarkSVG className="text-green-400 " />
              ) : (
                <XMarkSVG className="text-red-400 text-3xl" />
              )
            ) : (
              <CircleSVG className="text-gray-400" />
            )}

            <div className={cn("absolute left-4 top-[1.4rem]", { hidden: sortedFixtures.length - 1 === idx })}>
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
              {/* {fixture.fixture.status.short === "FT" &&
                ((isCorrectPredictionArray ?? [])[idx] ? <span>+1</span> : <span>+0</span>)} */}
              <div className="text-sm">{fixture.league.round}</div>
            </div>

            <RenderFixture fixture={fixture} />
          </div>
        </div>
      )
    })
  }

  const renderAllFixtures = () => {
    return AllFixtures.response.map((fixture: any, idx: number) => {
      return (
        <div key={fixture.fixture.id} className="flex h-[140px] p-4 pr-6">
          <div className="relative w-10 text-xl text-gray-400 text-center flex justify-center">
            {fixture.fixture.status.short === "FT" || fixture.fixture.status.short === "PEN" ? (
              (isCorrectPredictionArray ?? [])[idx] ? (
                <CheckMarkSVG className="text-green-400 " />
              ) : (
                <XMarkSVG className="text-red-400 text-3xl" />
              )
            ) : (
              <CircleSVG className="text-gray-400" />
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
              {/* {fixture.fixture.status.short === "FT" &&
                ((isCorrectPredictionArray ?? [])[idx] ? <span>+1</span> : <span>+0</span>)} */}
              <div className="text-sm">{fixture.league.round}</div>
            </div>

            <RenderFixture fixture={fixture} />
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <RenderSortingMenu />
      <div className="max-w-[700px] mx-auto bg-secondary">{renderFixtures(sortBy)}</div>
    </>
  )
}
