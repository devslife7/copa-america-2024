import Image from "next/image"
import usersPredictions from "../../data/predictions.json"
import background from "../../public/images/predictions-background.png"
import BackButton from "./back-button"

import { Position, Points, Percentage } from "./ranking"
import { format } from "date-fns"
import Fixtures from "./test"

export default function userPredictions({ params }: { params: any }) {
  const user = usersPredictions.find(user => user.id == params.id)
  if (!user) return <div>User not found</div>

  const LastUpdatedAt = () => {
    const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    console.log("date: ", date)
    return format(date, "'Last Update:' MMMM d, 'at'  h:mm:ss aaa ")
  }

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
      <div className="mx-6 text-gray-400 text-sm mb-[60px]">
        <LastUpdatedAt />
      </div>

      <div>
        <Fixtures user={user} />
      </div>
    </div>
  )
}
