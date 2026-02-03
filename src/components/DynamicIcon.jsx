import React from 'react';
import {
    Sun,
    CloudSun,
    Cloud,
    CloudFog,
    CloudDrizzle,
    CloudRain,
    Snowflake,
    CloudLightning,
    Moon,
    CloudMoon
} from 'lucide-react';

const DynamicIcon = ({ code, isDay = 1, size = 64, className = "" }) => {
    // WMO Weather interpretation codes
    // 0: Clear sky
    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    // 45, 48: Fog
    // 51, 53, 55: Drizzle
    // 56, 57: Freezing Drizzle
    // 61, 63, 65: Rain
    // 66, 67: Freezing Rain
    // 71, 73, 75: Snow fall
    // 77: Snow grains
    // 80, 81, 82: Rain showers
    // 85, 86: Snow showers
    // 95, 96, 99: Thunderstorm

    const getIcon = () => {
        switch (code) {
            case 0: // Clear
                return isDay ? <Sun size={size} className={className} color="#FDB813" /> : <Moon size={size} className={className} color="#F6F1D5" />;

            case 1: // Mainly clear
            case 2: // Partly cloudy
                return isDay ? <CloudSun size={size} className={className} color="#ffde7d" /> : <CloudMoon size={size} className={className} color="#d6e4ff" />;

            case 3: // Overcast
                return <Cloud size={size} className={className} color="#A0A0A0" />;

            case 45: // Fog
            case 48:
                return <CloudFog size={size} className={className} color="#B4B4B4" />;

            case 51: // Drizzle
            case 53:
            case 55:
                return <CloudDrizzle size={size} className={className} color="#89CFF0" />;

            case 56: // Freezing Drizzle
            case 57:
            case 66:
            case 67:
                return <Snowflake size={size} className={className} color="#C2DFFF" />; // Using snowflake for freezing precip for simplicity

            case 61: // Rain
            case 63:
            case 65:
            case 80:
            case 81:
            case 82:
                return <CloudRain size={size} className={className} color="#4682B4" />;

            case 71: // Snow
            case 73:
            case 75:
            case 77:
            case 85:
            case 86:
                return <Snowflake size={size} className={className} color="#FFFFFF" />;

            case 95: // Thunderstorm
            case 96:
            case 99:
                return <CloudLightning size={size} className={className} color="#FFD700" />;

            default:
                return <Sun size={size} className={className} />;
        }
    };

    return (
        <div className="weather-icon-container">
            {getIcon()}
        </div>
    );
};

export default DynamicIcon;
