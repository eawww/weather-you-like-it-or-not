import React, {useState} from 'react';
import './App.css';
import InfoOverlay from './InfoOverlay';

// Hooks!
import useWeatherData from './hooks/useWeatherData';
import useWindowDimensions from './hooks/useWindowDimensions';

// SVG Components!
import HorizontalLine from './SVGcomponents/HorizontalLine';
import VerticalBar from './SVGcomponents/VerticalBar';
import GraphedLine from './SVGcomponents/GraphedLine';

const MAX_TEMP = 120;
const MIN_TEMP = -20;
const TEMP_RANGE = MAX_TEMP - MIN_TEMP;

// Helper Functions!!
const heightByDegrees = (degrees) => 100 - 100 * (degrees - MIN_TEMP) / TEMP_RANGE;

const xByTime = (nowString, beginString, endString) => {
  const now = new Date(nowString).valueOf();
  const begin = new Date(beginString).valueOf();
  const end = new Date(endString).valueOf();
  return 100 * ((now - begin) / (end - begin));
}

const App = () => {
  const hourlyWeatherData = useWeatherData();
  const {windowHeight, windowWidth} = useWindowDimensions();
  const [selectedHourIndex, setSelectedHourIndex] = useState(0);

  // SETS 
  const handleMouseMove = (event) => {
    const xPercent = event.clientX / event.target.ownerSVGElement.clientWidth;
    const closestIndex = Math.round(xPercent * hourlyWeatherData.length)
    if(closestIndex !== selectedHourIndex){
      setSelectedHourIndex(closestIndex)
    }
  }

  // FIRST AND LAST REPRESENTED TIMES
  const beginning = hourlyWeatherData[0] && hourlyWeatherData[0].observation_time.value;
  const ending = hourlyWeatherData[0] && hourlyWeatherData[hourlyWeatherData.length - 1].observation_time.value;

  // SUNRISE AND SUNSET TIMES
  const sunrises = [...new Set(hourlyWeatherData.map(obj => obj.sunrise.value))]
  const sunsets = [...new Set(hourlyWeatherData.map(obj => obj.sunset.value))]

  // HEIGHTS FOR AXIS LINES
  const lgAxisLines = [0, 50, 100]
  const smAxisLines = [-10, 10, 20, 30, 40, 60, 70, 80, 90, 110]

  // LINE VALUES
  const tempValues = hourlyWeatherData.map(hr => heightByDegrees(hr.temp.value))
  // what does an executive say when they get "hands-on" with a product?
  // "Feels like... value"
  const feelsLikeValues = hourlyWeatherData.map(hr => heightByDegrees(hr.feels_like.value))
  const precipValues = hourlyWeatherData.map(hr => 100 - (hr.precipitation_probability.value))
  const cloudCoverValues = hourlyWeatherData.map(hr => hr.cloud_cover.value)
  const gustValues = hourlyWeatherData.map(hr => heightByDegrees(hr.wind_gust.value))

  return (
    <div className="App">
      <InfoOverlay data={hourlyWeatherData[selectedHourIndex]}/>
      <svg
        height="100%" width="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        onMouseMove={handleMouseMove}
      >
        <defs>
          <linearGradient
            id="temperatureGradient"
            gradientTransform="rotate(90)"
          >
            <stop offset="0%" stopColor="red"/>
            <stop offset="100%" stopColor="blue"/>
          </linearGradient>
        </defs>
        <g id="dayBlock">
          {
            sunrises.map((sunriseTime, i) => {
              const begin = xByTime(sunriseTime, beginning, ending)
              const end = xByTime(sunsets[i], beginning, ending)
              return (
                <VerticalBar
                  xStart={begin}
                  xEnd={end}
                  fill="#8884"
                />
              )
            })
          }
        </g>
        <g id="degreeAxisLines">
          {
            smAxisLines.map(value => (
              <HorizontalLine
                height={heightByDegrees(value)}
                stroke="#9995"
                strokeWidth={windowHeight * 0.0002}
              />
            ))
          }
          {
            lgAxisLines.map(value => (
              <HorizontalLine
                height={heightByDegrees(value)}
                stroke="#9995"
                strokeWidth={windowHeight * 0.0008}
              />
            ))
          }
        </g>
        <g id="liiiines">
          <GraphedLine
            values={gustValues}
            stroke="white"
            strokeWidth={windowHeight * 0.002}
          />
          <GraphedLine
            values={precipValues}
            stroke="none"
            fill="#0FF3"
            strokeWidth={windowHeight * 0.005}
          />
          <GraphedLine
            values={cloudCoverValues}
            stroke="none"
            fill="#111A"
            fillType="top"
            strokeWidth={windowHeight * 0.005}
          />
          <GraphedLine
            values={precipValues}
            stroke="cyan"
            strokeWidth={windowHeight * 0.005}
          />
          <GraphedLine
            values={cloudCoverValues}
            stroke="black"
            fillType="top"
            strokeWidth={windowHeight * 0.005}
          />
          <GraphedLine
            values={feelsLikeValues}
            stroke="maroon"
            strokeWidth={windowHeight * 0.005}
          />
          <mask id="theMASK">
            <GraphedLine
              id="temperatureLine"
              values={tempValues}
              stroke="white"
              strokeWidth={windowHeight * 0.01}
            />  
          </mask>
          <rect
            height="100%"
            width="100%"
            fill="url(#temperatureGradient)"
            mask="url(#theMASK)"
          />
        </g>
        <line
          y1="0" y2="100"
          x1={selectedHourIndex * (100 / hourlyWeatherData.length)}
          x2={selectedHourIndex * (100 / hourlyWeatherData.length)}
          stroke="#990"
          strokeWidth={windowWidth * 0.0002}
        />
      </svg>
    </div>
  );
}

export default App;
