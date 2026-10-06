import { buildArchive } from "@/lib/archive"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import Footer from "@/components/layout/footer"
import { cn } from "@/lib/utils"
import { FixturesContextProvider } from "@/context/fixtures"

const inter = localFont({ src: "../public/fonts/inter-100-900.woff2", weight: "100 900", variable: "--font-inter", display: "swap" })
const inika = localFont({
  src: [
    { path: "../public/fonts/inika-400.woff2", weight: "400" },
    { path: "../public/fonts/inika-700.woff2", weight: "700" },
  ],
  variable: "--font-inika",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Copa America 2024",
  description: "Copa America Predictions 2024",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-slate-900", inika.variable, inter.variable, inter.className)}>
        <FixturesContextProvider data={buildArchive()}>{children}</FixturesContextProvider>
        <Footer />
      </body>
    </html>
  )
}
