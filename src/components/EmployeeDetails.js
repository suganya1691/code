import React from 'react';
import { useEffect, useState, useRef } from "react";
import { formatDate } from "../utils/formatDate";
function EmployeeDetails({employee,onClose}){

    const empModal = useRef(null);
    const clickOutside = (e) =>{
        if(empModal.current && !empModal.current.contains(e.target)){
            onClose();
        }
    }
    useEffect(()=>{
        const handleEscape = (e) =>{
            if(e.key === 'Escape'){
                onClose();
            }
        }
        document.addEventListener('mousedown', clickOutside);
        document.addEventListener('keydown', handleEscape);

        return() => {
            document.removeEventListener('keydown',handleEscape);
            document.removeEventListener('mousedown',clickOutside);
        }
    },[onClose])
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
        role="dialog" aria-modal="true" >
            <div className="bg-white p-4 sm:p-6 rounded-lg relative w-full max-w-md sm:max-w-xl md:max-w-2xl" ref={empModal}>
            <button className="absolute top-2 right-2 text-gray-600 hover:text-black text-3xl sm:text-4xl"
                onClick={onClose}>  &times; </button>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-shrink-0 text-center sm:text-left">
                <img src={employee.avatar} alt={employee.firstName} className="w-24 h-24 mx-auto sm:mx-0 rounded border object-cover"/>
                <p className="mt-2"><strong>Role:</strong> {employee.jobTitle}</p>
                <p><strong>Age:</strong> {employee.age}</p>
                <p><strong>Date Joined:</strong> {formatDate(employee.dateJoined)}</p>
                </div>
                <div className="flex-1">
                <h2 className="text-lg sm:text-xl font-bold underline mb-2">
                    {employee.firstName} {employee.lastName}
                </h2>
                <p className="text-sm text-gray-700">{employee.bio}</p>
                </div>
            </div>
            </div>
      </div>
      
    )
}

export default React.memo(EmployeeDetails);