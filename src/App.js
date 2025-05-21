import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { fetchEmployeesRequest } from "./redux/actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import EmployeeList from './components/EmployeeList';
import SearchBar from './components/SearchBar';
import EmployeeDetails from './components/EmployeeDetails';
import CompanyDetails from './components/CompanyDetails';
import Pagination from './components/Pagination';
import { getSelectedEmployee,getPaginated } from './redux/selectors/employeeSelectors';
import {ErrorBoundary} from 'react-error-boundary';


function FallBackComponent({error}){
  return (<h2>Unable to load page : {error.message} </h2>)
}
  
function App() {

  const dispatch = useDispatch();
  const {companyInfo,loading,employees,searchText,error } = useSelector( (state) => state.employees || {} );
  const processedEmployees= useSelector(getPaginated);
  const selectedEmployee = useSelector(getSelectedEmployee);
 
  useEffect(() => {
      dispatch(fetchEmployeesRequest());
  },[dispatch]);

  
  function closeModal(){
    dispatch({type:'CLEAR_SELECTED_EMPLOYEE',payload:null});
  }
  
  return (
    <ErrorBoundary FallbackComponent={FallBackComponent}>
    <><div className='border mx-4 my-4'>
      <CompanyDetails companyInfo={companyInfo} />
      <div className='px-4 py-4 flex justify-end'>
        <SearchBar  searchText={searchText} />
      </div> 
      {loading &&  
        <div className="max-w-md mx-auto bg-white border border-blue-300 text-blue-700 p-4 rounded-lg shadow-md mt-4" role="alert">
         <h2 className="text-lg font-semibold mb-2">Info</h2>
         <p>Fetching Data from server</p> 
        </div>}
      {!loading && processedEmployees && (<EmployeeList employees={processedEmployees}/>) }
      {error && 
        <div className="max-w-md mx-auto bg-white border border-red-300 text-red-700 p-4 rounded-lg shadow-md mt-4" role="alert">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p> 
      </div>}
      <Pagination />
      </div>
      {selectedEmployee && (
        <EmployeeDetails employee={selectedEmployee} onClose = {closeModal}/>
      )}
    </>
    </ErrorBoundary>
  )
}

export default App;
