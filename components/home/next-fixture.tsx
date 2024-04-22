import RenderFixture from "../shared/render-fixture"

import fixtures from "../../data/fixtures.json"

export default function NextFixtures() {
  return (
    <section className="relative z-[-3] h-[400px] px-6 pt-[100px] bg-gray-900">
      <div className="text-white font-bold text-xl">Next:</div>
      <RenderFixture fixture={fixtures.response[26]} className="mt-2 mb-8" />
      <div className="text-white font-bold text-xl">Last:</div>
      <RenderFixture fixture={fixtures.response[0]} className="mt-2 mb-8" />
    </section>
  )
}
