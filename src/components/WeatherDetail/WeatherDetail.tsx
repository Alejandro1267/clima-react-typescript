import type { Weather } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";

type Props = {
  weather: Weather;
};

export default function WeatherDetail({ weather }: Props) {
  return (
    <div className={styles.container}>
      <h2>Clima de: {weather.city}</h2>
      <p className={styles.current}>{weather.temperature.current}&deg;C</p>
      <div className={styles.temperatures}>
        <p>
          Min: <span>{weather.temperature.minimum}&deg;C</span>
        </p>
        <p>
          Máx: <span>{weather.temperature.maximum}&deg;C</span>
        </p>
      </div>
    </div>
  );
}
