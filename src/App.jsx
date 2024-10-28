import React from 'react';
import { useState } from 'react';
import './App.css';

const delimiterCheck = (input) => {
  let delimiter = /[\n,]/;
  if (input.startsWith("//")) {
    const delimiterEnd = input.indexOf('\n');
    const customDelimiterSection = input.substring(2, delimiterEnd);

    if (customDelimiterSection.includes('[')) {
      const delimiters = customDelimiterSection.match(/\[(.*?)\]/g).map(del => del.slice(1, -1));
      const regexString = delimiters.map(del => del.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
      delimiter = new RegExp(regexString);
    } else {
      delimiter = new RegExp(customDelimiterSection.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    }

    input = input.substring(delimiterEnd + 1);
  }
  return { delimiter, input };
};

const processNumbers = (input, delimiter) => {
  const nums = input.split(delimiter).map(num => parseInt(num));
  const negatives = nums.filter(num => num < 0);

  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }

  return nums.reduce((sum, num) => (num > 1000 ? sum : sum + num), 0);
};

export const add = (input) => {
  if (input === "") return 0;

  const { delimiter, input: processedInput } = delimiterCheck(input);
  return processNumbers(processedInput, delimiter);
};

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculateResult = () => {
    const calculatedResult = handleCalculate(input);
    setResult(calculatedResult);
  };

  return (
    <div className="App">
      <h1>String Calculator</h1>
      
      <div className="calculator">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter comma-separated numbers"
        />
        
        <button onClick={calculateResult}>Calculate</button>
      </div>
      
      {result !== null && (
        <div className="result">
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
