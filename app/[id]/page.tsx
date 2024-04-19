import Image from "next/image"
import usersPredictions from "../../data/predictions.json"
import background from "../../public/images/predictions-background.png"
import BackButton from "./back-button"
import Fixtures from "./fixtures"
import { Position, Points, Percentage } from "./ranking"

export default function userPredictions({ params }: { params: any }) {
  const user = usersPredictions.find(user => user.id == params.id)
  if (!user) return <div>User not found</div>
  const { name, predictionGroupStage } = user

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
        <h2 className="font-bold text-3xl pt-2 text-center">{name}</h2>
      </div>

      <div className="flex justify-between my-8 mx-4 font-bold text-center overflow-x-auto">
        <Position />
        <Points />
        <Percentage />
      </div>

      <div>
        <Fixtures predictionGroupStage={predictionGroupStage} />
      </div>
    </div>
  )
}
