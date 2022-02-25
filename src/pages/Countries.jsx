import axios from 'axios';
import { useEffect, useState } from 'react';

import CountryInfo from '../components/countries/CountryInfo';
import CountryList from '../components/countries/CountryList';

const Countries = () => {
  document.title = 'Full Stack Open - Countries';

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
};

export default Countries;
