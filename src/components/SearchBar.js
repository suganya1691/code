import { useDispatch } from "react-redux";

function SearchBar({searchText}){
    const dispatch = useDispatch();
    function handleSearch(text){
        dispatch({type:'SET_SEARCH_TEXT', payload:text})
    }
    return(
        <>
        <input className='border border-gray-900 rounded px-2' type='text' placeholder='Search Employee' value={searchText} onChange={(e) => handleSearch(e.target.value)}></input>
        <button className='mx-4 border-gray bg-gray-200 rounded w-20' type='button'>Search</button>
        </>
    )
}

export default SearchBar;