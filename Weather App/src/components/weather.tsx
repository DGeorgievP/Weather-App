import { useState } from "react";

interface WeatherData {
  address: string;
  currentConditions: {
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    icon: string;
  };
}
export const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?key=${apiKey}`
      );

      const data = await response.json();
      setWeatherData(data);
    } catch {
      throw new Error("Data not found");
      
    }
  };
  console.log(weatherData)

  return (
    <>
       <div id="main-container">
        <h1>Weather App</h1>
        <input id="input" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}></input>
        <div>
          <button id="search" onClick={fetchWeatherData}>Search</button>
        </div>
        {weatherData && (
        <div id="weather-info">
            <h2>{weatherData.address}</h2>
            <p>Temperature: {weatherData.currentConditions.temp}°F Feels like {weatherData.currentConditions.feelslike}°F</p>
            <p>Humidity: {weatherData.currentConditions.humidity}%</p>
            <p>Wind Speed: {weatherData.currentConditions.windspeed} km/h</p>
            <p>Weather Condition: {weatherData.currentConditions.icon}</p>
      </div>
        )}
      </div>
    </>
  );
};
