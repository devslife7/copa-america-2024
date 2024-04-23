"use server"
const fs = require("fs")

import UpdateInfo from "@/data/parsed/update-info.json"

// Mock Rapid API response
import Fixtures from "@/data/fixtures.json"

export async function updateData() {
  // Check if data is outdated
  const nowUnixTimestampInSeconds = Date.now() / 1000
  if (nowUnixTimestampInSeconds < UpdateInfo.NextMatchTimestamp) return // returns if data is not outdated
  // update next match timestamp
  // find next match timestamp
  // update next match timestamp

  // Update data
  // filter and sort group fixtures
  // filter and sort quarter final fixtures
  // filter and sort semi final fixtures
  // filter and sort final fixtures
  // calculate and save user correct predictions and table position

  const saveData = (data: any, file: string) => {
    const jsonData = JSON.stringify(data, null, 2)
    fs.writeFileSync(`data/parsed/${file}`, jsonData)
  }

  // saveData({ ...dog, dog }, "dog.json")
}
