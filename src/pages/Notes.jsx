import { useEffect, useState } from 'react';
import axios from 'axios';

const Note = ({ note }) => <li>{note.content}</li>;

export default function Notes() {
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
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    setNotes(notes.concat(note));
    setNewNote('');
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
}
