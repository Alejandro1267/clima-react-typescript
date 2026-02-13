import axios from "axios";
import type { Search } from "../types";
import { z } from "zod";
import { useMemo, useState } from "react";
import { formatTemperture } from "../utils";

const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
  })
})

const AdaptedWeather = Weather.transform(({ name, main }) => ({
  city: name,
  temperature: {
    current: formatTemperture(main.temp),
    minimum: formatTemperture(main.temp_min),
    maximum: formatTemperture(main.temp_max),
  },
}));

export type Weather = z.infer<typeof AdaptedWeather>;

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    city: '',
    temperature: {
      current: 0,
      minimum: 0,
      maximum: 0,
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeather = async (search: Search) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    setIsLoading(true);

    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;
      const { data } = await axios.get(geoUrl);
      console.log("data", data);

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      const { data: weatherResponse } = await axios.get(weatherUrl);

      const result = AdaptedWeather.safeParse(weatherResponse);

      console.log("result", result);

      if (result.success) {
        setWeather(result.data);
      } else {
        console.error("Error en los Datos", result.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasWeatherData = useMemo(() => weather.city, [weather.city]);

  return {
    weather,
    isLoading,
    fetchWeather,
    hasWeatherData,
  };
}