import { useEffect, useState } from 'react';
import axios from 'axios';

const Note = ({ note }) => <li>{note.content}</li>;

const Notes = () => {
  document.title = 'Full Stack Open - Notes';
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    axios
      .get('https://yf9spi.sse.codesandbox.io/notes')
      .then((response) => setNotes(response.data));
  }, []);

  const handleNoteChange = (e) => setNewNote(e.target.value);

  const addNote = (e) => {
    e.preventDefault();
    if (newNote === '') return;
    const note = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    axios
      .post('https://yf9spi.sse.codesandbox.io/notes', note)
      .then((response) => {
        setNotes(notes.concat(response.data));
        setNewNote('');
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <input
        type="checkbox"
        id="important"
        onChange={() => setShowAll(!showAll)}
      />
      <label htmlFor="important">Important</label>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Notes;
