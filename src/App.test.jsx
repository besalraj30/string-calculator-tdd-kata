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

test('returns number when input has one number', () => {
  expect(add("1")).toBe(1);
});

test('returns sum of two numbers', () => {
  expect(add("1,5")).toBe(6);
});

test('allows new lines between numbers', () => {
  expect(add("1\n2,3")).toBe(6);
});

test('supports custom delimiter', () => {
  expect(add("//;\n1;2")).toBe(3);
});

test('throws error for negative numbers', () => {
  expect(() => add("1,-2,3,-4")).toThrow("Negatives not allowed: -2, -4");
});

test('ignores numbers greater than 1000', () => {
  expect(add("1001,2")).toBe(2);
  expect(add("1000,2000")).toBe(1000);
  expect(add("1,2,1001,1002")).toBe(3);
});

test('supports multiple custom delimiters', () => {
  expect(add("//[*][%]\n1*2%3")).toBe(6); // 1 + 2 + 3
  expect(add("//[;][&]\n4;5&6")).toBe(15); // 4 + 5 + 6
});