import React, { useState } from 'react';
import moment from 'moment-timezone';

const DateForm = ({ setData, actualData }) => {
  const [timeZone, setTimeZone] = useState(moment.tz.guess());

  const setCustomDate = (e) => {
    e.preventDefault();
    const timerName = e.currentTarget.querySelector('#timerName').value;
    const customDate = new Date(
      moment.tz(e.currentTarget.querySelector('#date').value, timeZone),
    );
    setData([
      ...actualData,
      [
        timerName,
        +customDate,
        `${timerName}${+new Date()}${+customDate}`,
        timeZone,
      ],
    ]);
  };
  return (
    <form onSubmit={setCustomDate} value="">
      <label htmlFor="Custom date">Custom date:</label>
      <input type="datetime-local" id="date" name="Custom date"></input>
      <label htmlFor="text">Name your timer</label>
      <input type="text" id="timerName" name="text" />
      <button type="submit">set Timer</button>
      <label htmlFor="cars">Choose a tz:</label>
      <select
        onChange={(e) => setTimeZone(e.target.value)}
        name="cars"
        id="cars"
        value={timeZone}
      >
        {moment.tz.names().map((opt, index) => (
          <option key={opt + index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </form>
  );
};

export default DateForm;
