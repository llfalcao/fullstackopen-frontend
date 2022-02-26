import { useEffect, useState } from 'react';
import personService from '../services/persons';

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
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (newName === '' || newNumber === '') return;
    if (persons.some((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      return alert(`${newName} is already added to the phonebook`);
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personService
      .create(newPerson)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
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
