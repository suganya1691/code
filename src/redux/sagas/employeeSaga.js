import { FETCH_EMPLOYEES_REQUEST, fetchEmployeesSuccess, fetchEmployeesFailure } from "../actions/employeeAction";
import { takeLatest, put, call } from "redux-saga/effects";
//import axios from "axios";

export function* fetchEmployees(){
    try{
        console.log('Running saga')
        const response = yield call(fetch,'http://localhost:4000/api/employees'); 
        const data = yield response.json();
        yield put({
            type: 'FETCH_EMPLOYEES_SUCCESS',
            payload:data, 
          });
    }catch (error){
        console.log('Error',error.message)
        yield put({
            type:'FETCH_EMPLOYEES_FAILURE',
            payload:error.message
        });
    }
}

export default function* employeeSaga(){
    yield takeLatest(FETCH_EMPLOYEES_REQUEST, fetchEmployees);
}