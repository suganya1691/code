import { FETCH_EMPLOYEES_REQUEST,
        FETCH_EMPLOYEES_SUCCESS,
        FETCH_EMPLOYEES_FAILURE,
        SET_SELECTED_EMPLOYEE,
        CLEAR_SELECTED_EMPLOYEE,
        SET_SEARCH_TEXT,
        SET_PAGE,
        SET_SORT
        
 } from "../actions/employeeAction";

 const initialState = {
    companyInfo: null,
    employees :[],
    loading:false,
    error:null,
    selectedEmployee: null,
    searchText:'',
    currentPage:1,
    pageSize:5,
    sortBy:'firstName',
    sortOrder:'asc'
 };

 const employeeReducer = (state=initialState, action) => {
    console.log('Actions',action.payload)
    switch(action.type){
        case FETCH_EMPLOYEES_REQUEST:
            return {...state, loading:true, error:null};
        case FETCH_EMPLOYEES_SUCCESS:
            return {...state, loading:false, employees:action.payload.employees,  companyInfo: action.payload.companyInfo};
        case FETCH_EMPLOYEES_FAILURE:
            return {...state, loading:false, error:action.payload};
        case SET_SELECTED_EMPLOYEE:
            return {...state,selectedEmployee:action.payload};
        case CLEAR_SELECTED_EMPLOYEE:
            return {...state, selectedEmployee:null}
        case SET_SEARCH_TEXT:
            return{...state,searchText:action.payload};
        case SET_PAGE:
            return{...state,currentPage:action.payload};
        case SET_SORT:
            return{...state, sortBy:action.payload.sortBy, sortOrder:action.payload.sortOrder}
        default:
            return state

    }
 }

 export default employeeReducer;
 