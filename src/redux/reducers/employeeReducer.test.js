import employeeReducer from './employeeReducer';
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  SET_SELECTED_EMPLOYEE,
  CLEAR_SELECTED_EMPLOYEE,
  SET_SEARCH_TEXT,
  SET_PAGE,
  SET_SORT,
} from '../actions/employeeAction';

describe('employeeReducer', () => {
  const initialState = {
    companyInfo: null,
    employees: [],
    loading: false,
    error: null,
    selectedEmployee: null,
    searchText: '',
    currentPage: 1,
    pageSize: 5,
    sortBy: 'firstName',
    sortOrder: 'asc',
  };

  it('should return the initial state when action is undefined', () => {
    expect(employeeReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_EMPLOYEES_REQUEST', () => {
    const action = { type: FETCH_EMPLOYEES_REQUEST };
    const result = employeeReducer(initialState, action);
    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  it('should handle FETCH_EMPLOYEES_SUCCESS', () => {
    const action = {
      type: FETCH_EMPLOYEES_SUCCESS,
      payload: {
        employees: [{ id: 1, name: 'John' }],
        companyInfo: { companyName: 'Test Inc' },
      },
    };
    const result = employeeReducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.employees).toEqual([{ id: 1, name: 'John' }]);
    expect(result.companyInfo.companyName).toBe('Test Inc');
  });

  it('should handle FETCH_EMPLOYEES_FAILURE', () => {
    const action = {
      type: FETCH_EMPLOYEES_FAILURE,
      payload: 'Failed to fetch',
    };
    const result = employeeReducer(initialState, action);
    expect(result.loading).toBe(false);
    expect(result.error).toBe('Failed to fetch');
  });

  it('should handle SET_SELECTED_EMPLOYEE', () => {
    const action = {
      type: SET_SELECTED_EMPLOYEE,
      payload: { id: 2, name: 'Jane' },
    };
    const result = employeeReducer(initialState, action);
    expect(result.selectedEmployee).toEqual({ id: 2, name: 'Jane' });
  });

  it('should handle CLEAR_SELECTED_EMPLOYEE', () => {
    const modifiedState = { ...initialState, selectedEmployee: { id: 2 } };
    const action = { type: CLEAR_SELECTED_EMPLOYEE };
    const result = employeeReducer(modifiedState, action);
    expect(result.selectedEmployee).toBeNull();
  });

  it('should handle SET_SEARCH_TEXT and reset page to 1', () => {
    const modifiedState = { ...initialState, currentPage: 3 };
    const action = { type: SET_SEARCH_TEXT, payload: 'test' };
    const result = employeeReducer(modifiedState, action);
    expect(result.searchText).toBe('test');
    expect(result.currentPage).toBe(1);
  });

  it('should handle SET_PAGE', () => {
    const action = { type: SET_PAGE, payload: 2 };
    const result = employeeReducer(initialState, action);
    expect(result.currentPage).toBe(2);
  });

  it('should handle SET_SORT', () => {
    const action = {
      type: SET_SORT,
      payload: { sortBy: 'id', sortOrder: 'desc' },
    };
    const result = employeeReducer(initialState, action);
    expect(result.sortBy).toBe('id');
    expect(result.sortOrder).toBe('desc');
  });
});
