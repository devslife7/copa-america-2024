import Image from "next/image"
import background from "../../public/images/predictions-background.png"
import userPredictions from "../../data/predictions.json"
import Link from "next/link"
import fixtures from "../../data/fixtures.json"
import { format, compareAsc, isToday, isYesterday } from "date-fns"

export default function Predictions() {
  // Sort by match start time
  fixtures.response.sort((a, b) => {
    return a.fixture.timestamp - b.fixture.timestamp
  })

  // API parsed array of official match results
  const getParsedResultsArray = () => {
    let officialResults: (number | string)[] = []
    fixtures.response.forEach(fixture => {
      const gameStatus = fixture.fixture.status.short
      const goalsHome = fixture.goals.home
      const goalsAway = fixture.goals.away
      const homeTeamId = fixture.teams.home.id
      const awayTeamId = fixture.teams.away.id

      if (gameStatus === "FT") {
        if (goalsHome === goalsAway) officialResults.push("TIE")
        else if (goalsHome > goalsAway) officialResults.push(homeTeamId)
        else officialResults.push(awayTeamId)
      }
    })
    return officialResults
  }

  // Compare official results with user predictions and return how many correct predictions
  const findCorrectPredictions = (parsedResultsArray: (number | string)[], predictions: (number | string)[]) => {
    if (parsedResultsArray.length === 0) return
    let correctPredictions = 0
    for (let i = 0; i < parsedResultsArray.length; i++) {
      parsedResultsArray[i] === predictions[i] && correctPredictions++
    }
    return correctPredictions
  }

  // Add user ranking to array
  const addUserRanking = (users: any) => {
    let userRanking = 1
    let userArray: any = []
    for (let i = 0; i < users.length; i++) {
      if (i !== 0) users[i].correctPredictions !== users[i - 1].correctPredictions && userRanking++
      userArray = [...userArray, { ...users[i], userRanking: userRanking }]
    }
    return userArray
  }

  const renderUserPredictions = () => {
    // Get user points, compare with user preidctions with api parsed array of official match results.
    const userWithCorrectPredictions = userPredictions.map(user => {
      let correctPredictions = findCorrectPredictions(getParsedResultsArray(), user.predictionGroupStage)
      return { ...user, correctPredictions }
    })
    console.log("rightScores", getParsedResultsArray())

    // Sort users alphabetically && Sort by correct predictions
    userWithCorrectPredictions.sort((a, b) => a.name.localeCompare(b.name)) // Sort by name
    userWithCorrectPredictions.sort((a, b) => (b.correctPredictions || 0) - (a.correctPredictions || 0)) // Sort by prediction
    const userArray = addUserRanking(userWithCorrectPredictions)

    return userArray.map((user: any, idx: number) => (
      <div key={idx} className="flex justify-between text-lg font-bold">
        <div className="flex">
          <div className="w-12">
            {user.userRanking}
            {user.userRanking === 1 ? "st" : user.userRanking === 2 ? "nd" : user.userRanking === 3 ? "rd" : "th"}
          </div>
          <Link href={`/${user.id}`}>{user.name}</Link>
        </div>
        <div className="flex space-x-10">
          <p className="text-xl">
            {user.correctPredictions} <span className="text-sm">pts</span>
          </p>
        </div>
      </div>
    ))
  }

  const LastUpdatedAt = () => {
    const date = new Date()
    if (isToday(date)) return format(date, "'Last Updated: Today at' h:mm aaa")
    if (isYesterday(date)) return format(date, "'Last Updated: Yesterday at' h:mm aaa")
    return format(date, "'Last Updated:' MMMM d, 'at'  h:mm aaa ")
  }
  return (
    <section>
      <div className="relative rounded-[3rem] -mt-11 -mb-14 py-12 px-7 text-white overflow-hidden">
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
        <h2 className="text-4xl font-bold">Predictions</h2>
        <div className="text-gray-300 text-sm">
          <LastUpdatedAt />
        </div>
        <div className="my-10 space-y-6">{renderUserPredictions()}</div>
      </div>
    </section>
  )
}
