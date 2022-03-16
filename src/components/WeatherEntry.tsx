import React, {FC} from 'react'
import {Weather} from '../model/Weather'
import {getIconUrl} from '../services/WeatherService'

interface WeatherEntryProps {
    weather: Weather;
}

function convertUnixTimeToDate(unixUtc: number): Date {
    return new Date(unixUtc * 1000)
}

function convertUnixTimeToLocalTime(unixUtc: number): string {
    const date = convertUnixTimeToDate(unixUtc)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let currentTime
    if (minutes > 0) {
        currentTime = hours + "h : " + minutes
    } else {
        currentTime = hours + "h"
    }

    return currentTime
}

const WeatherEntry: FC<WeatherEntryProps> = ({weather}) => {

    return(
        <div>
            <div>{convertUnixTimeToDate(weather.dt).toLocaleDateString()} at {convertUnixTimeToLocalTime(weather.dt)}</div>
            <div>
                <strong>{weather.main.temp} ºC</strong>
                <div>({weather.main.temp_min} ºC / {weather.main.temp_max}ºC)</div>
            </div>
            <div>Humidity: {weather.main.humidity}%</div>
            {weather.weather.map(condition => 
                <div key={condition.id}>
                    <img src={getIconUrl(condition.icon)} alt={condition.main} />
                    {condition.main}
                    {condition.description}
                </div>
                )
            }
        </div>
    )
}

export default WeatherEntry