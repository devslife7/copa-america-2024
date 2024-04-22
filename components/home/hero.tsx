import Image from "next/image"
import background from "@/public/images/hero-background.jpg"

export default function Hero() {
  return (
    <section className="relative h-[70vh] flex items-end justify-center text-white">
      <Image
        src={background}
        placeholder="blur"
        quality={100}
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        fill
        priority
        alt="Hero background"
        className="z-[-1]"
      />
      <div className="mb-16 lg:mb-[6.5rem] text-center lg:space-y-2 font-bold">
        <h3 className="text-2xl lg:text-4xl">
          1<sup>st</sup> $1170
        </h3>
        <h3 className="text-xl lg:text-3xl">
          2<sup>nd</sup> $585
        </h3>
        <h3 className="text-lg lg:text-2xl">
          3<sup>rd</sup> $195
        </h3>
      </div>
    </section>
  )
}
