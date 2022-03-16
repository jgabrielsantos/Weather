import React, {useState, FC} from 'react';
import { WeatherLocation } from '../model/Weather';
import { searchLocation } from '../services/WeatherService';
import WeatherSummary from './WeatherSummary'
import LocationSearch from './LocationSearch';
import LocationTable from './LocationTable';
import './App.css';

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([])
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null)
  const [error, setError] = useState('')
  const [warning, setWarning] = useState('')

  const resetAlerts = () => {
    setError('')
    setWarning('')
  }

  let addLocation =async (term: string) => {
    resetAlerts()
    const location = await searchLocation(term)

    if(!location) {
      setError(`No location found called ${`term`}`)
    } else if (locations.find(item => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list`)
    } else {
      setLocations([location, ...locations])
    }
  }

  return (
    <div className='container'>
      <header>
        <h1>Weather App</h1>
        < LocationSearch onSearch={addLocation} />
      </header>

      {error ? <div className={`alert alert-danger`}>{error}</div> : null}
      {warning ? <div className={`alert alert-danger`}>{warning}</div> : null }

      <div className="content">
        < LocationTable
          locations={locations}
          current={currentLocation}
          onSelect={location => setCurrentLocation(location)}
        />

        < WeatherSummary location={currentLocation} />
      </div>
    </div>
  );
}

export default App;
