function transform(forecastResult, orderBy) {
  if (!forecastResult) {
    return [];
  }

  if (typeof forecastResult !== "object" || !Array.isArray(forecastResult.list)) {
    throw TypeError("Please provide an object with the property list as array")
  }

  return forecastResult.list.map(({ main, wind, dt }) => ({
    dt,
    temp: getTemperatureAttributes(main),
    wind: getWindAttributes(wind)
  }))
    .sort(({ dt: first }, { dt: second }) => orderBy === "asc" ? first - second : second - first);
}

function getTemperatureAttributes({ temp, temp_min, temp_max, pressure, sea_level, grnd_level, humidity, temp_kf }) {
  return { temp, temp_min, temp_max, pressure, sea_level, grnd_level, humidity, temp_kf };
}

function getWindAttributes({ speed, deg }) {
  return { speed, deg };
}

module.exports = transform;
