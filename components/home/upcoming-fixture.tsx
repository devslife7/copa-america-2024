"use client"
import RenderFixture from "../shared/render-fixture"

// import fixtures from "../../data/fixtures2022.json"
import { useFixturesContext } from "@/context/fixtures"

export default function UpcomingFixtures() {
  // Calculate upcoming and previous fixtures
  // in this format: { upcoming: [fixture1, fixture2], previous: [fixture3] }
  const upcoming = { upcoming: [26, 25], previous: [0] }

  const { fixtures } = useFixturesContext()

  const upcomingFixtures = fixtures.upcomingFixtures.upcoming.length > 0 ? fixtures.upcomingFixtures.upcoming : []
  const pastFixture = fixtures.upcomingFixtures.past

  return (
    <section className="px-6 pt-[100px] pb-[90px] text-white">
      <div className="max-w-[600px] mx-auto">
        {upcomingFixtures.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold z-50 mb-4">Upcoming</h2>
            <h3>{upcomingFixtures[0].league.round}</h3>
            <RenderFixture fixture={upcomingFixtures[0]} className="mt-2 mb-4" />
            {/* <h3>{upcomingFixtures[1].league.round}</h3>
            <RenderFixture fixture={upcomingFixtures[1]} className="mt-2 mb-8" /> */}
          </div>
        )}
        {pastFixture.fixture.id && (
          <div>
            <div className="text-white font-bold text-2xl mb-2">Previous</div>
            <h3>{pastFixture.league?.round}</h3>
            <RenderFixture fixture={pastFixture} className="mt-2 mb-8" />
          </div>
        )}
      </div>
    </section>
  )
}
