import { useEffect, useState } from 'react';
import noteService from '../services/notes';
import Note from '../components/notes/Note';
import Notification from '../components/Notification';
import NoteForm from '../components/notes/NoteForm';
import Footer from '../components/notes/Footer';
import loginService from '../services/login';

const Notes = () => {
  document.title = 'Full Stack Open - Notes';
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  useEffect(() => {
    const controller = new AbortController();

    noteService.getAll(controller.signal).then((initialNotes) => {
      setNotes(initialNotes);
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(
          notes.map((note) => {
            return note.id !== returnedNote.id ? note : returnedNote;
          }),
        ),
      )
      .catch((_error) => {
        setNotification({
          content: `The note '${note.content}' was already deleted from the server`,
          error: true,
        });
        setTimeout(() => setNotification({}), 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    if (newNote === '') return;

    const note = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };

    noteService
      .create(note)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      })
      .catch((error) => {
        const { content } = error.response.data.errors;
        setNotification({ content, error: true });
        setTimeout(() => setNotification(null), 5000);
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      setNotification({ content: 'Wrong username or password', error: true });
      setTimeout(() => setNotification({}), 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <legend>Login</legend>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const handleLogout = () => {
    noteService.setToken(null);
    setUser(null);
    localStorage.removeItem('loggedNoteAppUser');
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification {...notification} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <p>{user.name} logged in</p>
            <button type="button" onClick={handleLogout}>
              logout
            </button>
          </div>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            handleNoteChange={({ target }) => setNewNote(target.value)}
          />
        </div>
      )}
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
