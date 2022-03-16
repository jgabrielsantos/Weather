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

    return(
        <div>
            <div>{convertUnixTimeToDate(weather.dt).toLocaleDateString()}</div>
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