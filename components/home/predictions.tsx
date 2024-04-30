"use client"
import Image from "next/image"
import background from "../../public/images/predictions-background.png"
import userWithCorrectPredictions from "../../data/predictions.json"
import Link from "next/link"
import ExternalLinkSVG from "@/public/svgs/external-link"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useFixturesContext } from "@/context/fixtures"
const LastUpdated = dynamic(() => import("@/components/shared/last-updated"), { ssr: false })

export default function Predictions() {
  const data = useFixturesContext()
  console.log("data from Predictions", data)

  // const data = useFixturesContext()
  // console.log("data", data)
  const renderUserPredictions = () => {
    // Sort users alphabetically && Sort by correct predictions

    userWithCorrectPredictions.sort((a, b) => a.name.localeCompare(b.name)) // Sort by name
    userWithCorrectPredictions.sort((a, b) => (b.correctPredictions || 0) - (a.correctPredictions || 0)) // Sort by prediction
    const userArray = addUserRanking(userWithCorrectPredictions)

    console.log("userArray", userArray)

    return userArray.map((user: any, idx: number) => (
      <div
        key={idx}
        className={cn("flex justify-between text-lg font-bold max-w-[400px] mx-auto", isWinnerStyle(user.userRanking.ranking))}
      >
        <div className="flex">
          <div className="w-9">
            {user.userRanking.ranking}
            <sup>{user.userRanking.superscript}</sup>
          </div>
          <Link
            href={{
              pathname: `/${user.id}`,
              query: {
                points: user.correctPredictions,
                ranking: user.userRanking.ranking,
                superscript: user.userRanking.superscript,
                sortBy: "Group",
                correctPredictionsArray: user.correctPredictionsArray,
              },
            }}
          >
            {user.name}
            <ExternalLinkSVG className="w-[10px] ml-1 inline-block text-gray-400" />
          </Link>
        </div>
        <div className="flex space-x-10">
          <p className="text-xl">
            {user.correctPredictions} <span className="text-sm">pts</span>
          </p>
        </div>
      </div>
    ))
  }

  return (
    <section>
      <div className="relative rounded-[3rem] -mt-11 -mb-14 pt-12 pb-8 px-7 text-white overflow-hidden">
        <Image
          src={background}
          alt="user predictions table"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="z-[-1]"
        />
        <div className="lg:text-center z-10">
          <h2 className="text-4xl font-bold z-50">Predictions</h2>
          <LastUpdated />
        </div>
        <div className="my-10 space-y-6">{renderUserPredictions()}</div>
      </div>
    </section>
  )
}

const isWinnerStyle = (ranking: number) => {
  return ranking === 1 ? "text-green-400" : ranking === 2 ? "text-yellow-200" : ranking === 3 ? "text-blue-400" : ""
}

// Add user ranking to array (1st, 2nd, 3rd, 4th, 5th, etc.)
const addUserRanking = (users: any) => {
  let userRanking = 1
  let userArray: any = []

  const calcSuperscript = (position: number) => (position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th")

  for (let i = 0; i < users.length; i++) {
    if (i !== 0) users[i].correctPredictions !== users[i - 1].correctPredictions && userRanking++
    userArray = [...userArray, { ...users[i], userRanking: { ranking: userRanking, superscript: calcSuperscript(userRanking) } }]
  }
  return userArray
}
