import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App.js';

test('changes to sign in page after clicking sign in button', () => {
  const resultRender = render(<App />);
  
  const landingPageButton = screen.getByText('Proceed to Login');
  expect(landingPageButton).toBeInTheDocument();

  fireEvent.click(landingPageButton);

  expect(landingPageButton).not.toBeInTheDocument();

  const signInButton = screen.getByText('Sign in');
  expect(signInButton).toBeInTheDocument();

  fireEvent.click(signInButton);

  expect(signInButton).not.toBeInTheDocument();

  const signInStatus = screen.getByText('Sign in with google');
  expect(signInStatus).toBeInTheDocument();
});

test('changes to register username page then to sign up page', () => {
  const resultRender = render(<App />);

  const landingPageButton = screen.getByText('Proceed to Login');
  expect(landingPageButton).toBeInTheDocument();

  fireEvent.click(landingPageButton);

  expect(landingPageButton).not.toBeInTheDocument();

  const signInButton = screen.getByText('Sign up');
  expect(signInButton).toBeInTheDocument();

  fireEvent.click(signInButton);

  expect(signInButton).not.toBeInTheDocument();

  const registerButton = screen.getByText('register username');
  expect(registerButton).toBeInTheDocument();
  
  fireEvent.click(registerButton);
  
  expect(registerButton).not.toBeInTheDocument();
  
  const signupText = screen.getByText('Use your google account to sign up');
  expect(signupText).toBeInTheDocument();
});
