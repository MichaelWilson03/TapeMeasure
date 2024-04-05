import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function EqualSpacingCalculator() {
  const [overallLength, setOverallLength] = useState('');
  const [materialWidth, setMaterialWidth] = useState('');
  const [numberOfPieces, setNumberOfPieces] = useState('');
  const [spacing, setSpacing] = useState('');

  const navigate = useNavigate();

  // Parses strings like "2'" or "24" or "24\"" into total inches
  function parseLength(input) {
    let totalInches = 0;
    const feetMatch = input.match(/(\d+)'/); // Look for feet indicator (')
    const inchMatch = input.match(/(\d+)(?="|$)/); // Look for inch indicator (") or end of string
  
    if (feetMatch) {
      totalInches += parseInt(feetMatch[1], 10) * 12; // Convert feet to inches and add
    }
  
    if (inchMatch) {
      totalInches += parseInt(inchMatch[1], 10); // Add inches
    }
  
    return totalInches;
  }
  

  // Function to format spacing result to the nearest sixteenth of an inch
  function formatSpacingToNearestSixteenth(inches) {
    const wholeInches = Math.floor(inches);
    let fractionInInches = inches - wholeInches;
    const nearestSixteenth = Math.round(fractionInInches * 16);
    let fraction = '';

    switch (nearestSixteenth) {
        case 1:
            fraction = '1/16';
            break;
        case 2:
            fraction = '1/8';
            break;
        case 3:
            fraction = '3/16';
            break;
        case 4:
            fraction = '1/4';
            break;
        case 5:
            fraction = '5/16';
            break;
        case 6:
            fraction = '3/8';
            break;
        case 7:
            fraction = '7/16';
            break;
        case 8:
            fraction = '1/2';
            break;
        case 9:
            fraction = '9/16';
            break;
        case 10:
            fraction = '5/8';
            break;
        case 11:
            fraction = '11/16';
            break;
        case 12:
            fraction = '3/4';
            break;
        case 13:
            fraction = '13/16';
            break;
        case 14:
            fraction = '7/8';
            break;
        case 15:
            fraction = '15/16';
            break;
        default:
            fraction = ''; // When nearestSixteenth is 0 or 16, meaning the fraction is effectively 0 or a whole number.
            break;
    }

    // Adjusting for cases where the fraction rounds up to a whole number
    if (nearestSixteenth === 0) {
        return `${wholeInches}"`;
    } else if (nearestSixteenth === 16) {
        return `${wholeInches + 1}"`; // Increment the whole inches by 1 if fraction rounds to a whole.
    } else {
        return `${wholeInches > 0 ? `${wholeInches}' ` : ''}${fraction}"`;
    }
}


  const calculateSpacing = () => {
    const totalLengthInInches = parseLength(overallLength);
    const materialWidthInInches = parseFloat(materialWidth); // Assuming direct inches input for material width
    const pieces = parseInt(numberOfPieces, 10);
  
    const totalMaterialWidth = materialWidthInInches * pieces;
    const remainingLength = totalLengthInInches - totalMaterialWidth;
    const numberOfSpaces = pieces + 1;
    const equalSpacing = remainingLength / numberOfSpaces;
  
    setSpacing(formatSpacingToNearestSixteenth(equalSpacing));
  };
  
  

  return (
    <div className="equal-spacing-calculator">
      <h2>Equal Spacing Calculator</h2>
      <input
        type="text"
        placeholder="Overall Length"
        value={overallLength}
        onChange={(e) => setOverallLength(e.target.value)}
      />
      <input
        type="text"
        placeholder="Material Width"
        value={materialWidth}
        onChange={(e) => setMaterialWidth(e.target.value)}
      />
      <input
        type="text"
        placeholder="Number of Pieces"
        value={numberOfPieces}
        onChange={(e) => setNumberOfPieces(e.target.value)}
      />
      <button onClick={calculateSpacing}>Calculate</button>
      <div>Equal Spacing: {spacing}</div>
      <button className="back-button" onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default EqualSpacingCalculator;
