import StatisticsLine from './StatisticsLine';

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

export default Statistics;
