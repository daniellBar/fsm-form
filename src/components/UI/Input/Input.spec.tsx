// External imports
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Internal imports
import Input from './Input';

const inputText = 'test input';
test(`Input should exist`, async () => {
  render(<Input value={inputText} />);
  const inputElement = screen.getByTestId('input');
  expect(inputElement).toBeInTheDocument();
});
