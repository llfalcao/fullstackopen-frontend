import Country from './Country';

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

export default CountryList;
