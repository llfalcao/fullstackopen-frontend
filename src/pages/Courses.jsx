const Part = ({ name, exercises }) => {
  return (
    <li>
      {name} {exercises}
    </li>
  );
};

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

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Course = ({ children }) => <div>{children}</div>;

export default function Courses() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map(({ id, name, parts }) => (
        <Course key={id}>
          <Header title={name} />
          <Content parts={parts} />
        </Course>
      ))}
    </div>
  );
}
