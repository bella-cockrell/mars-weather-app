import React from 'react';
import './App.css';
import getWeather from './Components/getWeather';
import Video from './Components/Video';

import thermometer from './Media/thermometer.svg';
import windCardinal from './Media/windCardinal.svg';
import button from './Media/button.svg';


let selectedSolIndex;

getWeather().then(sols => {
  selectedSolIndex = sols.length - 1
  displaySelectedSol(sols);
});

const displaySelectedSol = (sols) => {
  const selectedSol = sols[selectedSolIndex];
  console.log(selectedSol);
}

function App() {
  return (
    <>
      <Video />
      <main className='mars-current-weather'>
        <h1 className='scrolling-title'>
          LATEST WEATHER AT ELYSIUM PLANTITIA
        </h1>
        <section className='current-date'>
          <button className='btn__current-date--left'><img src={button} alt='button' /></button>
          <h2 className='current-date__mars'>
            Sol 377
          </h2>
          <div className='current-date__earth'>
            December 18
          </div>
          <button className='btn__current-date--right'><img src={button} alt='button' /></button>
        </section>
        <section className='readings'>
          <div className='readings__temperature'>
            <img src={thermometer} alt='thermometer' />
            <h2>Temperature</h2>
            <p>High: -20°C</p>
            <p>Low: -98°C</p>
          </div>
          <div className='readings__wind'>
            <img src={windCardinal} alt='cardinal' />
            <h2>Wind</h2>
            <p>75 kph</p>
          </div>
        </section>
      </main>

      <footer className='glance'>
        At a glance
      </footer>
    </>

  );
}

export default App;
