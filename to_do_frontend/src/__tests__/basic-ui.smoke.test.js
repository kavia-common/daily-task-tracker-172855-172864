import { render, screen } from '@testing-library/react';
import App from '../App';

test('smoke: app renders title, input, and filter buttons', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Ocean Tasks/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/Add a new task/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /All/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Active/ })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Completed/ })).toBeInTheDocument();
});
