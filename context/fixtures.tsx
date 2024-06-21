"use client"
import { getFixtures } from "@/actions/fixtures"
import fixtures2022 from "@/data/fixtures2022.json"
import fixtures2024 from "@/data/fixtures2024.json"
import users from "@/data/predictions-official.json"
import { format } from "date-fns"
import { useContext, useState, useEffect, createContext, ReactNode } from "react"

const groupStageFixturesCount = 24
const initialData = {
  fixtures: {
    upcomingFixtures: {
      upcoming: [],
      past: {},
    },
    groupFixtures: [],
    quarterFinalFixtures: [],
    semiFinalFixtures: [],
    finalFixtures: [],
  },
  users: [],
  lastUpdated: "",
}

interface DataType {
  fixtures: {
    upcomingFixtures: {
      upcoming: any[]
      past: any
    }
    groupFixtures: any[]
    quarterFinalFixtures: any[]
    semiFinalFixtures: any[]
    finalFixtures: any[]
  }
  users: any[]
  lastUpdated: string
}

const FixturesContext = createContext<DataType | undefined>(undefined)

export function FixturesContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataType>(initialData)

  useEffect(() => {
    async function fetchData() {
      const fixtures = await getFixtures()
      setData(parseData(fixtures))
      // console.log("fixtures", fixtures) // SHOWS FIXTURES ONLY
    }
    fetchData()
  }, [])
  return <FixturesContext.Provider value={data}>{children}</FixturesContext.Provider>
}

export function useFixturesContext() {
  const context = useContext(FixturesContext)
  if (context === undefined) {
    throw new Error("Context must be used within a Provider")
  }
  return context
}

function parseData(data: any) {
  if (data === undefined) return initialData
  // Calculate user correct predictions && save fixtures to separate files && save to goblal store
  let upcomingFixtures: any = { upcoming: [], past: {} }
  let groupFixtures: any[] = []
  let quarterFinalFixtures: any[] = []
  let semiFinalFixtures: any[] = []
  let finalFixtures: any[] = []

  // sort by fixture start time
  data.sort((a: any, b: any) => a.fixture.timestamp - b.fixture.timestamp)

  const finalResutlData = data.map((fixture: any) => {
    const gameStatus = fixture.fixture.status.short
    const goalsHome = fixture.goals.home
    const goalsAway = fixture.goals.away
    const homeTeamId = fixture.teams.home.id
    const awayTeamId = fixture.teams.away.id
    const fixtureRound = fixture.league.round

    if (fixtureRound.includes("Group")) groupFixtures.push(fixture)
    else if (fixtureRound.includes("Quarter-finals")) quarterFinalFixtures.push(fixture)
    else if (fixtureRound.includes("Semi-finals")) semiFinalFixtures.push(fixture)
    else if (fixtureRound.includes("Final")) finalFixtures.push(fixture)

    // if match is finished, save id of winning team or "TIE" into return array
    if (gameStatus === "FT" || gameStatus === "PEN") {
      upcomingFixtures.past = fixture // save the last finished fixture
      if (goalsHome === goalsAway) return "TIE"
      else if (goalsHome > goalsAway) return homeTeamId
      else return awayTeamId
    } else if (upcomingFixtures.upcoming.length <= 2) {
      // saves the upcoming or live 2 fixtures
      upcomingFixtures.upcoming.push(fixture)
    }
  })

  // calculate and save user correct predictions and table position
  const usersWithCorrectPredictions = users.map(user => {
    if (finalResutlData.length === 0) return
    let correctPredictions: number = 0
    let correctPredictionsArray: string = ""
    for (let i = 0; i < user.predictions.group_stage.length; i++) {
      if (finalResutlData[i] == user.predictions.group_stage[i]) {
        correctPredictions++
        correctPredictionsArray = correctPredictionsArray + "1"
      } else {
        correctPredictionsArray = correctPredictionsArray + "0"
      }
    }
    return { ...user, correctPredictions, correctPredictionsArray }
  })

  // Sort users alphabetically && Sort by correct predictions
  usersWithCorrectPredictions.sort((a, b) => {
    if (a && b) {
      return a.name.localeCompare(b.name) // Sort by name
    }
    return 0
  })
  usersWithCorrectPredictions.sort((a, b) => {
    if (a && b) {
      return (b.correctPredictions || 0) - (a.correctPredictions || 0) // Sort by prediction
    }
    return 0
  })
  const usersArray = addUserRanking(usersWithCorrectPredictions)

  // returns fixtures and users with correct predictions
  return {
    fixtures: {
      upcomingFixtures,
      groupFixtures,
      quarterFinalFixtures,
      semiFinalFixtures,
      finalFixtures,
    },
    users: usersArray,
    lastUpdated: getLastUpdated(),
  }
}

const getLastUpdated = () => {
  const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  return format(date, "'Last Update:' MMMM d, 'at'  h:mm:ss aaa")
}

// Add user ranking to array (1st, 2nd, 3rd, 4th, 5th, etc.)
const addUserRanking = (users: any) => {
  let userRanking = 1
  let userArray: any = []

  const calcSuperscript = (position: number) =>
    position === 1 ? "st" : position === 2 ? "nd" : position === 3 ? "rd" : "th"

  for (let i = 0; i < users.length; i++) {
    if (i !== 0) users[i].correctPredictions !== users[i - 1].correctPredictions && userRanking++
    userArray = [
      ...userArray,
      { ...users[i], userRanking: { ranking: userRanking, superscript: calcSuperscript(userRanking) } },
    ]
  }
  return userArray
}
