const weatherService = require('../services/weatherService');

const getWeather = async (req, res) => {
  try {
    const city = req.params.city.toLowerCase();
    const cityId = weatherService.CITIES[city];
    if (!cityId) {
      return res.status(404).json({ error: 'City not found' });
    }

    const weatherData = await weatherService.getWeatherData(cityId);
    res.json(weatherData);
  } catch (error) {
    console.error('Error in getWeather controller:', error.message); // Log do erro no controlador
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};

module.exports = { getWeather };
