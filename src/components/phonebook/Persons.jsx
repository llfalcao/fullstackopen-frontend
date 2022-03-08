import Person from './Person';

const Persons = ({ persons, filter, searchResults, deletePerson }) => {
  const personsToShow = filter.length > 0 ? searchResults : persons;

  return (
    <ul>
      {personsToShow.map((person) => (
        <Person
          key={person._id}
          name={person.name}
          number={person.number}
          deletePerson={() => deletePerson(person)}
        />
      ))}
    </ul>
  );
};

export default Persons;
