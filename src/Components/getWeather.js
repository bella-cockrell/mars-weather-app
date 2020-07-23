import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = 'DEMO_KEY'
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`

const GetWeather = () => {
  const [loading, isLoading] = useState(false)
  const [weather, setWeather] = useState({
    sol: 0,
    maxTemp: 0,
    minTemp: 0,
    windSpeed: 0,
    windDirectionDegrees: 0,
    windDirectionCardinal: '',
    date: '',
  })

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => res.data)
      .then((data) => {
        const { sol_keys, validity_checks, ...solData } = data
        let temp = Object.entries(solData).map(([sol, data]) => {
          return {
            sol: sol,
            maxTemp: data.AT.mx,
            minTemp: data.AT.mn,
            windSpeed: data.HWS.av,
            windDirectionDegrees: data.WD.most_common.compass_degrees,
            windDirectionCardinal: data.WD.most_common.compass_point,
            date: new Date(data.First_UTC),
          }
        })
        setWeather({
          sol: temp[temp.length - 1].sol,
          maxTemp: temp[temp.length - 1].maxTemp,
          minTemp: temp[temp.length - 1].minTemp,
          windSpeed: temp[temp.length - 1].windSpeed,
          windDirectionDegrees: temp[temp.length - 1].windDirectionDegrees,
          windDirectionCardinal: temp[temp.length - 1].windDirectionCardinal,
        })
        isLoading(true)
      })
      .catch((err) => console.log('Error ' + err))
  }, [setWeather])

  if (!loading) {
    return 'Page is loading'
  } else {
    return (
      <div>
        <p>{weather.sol}</p>
        <p>{weather.maxTemp}</p>
        <p>{weather.minTemp}</p>
        <p>{weather.windSpeed}</p>
        <p>{weather.windDirectionDegrees}</p>
        <p>{weather.windDirectionCardinal}</p>
        <p>{weather.date}</p>
      </div>
    )
  }
}

export default GetWeather
