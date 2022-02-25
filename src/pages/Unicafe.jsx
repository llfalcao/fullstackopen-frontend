import { useState } from 'react';

import Button from '../components/unicafe/Button';
import Statistics from '../components/unicafe/Statistics';

const Unicafe = () => {
  document.title = 'Full Stack Open - Unicafe';
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
};

export default Unicafe;
