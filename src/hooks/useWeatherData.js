import { useEffect, useState } from 'react';

import { API_KEY, LATITUDE, LONGITUDE } from './secretSquirrel';

import dummyWeatherData from './dummyWeatherData.json'

const useWeatherData = () => {
  const [hourlyWeatherData, setHourlyWeatherData] = useState([]);
  const fetchData = async () => {
    const hourlyParams = new URLSearchParams({
      lat: LATITUDE,
      lon: LONGITUDE,
      unit_system: 'us',
      start_time: 'now',
      fields: [
        'precipitation',
        'precipitation_type',
        'precipitation_probability',
        'temp',
        'feels_like',
        'wind_gust',
        'sunrise',
        'sunset',
        'cloud_cover'
      ]
    })
    fetch(
      'https://api.climacell.co/v3/weather/forecast/hourly?' + hourlyParams.toString(),
      {
        headers: {
          'content-type': 'application/json',
          'apikey': API_KEY,
        },
      },
    )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setHourlyWeatherData(Array.isArray(data) ? data : dummyWeatherData);
    });
  }

  useEffect(() => {
    fetchData();
  }, [])
  return hourlyWeatherData;
}

export default useWeatherData;