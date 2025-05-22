import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureStore([]);

describe('Pagination Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      employees: {
        currentPage: 1,
      },
    });

    store.dispatch = jest.fn();
  });

  const renderWithProvider = (ui) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('renders 3 page buttons and Prev/Next', () => {
    renderWithProvider(<Pagination />);
    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('disables Prev on first page', () => {
    renderWithProvider(<Pagination />);
    expect(screen.getByText('Prev')).toBeDisabled();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  it('disables Next on last page', () => {
    store = mockStore({
      employees: {
        currentPage: 3,
      },
    });
    store.dispatch = jest.fn();
    renderWithProvider(<Pagination />);
    expect(screen.getByText('Next')).toBeDisabled();
    expect(screen.getByText('Prev')).not.toBeDisabled();
  });

  it('dispatches SET_PAGE when page button is clicked', () => {
    renderWithProvider(<Pagination />);
    fireEvent.click(screen.getByText('2'));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SET_PAGE',
      payload: 2,
    });
  });

  it('dispatches SET_PAGE when Next is clicked', () => {
    renderWithProvider(<Pagination />);
    fireEvent.click(screen.getByText('Next'));

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SET_PAGE',
      payload: 2,
    });
  });
});
