import React from 'react';
import { useState } from 'react';
import './App.css';

export const add = (input) => {
  // TODO: Implement string calculator logic here
  if (input === "") return 0;

  let delimiter = /[\n,]/;
  if (input.startsWith("//")) {
    const delimiterEnd = input.indexOf('\n');
    delimiter = new RegExp(input.substring(2, delimiterEnd));
    input = input.substring(delimiterEnd + 1);
  }

  const nums = input.split(delimiter);
  return nums.reduce((sum, num) => sum + parseInt(num), 0);
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
