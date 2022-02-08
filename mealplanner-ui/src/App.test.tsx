import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const username = screen.getByText(/Finding user/i);
  expect(username).toBeInTheDocument();
});
