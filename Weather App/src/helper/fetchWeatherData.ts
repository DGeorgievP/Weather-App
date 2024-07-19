const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        city
      )}?unitGroup=metric&key=${apiKey}`
    );

    if (!response.ok) throw new Error("City Not Found");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
