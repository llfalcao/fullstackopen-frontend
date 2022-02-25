const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" value={filter} onChange={handleFilter} />
    </div>
  );
};

export default Filter;
