import AllFixtures from "@/data/fixtures.json"
import CheckMarkSVG from "@/public/svgs/check-mark"
import Image from "next/image"
import TeamIds from "@/data/team-ids.json"

export default function Fixtures({ predictionGroupStage }: { predictionGroupStage: any }) {
  console.log("predictionGroupStage", predictionGroupStage)

  const renderFixtures = () => {
    const idx = 0
    const fixture = AllFixtures.response[idx]

    const teamId = predictionGroupStage[idx]

    return (
      <div key={fixture.fixture.id} className="flex bg-secondary p-4 my-2 text-sm">
        <div className="w-10 text-2xl text-gray-400 text-center">
          <CheckMarkSVG className="text-green-400 mx-auto mb-1" />
          <div className="text-xs">{"|"}</div>
          <div className="text-xs">{"|"}</div>
          <div className="text-xs">{"|"}</div>
          <div className="text-xs">{"|"}</div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h2 className="mb-2">{TeamIds[teamId as keyof typeof TeamIds]}</h2>
            <span>+1</span>
          </div>

          {renderFixture(fixture)}
        </div>
      </div>
    )

    // return AllFixtures.response.map((fixture: any) => {
    //   return (
    //     <div key={fixture.fixture.id} className="flex justify-between items-center bg-secondary p-4 rounded-md my-2 text-sm">
    //       <div className="flex items-center">
    //         {renderFlag(fixture.teams.home)}
    //         <span className="ml-2">{fixture.teams.home.name}</span>
    //       </div>
    //       <div className="flex items-center">
    //         <span>{fixture.goals.home}</span>
    //         <span> - </span>
    //         <span>{fixture.goals.away}</span>
    //       </div>
    //       <div className="flex items-center">
    //         <span className="mr-2">{fixture.teams.away.name}</span>
    //         {renderFlag(fixture.teams.away)}
    //       </div>
    //     </div>
    //   )
    // })
  }
  return (
    <div>
      <div className="text-3xl m-5 ">Fixtures</div>
      {renderFixtures()}
    </div>
  )
}

const renderFixture = (fixture: any) => {
  return (
    <div className="p-2 bg-blue-200 rounded-md w-full">
      <h2>{fixture.teams.home.name}</h2>
      <h2>{fixture.teams.away.name}</h2>
    </div>
  )
}

const renderFlag = (team: any) => {
  const teamsWithFlags = [2382, 7, 26, 6]
  const height = teamsWithFlags.includes(team.id) ? 20 : 32
  return <Image src={team.logo} alt={team.name} width={32} height={height} className="w-full h-auto" />
}
