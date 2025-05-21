import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import EmployeeList from './EmployeeList';

const mockStore = configureStore([]);

const employeesMock = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    avatar: 'avatar1.jpg',
    contactNo: '1234567890',
    address: '123 Main St',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    avatar: 'avatar2.jpg',
    contactNo: '0987654321',
    address: '456 Side St',
  },
];

describe('EmployeeList Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      employees: {
        sortOrder: 'asc',
        selectedEmployee: null,
      },
    });
    store.dispatch = jest.fn();
  });

  it('renders employees and handles row click and sort toggle', () => {
    render(
      <Provider store={store}>
        <EmployeeList employees={employeesMock} />
      </Provider>
    );

    // Check if employees render
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('1234567890')).toBeInTheDocument();
    expect(screen.getByText('456 Side St')).toBeInTheDocument();

    // Simulate sort toggle
    const nameHeader = screen.getByTitle('Click to toggle sort');
    fireEvent.click(nameHeader);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SET_SORT',
      payload: { sortOrder: 'desc' },
    });

    // Simulate employee row click
    const employeeRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(employeeRow);

    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'SET_SELECTED_EMPLOYEE',
      payload: employeesMock[0],
    });
  });
});
