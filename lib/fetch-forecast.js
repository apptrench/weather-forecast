const fetch = require('node-fetch');
const apiKey = require('../config.json').OpenWeatherMap.apiKey;

module.exports = async (city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);

  if (!response.ok) {
    throw Error(`Error when retrieving weather data from remote API. ${response.statusText}`);
  }

  return response.json();
}