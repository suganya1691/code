import React,{useState, useEffect, useCallback} from 'react';
import { fetchEmployeesRequest } from "../redux/actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedEmployee } from '../redux/selectors/employeeSelectors';

function EmployeeList({employees}){

    const dispatch = useDispatch();
    const selectedEmployee = useSelector(getSelectedEmployee);
    const sortOrder = useSelector((state) => state.employees.sortOrder);
    const sortBy = useSelector((state) => state.employees.sortBy);
    
    const onSelect = useCallback((employee) =>{
      dispatch({type:'SET_SELECTED_EMPLOYEE',payload:employee});
     },[dispatch])

    const toggleSort = useCallback((e) =>{
      const clickedHeader = e.target.getAttribute('data-field');
      const sort = sortOrder === 'asc' ? 'desc' : 'asc';
      dispatch({type:'SET_SORT',payload:{sortOrder:sort, sortBy:clickedHeader }})
    },[dispatch,sortOrder,sortBy]);

    return(
      <>
        <div className="overflow-x-auto border rounded-lg mx-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700  select-none" >ID <span className='cursor-pointer' title="Click to toggle sort" data-field="id" onClick={(e) => toggleSort(e)}>{ sortBy === 'id' && sortOrder === "asc" ? "▲" : "▼"}</span> </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700  select-none" >Name <span className='cursor-pointer'  data-field="firstName" title="Click to toggle sort" onClick={(e) => toggleSort(e)}>{sortBy === 'firstName' && sortOrder === "asc" ? "▲" : "▼"}</span> </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 select-none" >Contact No <span className='cursor-pointer' title="Click to toggle sort" data-field="contactNo" onClick={(e) => toggleSort(e)} > {sortBy === 'contactNo' && sortOrder === "asc" ? "▲" : "▼"}</span></th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 select-none" >Address <span className='cursor-pointer' title="Click to toggle sort" data-field="address" onClick={(e) => toggleSort(e)}> {sortBy === 'address' && sortOrder === "asc" ? "▲" : "▼"}</span> </th>
            
          </tr>
        </thead>
        <tbody className="bg-white  divide-gray-200">
          {employees.length == 0 && (
            <div className="text-center text-gray-600 py-4">
               No results found matching your search.
            </div>
          )}
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