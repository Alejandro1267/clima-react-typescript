import { type Weather } from "../../hooks/useWeather";

type Props = {
  weather: Weather;
};

export default function WeatherDetail({ weather }: Props) {
  return (
    <div>
      <h2>Clima de: {weather.city}</h2>
      <p>{weather.temperature.current}&deg;C</p>
      <div>
        <p>Min: {weather.temperature.minimum}&deg;C</p>
        <p>Máx: {weather.temperature.maximum}&deg;C</p>
      </div>
    </div>
  );
}
