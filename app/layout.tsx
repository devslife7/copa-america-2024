import type { Metadata } from "next"
import { Inter, Inika } from "next/font/google"
import "./globals.css"
import Footer from "@/components/layout/footer"
import { cn } from "@/lib/utils"
import { FixturesContextProvider } from "@/context/fixtures"

const inter = Inter({ subsets: ["latin"] })
const inika = Inika({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inika",
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
      <body className={cn("bg-slate-900", inika.className, inter.className)}>
        <FixturesContextProvider>{children}</FixturesContextProvider>
        <Footer />
      </body>
    </html>
  )
}
