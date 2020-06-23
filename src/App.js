import React from 'react';
import './App.css';

const API_KEY = 'uy2CVnMPW73mebP4g9UNEreDyu5hcDNNJeDQSk9K';
const API_URL = `https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`;

const getWeather = () => {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const {
        sol_keys,
        validity_checks,
        ...solData
      } = data
      console.log(solData);
    })
}

getWeather();

function App() {
  return (
    <div>

    </div>

  );
}

export default App;
