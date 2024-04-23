import Credits from "@/components/home/credits"
import Hero from "@/components/home/hero"
import UpcomingFixtures from "@/components/home/next-fixture"
import Predictions from "@/components/home/predictions"
import ThanksTo from "@/components/home/thanks-to"

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
