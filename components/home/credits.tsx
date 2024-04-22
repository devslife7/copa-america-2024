import Link from "next/link"

export default function Credits() {
  return (
    <div className="bg-slate-900 h-screen relative z-[-2] pt-28 text-white">
      <h2>Checkout more of my work</h2>
      <Link
        className="text-3xl hover:text-primary relative z-50"
        href="https://www.marcosvelasco.com/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Portfolio link"
      >
        marcosvelasco.com
      </Link>
    </div>
  )
}
