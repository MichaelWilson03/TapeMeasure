import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

//import "./App.css";

function TickConversion() {
  const [wholeNumber, setWholeNumber] = useState("");
  const [tickMarks, setTickMarks] = useState("");
  const [fractionalInput, setFractionalInput] = useState(""); // New state for fractional input
  const [result, setResult] = useState("");

  // Utility function to convert fraction to tick marks
  const convertFractionToTicks = (fraction) => {
    const fractionsToTicks = {
      "1/16": 1,
      "1/8": 2,
      "3/16": 3,
      "1/4": 4,
      "5/16": 5,
      "3/8": 6,
      "7/16": 7,
      "1/2": 8,
      "9/16": 9,
      "5/8": 10,
      "11/16": 11,
      "3/4": 12,
      "13/16": 13,
      "7/8": 14,
      "15/16": 15,
    };
    return fractionsToTicks[fraction] || 0;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleCalculate = () => {
    if (fractionalInput) {
      const parsedInput = fractionalInput.match(/(\d+)\s+and\s+(\d+)\/(\d+)/);
      if (!parsedInput) {
        setResult("Invalid fractional input. Please use 'X and Y/Z'.");
        return;
      }

      const wholeNumberFromFraction = parseInt(parsedInput[1], 10);
      const fraction = `${parsedInput[2]}/${parsedInput[3]}`;
      const tickMarksFromFraction = convertFractionToTicks(fraction);

      setResult(`Result: ${wholeNumberFromFraction} inches and ${tickMarksFromFraction} tick marks`);
    } else {
      const wholeNumberValue = parseInt(wholeNumber, 10);
      const tickMarksValue = parseInt(tickMarks, 10);

      if (isNaN(wholeNumberValue) || isNaN(tickMarksValue) || wholeNumberValue < 0 || tickMarksValue < 0) {
        setResult("Please enter valid and non-negative numbers.");
        return;
      }

      // Correct conversion of tick marks to fractions
      const fractions = [
        "", "1/16", "1/8", "3/16", "1/4", "5/16", "3/8", "7/16",
        "1/2", "9/16", "5/8", "11/16", "3/4", "13/16", "7/8", "15/16"
      ];
      const fractionString = fractions[tickMarksValue] || "";

      setResult(`Result: ${wholeNumberValue}${fractionString ? ' ' + fractionString : ''} inches`);
    }
  };

  const handleFractionalInputChange = (e) => {
    setFractionalInput(e.target.value);
    setWholeNumber("");
    setTickMarks("");
    setResult("");
  };
  const navigate = useNavigate();


  return (
    <div className="App">
      <header>
        <h1>Wifey Tape Measure</h1>
      </header>
      <main>
        <div className="inputContainer">
          <input
            type="number"
            placeholder="Whole Number"
            value={wholeNumber}
            onChange={(e) => setWholeNumber(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="number"
            placeholder="Tick Marks"
            value={tickMarks}
            onChange={(e) => setTickMarks(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Fractional Measurement"
            value={fractionalInput}
            onChange={handleFractionalInputChange}
            onKeyPress={handleKeyPress}
          />
          <button id="calculateButton" onClick={handleCalculate}>
            Calculate
          </button>
          <div id="resultSection">
            {result}
          </div>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>Back</button>
      </main>
    </div>
  );
}

export default TickConversion;
