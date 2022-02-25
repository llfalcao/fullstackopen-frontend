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

export default Country;
