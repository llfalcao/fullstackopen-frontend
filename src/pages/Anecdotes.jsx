import { useState } from 'react';

const Anecdotes = () => {
  document.title = 'Full Stack Open - Anecdotes';

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const [best, setBest] = useState(-1);

  const loadNextAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  const addVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    if (best === -1 || copy[selected] > copy[best]) {
      setBest(selected);
    }
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] || 0} votes.</p>
      <button type="button" onClick={addVote}>
        vote
      </button>
      <button type="button" onClick={loadNextAnecdote}>
        next anecdote
      </button>

      <h2>Anecdote with Most Votes</h2>
      {best === -1 ? <p>{anecdotes[selected]}</p> : <p>{anecdotes[best]}</p>}
      <p>with {votes[best < 0 ? selected : best]} votes.</p>
    </div>
  );
};

export default Anecdotes;
