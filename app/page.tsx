import { updateData } from "@/actions/fixtures"
import Credits from "@/components/home/credits"
import Hero from "@/components/home/hero"
import Predictions from "@/components/home/predictions"
import ThanksTo from "@/components/home/thanks-to"
import UpcomingFixtures from "@/components/home/upcoming-fixture"

export default async function Home() {
  const response = await updateData()
  return (
    <main>
      <Hero />
      <Predictions />
      <UpcomingFixtures />
      <ThanksTo />
      <Credits />
    </main>
  )
}
