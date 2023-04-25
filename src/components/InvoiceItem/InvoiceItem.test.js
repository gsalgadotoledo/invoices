import React from 'react';
import { render } from '@testing-library/react';
import InvoiceItem from './InvoiceItem';

const props = (params) => ({
  title: 'Text Example',
  icon: '',
  label: 'Label Example',
  onClickHandler: () => {}
})

test('renders header link', () => {
  const { getByText } = render(<InvoiceItem {...props()} />);
  
  const labelElement = getByText(/Label Example/i);
  expect(labelElement).toBeInTheDocument();
  
  const titleElement = getByText(/Text Example/i);
  expect(titleElement).toBeInTheDocument();
});
