import React from 'react';

import './App.css';

function App() {
  return (
    <div className="clock-container">
      <h1>Pomodoro Clock</h1>
      <div className="break-container">
        <h4 className="break-label">Break Length</h4>
        <div className="break-setter-container">
          <strong>+</strong>
          <strong>5</strong>
          <strong>-</strong>
        </div>
      </div>
      <div className="session-container">
        <h4 className="session-label">Break Length</h4>
        <div className="session-setter-container">
          <strong>+</strong>
          <strong>25</strong>
          <strong>-</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
