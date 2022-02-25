import Person from './Person';

const Persons = ({ persons, filter, searchResults }) => {
  const personsToShow = filter.length > 0 ? searchResults : persons;

  return (
    <ul>
      {personsToShow.map((person) => (
        <Person key={person.id} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

export default Persons;
