import axios from 'axios';
import { useEffect, useState } from 'react';

const api = {
  url: 'https://api.openweathermap.org/data/2.5/weather',
  key: process.env.REACT_APP_WEATHER_API_KEY,
};

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const location = `${country.capital[0]}, ${country.name.common}`;

  useEffect(() => {
    axios.get(`${api.url}/?q=${location}&appid=${api.key}`).then((response) => {
      const { data } = response;
      // Convert from Kelvin to Celsius
      data.main.temp = Math.round(data.main.temp - 273.15);
      setWeather(data);
    });
  }, [location]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area} m²</p>
      <p>Languages:</p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img
        width="200"
        src={country.flags.png}
        alt={`${country.name.common} flag`}
      />
      <p>Weather in {country.capital[0]}</p>
      {weather ? (
        <div>
          <p>Temperature: {weather.main.temp}ºC</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      ) : null}
    </div>
  );
};

export default CountryInfo;
