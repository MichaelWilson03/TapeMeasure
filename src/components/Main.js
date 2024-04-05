// Main.js
import React from 'react';
import { Link } from 'react-router-dom';



function Main() {
  return (
    <div className="main-container">
      <h1 className="main-header">Handy Measure Hub</h1>
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/tape-measure">Wifey Tape Measure</Link>
          </li>
          <li>
            <Link to="/measurement-conversion">Measurement Conversion</Link>
          </li>
          <li> 
            <Link to="/equal-spacing-calculator">Equal Spacing Calculator</Link>
          </li>
          <li>
            <Link to="/pipe-length-calculator">Pipe Length Calculator</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Main;
