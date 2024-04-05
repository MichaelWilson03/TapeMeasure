// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main';
import TickConversion from './components/TickConversion';
import MeasurementConversion from './components/MeasurementConversion';
import EqualSpacingCalculator from './components/EqualSpacingCalculator';
import PipeLengthCalculator from './components/PipeLengthCalculator';
import "./App.css";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/tape-measure" element={<TickConversion />} />
      <Route path="/measurement-conversion" element={<MeasurementConversion />} />
      <Route path="/equal-spacing-calculator" element={<EqualSpacingCalculator />} />
      <Route path="/pipe-length-calculator" element={<PipeLengthCalculator />} />
    </Routes>
  </BrowserRouter>
);
