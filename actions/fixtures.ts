"use server"

export async function getFixtures() {
  const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/fixtures?league=9&season=2024", {
    headers: { "x-rapidapi-key": process.env.RAPID_API_KEY! },
  })
  const data = await response.json()
  return data.response
}
