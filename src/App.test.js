import { render,fireEvent, waitFor, screen } from '@testing-library/react';
import App from './App.js';
import Signup from './Signup.js'

test('changes to sign in page after clicking sign in button', () => {
  const resultRender = render(<App />);
  
  const signInButton= screen.getByText('Sign in');
  expect(signInButton).toBeInTheDocument();
  
  fireEvent.click(signInButton)
  
  expect(signInButton).not.toBeInTheDocument();
  
  const signInStatus= screen.getByText('Sign in with google');
  expect(signInStatus).toBeInTheDocument();
});

test('Brings user to Dashboard after signing in', () => {
  const resultRender = render(<Signup />);
  
  const LoginButton= screen.getByText('Sign in with Google');
  expect(LoginButton).toBeInTheDocument();
  const signupText = screen.getByText('Type in your miner username');
  expect(signupText).toBeInTheDocument();
  
  fireEvent.click(LoginButton)
  
 // expect(LoginButton).not.toBeInTheDocument();
  //expect(signupText).not.toBeInTheDocument();
  
  const DashboardText= screen.getByText('Current Miners');
  expect(DashboardText).toBeInTheDocument();
});