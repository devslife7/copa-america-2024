import Image from "next/image"
import usersPredictions from "../../data/predictions.json"
import background from "../../public/images/predictions-background.png"
import BackButton from "./back-button"

import { Position, Points, Percentage } from "./ranking"
import Fixtures from "./fixtures"
import LastUpdated from "@/components/shared/last-updated"

export default function userPredictions({ params }: { params: any }) {
  const user = usersPredictions.find(user => user.id == params.id)
  if (!user) return <div>User not found</div>

  return (
    <div className="relative h-screen text-white">
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
        <h2 className="font-bold text-3xl pt-2 text-center">{user.name}</h2>
      </div>

      <div className="flex justify-between mt-8 mb-2 mx-4 font-bold text-center overflow-x-auto">
        <Position />
        <Points />
        <Percentage />
      </div>

      <LastUpdated className=" mx-6 mb-[60px]" />

      <div>
        <Fixtures user={user} />
      </div>
    </div>
  )
}
