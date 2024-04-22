import Link from "next/link"

export default function Credits() {
  return (
    <div className="pt-[120px] pb-[80px] text-white">
      <div className="text-center mb-[50px]">
        <h2 className="mb-1 text-sm">Checkout more of my work</h2>
        <Link
          className="text-2xl hover:text-primary z-50"
          href="https://www.marcosvelasco.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio link"
        >
          marcosvelasco.com
        </Link>
      </div>

      <div className="text-center">
        <h2 className="mb-1 text-sm">Business inquireies at</h2>
        <p className="text-xl">devslife7@gmail.com</p>
      </div>
    </div>
  )
}
