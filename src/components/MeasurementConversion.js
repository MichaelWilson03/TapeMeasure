import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MeasurementConversion() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [fraction, setFraction] = useState('');
  const [result, setResult] = useState('');

  const convertFractionToDecimal = (fraction) => {
    if (!fraction) return 0;
    const [numerator, denominator] = fraction.split('/').map(Number);
    if (!denominator) return 0; // Prevent division by 0
    return numerator / denominator;
  };

  const handleConversion = () => {
    const decimalFraction = convertFractionToDecimal(fraction);
    const totalInches = Number(inches) + decimalFraction;
    const decimalFeet = totalInches / 12;
    const totalFeet = Number(feet) + decimalFeet;
    setResult(`${totalFeet.toFixed(2)} feet`);
  };

  const navigate = useNavigate();
  return (
    <div className="measurement-conversion-container"> {/* Adjust class name based on your CSS import */}
      <h2 className="measurement-conversion-header">Convert Feet and Inches to Decimal</h2>
      <input
        className="measurement-conversion-input"
        type="number"
        placeholder="Feet"
        value={feet}
        onChange={(e) => setFeet(e.target.value)}
      />
      <input
        className="measurement-conversion-input"
        type="number"
        placeholder="Inches"
        value={inches}
        onChange={(e) => setInches(e.target.value)}
      />
      <input
        className="measurement-conversion-input"
        type="text"
        placeholder="Fraction (e.g., 1/2)"
        value={fraction}
        onChange={(e) => setFraction(e.target.value)}
      />
      <button
        className="measurement-conversion-button"
        onClick={handleConversion}>Convert</button>
      <div className="measurement-conversion-result">Result: {result}</div>
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default MeasurementConversion;
