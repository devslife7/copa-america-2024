import fixtures from "../data/fixtures2024-final.json"
import predictions from "../data/predictions-official.json"
import archiveInfo from "../data/archive-info.json"
import { fixturesArrayIDs } from "../data/predictionTool"

export interface Fixture {
  fixture: { id: number; timestamp: number; status: { short: string; long: string } }
  league: { season: number; round: string }
  teams: { home: Team; away: Team }
  goals: { home: number | null; away: number | null }
  score: { penalty: { home: number | null; away: number | null } }
}
interface Team { id: number; name: string; logo: string; winner: boolean | null }
const completed = (fixture: Fixture) => ["FT", "PEN", "AET"].includes(fixture.fixture.status.short)
const pairKey = (ids: number[]) => [...ids].sort((a, b) => a - b).join(":")
const winnersOf = (matches: Fixture[]) => matches.filter(completed).map(match => {
  const winner = [match.teams.home, match.teams.away].find(team => team.winner)
  if (!winner) throw new Error(`Missing winner for knockout fixture ${match.fixture.id}`)
  return winner.id
})

export function buildArchive(source: Fixture[] = fixtures) {
  if (source.length !== 32 || new Set(source.map(match => match.fixture.id)).size !== 32 ||
      source.some(match => match.league.season !== 2024 || !completed(match))) {
    throw new Error("The archive requires all 32 completed 2024 fixtures")
  }
  const matches = [...source].sort((a, b) => a.fixture.timestamp - b.fixture.timestamp).map(match => ({
    ...match,
    league: { season: match.league.season, round: match.league.round },
    teams: {
      home: { ...match.teams.home, logo: `/images/teams/${match.teams.home.id}.png` },
      away: { ...match.teams.away, logo: `/images/teams/${match.teams.away.id}.png` },
    },
  }))
  // Predictions are positional in the original entry tool, not API response order.
  const groups = matches.filter(match => match.league.round.includes("Group"))
  const groupFixtures = fixturesArrayIDs.map(ids => {
    const match = groups.find(match => pairKey([match.teams.home.id, match.teams.away.id]) === pairKey(ids))
    if (!match) throw new Error(`Missing group match ${ids.join(" / ")}`)
    return match
  })
  const quarterFinalFixtures = matches.filter(match => match.league.round === "Quarter-finals")
  const semiFinalFixtures = matches.filter(match => match.league.round === "Semi-finals")
  const finalFixtures = matches.filter(match => ["3rd Place Final", "Final"].includes(match.league.round))
  const final = matches.find(match => match.league.round === "Final")
  if (groups.length !== 24 || quarterFinalFixtures.length !== 4 || semiFinalFixtures.length !== 2 || finalFixtures.length !== 2 || !final) {
    throw new Error("Invalid tournament stage counts")
  }
  const quarterFinalsArray = quarterFinalFixtures.flatMap(match => [match.teams.home.id, match.teams.away.id])
  const winners = {
    quarterFinals: winnersOf(quarterFinalFixtures),
    semiFinals: winnersOf(semiFinalFixtures),
    champion: winnersOf([final]),
  }
  const results = groupFixtures.map(match => match.goals.home === match.goals.away ? "TIE" :
    String(match.goals.home! > match.goals.away! ? match.teams.home.id : match.teams.away.id))
  const count = (picks: string[], qualified: number[]) => picks.filter(pick => qualified.includes(Number(pick))).length
  const scored = predictions.map(user => {
    const correctPredictionsArray = user.predictions.group_stage.map((pick, i) => pick === results[i] ? "1" : "0").join("")
    const correctPredictionsQuarterFinals = count(user.predictions.quarter_final, quarterFinalsArray)
    const correctPredictionsSemiFinals = count(user.predictions.semi_final, winners.quarterFinals)
    const correctPredictionsFinals = count(user.predictions.final, winners.semiFinals)
    const correctPredictionsChampion = Number(winners.champion.includes(Number(user.predictions.champion)))
    return { ...user, correctPredictionsArray, correctPredictionsQuarterFinals, correctPredictionsSemiFinals,
      correctPredictionsFinals, correctPredictionsChampion,
      correctPredictions: correctPredictionsArray.split("").filter(value => value === "1").length +
        correctPredictionsQuarterFinals + correctPredictionsSemiFinals + correctPredictionsFinals + correctPredictionsChampion }
  }).sort((a, b) => b.correctPredictions - a.correctPredictions || a.name.localeCompare(b.name, "en"))
  let ranking = 0
  const users = scored.map((user, index) => {
    if (index === 0 || user.correctPredictions !== scored[index - 1].correctPredictions) ranking++
    const lastTwo = ranking % 100
    const superscript = lastTwo >= 11 && lastTwo <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[ranking % 10] || "th")
    return { ...user, userRanking: { ranking, superscript } }
  })
  return {
    fixtures: { upcomingFixtures: { upcoming: [] as Fixture[], past: final }, groupFixtures, quarterFinalFixtures, semiFinalFixtures, finalFixtures },
    users, quarterFinalsArray, winners,
    lastUpdated: `Final results · Archived ${archiveInfo.capturedAt.slice(0, 10)}`,
  }
}

export type ArchiveData = ReturnType<typeof buildArchive>
