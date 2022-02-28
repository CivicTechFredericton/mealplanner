import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './auth/Auth';

test('renders learn react link', () => {
  render(
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
    );
  const username = screen.getByText(/loading inner/i);
  expect(username).toBeInTheDocument();
});
