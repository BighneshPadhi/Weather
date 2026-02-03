import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import WeatherCharts from './components/WeatherCharts';
import Map from './components/Map';
import { fetchCityCoordinates, fetchWeather } from './services/weatherService';
import { Loader2 } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('New York');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    handleSearch('New York');
  }, []);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const results = await fetchCityCoordinates(city);
      const { latitude, longitude, name, country } = results[0];

      setLocationName(`${name}, ${country}`);
      const data = await fetchWeather(latitude, longitude);
      setWeatherData(data);
      updateTheme(data.current.weather_code, data.current.is_day);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocate = () => {
    if (navigator.geolocation) {
      setLoading(true);
      setError(null);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const data = await fetchWeather(latitude, longitude);
            setWeatherData(data);
            setLocationName("Your Location");
            updateTheme(data.current.weather_code, data.current.is_day);
          } catch (err) {
            setError("Failed to fetch weather for your location.");
          } finally {
            setLoading(false);
          }
        },
        (err) => {
          setError("Location access denied or unavailable.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const updateTheme = (code, isDay) => {
    // Logic duplicated from before, but good to keep it consistent
    let gradient = 'var(--bg-gradient-sunny)';

    if (!isDay) {
      gradient = 'var(--bg-gradient-night)';
    } else {
      if (code >= 95) gradient = 'var(--bg-gradient-cloudy)';
      else if (code >= 61) gradient = 'var(--bg-gradient-rainy)';
      else if (code >= 51) gradient = 'var(--bg-gradient-cloudy)';
      else if (code >= 45) gradient = 'var(--bg-gradient-cloudy)';
      else if (code === 3) gradient = 'var(--bg-gradient-rainy)';
      else if (code >= 0) gradient = 'var(--bg-gradient-sunny)';
    }

    document.body.style.background = gradient;
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Weather App</h1>
      </header>

      <main>
        <SearchBar onSearch={handleSearch} onLocate={handleLocate} />

        {loading && (
          <div className="loading-container">
            <Loader2 className="spinner" size={48} />
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {!loading && !error && weatherData && (
          <div className="weather-dashboard">
            <CurrentWeather data={weatherData} location={locationName} />

            <div className="dashboard-grid">
              <Forecast data={weatherData} />
              <div className="dashboard-charts-map">
                <WeatherCharts data={weatherData} />
                <Map lat={weatherData.latitude} lon={weatherData.longitude} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
