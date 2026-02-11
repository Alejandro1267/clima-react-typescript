import {
  useState,
  type ChangeEvent,
} from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { Search } from "../../types";

export default function Form() {
  const [search, setSearch] = useState<Search>({
    city: "",
    country: "",
  });
  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="city">Ciudad:</label>
        <input
          id="city"
          name="city"
          type="text"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País:</label>
        <select
          id="country"
          name="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">--Selecciona un País--</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" className={styles.submit} value="Consultar Clima" />
    </form>
  );
}
