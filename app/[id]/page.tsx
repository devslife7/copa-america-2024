import Image from "next/image"
import usersPredictions from "../../data/predictions.json"
import background from "../../public/images/predictions-background.png"
import Link from "next/link"
import Fixtures from "./Fixtures"
import BackButton from "./backButton"

export default function userPredictions({ params }: { params: { id: number } }) {
  const user = usersPredictions.find(user => user.id == params.id)
  if (!user) return <div>User not found</div>
  const { id, name, predictionGroupStage } = user
  console.log("predictionGroupStage", predictionGroupStage)

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
        <div className="bg-secondary p-6 rounded-md">
          <div className="text-lg text-gray-200">Position</div>
          <p className="text-3xl">
            1<sup>st</sup>
          </p>
        </div>
        <div className="bg-secondary p-6 rounded-md">
          <div className="text-lg text-gray-200">Points</div>
          <p className="text-2xl">22/39</p>
        </div>
        <div className="bg-secondary p-6 rounded-md">
          <div className="text-lg text-gray-200">Percentage</div>
          <p className="text-2xl">54%</p>
        </div>
      </div>
      <div>
        <Fixtures predictionGroupStage={predictionGroupStage} />
      </div>
    </div>
  )
}
