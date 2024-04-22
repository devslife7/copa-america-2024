import RenderFixture from "../shared/render-fixture"

import fixtures from "../../data/fixtures.json"

export default function NextFixtures() {
  return (
    <section className="px-6 pt-[100px] pb-[90px] text-white">
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-3xl font-bold z-50 mb-4">Upcoming</h2>
        <RenderFixture fixture={fixtures.response[26]} className="mt-2 mb-4" />
        <RenderFixture fixture={fixtures.response[25]} className="mt-2 mb-8" />
        <div className="text-white font-bold text-xl">Previous</div>
        <RenderFixture fixture={fixtures.response[0]} className="mt-2 mb-8" />
      </div>
    </section>
  )
}
