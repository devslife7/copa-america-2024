import Image from "next/image"
import background from "../../public/images/predictions-background.png"
import userPredictions from "../../data/predictions.json"
import Link from "next/link"

export default function Predictions() {
  const renderUserPredictions = () => {
    // get official results
    // const officialResults = getOfficialResult()

    // Add user right matches
    // const userRightMatches = userData.map(user => {
    //   let rightMatches = findCorrectPredictions(officialResults, user.predictionsGS)
    //   return { ...user, rightMatches: rightMatches }
    // })

    // Sort users alphabetically || Sort by correct predictions || Add right matches
    // userRightMatches.sort((a, b) => a.first_name.localeCompare(b.first_name))
    // userRightMatches.sort((a, b) => b.rightMatches - a.rightMatches)
    // const userArray = addUserRanking(userRightMatches)
    return userPredictions.map((user, idx) => (
      <div key={idx} className="flex justify-between text-lg font-bold">
        <Link href={`/${user.id}`}>
          {idx + 1}
          st {user.name}
        </Link>
        <div className="flex space-x-10">
          <p className="text-xl">
            22 <span className="text-sm">pts</span>
          </p>
        </div>
      </div>
    ))
  }
  return (
    <div>
      <div className="relative rounded-[3rem] -mt-14 p-12 text-white overflow-hidden">
        <Image src={background} className=" -z-10 h-full w-full object-cover" fill alt="prediction table" />
        <h2 className="text-4xl font-bold">Predictions</h2>
        <div className="my-10 space-y-6">{renderUserPredictions()}</div>
      </div>
    </div>
  )
}
