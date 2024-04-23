"use server"
const fs = require("fs")

import UpdateInfo from "@/data/parsed/update-info.json"

// Mock Rapid API response
import Fixtures from "@/data/fixtures2022.json"
import { revalidatePath } from "next/cache"

export async function updateData() {
  // Check if data is outdated
  const nowUnixTimestampInSeconds = Date.now() / 1000
  if (nowUnixTimestampInSeconds < UpdateInfo.NextMatchTimestamp) return // returns if data is not outdated
  // update next match timestamp
  // find next match timestamp
  // update next match timestamp

  let nextMatchTimestamp = 0
  let groupFixtures = []
  let quarterFinalFixtures = []
  let semiFinalFixtures = []
  let finalFixtures = []
  let fixtureFinalResults = []
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

  // Update data
  // filter and sort group fixtures
  // filter and sort quarter final fixtures
  // filter and sort semi final fixtures
  // filter and sort final fixtures

  // calculate and save user correct predictions and table position

  saveData(
    {
      NextMatchTimestamp: nextMatchTimestamp,
    },
    "update-info.json"
  )
  // revalidate page
  revalidatePath("/[id]/page")
}

const saveData = (data: any, file: string) => {
  const jsonData = JSON.stringify(data, null, 2)
  fs.writeFileSync(`data/parsed/${file}`, jsonData)
}
