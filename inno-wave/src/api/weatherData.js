"use server";

export async function getWeatherData(city) {
  try {
    // Get current weather
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    if (!weatherRes.ok) throw new Error("Failed to fetch weather data");
    const weatherData = await weatherRes.json();

    // Get forecast data
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`
    );
    if (!forecastRes.ok) throw new Error("Failed to fetch forecast data");
    const forecastData = await forecastRes.json();

    return { weatherData, forecastData };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}
