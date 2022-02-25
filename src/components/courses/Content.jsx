import Part from './Part';

const Content = ({ parts }) => {
  const total = parts.reduce((sum, p) => sum + p.exercises, 0);

  return (
    <ul>
      {parts.map(({ id, name, exercises }) => (
        <Part key={id} name={name} exercises={exercises} />
      ))}
      <p>Total of {total} exercises.</p>
    </ul>
  );
};

export default Content;
