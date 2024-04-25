import { create } from "zustand"
import fixtures from "@/data/fixtures2022.json"

export const userStore = create(set => ({
  user: {
    fullName: "John Doe",
  },
  fixtures: {
    updatedAt: "",
    upcomingFixtures: { upcoming: [], past: {} },
    groupFixtures: [],
    quarterFinalFixtures: [],
    semiFinalFixtures: [],
    finalFixtures: [],
  },
  users: [],

  updateUsers: (parsedUsers: any[]) => set(() => ({ users: parsedUsers })),
  updateFixtures: (fixtures: any) => set(() => ({ fixtures: fixtures })),
}))
