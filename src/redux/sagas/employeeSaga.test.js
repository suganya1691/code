const { runSaga } = require('redux-saga');
const {
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
} = require('../actions/employeeAction');
const { fetchEmployees } = require('./employeeSaga');

describe('fetchEmployees saga', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches FETCH_EMPLOYEES_SUCCESS on successful fetch', async () => {
    const dispatchedActions = [];

    const mockData = {
      employees: [{ id: 1, firstName: 'Alice' }],
      companyInfo: { companyName: 'Test Corp' },
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      fetchEmployees
    ).toPromise();

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:4000/api/employees');
    expect(dispatchedActions).toContainEqual({
      type: FETCH_EMPLOYEES_SUCCESS,
      payload: mockData,
    });
  });

  it('dispatches FETCH_EMPLOYEES_FAILURE on fetch error', async () => {
    const dispatchedActions = [];

    global.fetch = jest.fn(() => Promise.reject(new Error('API is down')));

    await runSaga(
      {
        dispatch: (action) => dispatchedActions.push(action),
      },
      fetchEmployees
    ).toPromise();

    expect(dispatchedActions).toContainEqual({
      type: FETCH_EMPLOYEES_FAILURE,
      payload: 'API is down',
    });
  });
});
