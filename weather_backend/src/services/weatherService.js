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
  
      console.log('API Response:', response.data); 
  
      
      const weatherData = {
        temperature_min: response.data.main.temp_min,
        temperature_max: response.data.main.temp_max,
        temperature: response.data.main.temp,

        pressure: response.data.main.pressure,
        humidity: response.data.main.humidity,
        wind_speed: response.data.wind.speed,
        wind_direction: response.data.wind.deg,
        wind_gust: response.data.wind.gust,

        description: response.data.weather[0].description
      };
  
      cache.set(cacheKey, weatherData);
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error.message); 
      if (error.response) {
        if (error.response.status === 401) {
          throw new Error('Invalid API key');
        }
        throw new Error(`API Error: ${error.response.data.message}`);
      } else if (error.request) {
        throw new Error('No response received from API');
      } else {
        throw new Error('Error setting up API request');
      }
    }
  };
  

module.exports = { getWeatherData, CITIES };