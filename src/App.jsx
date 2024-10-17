import React from 'react';
import { useState } from 'react';
import './App.css';

export const add = (input) => {
  if (input === "") return 0;

  let delimiter = /[\n,]/;
  if (input.startsWith("//")) {
    const delimiterEnd = input.indexOf('\n');
    delimiter = new RegExp(input.substring(2, delimiterEnd));
    input = input.substring(delimiterEnd + 1);
  }

  const nums = input.split(delimiter);
  const negatives = nums.filter(num => num < 0);
  if (negatives.length) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }
  return nums.reduce((sum, num) => {
    const number = parseInt(num);
    return sum + (number > 1000 ? 0 : number);
  }, 0);

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
