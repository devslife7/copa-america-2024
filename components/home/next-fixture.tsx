import RenderFixture from "../shared/render-fixture"

import fixtures from "../../data/fixtures.json"

export default function NextFixtures() {
  return (
    <section className="px-6 pt-[150px] pb-[130px]">
      <div className="max-w-[600px] mx-auto">
        <div className="text-white font-bold text-xl">Next:</div>
        <RenderFixture fixture={fixtures.response[26]} className="mt-2 mb-8" />
        <div className="text-white font-bold text-xl">Last:</div>
        <RenderFixture fixture={fixtures.response[0]} className="mt-2 mb-8" />
      </div>
    </section>
  )
}
