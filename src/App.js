import React, { useState, useRef } from 'react';

import './App.css';

function repeater(number) {
  let minuteInStringArr = number.toString().split('');

  if (minuteInStringArr.length < 2) {
    minuteInStringArr.push(0);
  }

  let minuteString = minuteInStringArr.join('');

  return minuteString;
}

function timeFormatter(timeInSeconds) {
  let minutes = 0;

  while (timeInSeconds >= 60) {
    minutes = Math.floor(timeInSeconds / 60);
    timeInSeconds -= minutes * 60;
  }

  let minuteString = repeater(minutes);
  let secondString = repeater(timeInSeconds);

  return `${minuteString}:${secondString}`;
}

function App() {
  let [isTimerRunning, setTimerRunningState] = useState(false);
  let [sessionTime, setSessionTime] = useState(25);
  let [breakTime, setBreakTime] = useState(5);

  let [remainigSessionTime, setRemainingSessionTime] = useState(sessionTime * 60);
  let [remainigBreakTime, setRemainigBreakTime] = useState(breakTime * 60);

  let formattedTime = timeFormatter(remainigSessionTime);

  const breakTimeSync = useRef();
  breakTimeSync.current = breakTime;

  const sessionTimeSync = useRef();
  sessionTimeSync.current = sessionTime;

  const refToSetInterval = useRef();

  return (
    <div className="clock-container">
      <h1>Pomodoro Clock</h1>

      <div className="controllers">
        <div className="controller-container">
          <h3 id="break-label">Break Length</h3>
          <div className="setter-container">
            <button
              id="break-increment"
              onClick={() => {
                if (!(breakTimeSync.current + 1 > 60)) {
                  if (!isTimerRunning) {
                    setBreakTime(breakTimeSync.current + 1);
                    setRemainigBreakTime((breakTimeSync.current + 1) * 60);
                    breakTimeSync.current = breakTimeSync.current + 1;
                  }
                }
              }}
            >
              <i className="fas fa-arrow-up"></i>
            </button>

            <strong id="break-length">{breakTime}</strong>
            <button
              id="break-decrement"
              onClick={() => {
                if (!(breakTimeSync.current - 1 <= 0)) {
                  if (!isTimerRunning) {
                    setBreakTime(breakTimeSync.current - 1);
                    setRemainigBreakTime((breakTimeSync.current - 1) * 60);
                    breakTimeSync.current = breakTimeSync.current - 1;
                  }
                }
              }}
            >
              <i className="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>

        <div className="controller-container">
          <h3 id="session-label">Session Length</h3>
          <div className="setter-container">
            <button
              id="session-increment"
              onClick={() => {
                if (!isTimerRunning) {
                  if (!(sessionTimeSync.current + 1 > 60)) {
                    setSessionTime(sessionTimeSync.current + 1);
                    setRemainingSessionTime((sessionTimeSync.current + 1) * 60);
                    sessionTimeSync.current = sessionTimeSync.current + 1;
                  }
                }
              }}
            >
              <i className="fas fa-arrow-up"></i>
            </button>

            <strong id="session-length">{sessionTime}</strong>
            <button
              id="session-decrement"
              onClick={() => {
                if (!(sessionTimeSync.current - 1 <= 0)) {
                  if (!isTimerRunning) {
                    setSessionTime(sessionTimeSync.current - 1);
                    setRemainingSessionTime((sessionTimeSync.current - 1) * 60);
                    sessionTimeSync.current = sessionTimeSync.current - 1;
                  }
                }
              }}
            >
              <i className="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="timer-container">
        <h2 id="timer-label">Session</h2>
        <h1 id="time-left">{formattedTime}</h1>
      </div>

      <div className="timing-controlls">
        <button
          id="start_stop"
          onClick={() => {
            setTimerRunningState(!isTimerRunning);
            const ref = window.setInterval(() => {
              setRemainingSessionTime(remainigSessionTime--);
            }, 1000);
            refToSetInterval.current = ref;
          }}
        >
          <i className="fas fa-play">start</i>
          <i className="fas fa-pause"></i>
        </button>
        <button
          id="reset"
          onClick={() => {
            if (refToSetInterval.current) {
              //unregister setInterval
              window.clearInterval(refToSetInterval.current);
            }
            setTimerRunningState(false);
            setSessionTime(25);
            setBreakTime(5);
            setRemainingSessionTime(25 * 60);
            setRemainigBreakTime(5 * 60);
          }}
        >
          <i className="fas fa-sync-alt">clear</i>
        </button>
      </div>
    </div>
  );
}

export default App;
