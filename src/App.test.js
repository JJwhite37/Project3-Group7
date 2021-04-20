import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App.js';
import Signup from './Signup.js';

test('changes to sign in page after clicking sign in button', () => {
  const resultRender = render(<App />);

  const signInButton = screen.getByText('Sign in');
  expect(signInButton).toBeInTheDocument();

  fireEvent.click(signInButton);

  expect(signInButton).not.toBeInTheDocument();

  const signInStatus = screen.getByText('Sign in with google');
  expect(signInStatus).toBeInTheDocument();
});

test('changes to sign up page after clicking sign up button', () => {
  const resultRender = render(<App />);

  const signInButton = screen.getByText('Sign up');
  expect(signInButton).toBeInTheDocument();

  fireEvent.click(signInButton);

  expect(signInButton).not.toBeInTheDocument();

  const LoginButton = screen.getByText('enter your username(for testing dashboard)');
  expect(LoginButton).toBeInTheDocument();
  const signupText = screen.getByText('Type in your miner username');
  expect(signupText).toBeInTheDocument();
});
