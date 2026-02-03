
const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const fetchCityCoordinates = async (city) => {
  try {
    const response = await fetch(`${GEOCODING_URL}?name=${city}&count=5&language=en&format=json`);
    if (!response.ok) throw new Error("Failed to fetch coordinates");
    const data = await response.json();
    if (!data.results || data.results.length === 0) throw new Error("City not found");
    return data.results;
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

export const fetchWeather = async (lat, lon) => {
  try {
    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      current: "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m",
      hourly: "temperature_2m,relative_humidity_2m,weather_code,precipitation_probability",
      daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max",
      timezone: "auto",
      forecast_days: 7 // Open-Meteo supports up to 16, but 7 is enough for us
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch weather data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

export const getWeatherDescription = (code) => {
    // WMO Weather interpretation codes (WW)
    // https://open-meteo.com/en/docs
    const codes = {
        0: "Clear sky",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Drizzle: Light",
        53: "Drizzle: Moderate",
        55: "Drizzle: Dense intensity",
        56: "Freezing Drizzle: Light",
        57: "Freezing Drizzle: Dense intensity",
        61: "Rain: Slight",
        63: "Rain: Moderate",
        65: "Rain: Heavy intensity",
        66: "Freezing Rain: Light",
        67: "Freezing Rain: Heavy intensity",
        71: "Snow fall: Slight",
        73: "Snow fall: Moderate",
        75: "Snow fall: Heavy intensity",
        77: "Snow grains",
        80: "Rain showers: Slight",
        81: "Rain showers: Moderate",
        82: "Rain showers: Violent",
        85: "Snow showers: Slight",
        86: "Snow showers: Heavy",
        95: "Thunderstorm: Slight or moderate",
        96: "Thunderstorm with slight hail",
        99: "Thunderstorm with heavy hail"
    };
    return codes[code] || "Unknown";
};
