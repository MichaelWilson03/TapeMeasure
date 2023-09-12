import React, { useState } from "react";
import "./App.css";

function App() {
  const [wholeNumber, setWholeNumber] = useState("");
  const [tickMarks, setTickMarks] = useState("");
  const [result, setResult] = useState("");
  const [selectedFraction, setSelectedFraction] = useState("");

  const handleCalculate = () => {
    const wholeNumberValue = parseInt(wholeNumber, 10);
    const tickMarksValue = parseInt(tickMarks, 10);

    if (isNaN(wholeNumberValue) || isNaN(tickMarksValue) || wholeNumberValue < 0 || tickMarksValue < 0) {
      setResult("Please enter valid and non-negative numbers.");
    } else {
      // Calculate the total value (whole number + fractional part in sixteenths)
      const totalValue = wholeNumberValue + tickMarksValue * (1 / 16);

      // Format the result string with fractional part in the correct format (e.g., 5/8)
      const wholePart = Math.floor(totalValue);
      let fractionalPart = totalValue - wholePart;
      let fractionalPartString = "";

      if (fractionalPart > 0) {
        const fractions = [
          "1/16",
          "1/8",
          "3/16",
          "1/4",
          "5/16",
          "3/8",
          "7/16",
          "1/2",
          "9/16",
          "5/8",
          "11/16",
          "3/4",
          "13/16",
          "7/8",
          "15/16",
        ];
        let minDiff = Infinity;
        let bestFraction = "";

        fractions.forEach((fraction) => {
          const [numerator, denominator] = fraction.split("/");
          const value = numerator / denominator;
          const diff = Math.abs(fractionalPart - value);
          if (diff < minDiff) {
            minDiff = diff;
            bestFraction = fraction;
          }
        });

        fractionalPartString = bestFraction;
      }

      // Set the selected fractional part
      setSelectedFraction(fractionalPartString);

      // Set the result directly using setResult
      setResult(`Result: ${wholePart} ${fractionalPartString} inches`);
    }
  };

  const handleTickMarksFocus = () => {
    setResult(""); // Clear the result when tickMarks input is focused
  };

  return (
    <div className="App">
      <header>
        <h1>Wifey Tape Measure</h1>
      </header>
      <main>
        <div className="inputContainer">
          <label htmlFor="wholeNumber">Whole Number:</label>
          <input
            type="number"
            id="wholeNumber"
            value={wholeNumber}
            onChange={(e) => setWholeNumber(e.target.value)}
          />
          <span className="tooltip">Enter the whole number value from the tape measure.</span>

          <label htmlFor="tickMarks">Tick Marks:</label>
          <input
            type="number"
            id="tickMarks"
            value={tickMarks}
            onChange={(e) => setTickMarks(e.target.value)}
            onFocus={handleTickMarksFocus}
          />
          <span className="tooltip">Enter the number of tick marks from the tape measure.</span>
          <button id="calculateButton" onClick={handleCalculate}>
            Calculate
          </button>

          <div id="resultSection">
            <span id="result">{result}</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
