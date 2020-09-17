import React from 'react';

const DateForm = ({ setData, actualData }) => {
  const setCustomDate = (e) => {
    e.preventDefault();
    const customDate = +new Date(e.currentTarget.querySelector('#date').value);
    console.log(e.currentTarget.querySelector('#date').value);
    const timerName = e.currentTarget.querySelector('#timerName').value;
    setData([
      ...actualData,
      [timerName, customDate, `${timerName}${+new Date()}${customDate}`],
    ]);
  };
  return (
    <form onSubmit={setCustomDate} value="">
      <label htmlFor="Custom date">Custom date:</label>
      <input type="datetime-local" id="date" name="Custom date"></input>
      <label htmlFor="text">Name your timer</label>
      <input type="text" id="timerName" name="text" />
      <button type="submit">set Timer</button>
    </form>
  );
};

export default DateForm;
