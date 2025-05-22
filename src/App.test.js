import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';
import * as actions from './redux/actions/employeeAction';
import * as selectors from './redux/selectors/employeeSelectors';

const mockStore = configureStore([]);

// Mock child components
jest.mock('./components/CompanyDetails', () => () => <div>CompanyDetails</div>);
jest.mock('./components/SearchBar', () => () => <div>SearchBar</div>);
jest.mock('./components/EmployeeList', () => () => <div>EmployeeList</div>);
jest.mock('./components/EmployeeDetails', () => () => <div>EmployeeDetails</div>);
jest.mock('./components/Pagination', () => () => <div>Pagination</div>);
jest.mock('./components/LoadingSpinner', () => () => <div>LoadingSpinner</div>);

// Mock selectors
jest.spyOn(selectors, 'getPaginated');
jest.spyOn(selectors, 'getSelectedEmployee');

// Mock action
// Completely mock the module to prevent saga/thunk behavior
const fetchEmployeesRequestMock = { type: 'FETCH_EMPLOYEES_REQUEST' };

jest.mock('./redux/actions/employeeAction', () => ({
  fetchEmployeesRequest: () => fetchEmployeesRequestMock,
}));

describe('App Component', () => {
  let store;

  beforeEach(() => {
    selectors.getPaginated.mockReturnValue([{ id: 1, firstName: 'John' }]);
    selectors.getSelectedEmployee.mockReturnValue(null);

    store = mockStore({
      employees: {
        companyInfo: { companyName: 'Test Corp' },
        loading: false,
        employees: [],
        searchText: '',
        error: null,
        selectedEmployee: null,
      },
    });

    store.dispatch = jest.fn();
  });

  it('renders all main components and dispatches fetchEmployeesRequest', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('CompanyDetails')).toBeInTheDocument();
    expect(screen.getByText('SearchBar')).toBeInTheDocument();
    expect(screen.getByText('EmployeeList')).toBeInTheDocument();
    expect(screen.getByText('Pagination')).toBeInTheDocument();
    expect(store.dispatch).toHaveBeenCalledWith({ type: 'FETCH_EMPLOYEES_REQUEST' });
  });

  it('shows loading spinner when loading is true', () => {
    store = mockStore({
      employees: {
        companyInfo: {},
        loading: true,
        employees: [],
        searchText: '',
        error: null,
        selectedEmployee: null,
      },
    });
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('LoadingSpinner')).toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    store = mockStore({
      employees: {
        loading: false,
        error: 'Something went wrong',
        employees: [],
        searchText: '',
        companyInfo: {},
        selectedEmployee: null,
      },
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('shows employee details modal when selectedEmployee is present', () => {
    selectors.getSelectedEmployee.mockReturnValue({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('EmployeeDetails')).toBeInTheDocument();
  });
});
