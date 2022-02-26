const Person = ({ name, number, deletePerson }) => {
  return (
    <li>
      {name} {number}
      <button type="button" onClick={deletePerson}>
        Delete
      </button>
    </li>
  );
};

export default Person;
