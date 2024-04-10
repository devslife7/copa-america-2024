import Image from "next/image"
import background from "@/public/images/hero-background.jpg"

export default function Hero() {
  return (
    <div className="relative h-[70vh] -z-20">
      <Image src={background} placeholder="blur" className="object-cover" fill priority alt="Hero background" />
    </div>
  )
}
