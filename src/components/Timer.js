import React, { useState, useEffect, useCallback } from 'react';

function Timer({ actualData, setTimerName }) {
  const [timer, setTimer] = useState('');
  const year = new Date().getFullYear();
  const [targetDate, setTargetDate] = useState(
    +new Date(`${year}-09-25T00:00`),
  );
  const [appInterval, setAppInterval] = useState('');

  function customDates() {
    return actualData.map((dataSet) => (
      <button
        key={`${dataSet[2]}`}
        name={`${dataSet[0]}`}
        onClick={(e) => newDate(dataSet[1], e)}
      >
        {dataSet[0]}
      </button>
    ));
  }

  function newDate(date, e) {
    clearInterval(appInterval);
    setTargetDate(date);
    setTimerName(e.currentTarget.name);
  }

  const getDifference = useCallback(() => {
    const timeUntilBirtDay = targetDate - Date.now();
    const milliseconds = timeUntilBirtDay;
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    // const days = hours -(Math.floor(hours / 24) * 24);
    setTimer([
      days,
      hours - days * 24,
      minutes - hours * 60,
      seconds - minutes * 60,
    ]);
  }, [targetDate]);

  useEffect(() => {
    getDifference();
    const interval = setInterval(() => getDifference(), 1000);
    setAppInterval(interval);
  }, [getDifference]);

  return (
    <>
      <button
        name="Christmass"
        onClick={(e) => newDate(+new Date(`${year}-12-25T00:00`), e)}
      >
        Christmass
      </button>
      <button
        name="New Year"
        onClick={(e) => newDate(+new Date(`${year + 1}-01-01T00:00`), e)}
      >
        New Year
      </button>
      <button
        name="Hallowen"
        onClick={(e) => newDate(+new Date(`${year}-10-31T00:00`), e)}
      >
        Hallowen
      </button>
      {customDates()}
      <p>{`
    ${timer?.[0] ? timer?.[0] : 0} days,
    ${timer?.[1] ? timer?.[1] : 0} hours,
    ${timer?.[2] ? timer?.[2] : 0} minutes,
    ${timer?.[3] ? timer?.[3] : 0} seconds
    `}</p>
    </>
  );
}

export default Timer;
