import { useState, useEffect } from "react";

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
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const apiKey = import.meta.env.VITE_API_KEY;

  const savedFavorites = (favorites: string[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) [setFavorites(JSON.parse(savedFavorites))];
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = () => {
    if (!favorites.includes(city)) {
      const newFavorite = [...favorites, city];
      setFavorites(newFavorite);
      savedFavorites(newFavorite);
    }
  };

  const removeFavorites = (cityToRemove: string) => {
    const removeACity = favorites.filter((city) => city !== cityToRemove);
    setFavorites(removeACity);
    savedFavorites(removeACity)
  };

  const fetchWeatherData = async (cityToFetch: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
          cityToFetch
        )}?unitGroup=metric&key=${apiKey}`
      );

      const data = await response.json();
      setWeatherData(data);
    } catch {
      alert("City not found");
    } finally {
      setLoading(false);
    }
  };

  const favoritesClick = async (favoriteCity: string) => {
    setCity(favoriteCity);
    await fetchWeatherData(favoriteCity);
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
          />
          <button id="search-btn" onClick={() => fetchWeatherData(city)}>
            Search
          </button>
        </div>
        {loading ? (
          <div id="loader">Loading...</div>
        ) : (
          weatherData && (
            <div id="weather-info">
              <div id="location">
                <h2>{weatherData.address}</h2>
                <button id="favorite-btn" onClick={addToFavorites}></button>
              </div>
              <img
                src={`/src/assets/${weatherData.currentConditions.icon}.svg`}
                alt={weatherData.currentConditions.conditions}
                id="weather-icon"
              />
              <div id="weather-data">
                <hr />
                <p>
                  Temperature: {weatherData.currentConditions.temp}°C / Feels
                  like: {weatherData.currentConditions.feelslike}°C
                </p>
                <hr />
                <p>Humidity: {weatherData.currentConditions.humidity}%</p>
                <hr />
                <p>
                  Wind Speed: {weatherData.currentConditions.windspeed} km/h
                </p>
                <hr />
                <p>
                  Weather Condition: {weatherData.currentConditions.conditions}
                </p>
              </div>
            </div>
          )
        )}
        {favorites.length > 0 && (
          <div id="favorites">
            <h3>Favorites</h3>
            <hr />
            <ul id="favorites-list">
              {favorites.map((favorite) => (
                <li key={favorite}>
                  <button
                    id="favorite-item-btn"
                    onClick={() => favoritesClick(favorite)}
                  >
                    {favorite}
                  </button>
                  <button
                    id="remove-btn"
                    onClick={() => removeFavorites(favorite)}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
