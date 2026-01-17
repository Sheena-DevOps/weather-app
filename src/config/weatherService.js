import { WEATHER_API_URL } from './apiUrls';

export const fetchWeather = async () => {
  try {
    const response = await fetch(WEATHER_API_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Weather API Error:', error);
    return null;
  }
};
