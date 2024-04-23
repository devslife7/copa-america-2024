"use server"
const fs = require("fs")
import UpdateInfo from "@/data/parsed/update-info.json"
// Mock Rapid API response
import Fixtures from "@/data/fixtures2022.json"
import userPredictions from "@/data/predictions.json"
import { revalidatePath } from "next/cache"

export async function updateData() {
  // Check if data is outdated
  const nowUnixTimestampInSeconds = Date.now() / 1000
  if (nowUnixTimestampInSeconds < UpdateInfo.NextMatchTimestamp) return // returns if data is not outdated
  console.log("Updating data...")
  // update next match timestamp
  // find next match timestamp
  // update next match timestamp

  let nextMatchTimestamp = 0
  let groupFixtures: any[] = []
  let quarterFinalFixtures: any[] = []
  let semiFinalFixtures: any[] = []
  let finalFixtures: any[] = []
  let fixtureFinalResults: (string | number)[] = []
  let usersCorrectPredictions = []

  const data = Fixtures.response.map(fixture => {
    const gameStatus = fixture.fixture.status.short
    const goalsHome = fixture.goals.home
    const goalsAway = fixture.goals.away
    const homeTeamId = fixture.teams.home.id
    const awayTeamId = fixture.teams.away.id
    const fixtureRound = fixture.league.round

    // if match is finished, save id of winning team into array
    if (gameStatus === "FT") {
      if (goalsHome === goalsAway) fixtureFinalResults.push("TIE")
      else if (goalsHome > goalsAway) fixtureFinalResults.push(homeTeamId)
      else fixtureFinalResults.push(awayTeamId)
    }

    // if match has not started and next match timestamp is not set, set next match timestamp
    if (fixture.fixture.status.short === "NS" && nextMatchTimestamp === 0) {
      nextMatchTimestamp = fixture.fixture.timestamp
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

  const usersWithCorrectPredictions = userPredictions.map(user => {
    const { correctPredictions, correctPredictionsArray } = findCorrectPredictions(
      fixtureFinalResults,
      user.predictions.groupStage
    ) as { correctPredictions: number; correctPredictionsArray: string } // Add type assertion here
    return { ...user, correctPredictions, correctPredictionsArray }
  })

  // Update data
  saveData(
    {
      NextMatchTimestamp: nextMatchTimestamp,
    },
    "update-info.json"
  )
  saveData(groupFixtures, "parsed/group-fixtures.json")
  saveData(quarterFinalFixtures, "parsed/quarter-fixtures.json")
  saveData(semiFinalFixtures, "parsed/semis-fixtures.json")
  saveData(finalFixtures, "parsed/finals-fixtures.json")
  saveData(usersWithCorrectPredictions, "predictions.json")

  // revalidate path
  revalidatePath("/")
}

const saveData = (data: any, file: string) => {
  const jsonData = JSON.stringify(data, null, 2)
  fs.writeFileSync(`data/${file}`, jsonData)
}
