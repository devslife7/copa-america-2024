"use client"
import fixtures from "@/data/fixtures2022.json"

export default function FetchFixtures() {
  console.log("Fetching fixtures... from layout")

  // fetch fixtures
  const data = fixtures.response

  // make computation logic
  let upcomingFixtures: any = { upcoming: [], past: {} }
  let groupFixtures: any[] = []
  let quarterFinalFixtures: any[] = []
  let semiFinalFixtures: any[] = []
  let finalFixtures: any[] = []
  let fixtureFinalResults: (string | number)[] = []

  // sort by timestamp
  data.map(fixture => {
    const gameStatus = fixture.fixture.status.short
    const goalsHome = fixture.goals.home
    const goalsAway = fixture.goals.away
    const homeTeamId = fixture.teams.home.id
    const awayTeamId = fixture.teams.away.id
    const fixtureRound = fixture.league.round

    // if match is finished, save id of winning team into array
    if (gameStatus === "FT" || gameStatus === "PEN") {
      upcomingFixtures.past = fixture // save the last finished fixture
      if (goalsHome === goalsAway) fixtureFinalResults.push("TIE")
      else if (goalsHome > goalsAway) fixtureFinalResults.push(homeTeamId)
      else fixtureFinalResults.push(awayTeamId)
    } else if (upcomingFixtures.upcoming.length <= 2) {
      // saves the upcoming or live 2 fixtures
      upcomingFixtures.upcoming.push(fixture)
    }

    if (fixtureRound.includes("Group")) groupFixtures.push(fixture)
    else if (fixtureRound.includes("Quarter-finals")) quarterFinalFixtures.push(fixture)
    else if (fixtureRound.includes("Semi-finals")) semiFinalFixtures.push(fixture)
    else if (fixtureRound.includes("Final")) finalFixtures.push(fixture)
  })

  // calculate and save user correct predictions and table position

  // Compare official results with user predictions and return how many correct predictions
  const findCorrectPredictions = (parsedResultsArray: (number | string)[], predictions: (number | string)[]) => {
    if (parsedResultsArray.length === 0) return
    let correctPredictions: number = 0
    let correctPredictionsArray: string = ""
    for (let i = 0; i < parsedResultsArray.length; i++) {
      if (parsedResultsArray[i] === predictions[i]) {
        correctPredictions++
        correctPredictionsArray = correctPredictionsArray + "1"
      } else {
        correctPredictionsArray = correctPredictionsArray + "0"
      }
    }
    return { correctPredictions, correctPredictionsArray }
  }

  // const usersWithCorrectPredictions = userPredictions.map(user => {
  //   const { correctPredictions, correctPredictionsArray } = findCorrectPredictions(
  //     fixtureFinalResults,
  //     user.predictions.groupStage
  //   ) as { correctPredictions: number; correctPredictionsArray: string } // Add type assertion here
  //   return { ...user, correctPredictions, correctPredictionsArray }
  // })

  // Update data
  // saveData(
  //   {
  //     NextMatchTimestamp: nextMatchTimestamp,
  //   },
  //   "update-info.json"
  // )
  // saveData(groupFixtures, "parsed/group-fixtures.json")
  // saveData(quarterFinalFixtures, "parsed/quarter-fixtures.json")
  // saveData(semiFinalFixtures, "parsed/semis-fixtures.json")
  // saveData(finalFixtures, "parsed/finals-fixtures.json")
  // saveData(usersWithCorrectPredictions, "predictions.json")

  // save to zustand store
  return <></>
}
