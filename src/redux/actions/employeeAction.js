export const FETCH_EMPLOYEES_REQUEST = "FETCH_EMPLOYEES_REQUEST";
export const FETCH_EMPLOYEES_SUCCESS = "FETCH_EMPLOYEES_SUCCESS";
export const FETCH_EMPLOYEES_FAILURE = "FETCH_EMPLOYEES_FAILURE";

export const SET_SELECTED_EMPLOYEE = "SET_SELECTED_EMPLOYEE";
export const CLEAR_SELECTED_EMPLOYEE ="CLEAR_SELECTED_EMPLOYEE"
export const SET_SEARCH_TEXT ="SET_SEARCH_TEXT";
export const SET_PAGE= "SET_PAGE";
export const SET_SORT = "SET_SORT";

export const fetchEmployeesRequest = () => ({type:FETCH_EMPLOYEES_REQUEST});
export const fetchEmployeesSuccess = (employees) => ({
    type:FETCH_EMPLOYEES_SUCCESS,
    payload:employees
});
export const fetchEmployeesFailure = (error) => ({
    type:FETCH_EMPLOYEES_FAILURE,
    payload: error
})