import { useState } from "react";

interface WeatherData {
  address: string;
  currentConditions: {
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    conditions: string;
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
      alert("City not found");
    }
  };
  
  return (
    <>
      <div id="main-container">
        <h1>Weather App</h1>
        <div id="search-div">
        <input
          id="input"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></input>
          <button id="search" onClick={fetchWeatherData}>Search</button>
        </div>
        {weatherData && (
          <div id="weather-info">
            <div id="location">
            <h2>{weatherData.address}</h2>
            <img 
              src={`/src/assets/${weatherData.currentConditions.icon}.svg`} 
              alt={weatherData.currentConditions.conditions} 
              id="weather-icon"
            />
            </div>
            <div id="weather-data">
            <hr />
            <p>
              Temperature: {weatherData.currentConditions.temp}°F Feels like{" "}
              {weatherData.currentConditions.feelslike}°F
            </p>
            <hr />
            <p>Humidity: {weatherData.currentConditions.humidity}%</p>
            <hr />
            <p>Wind Speed: {weatherData.currentConditions.windspeed} km/h</p>
            <hr />
            <p>Weather Condition: {weatherData.currentConditions.conditions}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
