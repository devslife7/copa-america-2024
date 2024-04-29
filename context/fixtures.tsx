"use client"
import fixtures from "@/data/fixtures2022.json"
import users from "@/data/predictions.json"
import { format } from "date-fns"
import { useContext, useState, useEffect, createContext, ReactNode } from "react"

// type DataType = {
//   fixtures: {
//     upcomingFixtures: {
//       upcoming: any[]
//       past: any
//     }
//     groupFixtures: any[]
//     quarterFinalFixtures: any[]
//     semiFinalFixtures: any[]
//     finalFixtures: any[]
//   }
//   users: any[]
//   lastUpdated: string
// }

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

  function parseData(data: any) {
    if (data === undefined) return initialData
    // Rest of the code...
    // Calculate user correct predictions && save fixtures to separate files && save to zustand store
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
      for (let i = 0; i < finalResutlData.length; i++) {
        if (finalResutlData[i] === user.predictions.groupStage[i]) {
          correctPredictions++
          correctPredictionsArray = correctPredictionsArray + "1"
        } else {
          correctPredictionsArray = correctPredictionsArray + "0"
        }
      }
      return { ...user, correctPredictions, correctPredictionsArray }
    })

    const getLastUpdated = () => {
      const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
      return format(date, "'Last Update:' MMMM d, 'at'  h:mm:ss aaa")
    }

    // returns fixtures and users with correct predictions
    return {
      fixtures: {
        upcomingFixtures,
        groupFixtures,
        quarterFinalFixtures,
        semiFinalFixtures,
        finalFixtures,
      },
      users: usersWithCorrectPredictions,
      lastUpdated: getLastUpdated(),
    }
  }

  const [data, setData] = useState<DataType>(initialData)
  console.log("renders FixturesContextProvider")

  useEffect(() => {
    async function fetchData() {
      // const response = await fetch("https://jsonplaceholder.typicode.com/users")
      // const data = await response.json()
      const data = fixtures.response

      const parsedData: DataType = parseData(data)
      setData(parsedData) // Fix: Cast parsedData as SetStateAction<DataType>
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

// function parseData(data: any) {
//   if (data === undefined) return initialData
//   // Calculate user correct predictions && save fixtures to separate files && save to zustand store
//   let upcomingFixtures: any = { upcoming: [], past: {} }
//   let groupFixtures: any[] = []
//   let quarterFinalFixtures: any[] = []
//   let semiFinalFixtures: any[] = []
//   let finalFixtures: any[] = []

//   // sort by fixture start time
//   data.sort((a: any, b: any) => a.fixture.timestamp - b.fixture.timestamp)

//   const finalResutlData = data.map((fixture: any) => {
//     const gameStatus = fixture.fixture.status.short
//     const goalsHome = fixture.goals.home
//     const goalsAway = fixture.goals.away
//     const homeTeamId = fixture.teams.home.id
//     const awayTeamId = fixture.teams.away.id
//     const fixtureRound = fixture.league.round

//     if (fixtureRound.includes("Group")) groupFixtures.push(fixture)
//     else if (fixtureRound.includes("Quarter-finals")) quarterFinalFixtures.push(fixture)
//     else if (fixtureRound.includes("Semi-finals")) semiFinalFixtures.push(fixture)
//     else if (fixtureRound.includes("Final")) finalFixtures.push(fixture)

//     // if match is finished, save id of winning team or "TIE" into return array
//     if (gameStatus === "FT" || gameStatus === "PEN") {
//       upcomingFixtures.past = fixture // save the last finished fixture
//       if (goalsHome === goalsAway) return "TIE"
//       else if (goalsHome > goalsAway) return homeTeamId
//       else return awayTeamId
//     } else if (upcomingFixtures.upcoming.length <= 2) {
//       // saves the upcoming or live 2 fixtures
//       upcomingFixtures.upcoming.push(fixture)
//     }
//   })

//   // calculate and save user correct predictions and table position
//   const usersWithCorrectPredictions = users.map(user => {
//     if (finalResutlData.length === 0) return
//     let correctPredictions: number = 0
//     let correctPredictionsArray: string = ""
//     for (let i = 0; i < finalResutlData.length; i++) {
//       if (finalResutlData[i] === user.predictions.groupStage[i]) {
//         correctPredictions++
//         correctPredictionsArray = correctPredictionsArray + "1"
//       } else {
//         correctPredictionsArray = correctPredictionsArray + "0"
//       }
//     }
//     return { ...user, correctPredictions, correctPredictionsArray }
//   })

//   const getLastUpdated = () => {
//     const date = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
//     return format(date, "'Last Update:' MMMM d, 'at'  h:mm:ss aaa")
//   }

//   // returns fixtures and users with correct predictions
//   return {
//     fixtures: {
//       upcomingFixtures,
//       groupFixtures,
//       quarterFinalFixtures,
//       semiFinalFixtures,
//       finalFixtures,
//     },
//     users: usersWithCorrectPredictions,
//     lastUpdated: getLastUpdated(),
//   }
// }
