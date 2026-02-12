import axios from "axios";
import type { Search } from "../types";
import { z } from "zod";
import { useState } from "react";

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
    current: main.temp,
    minimum: main.temp_min,
    maximum: main.temp_max,
  },
}));

type Weather = z.infer<typeof AdaptedWeather>;

export default function useWeather() {
  const [weather, setWeather] = useState<Weather>({
    city: '',
    temperature: {
      current: 0,
      minimum: 0,
      maximum: 0,
    }
  });

  const fetchWeather = async (search: Search) => {
    const apiKey = import.meta.env.VITE_API_KEY;

    try {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${apiKey}`;
      const { data } = await axios.get(geoUrl);

      const lat = data[0].lat;
      const lon = data[0].lon;

      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      const { data: weatherResponse } = await axios.get(weatherUrl);

      const result = AdaptedWeather.safeParse(weatherResponse); 

      if (result.success) {
        setWeather(result.data);
      } else {
        console.error("Error en los Datos", result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    weather,
    fetchWeather,
  };
}