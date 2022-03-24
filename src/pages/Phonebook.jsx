import { useEffect, useState } from 'react';
import personService from '../services/persons';

import Filter from '../components/phonebook/Filter';
import PersonForm from '../components/phonebook/PersonForm';
import Persons from '../components/phonebook/Persons';
import Notification from '../components/phonebook/Notification';

const Phonebook = () => {
  document.title = 'Full Stack Open - Phonebook';
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState({ content: '', isError: false });

  const searchResults = persons.filter((p) => {
    const name = p.name.toLowerCase();
    const query = filter.toLowerCase();
    return name.includes(query);
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setMessage({ content: '', isError: false });
    }, 5000);

    return () => clearTimeout(notificationTimeout);
  }, [message.content]);

  const notify = (msg, isError) =>
    setMessage({ content: msg, isError: isError || false });

  const updatePerson = (match, personObject) => {
    const msg = `${newName} is already added to the phonebook.\nReplace the old number with the new one?`;
    const shouldUpdate = window.confirm(msg);
    if (!shouldUpdate) return;

    personService
      .update(match.id, personObject)
      .then((returnedPerson) => {
        if (!returnedPerson) {
          notify(
            `${match.name} has already been removed from the server`,
            true,
          );
          return setPersons(persons.filter((p) => p.id !== match.id));
        }

        setPersons(
          persons.map((p) => (p.id !== returnedPerson.id ? p : returnedPerson)),
        );
        notify(`Updated ${returnedPerson.name}`);
      })
      .catch((error) => notify(error.response.data, true));
    return;
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (!newName && !newNumber) {
      return notify(
        { name: 'Name is missing', number: 'Number is missing' },
        true,
      );
    } else if (!newName) {
      return notify('Name is missing', true);
    } else if (!newNumber) {
      return notify('Number is missing', true);
    }

    const personObject = { name: newName, number: newNumber };
    const match = persons.find((p) => {
      return p.name.toLowerCase() === newName.toLowerCase();
    });

    if (match) {
      return updatePerson(match, personObject);
    }

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        notify(`Added ${returnedPerson.name}`);
      })
      .catch((error) => notify(error.response.data, true));
  };

  const deletePerson = (person) => {
    const shouldDelete = window.confirm(`Delete ${person.name}?`);
    if (shouldDelete) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((n) => n.id !== person.id));
          notify(`Deleted ${person.name}`);
        })
        .catch((error) => {
          notify(
            `${person.name} has already been removed from the server`,
            true,
          );
          setPersons(persons.filter((p) => p.id !== person.id));
        });
    }
  };

  const handleFilter = (e) => setFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification content={message.content} error={message.isError} />
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
