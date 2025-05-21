import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import App from './App';
import * as actions from './redux/actions/employeeAction';

const mockStore = configureStore([]);

jest.mock('./components/CompanyDetails', () => () => <div>CompanyDetails</div>);
jest.mock('./components/SearchBar', () => () => <div>SearchBar</div>);
jest.mock('./components/EmployeeList', () => () => <div>EmployeeList</div>);
jest.mock('./components/EmployeeDetails', () => () => <div>EmployeeDetails</div>);
jest.mock('./components/Pagination', () => () => <div>Pagination</div>);

// Mock the action creator
const fetchEmployeesRequestMock = { type: 'FETCH_EMPLOYEES_REQUEST' };
jest.mock('./redux/actions/employeeAction', () => ({
  fetchEmployeesRequest: () => fetchEmployeesRequestMock,
}));


describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      employees: {
        companyInfo: { companyName: 'Test Inc', companyMotto: 'Testing rocks', companyEst: '2020-01-01' },
        loading: false,
        employees: [],
        searchText: '',
        error: null,
        selectedEmployee: null,
      },
    });

    store.dispatch = jest.fn(); // Spy on dispatch
  });

  it('renders basic components and dispatches fetchEmployeesRequest', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('CompanyDetails')).toBeInTheDocument();
    expect(screen.getByText('SearchBar')).toBeInTheDocument();
    expect(screen.getByText('Pagination')).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'FETCH_EMPLOYEES_REQUEST' });
  });
});
