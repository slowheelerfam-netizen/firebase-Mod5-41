import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('firebase/auth', () => {
  return {
    getAuth: () => ({}),
    onAuthStateChanged: () => () => {},
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
  };
});

test('renders navbar logo', () => {
  render(<App />);
  const logo = screen.getByAltText(/logo/i);
  expect(logo).toBeInTheDocument();
});
