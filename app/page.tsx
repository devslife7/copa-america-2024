import Credits from "@/components/home/credits"
import Hero from "@/components/home/hero"
import Predictions from "@/components/home/predictions"
import ThanksTo from "@/components/home/thanks-to"
import UpcomingFixtures from "@/components/home/upcoming-fixture"

export default function Home() {
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
