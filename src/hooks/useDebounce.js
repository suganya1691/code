import { useState, useEffect, use } from "react";

function useDebounce (input,delay){
    const[debouncedValue,setDebouncedValue]= useState('');
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(input);
        },delay);
    
        return () => {
            clearTimeout(timeOut);
        }

    },[input])    
    return debouncedValue;
}

export default useDebounce;