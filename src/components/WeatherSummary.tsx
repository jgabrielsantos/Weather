import {FC, forwardRef, useEffect, useState} from 'react'
import {WeatherLocation, Weather} from '../model/Weather'
import WeatherEntry from './WeatherEntry'
import { readForecast, readWeather } from '../services/WeatherService';


interface WeatherSummaryProps {
    location: WeatherLocation | null;
}

const WeatherSummary: FC<WeatherSummaryProps> = ({location}) => {
    const [weather, setWeather] = useState<Weather | null>(null)
    const [forecast,setForecast] = useState<Weather[] | null>(null)

    useEffect(() => {
        (async function() {
            if (location) {
                const [weather, forecast] = await Promise.all([
                    readWeather(location.id),
                    readForecast(location.id)
                ])
                setWeather(weather)
                setForecast(forecast)
            }
        })()
    }, [location])

    if (!location || !weather || !forecast) return null

    return (
        <div className='cityWeather'>
            <hr />
            <h2>{location.name}</h2>
            < WeatherEntry weather={weather} />

            <h2>Forecast</h2>
            <div>
                <ol>
                    {forecast.map(forecast => 
                        <li key={forecast.dt}>
                            < WeatherEntry weather={forecast} />
                        </li>    
                    )}
                </ol>
            </div>
        </div>
    )
}

export default WeatherSummary