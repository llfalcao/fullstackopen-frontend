const NoteForm = ({ addNote, newNote, handleNoteChange }) => {
  return (
    <form onSubmit={addNote}>
      <input
        type="text"
        value={newNote}
        onChange={handleNoteChange}
        placeholder="Type something..."
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default NoteForm;
