import { useState } from 'react';

const Button = ({ text, increment }) => {
  return (
    <button type="button" onClick={increment}>
      {text}
    </button>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given.</p>;
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={good + neutral + bad} />
          <StatisticsLine text="Average" value={(good + neutral + bad) / 3} />
          <StatisticsLine
            text="Positive"
            value={`${(good * 100) / (good + neutral + bad) || 0}%`}
          />
        </tbody>
      </table>
    </div>
  );
};

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default function Unicafe() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Unicafe</h1>
      <h2>Give feedback</h2>
      <div>
        <Button text="good" increment={() => setGood(good + 1)} />
        <Button text="neutral" increment={() => setNeutral(neutral + 1)} />
        <Button text="bad" increment={() => setBad(bad + 1)} />
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}
