const axios = require('axios');
const cache = require('../utils/cache');

const CITIES = {
  lisbon: 2267056,
  leiria: 2267094,
  coimbra: 2740636,
  porto: 2735941,
  faro: 2268337
};

const getWeatherData = async (cityId) => {
    const cacheKey = `weather_${cityId}`;
    const cachedData = cache.get(cacheKey);
  
    if (cachedData) {
      return cachedData;
    }
  
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather`, {
        params: {
          id: cityId,
          APPID: process.env.API_KEY
        }
      });
  
      console.log('API Response:', response.data); // Log da resposta da API
  
      
      const weatherData = {
        temperature_min: response.data.main.temp_min,
        temperature_max: response.data.main.temp_max,
        temperature: response.data.main.temp,

        description: response.data.weather[0].description
      };
  
      cache.set(cacheKey, weatherData);
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error.message); // Log do erro
      throw new Error('Failed to fetch weather data');
    }
  };
  

module.exports = { getWeatherData, CITIES };