"use client"
import Image from "next/image"
import background from "../../public/images/predictions-background.png"
import Link from "next/link"
import ExternalLinkSVG from "@/public/svgs/external-link"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useFixturesContext } from "@/context/fixtures"
import { useEffect } from "react"
const LastUpdated = dynamic(() => import("@/components/shared/last-updated"), { ssr: false })

export default function Predictions() {
  const { users } = useFixturesContext()
  useEffect(() => {
    console.log("users", users)
  }, [users])

  const renderUserPredictions = () => {
    // console.log("users", users)
    return users.map((user: any, idx: number) => (
      <div
        key={idx}
        className={cn(
          "flex justify-between text-lg font-bold max-w-[400px] mx-auto",
          isWinnerStyle(user.userRanking.ranking)
        )}
      >
        <div className="flex">
          <div className="w-9">
            {user.userRanking.ranking}
            <sup>{user.userRanking.superscript}</sup>
          </div>
          <Link href={`/${user.id}`}>
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
  // FLAG: enable after a few days
  // return ranking === 1 ? "text-green-400" : ranking === 2 ? "text-yellow-200" : ranking === 3 ? "text-blue-400" : ""
  return "text-white"
}
