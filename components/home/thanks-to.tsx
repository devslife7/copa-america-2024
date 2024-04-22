import Image from "next/image"
import background from "../../public/images/predictions-background.png"
import Stoogies from "../../public/images/stoogies.png"

export default function ThanksTo() {
  return (
    <section>
      <div className="relative rounded-[3rem] -mt-11 -mb-14 pt-10 pb-8 px-7 text-white overflow-hidden">
        <Image
          src={background}
          alt="user predictions table"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
          className="z-[-1]"
        />
        <div className="lg:text-center z-10">
          <h2 className="text-2xl font-bold z-50">Special Thanks to:</h2>

          <div className="mt-5 flex-col lg:flex">
            <div className="text-xl space-y-1">
              <p>Carlos Padilla : Product Coordinator</p>
              <p>Cesar Valencia : Marketing</p>
              <p>Marcos Velasco : Web Developer</p>
            </div>
            <div className="mx-auto mt-8">
              <Image src={Stoogies} alt="Stoogies" width={600} height={500} className="rounded-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
