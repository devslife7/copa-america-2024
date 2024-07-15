"use client"
import { useState } from "react"
import { countryCodes, fixturesArrayIDs } from "@/data/predictionTool"

interface CountryCodes {
  [key: string]: string
}

export default function Tool() {
  const [predictions, setPredictions] = useState<any>([])
  const [counter, setCounter] = useState(0)

  function checkKey(e: any) {
    var event = window.event ? window.event : e

    console.log("keydown", event.keyCode)
    let keyDown = event.keyCode

    // arrow codes:
    // left:37
    // down:40
    // up:38
    // right: 39
    // if it is left then output E1 if it is right then output Q1 if it is up/down output TIE

    // left
    if (keyDown === 37) {
      setPredictions([...predictions, fixturesArrayIDs[counter][0]])
      // right
    } else if (keyDown === 39) {
      setPredictions([...predictions, fixturesArrayIDs[counter][1]])
      // up/down
    } else if (keyDown === 38 || keyDown === 40) {
      setPredictions([...predictions, "TIE"])
    }

    setCounter(counter + 1)
  }

  const convertCodetoCountry = () => {
    let arr: any = []

    for (let i = 0; i < predictions.length; i++) {
      for (const key in countryCodes as CountryCodes) {
        if (predictions[i] == key) {
          //@ts-ignore
          arr = [...arr, countryCodes[key]]
        }
      }
    }
    return arr
  }

  const renderCountriesPredictions = () => {
    const countriesArray = convertCodetoCountry()

    return countriesArray.map((country: any, idx: number) => <div key={idx}>{`${idx + 1}. ${country}`}</div>)
  }

  const resetTool = () => {
    setPredictions([])
    setCounter(0)
  }

  return (
    <>
      <div style={{ textAlign: "center", backgroundColor: "#fff" }}>
        <div style={{ margin: "2rem 0 2rem 0" }}>Predictions calculator tool</div>
        <input onKeyDown={checkKey} className="w-full bg-gray-400 h-44 text-white" />
        <div style={{ margin: "2rem 0 2rem 0" }}>Predictions Array:</div>

        <div style={{ margin: "0 20rem 2rem 20rem" }}>{`["${predictions.join('", "')}"]`}</div>
        <div
          style={{
            margin: "0 0 12rem 0",
            minHeight: "20rem",
            textAlign: "left",
            paddingLeft: "45vw",
            backgroundColor: "yellow",
          }}
        >
          {renderCountriesPredictions()}
        </div>
        <button onClick={resetTool}>Reset Tool</button>
        <div>Counter: {counter}</div>
      </div>
    </>
  )
}
