import Link from "next/link"
export default function BackButton() {
  return <Link href="/" aria-label="Back to standings" className="text-5xl font-bold px-4 pb-4 absolute">{"<"}</Link>
}
