import { format, fromUnixTime } from "date-fns"
import Image from "next/image"

export default function RenderFixture({ fixture }: { fixture: any }) {
  return (
    <div className="flex justify-between p-2 bg-gray-800 rounded-md w-full">
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
      {fixture.fixture.status.short !== "FT" ? (
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
      ) : (
        <div className="flex items-end text-gray-300 text-sm">
          {String(format(fromUnixTime(fixture.fixture.timestamp), "MMMM d, h aaa"))}
        </div>
      )}
    </div>
  )
}

const renderFlag = (team: any) => {
  const teamsWithFlags = [2382, 7, 26, 6]
  const height = teamsWithFlags.includes(team.id) ? 20 : 32
  return <Image src={team.logo} alt={team.name} width={32} height={height} className="w-full h-auto" />
}
