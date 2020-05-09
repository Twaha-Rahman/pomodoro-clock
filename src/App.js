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
            <i class="fas fa-arrow-up"></i>
            <strong>5</strong>
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>

        <div className="controller-container">
          <h3 id="session-label">Session Length</h3>
          <div className="setter-container">
            <i class="fas fa-arrow-up"></i>
            <strong>25</strong>
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>
      </div>

      <div className="timer-container">
        <h2 id="timer-label">Session</h2>
        <h1>1:00</h1>
      </div>
    </div>
  );
}

export default App;
