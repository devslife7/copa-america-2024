import AllFixtures from "@/data/fixtures.json"
import Image from "next/image"

export default function Fixtures({ predictionGroupStage }: { predictionGroupStage: any }) {
  console.log("predictionGroupStage", predictionGroupStage)

  const renderFixtures = () => {
    return AllFixtures.response.map((fixture: any) => {
      return (
        <div key={fixture.fixture.id} className="flex justify-between items-center bg-secondary p-4 rounded-md my-2 text-sm">
          <div className="flex items-center">
            {renderFlag(fixture.teams.home)}
            <span className="ml-2">{fixture.teams.home.name}</span>
          </div>
          <div className="flex items-center">
            <span>{fixture.goals.home}</span>
            <span> - </span>
            <span>{fixture.goals.away}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">{fixture.teams.away.name}</span>
            {renderFlag(fixture.teams.away)}
          </div>
        </div>
      )
    })
  }
  return (
    <div>
      <div>Fixtures</div>
      {renderFixtures()}
    </div>
  )
}

const renderFlag = (team: any) => {
  const teamsWithFlags = [2382, 7, 26, 6]
  const height = teamsWithFlags.includes(team.id) ? 20 : 32
  return <Image src={team.logo} alt={team.name} width={32} height={height} className="w-full h-auto" />
}
