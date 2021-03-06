import React, { useState, useEffect } from 'react'
// import fetchWeatherData from './Components/fetchWeatherData'
import axios from 'axios'

import './App.css'

import video from './Media/mars.mp4'
import thermometer from './Media/thermometer.svg'
import windCardinal from './Media/windCardinal.svg'
import button from './Media/button.svg'

const API_KEY = 'DEMO_KEY'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

const parseDate = (date) => {
  return new Date(date).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
  })
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [hideButton, setHideButton] = useState('')
  const [solIndex, setSolIndex] = useState(5) //API returns 7 days, index 6 is latest day
  const [weather, setWeather] = useState({
    sol: 0,
    maxTemp: 0,
    minTemp: 0,
    windSpeed: 0,
    windDirectionDegrees: 0,
    date: '0',
  })

  const handleNextDay = () => {
    if (solIndex >= 6) {
      setHideButton(hideButton === 'hide-button')
    } else {
      setSolIndex(solIndex + 1)
    }
  }

  const handlePreviousDay = () => {
    if (solIndex === 0) {
      setHideButton(hideButton === 'hide-button')
    } else {
      setSolIndex(solIndex - 1)
    }
  }

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => res.data)
      .then((data) => {
        const { sol_keys, validity_checks, ...solData } = data
        let solDays = Object.entries(solData).map(([sol, data]) => {
          if (data.HWS === undefined) {
            return 'Error'
          } else {
            return {
              sol: sol,
              maxTemp: data.AT.mx,
              minTemp: data.AT.mn,
              windSpeed: data.HWS.av,
              windDirectionDegrees: data.WD.most_common.compass_degrees,
              date: data.First_UTC,
            }
          }
        })
        let selectedDay = solDays[solIndex]
        setWeather({
          sol: selectedDay.sol,
          maxTemp: Math.floor(selectedDay.maxTemp * 100) / 100,
          minTemp: Math.floor(selectedDay.minTemp * 100) / 100,
          windSpeed: selectedDay.windSpeed,
          windDirectionDegrees: selectedDay.windDirectionDegrees,
          date: selectedDay.date,
        })
        setLoaded(true)
      })
      .catch((err) => console.log('Error ' + err))
  }, [solIndex])

  if (!loaded) {
    return 'Loading'
  } else {
    return (
      <>
        <video
          src={video}
          type="video/mp4"
          autoPlay
          muted
          loop
          id="background-video"
        >
          no video
        </video>
        <main className="mars-current-weather">
          <div className="marquee">
            <div className="marquee__inner">
              <span>LATEST WEATHER AT ELYSIUM PLANTITIA</span>
              <span>LATEST WEATHER AT ELYSIUM PLANTITIA</span>
              <span>LATEST WEATHER AT ELYSIUM PLANTITIA</span>
              <span>LATEST WEATHER AT ELYSIUM PLANTITIA</span>
              <span>LATEST WEATHER AT ELYSIUM PLANTITIA</span>
              <span>LATEST WEATHER AT ELYSIUM PLANTITIA</span>
            </div>
          </div>

          <section className="current-date">
            <button
              className="btn__current-date--left"
              onClick={handlePreviousDay}
            >
              <img src={button} alt="button" />
            </button>
            <div className="current-date-info">
              <h2 className="current-date-info__mars">Sol {weather.sol}</h2>
              <p className="current-date-info__earth">
                {parseDate(weather.date)}
              </p>
            </div>
            <button
              className="btn__current-date--right"
              onClick={handleNextDay}
            >
              <img src={button} alt="button" />
            </button>
          </section>

          <section className="readings">
            <div className="readings__temperature">
              <div className="readings__img">
                <img src={thermometer} alt="thermometer" />
              </div>
              <h2>Temperature</h2>
              <p>High: {weather.maxTemp}</p>
              <p>Low: {weather.minTemp}</p>
            </div>
            <div className="readings__wind">
              <div className="readings__img">
                <img src={windCardinal} alt="cardinal" />
              </div>
              <h2>Wind</h2>
              <p>{Math.round(weather.windSpeed)} kph</p>
            </div>
          </section>
        </main>

        {/* <footer className="glance">At a glance</footer> */}
      </>
    )
  }
}

export default App
