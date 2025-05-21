import React,{useState, useEffect, useCallback} from 'react';
import { fetchEmployeesRequest } from "../redux/actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedEmployee } from '../redux/selectors/employeeSelectors';

function EmployeeList({employees}){

    const dispatch = useDispatch();
    const selectedEmployee = useSelector(getSelectedEmployee);
    const sortOrder = useSelector((state) => state.employees.sortOrder);
    
    const onSelect = useCallback((employee) =>{
      dispatch({type:'SET_SELECTED_EMPLOYEE',payload:employee});
     },[dispatch])

    const toggleSort = useCallback(() =>{
      const sort = sortOrder === 'asc' ? 'desc' : 'asc';
      dispatch({type:'SET_SORT',payload:{sortOrder:sort}})
    },[dispatch,sortOrder]);

    return(
      <>
        <div className="overflow-x-auto border rounded-lg mx-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 cursor-pointer select-none"  title="Click to toggle sort" onClick={toggleSort}>Name {sortOrder === "asc" ? "▲" : "▼"} </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Contact No</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Address</th>
            
          </tr>
        </thead>
        <tbody className="bg-white  divide-gray-200">
          {employees?.map((emp) => {
            const isSelected = selectedEmployee && emp.id === selectedEmployee.id;
            return (
            <tr key={emp.id} className= {`hover:bg-gray-50 cursor-pointer ${isSelected ? 'bg-blue-100' : ''} `}
              onClick={() => onSelect(emp)} >
              <td className="px-4 py-2 text-sm text-gray-700">{emp.id}</td>
              <td className="px-4 py-2 text-sm text-gray-900"><div className="flex items-center space-x-2">
                 <img src={emp.avatar}  alt={emp.name} className="w-10 h-10 "/>
                <span>{emp.firstName} {emp.lastName}</span>
                </div>
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">{emp.contactNo}</td>
              <td className="px-4 py-2 text-sm text-gray-700">{emp.address}</td>
              
            </tr>
          )}
          )}
        </tbody>
      </table>
        
    </div>
     
    </>
  )
}

export default React.memo(EmployeeList);