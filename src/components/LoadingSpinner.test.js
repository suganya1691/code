import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner component', () => {
  it('renders the spinner overlay', () => {
    render(<LoadingSpinner />);

    const spinnerContainer = screen.getByTestId('loading-spinner');
    expect(spinnerContainer).toBeInTheDocument();
  });

 
});
