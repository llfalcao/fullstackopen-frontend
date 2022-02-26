import { useEffect, useState } from 'react';
import noteService from '../services/notes';
import Note from '../components/notes/Note';
import Notification from '../components/notes/Notification';
import NoteForm from '../components/notes/NoteForm';
import Footer from '../components/notes/Footer';

const Notes = () => {
  document.title = 'Full Stack Open - Notes';
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(
          notes.map((n) => (n.id !== returnedNote.id ? n : returnedNote)),
        ),
      )
      .catch((error) => {
        setErrorMessage(
          `The note '${note.content}' was already deleted from the server`,
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (e) => {
    e.preventDefault();
    if (newNote === '') return;

    const note = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService.create(note).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <NoteForm
        addNote={addNote}
        newNote={newNote}
        handleNoteChange={(e) => setNewNote(e.target.value)}
      />
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
      <Footer />
    </div>
  );
};

export default Notes;
