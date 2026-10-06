"use client"
import { useContext, createContext, ReactNode } from "react"
import type { ArchiveData } from "@/lib/archive"

const FixturesContext = createContext<ArchiveData | undefined>(undefined)

export function FixturesContextProvider({ children, data }: { children: ReactNode; data: ArchiveData }) {
  return <FixturesContext.Provider value={data}>{children}</FixturesContext.Provider>
}

export function useFixturesContext() {
  const context = useContext(FixturesContext)
  if (context === undefined) throw new Error("Context must be used within a Provider")
  return context
}
