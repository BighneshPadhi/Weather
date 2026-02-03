import React from 'react';
import DynamicIcon from './DynamicIcon';
import { Wind, Droplets, Gauge } from 'lucide-react';
import { getWeatherDescription } from '../services/weatherService';
import './CurrentWeather.css';

const CurrentWeather = ({ data, location }) => {
    if (!data) return null;

    const { current, current_units } = data;
    const description = getWeatherDescription(current.weather_code);
    const isDay = current.is_day;

    return (
        <div className="current-weather card">
            <div className="weather-header">
                <div>
                    <h2 className="city-name">{location}</h2>
                    <p className="date">{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="weather-icon-wrapper">
                    <DynamicIcon code={current.weather_code} isDay={isDay} size={80} />
                </div>
            </div>

            <div className="weather-main">
                <div className="temperature-container">
                    <h1 className="temperature">
                        {Math.round(current.temperature_2m)}
                        <span className="unit">{current_units.temperature_2m}</span>
                    </h1>
                    <p className="condition">{description}</p>
                </div>
            </div>

            <div className="weather-details">
                <div className="detail-item">
                    <Droplets size={24} className="detail-icon" />
                    <div className="detail-info">
                        <span className="label">Humidity</span>
                        <span className="value">{current.relative_humidity_2m}{current_units.relative_humidity_2m}</span>
                    </div>
                </div>

                <div className="detail-item">
                    <Wind size={24} className="detail-icon" />
                    <div className="detail-info">
                        <span className="label">Wind</span>
                        <span className="value">{Math.round(current.wind_speed_10m)} {current_units.wind_speed_10m}</span>
                    </div>
                </div>

                <div className="detail-item">
                    <Gauge size={24} className="detail-icon" />
                    <div className="detail-info">
                        <span className="label">Pressure</span>
                        <span className="value">{Math.round(current.pressure_msl)} {current_units.pressure_msl}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentWeather;
