import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header title and add input', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Ocean Tasks/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/Add a new task/i)).toBeInTheDocument();
  // Ensure no Learn React placeholder
  expect(screen.queryByText(/learn react/i)).toBeNull();
});
