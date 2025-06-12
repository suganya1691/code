import React from "react";
import { formatDate } from '../utils/formatDate';

function CompanyDetails({companyInfo}){

    return(
        <div className="max-w border px-4 py-6">
        <div className=" justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{companyInfo?.companyName}</h1> 
        </div>
        <div className='flex justify-between'> 
            <p className="text-gray-600 mr-10">{companyInfo?.companyMotto}</p>
            <p className=" text-gray-600 ">Since { companyInfo && formatDate(companyInfo?.companyEst)}</p>
          </div>
        </div>
    )
}

export default React.memo(CompanyDetails);