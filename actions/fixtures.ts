"use server"
const fs = require("fs")

// Mock Rapid API response
import Fixtures from "@/data/fixtures.json"

export async function updateData() {
  // Check if data is outdated
  // compare current date with next fixture start date
  // if current date is less than next fixture start date. return
  // else update data
  // Mock Rapid API response
  // save all fixtures

  const dog = {
    name: "dog edited",
    age: 5,
    breed: "bulldog",
  }

  // fs.writeFileSync("data/fixtures.json", JSON.stringify(dog, null, 2))

  const saveData = (data: any, file: string) => {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(`data/${file}`, jsonData)
  }

  saveData(dog, "dog.json")
}

// export function fixtures() {
//   return Fixtures
// }
