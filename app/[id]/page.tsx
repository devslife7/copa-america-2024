import Image from "next/image"
import usersPredictions from "../../data/predictions.json"
import background from "../../public/images/predictions-background.png"
import BackButton from "./back-button"

import UserStats, { Position, Points, Percentage } from "./ranking"
import Fixtures from "./fixtures"
import dynamic from "next/dynamic"
import Title from "./title"
const LastUpdated = dynamic(() => import("@/components/shared/last-updated"), { ssr: false })

export default function userPredictions({ params }: { params: any }) {
  const user = usersPredictions.find(user => user.id == params.id)
  if (!user) return <div>User not found</div>

  return (
    <div className="relative text-white h-[90vh]">
      <Image
        src={background}
        alt="User Predictions"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <div className="pt-2">
        <BackButton />
        <Title />
      </div>

      <div className="flex justify-between mt-8 mb-2 mx-4 font-bold text-center overflow-x-auto">
        <UserStats />
      </div>

      <LastUpdated className=" mx-6 mb-[50px]" />

      <div>
        <Fixtures />
      </div>
    </div>
  )
}
