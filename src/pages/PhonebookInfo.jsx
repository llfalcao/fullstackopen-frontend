import { useEffect, useState } from 'react';
import personService from '../services/persons';

const PhonebookInfo = () => {
  const [people, setPeople] = useState(null);
  const now = new Date().toUTCString();

  useEffect(
    () => personService.getAll().then((people) => setPeople(people.length)),
    [],
  );

  if (people === null) {
    return (
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="loadingIcon"
        >
          <path d="M0 10.996c.484-5.852 5.145-10.512 10.996-10.996v2.009c-4.737.473-8.515 4.25-8.987 8.987h-2.009zm13.004-8.987c4.737.473 8.515 4.25 8.987 8.987h2.009c-.484-5.852-5.145-10.512-10.996-10.996v2.009zm-2.008 19.982c-4.737-.473-8.515-4.25-8.987-8.987h-2.009c.484 5.852 5.145 10.512 10.996 10.996v-2.009zm10.995-8.987c-.473 4.737-4.25 8.514-8.987 8.987v2.009c5.851-.484 10.512-5.144 10.996-10.996h-2.009z" />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <p>
        Phonebook has info for {people} {people === 1 ? 'person' : 'people'}.
      </p>
      <p>{now}</p>
    </div>
  );
};

export default PhonebookInfo;
