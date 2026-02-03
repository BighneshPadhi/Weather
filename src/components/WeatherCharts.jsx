import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import './WeatherCharts.css';

const WeatherCharts = ({ data }) => {
    if (!data) return null;

    const { hourly } = data;

    // Filter for next 24 hours
    const currentHour = new Date().getHours();
    // Assume generic index matching for now, though API is time-based.
    // API returns time in ISO. Find index of current hour or just take first 24 if simpler.
    // Ideally, parse time.

    const chartData = hourly.time.slice(0, 24).map((time, index) => ({
        time: new Date(time).getHours() + ':00',
        temp: Math.round(hourly.temperature_2m[index]),
        precip: hourly.precipitation_probability[index]
    }));

    return (
        <div className="charts-container card">
            <h3>24-Hour Temperature Trend</h3>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#fff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: '8px', border: 'none' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="temp"
                            stroke="#fff"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default WeatherCharts;
