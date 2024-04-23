import RenderFixture from "../shared/render-fixture"

import fixtures from "../../data/fixtures2022.json"

export default function UpcomingFixtures() {
  // Calculate upcioming and previous fixtures
  // in this format: { upcoming: [fixture1, fixture2], previous: [fixture3] }
  const upcoming = { upcoming: [26, 25], previous: [0] }
  return (
    <section className="px-6 pt-[100px] pb-[90px] text-white">
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-3xl font-bold z-50 mb-4">Upcoming</h2>
        <h3>{fixtures.response[upcoming.upcoming[0]].league.round}</h3>
        <RenderFixture fixture={fixtures.response[upcoming.upcoming[0]]} className="mt-2 mb-4" />
        <h3>{fixtures.response[upcoming.upcoming[1]].league.round}</h3>
        <RenderFixture fixture={fixtures.response[upcoming.upcoming[1]]} className="mt-2 mb-8" />
        <div className="text-white font-bold text-2xl mb-2">Previous</div>
        <h3>{fixtures.response[0].league.round}</h3>
        <RenderFixture fixture={fixtures.response[upcoming.previous[0]]} className="mt-2 mb-8" />
      </div>
    </section>
  )
}
