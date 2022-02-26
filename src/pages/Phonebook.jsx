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
    const personObject = { name: newName, number: newNumber };
    const match = persons.find((p) => {
      return p.name.toLowerCase() === newName.toLowerCase();
    });
    const shouldUpdate =
      match &&
      window.confirm(
        `${newName} is already added to the phonebook.\nReplace the old number with the new one?`,
      );

    if (shouldUpdate) {
      personService
        .update(match.id, personObject)
        .then((returnedPerson) =>
          setPersons(
            persons.map((p) =>
              p.id !== returnedPerson.id ? p : returnedPerson,
            ),
          ),
        );
      return;
    }

    personService
      .create(personObject)
      .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
  };

  const deletePerson = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);
    if (shouldDelete) {
      personService
        .remove(person.id)
        .then(() => setPersons(persons.filter((n) => n.id !== person.id)));
    }
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
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default Phonebook;
