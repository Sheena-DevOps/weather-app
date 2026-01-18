import { API_KEY, API_URL } from '@env';

export const fetchWeather = async (longitude, latitude, isTmrw) => {
  try {
    const response = await fetch(
      `${API_URL}q=${latitude},${longitude}&days=10&tp=24&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const fetchDayForecast = async (longitude, latitude, isTmrw) => {
  try {
    let dateString = '';

    if (isTmrw) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfterTmrw = new Date();
      dayAfterTmrw.setDate(dayAfterTmrw.getDate() + 2);

      const tmrwFormatted = tomorrow.toISOString().split('T')[0];
      const dayAfterFormatted = dayAfterTmrw.toISOString().split('T')[0];
      dateString = `&dt=${tmrwFormatted},${dayAfterFormatted}`;
    }

    const response = await fetch(
      `${API_URL}q=${latitude},${longitude}&days=2&tp=60${dateString}&key=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch day forecast');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};
