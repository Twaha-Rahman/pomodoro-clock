import React, { useState, useRef } from 'react';

import './App.css';

function repeater(number) {
  let minuteInStringArr = number.toString().split('');

  if (minuteInStringArr.length < 2) {
    minuteInStringArr.unshift(0);
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
  let [sessionState, setSessionState] = useState('session');
  let signal = useRef();
  signal.current = sessionState;

  let [isTimerRunning, setTimerRunningState] = useState(false);
  let [sessionTime, setSessionTime] = useState(25);
  let [breakTime, setBreakTime] = useState(5);

  let [remainigSessionTime, setRemainingSessionTime] = useState(sessionTime * 60);
  let [remainigBreakTime, setRemainigBreakTime] = useState(breakTime * 60);

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
        <h2 id="timer-label">{sessionState === 'session' ? 'Session' : 'Break'}</h2>

        <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" />

        <h1 id="time-left">
          {sessionState === 'session' ? timeFormatter(remainigSessionTime) : timeFormatter(remainigBreakTime)}
        </h1>
      </div>

      <div className="timing-controlls">
        <button
          id="start_stop"
          onClick={() => {
            setTimerRunningState(!isTimerRunning);

            if (window.clockIsRunning) {
              window.clockIsRunning = undefined;
            } else {
              window.clockIsRunning = 'running';
            }

            if (!refToSetInterval.current) {
              window.sessionTimeCount = sessionTime * 60;
              window.breakTimeCount = breakTime * 60;

              const ref = window.setInterval(() => {
                const refToAudioTag = document.getElementById('beep');

                if (window.clockIsRunning === 'running') {
                  if (signal.current === 'session') {
                    if (window.sessionTimeCount - 1 >= 0) {
                      window.sessionTimeCount--;
                      setRemainingSessionTime(window.sessionTimeCount);
                    } else {
                      refToAudioTag.play();
                      console.log(signal.current, window.sessionTimeCount);
                      setSessionState('break');
                      signal.current = 'break';
                      setRemainingSessionTime(sessionTime * 60);
                      window.sessionTimeCount = sessionTime * 60;
                    }
                  }

                  if (signal.current === 'break') {
                    if (window.breakTimeCount - 1 >= -1) {
                      setRemainigBreakTime(window.breakTimeCount);
                      window.breakTimeCount--;
                    } else {
                      refToAudioTag.play();
                      console.log(signal.current, window.breakTimeCount);
                      setSessionState('session');
                      signal.current = 'session';
                      setRemainigBreakTime(breakTime * 60);
                      window.breakTimeCount = breakTime * 60;
                    }
                  }
                }
              }, 1000);
              refToSetInterval.current = ref;
            }
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
            signal.current = 'session';
            window.sessionTimeCount = 25 * 60;
            window.breakTimeCount = 5 * 60;
            setSessionState('session');
            refToSetInterval.current = undefined;
            window.clockIsRunning = undefined;

            const refToAudioTag = document.getElementById('beep');
            refToAudioTag.pause();
            refToAudioTag.currentTime = 0;
          }}
        >
          <i className="fas fa-sync-alt">clear</i>
        </button>
      </div>
    </div>
  );
}

export default App;
