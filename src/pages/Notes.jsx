import { useEffect, useState } from 'react';
import noteService from '../services/notes';

const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'Make not important' : 'Make important';

  return (
    <li>
      {note.content}
      <button type="button" onClick={toggleImportance}>
        {label}
      </button>
    </li>
  );
};

const Notes = () => {
  document.title = 'Full Stack Open - Notes';
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    noteService.getAll().then((response) => setNotes(response.data));
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

    noteService.create(note).then((response) => {
      setNotes(notes.concat(response.data));
      setNewNote('');
    });
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) =>
        setNotes(
          notes.map((note) =>
            note.id !== response.data.id ? note : response.data,
          ),
        ),
      );
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
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
