import React, { useState } from 'react';
import Timer from './components/Timer';
import DateForm from './components/DateForm';

function App() {
  const [userInputData, setUserInputData] = useState([]);
  const [timerName, setTimerName] = useState("Jose's birthday!");

  return (
    <>
      <h1>Countdown Until {timerName}</h1>
      <Timer actualData={userInputData} setTimerName={setTimerName} />
      <DateForm setData={setUserInputData} actualData={userInputData} />
    </>
  );
}

export default App;
