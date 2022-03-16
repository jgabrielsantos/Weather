import {FC, useEffect, useState} from 'react'
import {WeatherLocation, Weather} from '../model/Weather'
import WeatherEntry from './WeatherEntry'
import { readWeather } from '../services/WeatherService';


interface WeatherSummaryProps {
    location: WeatherLocation | null;
}

const WeatherSummary: FC<WeatherSummaryProps> = ({location}) => {
    const [weather, setWeather] = useState<Weather | null>(null)

    useEffect(() => {
        if(location) {
            readWeather(location.id).then(weather => setWeather(weather))
        }
    }, [location])

    if (!location || !weather) return null

    return (
        <div>
            <hr />
            <h2>{location.name}</h2>
            < WeatherEntry weather={weather} />
        </div>
    )
}

export default WeatherSummary