import './styles.css';

export interface WeatherDataProps {
  weatherData: {
    temp: number;
    feelslike: number;
    humidity: number;
    windspeed: number;
    conditions: string;
  };
}

const WeatherData = ({ weatherData }: WeatherDataProps) => {
  return (
    <div>
      <hr />
      <p>
        Temperature: {weatherData.temp}°C / Feels like: {weatherData.feelslike}
        °C
      </p>
      <hr />
      <p>Humidity: {weatherData.humidity}%</p>
      <hr />
      <p>Wind Speed: {weatherData.windspeed} km/h</p>
      <hr />
      <p>Weather Condition: {weatherData.conditions}</p>
    </div>
  );
};

export default WeatherData;
