import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

test('renders header link', () => {
  const { getByText } = render(<Header title="My own title" />);
  const headerElement = getByText(/My own title/i);
  expect(headerElement).toBeInTheDocument();
});
