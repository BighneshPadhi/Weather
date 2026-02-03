import React from 'react';
import DynamicIcon from './DynamicIcon';
import './Forecast.css';

const Forecast = ({ data }) => {
    if (!data) return null;

    const { daily } = data;

    // Daily arrays are parallel
    const forecastDays = daily.time.map((time, index) => {
        return {
            date: new Date(time),
            maxTemp: Math.round(daily.temperature_2m_max[index]),
            minTemp: Math.round(daily.temperature_2m_min[index]),
            code: daily.weather_code[index],
            precipitation: daily.precipitation_sum[index],
        };
    });

    return (
        <div className="forecast-container card">
            <h3>7-Day Forecast</h3>
            <div className="forecast-list">
                {forecastDays.map((day, index) => (
                    <div key={index} className="forecast-item">
                        <div className="forecast-day">
                            {index === 0 ? 'Today' : day.date.toLocaleDateString(undefined, { weekday: 'short' })}
                        </div>
                        <div className="forecast-icon">
                            <DynamicIcon code={day.code} size={32} />
                        </div>
                        <div className="forecast-temp">
                            <span className="max">{day.maxTemp}°</span>
                            <span className="min">{day.minTemp}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
