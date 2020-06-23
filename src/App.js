import React from 'react';
import './App.css';
import getWeather from './Components/getWeather';

getWeather().then((sols => {
  console.log(sols);
}));

function App() {
  return (
    <div>
      LATEST WEATHER AT ELYSIUM PLANTITIA

      Sol 377
      December 18

      Temperature
      High: -20°C
      Low: -98°C

      Wind
      75 kph

      InSight is taking daily weather measurements (temperature, wind, pressure)
      on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’
      equator. This is only a part of InSight’s mission. <a href='https://mars.nasa.gov/insight/mission/overview/'>Click here</a>
      to find out more.


    </div>

  );
}

export default App;
