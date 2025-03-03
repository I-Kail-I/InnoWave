"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion as Motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  Moon,
  Wind,
  Droplets,
  Eye,
  Gauge,
} from "lucide-react";
import { getWeatherData } from "../../api/weatherData";
import { getCities } from "../../api/cityData.js";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const data = await getCities();
        // Transform the data into a flat array of cities with their countries
        const flattenedCities = data.flatMap((country) =>
          country.cities.map((city) => ({
            city: city,
            country: country.country,
          }))
        );
        setCities(flattenedCities);
      } catch (error) {
        console.error("Failed to fetch cities:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  // Filter cities based on search term
  const filteredCities = cities
    .filter((item) =>
      item.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 10); // Limit to 10 results for performance

  const handleSearch = async (formData) => {
    try {
      setLoading(true);
      const city = formData.get("city");
      const response = await getWeatherData(city);
      if (response.error) {
        alert(response.error);
        return;
      }
      setWeatherData(response.weatherData);
      setForecastData(response.forecastData);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return <Sun className="text-amber-400" />;
      case "02d":
      case "02n":
        return <CloudSun className="text-amber-400" />;
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <Cloud className="text-gray-400" />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <CloudRain className="text-blue-400" />;
      default:
        return <Sun className="text-amber-400" />;
    }
  };

  const hourlyForecast =
    forecastData?.list?.slice(0, 8).map((item) => ({
      time: new Date(item.dt * 1000).getHours() + "h",
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
    })) || Array(8).fill({ time: "--", temp: "--", icon: "01d" });

  // Get daily forecast (every 24 hours)
  const dailyForecast =
    forecastData?.list
      ?.filter((_, index) => index % 8 === 0)
      .map((item) => ({
        day: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        temp_max: Math.round(item.main.temp_max),
        temp_min: Math.round(item.main.temp_min),
        icon: item.weather[0].icon,
      })) || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search bar with styled dropdown */}
        <div className="flex w-full items-center justify-center relative">
          <form action={handleSearch} className="flex flex-row gap-2 w-full">
            <div className="relative flex-1">
              <Input
                placeholder="Search for a city..."
                className="bg-white border-gray-100"
                type="text"
                name="city"
                value={searchTerm}
                autoComplete="off"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && (
                <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
                  {loadingCities ? (
                    <div className="p-2 text-sm text-gray-500">
                      Loading cities...
                    </div>
                  ) : filteredCities.length > 0 ? (
                    filteredCities.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                        onClick={() => {
                          setSearchTerm(item.city);
                          setShowDropdown(false);
                        }}
                      >
                        <h1
                          className="text-xl font-bold text-gray-900"
                          style={{ fontFamily: "monospace" }}
                        >
                          {item.city}
                        </h1>
                        <p className="text-sm text-gray-500">{item.country}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500">
                      No cities found
                    </div>
                  )}
                </div>
              )}
            </div>
            <Button
              className="cursor-pointer hover:bg-gray-400 bg-amber-200"
              type="submit"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Current weather card */}
        <Card className="overflow-hidden border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-1">
                <h2 className="text-xl font-medium text-gray-800">
                  {weatherData ? weatherData.name : "Location"}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </p>

                <div className="flex items-center mt-4">
                  <span className="text-6xl font-bold">
                    {weatherData
                      ? `${Math.round(weatherData.main.temp)}°`
                      : "00°"}
                  </span>
                  <Sun size={48} className="text-amber-400 ml-2" />
                </div>
                <p className="text-gray-700">
                  {weatherData
                    ? weatherData.weather[0].description
                    : "Weather Condition"}
                </p>
              </div>

              {/* Weather details */}
              <div className="grid grid-cols-2 gap-x-16 gap-y-6 mt-4 md:mt-0">
                {[
                  {
                    icon: Wind,
                    label: "Wind",
                    value: weatherData
                      ? `${weatherData.wind.speed} m/s`
                      : "0 m/s",
                  },
                  {
                    icon: Droplets,
                    label: "Humidity",
                    value: weatherData ? `${weatherData.main.humidity}%` : "0%",
                  },
                  {
                    icon: Eye,
                    label: "Visibility",
                    value: weatherData
                      ? `${weatherData.visibility / 1000} km`
                      : "0 km",
                  },
                  {
                    icon: Gauge,
                    label: "Pressure",
                    value: weatherData
                      ? `${weatherData.main.pressure} hPa`
                      : "0 hPa",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <item.icon className="mr-3 text-blue-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly forecast section */}
        <div>
          <h3 className="text-lg font-medium mb-3 px-1">Hourly Forecast</h3>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {hourlyForecast.map((data, index) => (
              <Card
                key={index}
                className="bg-white border-none shadow-md hover:shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105"
              >
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <p className="text-sm">{data.time}</p>
                  {getWeatherIcon(data.icon)}
                  <p className="text-lg font-medium">{data.temp}°</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily forecast */}
        <div>
          <h3 className="text-lg font-medium mb-3 px-1">5-Day Forecast</h3>
          <Card className="border-none shadow-lg">
            <CardContent className="p-0">
              {dailyForecast.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border-b border-gray-200"
                >
                  <div>
                    <p className="font-medium">{day.day}</p>
                    <p className="text-sm text-gray-500">{day.date}</p>
                  </div>
                  {getWeatherIcon(day.icon)}
                  <div className="text-right">
                    <p className="font-medium">
                      {day.temp_max}° / {day.temp_min}°
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
