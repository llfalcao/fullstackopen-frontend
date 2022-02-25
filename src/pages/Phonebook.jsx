import { useEffect, useState } from 'react';
import axios from 'axios';

const Person = ({ name, number }) => {
  return (
    <li>
      {name} {number}
    </li>
  );
};

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

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name:{' '}
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
      </div>
      <div>
        Number{' '}
        <input
          type="text"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const Filter = ({ filter, handleFilter }) => {
  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" value={filter} onChange={handleFilter} />
    </div>
  );
};

export default function Phonebook() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const searchResults = persons.filter((p) => {
    const name = p.name.toLowerCase();
    const query = filter.toLowerCase();
    return name.includes(query);
  });

  useEffect(() => {
    axios
      .get('https://yf9spi.sse.codesandbox.io/persons')
      .then((response) => setPersons(response.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (newName === '') return;
    if (persons.some((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      return window.alert(`${newName} is already added to the phonebook`);
    }
    const newPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newPerson));
  };

  const handleFilter = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        searchResults={searchResults}
      />
    </div>
  );
}
