import { create } from "zustand"

export const userStore = create(set => ({
  user: {
    fullName: "John Doe",
  },
  updatedAt: "",
  fixtures: {
    upcomingFixtures: { upcoming: [], past: {} },
    groupFixtures: [],
    quarterFinalFixtures: [],
    semiFinalFixtures: [],
    finalFixtures: [],
  },
  users: [],

  updateUser: (user: any) => set(() => ({ user })),
  updateUsers: (users: any[]) => set(() => ({ users })),
  updateFixtures: (fixtures: any) => set(() => ({ fixtures })),
  updateUpdatedAt: (updatedAt: string) => set(() => ({ updatedAt })),
}))
