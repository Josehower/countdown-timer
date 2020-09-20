import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import moment from 'moment-timezone';

export const ButtonCustom = styled.button`
  background-color: rgb(0, 153, 255);
  color: white;
  padding: 0;
  border-radius: 10px;
  border: none;
  margin: 5px;
  cursor: pointer;
  box-shadow: 2px 2px rgb(0, 50, 80);
  min-width: 100px;

  &:hover {
    transform: scale(1.02);
  }

  .name {
    display: inline-block;
    font-size: 1.1em;
    padding: 9px 10px 0 10px;
    min-height: 16;
  }
  .tz {
    box-sizing: border-box;
    background-color: #ff0000;
    display: block;
    font-size: 0.7em;
    width: 100%;
    padding: 2px 0 4px;
    border-radius: 0 0 10px 10px;
  }
`;

function Timer({ actualData, setTimerName }) {
  const [timer, setTimer] = useState('');
  const year = new Date().getFullYear();
  const [targetDate, setTargetDate] = useState(
    +new Date(`${year}-09-25T00:00`),
  );
  const [appInterval, setAppInterval] = useState('');

  function customDates() {
    return actualData.map((dataSet) => (
      <ButtonCustom
        key={`${dataSet[2]}`}
        name={`${dataSet[0]}`}
        onClick={(e) => newDate(dataSet[1], e)}
      >
        <span className="name">
          {dataSet[0] === '' ? 'Custom' : dataSet[0]}
        </span>
        <span className="tz">{dataSet[3]}</span>
      </ButtonCustom>
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
      <ButtonCustom
        name="Christmass"
        onClick={(e) => newDate(+new Date(`${year}-12-25T00:00`), e)}
      >
        <span className="name">Christmass</span>{' '}
        <span className="tz">{moment.tz.guess()}</span>
      </ButtonCustom>
      <ButtonCustom
        Customname="New Year"
        onClick={(e) => newDate(+new Date(`${year + 1}-01-01T00:00`), e)}
      >
        <span className="name">New Year</span>{' '}
        <span className="tz">{moment.tz.guess()}</span>
      </ButtonCustom>
      <ButtonCustom
        name="Hallowen"
        onClick={(e) => newDate(+new Date(`${year}-10-31T00:00`), e)}
      >
        <span className="name">Hallowen</span>{' '}
        <span className="tz">{moment.tz.guess()}</span>
      </ButtonCustom>
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
