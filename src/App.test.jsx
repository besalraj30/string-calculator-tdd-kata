import React from 'react';
import { render, screen } from '@testing-library/react';
import App, {handleCalculate} from './App';

test('renders the String Calculator heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/String Calculator/i);
  expect(headingElement).toBeInTheDocument();
});
