import React, { useState } from 'react';
import fittingData from '../fittingData.json';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function PipeLengthCalculator() {
    const [totalRun, setTotalRun] = useState('');
    const [selectedFitting, setSelectedFitting] = useState('LongRad90');
    const [selectedSize, setSelectedSize] = useState(Object.keys(fittingData['LongRad90'])[0]);
    const [selectedTeePart, setSelectedTeePart] = useState('Main Run'); // For reducing outlet tees
    const [numberOfFittings, setNumberOfFittings] = useState(1);
    const [cutLength, setCutLength] = useState('');
    const navigate = useNavigate();

    // Converts input to total inches
    const parseInputToInches = (input) => {
        const [feet, inches] = input.split(/['"]/).map(num => parseFloat(num) || 0);
        return feet * 12 + inches;
    };

    // Formats inches back to feet and inches
    const formatInchesToOutput = (inches) => {
        const feet = Math.floor(inches / 12);
        const remainingInches = Math.round((inches % 12) * 4) / 4; // Rounds to the nearest quarter
        return `${feet > 0 ? `${feet}' ` : ''}${remainingInches}"`;
    };

    const calculateCutLength = () => {
        let takeoff = 0;
        if (selectedFitting.includes('ReducingOutletTees')) {
            takeoff = fittingData[selectedFitting][selectedSize][selectedTeePart] || 0;
        } else {
            takeoff = fittingData[selectedFitting][selectedSize] || 0;
        }
        const totalTakeoff = takeoff * numberOfFittings;
        const runInInches = parseInputToInches(totalRun);
        const remainingLength = runInInches - totalTakeoff;
        setCutLength(formatInchesToOutput(remainingLength));
    };

    return (
        <div  className="pipe-length-calculator-container">
            <h2>Pipe Cut Length Calculator</h2>
            <input
                type="text"
                placeholder="Total Run Length"
                value={totalRun}
                onChange={(e) => setTotalRun(e.target.value)}
            />
            <select value={selectedFitting} onChange={(e) => setSelectedFitting(e.target.value)}>
                {Object.keys(fittingData).map(fitting => <option key={fitting} value={fitting}>{fitting}</option>)}
            </select>
            {selectedFitting.includes('ReducingOutletTees') && (
                <select value={selectedTeePart} onChange={(e) => setSelectedTeePart(e.target.value)}>
                    <option value="Main Run">Main Run</option>
                    <option value="Branch">Branch</option>
                </select>
            )}
            <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {Object.keys(fittingData[selectedFitting]).map(size => <option key={size} value={size}>{size}</option>)}
            </select>
            <input
                type="number"
                placeholder="Number of Fittings"
                value={numberOfFittings}
                onChange={(e) => setNumberOfFittings(parseInt(e.target.value, 10))}
            />
            <button onClick={calculateCutLength}>Calculate</button>
            <div>Cut Length: {cutLength}</div>
            <div><button className="back-button" onClick={() => navigate('/')}>Back</button> </div> 
            
        </div>
    );
}

export default PipeLengthCalculator;
