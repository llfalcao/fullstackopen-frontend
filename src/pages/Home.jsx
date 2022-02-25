import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>FullStackOpen Projects</h1>
      <a href="https://fullstackopen.com/">About the course</a>

      <nav
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '1rem',
        }}
      >
        <Link to="anecdotes">Anecdotes</Link>
        <Link to="unicafe">Unicafe</Link>
        <Link to="courses">Courses</Link>
        <Link to="notes">Notes</Link>
        <Link to="phonebook">Phonebook</Link>
        <Link to="countries">Countries</Link>
      </nav>
    </div>
  );
}
