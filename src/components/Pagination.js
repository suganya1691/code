import { useState } from "react";
import { useSelector ,useDispatch} from "react-redux";


function Pagination (){

    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.employees.currentPage);
    const totalPages = 3;
    function handlePageChange(pageNumber){
        dispatch({type:'SET_PAGE',payload:pageNumber})
    }
    return(
        <div className="flex justify-end items-center space-x-2 mt-4">
  <button
    onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
    className={`px-3 py-1 rounded-md border ${
      currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
    }`}
  >
    Prev
  </button>

  {Array.from({ length: totalPages }, (_, i) => (
    <button
      key={i}
      onClick={() => handlePageChange(i + 1)}
      className={`px-3 py-1 rounded-md border ${
        currentPage === i + 1
          ? "bg-gray-600 text-white"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      {i + 1}
    </button>
  ))}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-3 py-1 rounded-md border ${
      currentPage === totalPages
        ? "bg-gray-200 cursor-not-allowed"
        : "bg-white hover:bg-gray-100"
    }`}
  >
    Next
  </button>
</div>
    )
}

export default Pagination;