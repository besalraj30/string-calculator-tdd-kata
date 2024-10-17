import React from 'react';
import { render, screen } from '@testing-library/react';
import App, {add} from './App';

test('renders the String Calculator heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/String Calculator/i);
  expect(headingElement).toBeInTheDocument();
});

test('returns 0 for an empty string', () => {
  const result = add(""); // Assume `add` function is exported from App
  expect(result).toBe(0);
});