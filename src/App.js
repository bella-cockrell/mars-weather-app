import React, { useState, useEffect } from 'react'
// import fetchWeatherData from './Components/fetchWeatherData'
import axios from 'axios'

import './App.css'

import video from './Media/mars.mp4'
import thermometer from './Media/thermometer.svg'
import windCardinal from './Media/windCardinal.svg'
import button from './Media/button.svg'

// let selectedSolIndex

// getWeather().then((sols) => {
//   selectedSolIndex = sols.length - 1
//   displaySelectedSol(sols)
// })

// const displaySelectedSol = (sols) => {
//   const selectedSol = sols[selectedSolIndex]
//   console.log(selectedSol)
// }

const API_KEY = 'DEMO_KEY'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

const parseDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
  })
}

function App() {
  const [loading, isLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const [weather, setWeather] = useState({
    sol: 0,
    maxTemp: 0,
    minTemp: 0,
    windSpeed: 0,
    windDirectionDegrees: 0,
    windDirectionCardinal: '',
    date: '0',
  })

  const handleNextDay = () => {
    setIndex(index + 1)
  }

  const handlePreviousDay = () => {
    setIndex(index - 1)
  }

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => res.data)
      .then((data) => {
        const { sol_keys, validity_checks, ...solData } = data
        let solDays = Object.entries(solData).map(([sol, data]) => {
          return {
            sol: sol,
            maxTemp: data.AT.mx,
            minTemp: data.AT.mn,
            windSpeed: data.HWS.av,
            windDirectionDegrees: data.WD.most_common.compass_degrees,
            windDirectionCardinal: data.WD.most_common.compass_point,
            date: data.First_UTC,
          }
        })
        let selectedDay = solDays[index]
        setWeather({
          sol: selectedDay.sol,
          maxTemp: selectedDay.maxTemp,
          minTemp: selectedDay.minTemp,
          windSpeed: selectedDay.windSpeed,
          windDirectionDegrees: selectedDay.windDirectionDegrees,
          windDirectionCardinal: selectedDay.windDirectionCardinal,
          date: selectedDay.date,
        })
        isLoading(true)
      })
      .catch((err) => console.log('Error ' + err))
  }, [index])

  if (!loading) {
    return 'Loading'
  } else {
    return (
      <>
        {console.log(weather)}
        <video src={video} width="600" height="auto" autoPlay={true} loop />
        <main className="mars-current-weather">
          <h1 className="scrolling-title">
            LATEST WEATHER AT ELYSIUM PLANTITIA
          </h1>
          <section className="current-date">
            <button className="btn__current-date--left" onClick={handleNextDay}>
              <img src={button} alt="button" />
            </button>
            <h2 className="current-date__mars">Sol {weather.sol}</h2>
            <div className="current-date__earth">{parseDate(weather.date)}</div>
            <button
              className="btn__current-date--right"
              onClick={handlePreviousDay}
            >
              <img src={button} alt="button" />
            </button>
          </section>
          <section className="readings">
            <div className="readings__temperature">
              <img src={thermometer} alt="thermometer" />
              <h2>Temperature</h2>
              <p>High: {weather.maxTemp}</p>
              <p>Low: {weather.minTemp}</p>
            </div>
            <div className="readings__wind">
              <img src={windCardinal} alt="cardinal" />
              <h2>Wind</h2>
              <p>{weather.windSpeed} kph</p>
            </div>
          </section>
        </main>

        <footer className="glance">At a glance</footer>
      </>
    )
  }
}

export default App
