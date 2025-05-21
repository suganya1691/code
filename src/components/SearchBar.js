import React from "react";
import { useDispatch } from "react-redux";
import useDebounce from "./hooks/useDebounce";
import { useEffect, useState } from "react";

function SearchBar({searchText}){
    const dispatch = useDispatch();
    const [input,setInput] = useState(searchText);
    const debouncedText = useDebounce(input,500);
    useEffect(() => {
        dispatch({type:'SET_SEARCH_TEXT', payload:debouncedText})
    },[debouncedText])
    return(
        <>
        <input className='border border-gray-900 rounded px-2' type='text' placeholder='Search Employee' value={input} onChange={(e) => setInput(e.target.value)}></input>
        <button className='mx-4 border-gray bg-gray-200 rounded w-20' type='button'>Search</button>
        </>
    )
}

export default React.memo(SearchBar);