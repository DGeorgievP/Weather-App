import { useState, useEffect } from "react";
import { fetchWeatherData } from "../../helper/fetchWeatherData";
import Favorites from "../Favorites";
import Search from "../Search";
import WeatherData from "../WeatherData";
import './styles.css'

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

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [searchedCity, setSavedFavorites] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const saveFavorites = (favorites: string[]) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const addToFavorites = () => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    }
  };

  const removeFavorite = (cityToRemove: string) => {
    const updatedFavorites = favorites.filter((city) => city !== cityToRemove);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWeatherData(searchedCity);
        setErrorMessage("");
        setWeatherData(data);
      } catch {
        setErrorMessage("City not found");
      } finally {
        setLoading(false);
      }
    }
    if (searchedCity) {
      fetchData();
    }
  }, [searchedCity]);

  const handleSearch = (searchForCity: string) => {
    setLoading(true);
    setSavedFavorites(searchForCity);
  };

  return (
    <div id="main-container">
      <h1>Weather App</h1>
      <Search
        value={city}
        handleSearch={() => handleSearch(city)}
        onChange={(e) => setCity(e.target.value)}
      />
      {loading ? (
        <div id="loader">Loading...</div>
      ) : (
        errorMessage ? (
          <div id="error-message">{errorMessage}</div>
        ) :
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
            <WeatherData weatherData={weatherData.currentConditions} />
          </div>
        )
      )}
      {favorites.length > 0 && (
        <Favorites
          favorites={favorites}
          removeFavorite={removeFavorite}
          handleFavoriteClick={(city) => handleSearch(city)}
        />
      )}
    </div>
  );
};

export default WeatherCard;
