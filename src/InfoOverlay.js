import React from 'react';
import './InfoOverlay.css'

const InfoOverlay = ({data}) => {
  const date = new Date(data && data.observation_time && data.observation_time.value)
  const dateString = date.toString() === 'Invalid Date' ? '' :
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} `;
  const timeString = date.toString() === 'Invalid Date' ? '' :
    `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  return (
    <>
      <div id="leftInfoPanel">
        <p className="bitOfInfo" id="infoDate">{dateString}</p>
        <p className="bitOfInfo" id="infoTime">{timeString}</p>
      </div>
      <div id="rightInfoPanel">
        <p className="bitOfInfo" id="infoTemp">{data ? `${Math.round(data.temp.value)}ºF` : ''}</p>
        <p className="bitOfInfo" id="infoFeelsLike">{data ? `(${Math.round(data.feels_like.value)}ºF)` : ''}</p>
        <p className="bitOfInfo" id="infoPrecip">{data ? `${data.precipitation_probability.value}%` : ''}</p>
        <p className="bitOfInfo" id="infoCloudCover">{data ? `${Math.round(data.cloud_cover.value)}%` : ''}</p>
        <p className="bitOfInfo" id="infoWindGust">{}</p>
      </div>
    </>
  )
}

export default InfoOverlay;
