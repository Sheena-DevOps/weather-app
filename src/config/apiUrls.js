import { API_KEY } from '@env';

export const WEATHER_API_URL = `https://api.weatherapi.com/v1/forecast.json?q=10001&days=10&tp=24&key=${API_KEY}`;
export const DAY_FORECAST_URL = `https://api.weatherapi.com/v1/forecast.json?q=${position}&days=2&tp=60&key=${API_KEY}`;
