import React from 'react';

import './App.css';

function App() {
  return (
    <div className="clock-container">
      <h1>Pomodoro Clock</h1>

      <div className="controllers">
        <div className="controller-container">
          <h3 id="break-label">Break Length</h3>
          <div className="setter-container">
            <button id="break-increment">
              <i class="fas fa-arrow-up"></i>
            </button>

            <strong id="break-length">5</strong>
            <button id="break-decrement">
              <i class="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>

        <div className="controller-container">
          <h3 id="session-label">Session Length</h3>
          <div className="setter-container">
            <button id="session-increment">
              <i class="fas fa-arrow-up"></i>
            </button>

            <strong id="session-length">25</strong>
            <button id="session-decrement">
              <i class="fas fa-arrow-down"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="timer-container">
        <h2 id="timer-label">Session</h2>
        <h1 id="time-left">1:00</h1>
      </div>

      <div className="timing-controlls">
        <button id="start_stop">
          <i class="fas fa-pause"></i>
        </button>
        <button id="reset">
          <i class="fas fa-sync-alt"></i>
        </button>
      </div>
    </div>
  );
}

export default App;
