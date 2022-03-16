import React, {FC} from 'react'
import {Weather} from '../model/Weather'
import {getIconUrl} from '../services/WeatherService'

interface WeatherEntryProps {
    weather: Weather;
}

function convertUnixTimeToDate(unixUtc: number): Date {
    return new Date(unixUtc * 1000)
}

const WeatherEntry: FC<WeatherEntryProps> = ({weather}) => {
    const temp = Math.round(weather.main.temp - 273.15)
    const temp_min = Math.round(weather.main.temp_min - 273.15)
    const temp_max = Math.round(weather.main.temp_max - 273.15)

    return(
        <div>
            <div>{convertUnixTimeToDate(weather.dt).toLocaleDateString()}</div>
            <div>
                <strong>{temp} ºC</strong>
                <div>({temp_min} ºC / {temp_max}ºC)</div>
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