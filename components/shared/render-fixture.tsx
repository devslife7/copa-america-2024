import { cn } from "@/lib/utils"
import { format, fromUnixTime } from "date-fns"
import Image from "next/image"

const defaultFixture = {
  fixture: {
    id: 312547,
    referee: "N. Pitana",
    timezone: "UTC",
    date: "2021-06-14T00:00:00+00:00",
    timestamp: 1623628800,
    periods: {
      first: 1623628800,
      second: 1623632400,
    },
    venue: {
      id: 235,
      name: "Arena Pantanal",
      city: "Cuiabá, Mato Grosso",
    },
    status: {
      long: "Match Finished",
      short: "FT",
      elapsed: 90,
    },
  },
  league: {
    id: 9,
    name: "Copa America",
    country: "World",
    logo: "https://media.api-sports.io/football/leagues/9.png",
    flag: null,
    season: 2021,
    round: "Group B - 1",
  },
  teams: {
    home: {
      id: 8,
      name: "Colombia",
      logo: "https://media.api-sports.io/football/teams/8.png",
      winner: true,
    },
    away: {
      id: 2382,
      name: "Ecuador",
      logo: "https://media.api-sports.io/football/teams/2382.png",
      winner: false,
    },
  },
  goals: {
    home: 1,
    away: 0,
  },
  score: {
    halftime: {
      home: 1,
      away: 0,
    },
    fulltime: {
      home: 1,
      away: 0,
    },
    extratime: {
      home: null,
      away: null,
    },
    penalty: {
      home: null,
      away: null,
    },
  },
}

type FixtureType = typeof defaultFixture

export default function RenderFixture({
  fixture = defaultFixture,
  tbd,
  className,
}: {
  fixture: FixtureType
  tbd?: boolean
  className?: string
}) {
  if (fixture.teams === undefined) return null
  return (
    <div
      className={cn("flex justify-between p-2 bg-gray-800 rounded-md w-full text-white max-w-[600px] mx-auto", className)}
    >
      <div>
        <div className="mb-2 flex items-center space-x-3">
          <span>{renderFlag(fixture.teams.home)}</span>
          <span>{fixture.teams.home.name}</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>{renderFlag(fixture.teams.away)}</span>
          <span>{fixture.teams.away.name}</span>
        </div>
      </div>
      <RenderScore {...fixture} />
    </div>
  )
}

const renderFlag = (team: any) => {
  const teamsWithFlags = [2382, 7, 26, 6]
  const height = teamsWithFlags.includes(team.id) ? 11 : 22
  return <Image src={team.logo} alt={team.name} width={22} height={height} className="" />
}

const RenderScore = (fixture: FixtureType) => {
  const status = fixture.fixture.status.short

  // Match finised
  if (status === "FT" || status === "PEN" || status === "AET") {
    return (
      <div className="flex">
        <div className="border-r-2 border-gray-600 pr-4 flex flex-col justify-between my-1">
          <h2>{fixture.goals.home}</h2>
          <h2>{fixture.goals.away}</h2>
        </div>
        <div className="flex items-center text-sm">
          <div className="px-4">
            <div>Final</div>
            <span>Score</span>
          </div>
        </div>
      </div>
    )
  }

  // Penalties
  if (status === "PEN") {
    return (
      <div className="flex">
        <div className="border-r-2 border-gray-600 pr-4 flex flex-col justify-between my-1">
          <div className="space-x-1">
            <span>{fixture.goals.home}</span>
            <span>({fixture.score.penalty.home})</span>
          </div>
          <div className="space-x-1">
            <span>{fixture.goals.away}</span>
            <span>({fixture.score.penalty.away})</span>
          </div>
        </div>
        <div className="flex items-center text-sm">
          <div className="px-4">
            <div>Final</div>
            <span>Score</span>
          </div>
        </div>
      </div>
    )
  }

  // Not started
  if (status === "NS") {
    return (
      <div className="flex items-end text-gray-300 text-sm">
        {String(format(fromUnixTime(fixture.fixture.timestamp), "MMMM d, h aaa"))}
      </div>
    )
  }

  // Live
  return (
    <div className="flex">
      <div className="border-r-2 border-gray-600 pr-4 flex flex-col justify-between my-1">
        <h2>{fixture.goals.home}</h2>
        <h2>{fixture.goals.away}</h2>
      </div>
      <div className="flex items-center text-sm">
        <div className="px-4">
          <div>Live</div>
        </div>
      </div>
    </div>
  )
}
