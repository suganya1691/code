import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from './SearchBar';
import { useDispatch } from 'react-redux';

// Mock useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

// Mock debounce hook
jest.mock('../hooks/useDebounce', () => jest.fn());

describe('SearchBar Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);
  });

  it('renders input and button with initial value', () => {
    const searchText = 'initial';
    const debouncedText = 'initial';
    require('../hooks/useDebounce').mockReturnValue(debouncedText);

    render(<SearchBar searchText={searchText} />);
    
    expect(screen.getByPlaceholderText('Search Employee')).toHaveValue(searchText);
    expect(screen.getByRole('button')).toHaveTextContent('Search');
  });

  it('updates input and dispatches debounced search text', async () => {
    const debouncedText = 'john';
    require('../hooks/useDebounce').mockReturnValue(debouncedText);

    render(<SearchBar searchText="" />);

    const input = screen.getByPlaceholderText('Search Employee');
    fireEvent.change(input, { target: { value: 'john' } });

    await waitFor(() => {
      expect(input.value).toBe('john');
      expect(dispatchMock).toHaveBeenCalledWith({
        type: 'SET_SEARCH_TEXT',
        payload: debouncedText,
      });
    });
  });
});
