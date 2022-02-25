import { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from '../components/phonebook/Filter';
import PersonForm from '../components/phonebook/PersonForm';
import Persons from '../components/phonebook/Persons';

const Phonebook = () => {
  document.title = 'Full Stack Open - Phonebook';
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
};

export default Phonebook;
