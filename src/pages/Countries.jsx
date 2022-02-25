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

const Country = ({ country, isFiltered, showInfo }) => {
  return (
    <li>
      {country.name.common}
      {isFiltered && (
        <button type="button" onClick={() => showInfo(country)}>
          Show
        </button>
      )}
    </li>
  );
};

const CountryList = ({ filter, countriesToShow, showInfo }) => {
  const isFiltered = filter.length > 0;

  if (isFiltered && countriesToShow.length > 10) {
    return <p>Too many matches.</p>;
  }

  return (
    <ul>
      {countriesToShow.map((c) => (
        <Country
          key={c.cca2}
          country={c}
          isFiltered={isFiltered}
          showInfo={showInfo}
        />
      ))}
    </ul>
  );
};

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);

  const countriesToShow =
    filter.length > 0
      ? countries.filter((c) => {
          const name = c.name.common.toLowerCase();
          const query = filter.toLowerCase();
          return name.startsWith(query);
        })
      : countries;

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) =>
        setCountries(
          response.data.sort((a, b) =>
            a.name.common > b.name.common ? 1 : -1,
          ),
        ),
      );
  }, []);

  const handleFilterChange = (e) => {
    setSelected(null);
    setFilter(e.target.value);
  };

  const showInfo = (country) => setSelected(country);

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <p>Find countries:</p>
        <input value={filter} onChange={handleFilterChange} />
      </div>

      {selected ? (
        <CountryInfo country={selected} />
      ) : countriesToShow.length === 1 ? (
        <CountryInfo country={countriesToShow[0]} />
      ) : (
        <CountryList
          filter={filter}
          countriesToShow={countriesToShow}
          showInfo={showInfo}
        />
      )}
    </div>
  );
}
