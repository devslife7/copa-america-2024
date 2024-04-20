import Link from "next/link"
import FacebookSVG from "@/public/svgs/socials/facebook"
import InstagramSVG from "@/public/svgs/socials/instagram"
import WorldSVG from "@/public/svgs/socials/world"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className=" bg-secondary text-white">
      <div className="my-container flex h-52 flex-col items-center justify-center gap-y-4 md:flex-row md:justify-between">
        <div className="text-center text-xl">
          <span className="text-primary">Copa</span> America 2024
        </div>
        <div className="text-center ">
          Copyright © {currentYear} <span className="text-primary">Marcos</span> Velasco. All rights reserved.
        </div>
        <div className="flex justify-center gap-x-6">
          <Link
            className="text-3xl text-white hover:text-primary"
            href="https://www.marcosvelasco.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio link"
          >
            <WorldSVG className="w-[1.4rem]" />
          </Link>
          <Link
            className="text-3xl text-white hover:text-primary"
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram link"
          >
            <FacebookSVG className="w-6" />
          </Link>

          <Link
            className="text-3xl text-white hover:text-primary"
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Intstagran link"
          >
            <InstagramSVG className="w-6" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
