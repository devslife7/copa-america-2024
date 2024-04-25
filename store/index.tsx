import { create } from "zustand"
import fixtures from "@/data/fixtures2022.json"

export const userStore = create(set => ({
  // fixtures: [],
  // setFixtures: (fixtures) => set({ fixtures }),
  // updateFixtures: async () => {
  //   const fixtures = await fetch('/api/fixtures').then((res) => res.json());
  //   set({ fixtures });
  // },
  user: {
    fullName: "John Doedfs",
  },
  updateUser: (newUser: any) => set((state: any) => ({ user: { ...state.user, ...newUser } })),
  fetchUser: () => {
    console.log("fetching user...")
    const user = fixtures
    set({ user: user })
  },
}))
