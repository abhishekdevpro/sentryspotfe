

// import { Constant } from '@/utils/constant/constant'; 
// import axios from 'axios'; 
// import React, { useState, useEffect } from 'react';

// const CompanyJobHeader = ({ companyId }) => {
//   const [companyData, setCompanyData] = useState(null);
//   const [jobData, setJobData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = token ? { Authorization: token } : {};
//         const jobResponse = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/job-list/${companyId}`,
//           { headers }
//         );
        
//         const fetchedJobData = jobResponse.data.data;
//         setJobData(fetchedJobData);
        
//         if (fetchedJobData.company_id) {
//           const companyResponse = await axios.get(
//             `https://api.sentryspot.co.uk/api/jobseeker/companies/${fetchedJobData.company_id}`
//           );
//           setCompanyData(companyResponse.data.data);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [token, companyId]);

//   // Function to truncate description
//   const truncateDescription = (description, maxWords) => {
//     if (!description) return '';
//     const words = description.split(' ');
//     return words.length > maxWords 
//       ? words.slice(0, maxWords).join(' ') + '...'
//       : description;
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center p-6">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 text-red-600 rounded-lg">
//         Error loading company data: {error}
//       </div>
//     );
//   }

//   // No data state
//   if (!companyData) {
//     return null;
//   }

//   // Prepare job description
//   const jobDescription = jobData?.job_description || '';
//   const maxWords = 30;
//   const truncatedDescription = truncateDescription(jobDescription, maxWords);

//   return (
//     <div className="flex items-start gap-6 p-6 bg-white rounded-lg shadow-sm">
//       {/* Company Logo */}
//       <div className="flex-shrink-0 w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
//         {companyData.logo ? (
//           <img
//             src={`https://api.sentryspot.co.uk${companyData.logo}`}
//             alt={`${companyData.company_name} logo`}
//             className="w-12 h-12 object-contain"
//           />
//         ) : (
//           <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//             <span className="text-gray-400 text-xl font-medium">
//               {companyData.company_name?.charAt(0) || '?'}
//             </span>
//           </div>
//         )}
//       </div>

//       {/* Job Details */}
//       <div className="flex-grow">
//         <div className="text-sm text-gray-600 mb-1">
//           Applying for
//         </div>
//         <h1 className="text-2xl font-semibold text-gray-900 mb-1">
//           {jobData.job_title || 'Position Title'}
//         </h1>
//         <div className="text-lg text-gray-700">
//           {companyData.company_name || 'Company Name'}
//         </div>

//         {/* Job Description with Read More/Less */}
//         {jobDescription && (
//           <div className="mt-3">
//             <p className="text-gray-600">
//               {isDescriptionExpanded ? jobDescription : truncatedDescription}
//             </p>
//             {jobDescription.split(' ').length > maxWords && (
//               <button 
//                 onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
//                 className="text-blue-600 hover:text-blue-800 font-medium mt-2"
//               >
//                 {isDescriptionExpanded ? 'Read Less' : 'Read More'}
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CompanyJobHeader;

import { Constant } from '@/utils/constant/constant'; 
import axios from 'axios'; 
import React, { useState, useEffect } from 'react';

const CompanyJobHeader = ({ companyId }) => {
  const [companyData, setCompanyData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: token } : {};
        const jobResponse = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/job-list/${companyId}`,
          { headers }
        );
        
        const fetchedJobData = jobResponse.data.data;
        setJobData(fetchedJobData);
        
        if (fetchedJobData.company_id) {
          const companyResponse = await axios.get(
            `https://api.sentryspot.co.uk/api/jobseeker/companies/${fetchedJobData.company_id}`
          );
          setCompanyData(companyResponse.data.data);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token, companyId]);

  const truncateDescription = (description, maxWords) => {
    if (!description) return '';
    const words = description.split(' ');
    return words.length > maxWords 
      ? words.slice(0, maxWords).join(' ') + '...'
      : description;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4 sm:p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-3 sm:mx-0 p-4 bg-red-50 text-red-600 text-sm sm:text-base rounded-lg">
        Error loading company data: {error}
      </div>
    );
  }

  if (!companyData) {
    return null;
  }

  const jobDescription = jobData?.job_description || '';
  const maxWords = 30;
  const truncatedDescription = truncateDescription(jobDescription, maxWords);

  return (
    <div className="mx-3 sm:mx-0 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      {/* Company Logo */}
      <div className="flex justify-center w-full sm:w-auto sm:flex-shrink-0">
        <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center">
          {companyData.logo ? (
            <img
              src={`/images/resource/company-logo/1-1.png`|| '/images/resource/company-logo/1-1.png'}
              alt={`${companyData.company_name} logo`}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = '/images/resource/company-logo/1-1.png'; // Fallback image
              }}
            />
          ) : (
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
             <span
  className="text-gray-400 text-xl font-medium"
  dangerouslySetInnerHTML={{
    __html: companyData.company_name?.charAt(0) || '?'
  }}
></span>

            </div>
          )}
        </div>
      </div>

      {/* Job Details */}
      <div className="flex-grow w-full">
        <div className="text-sm text-gray-600 mb-1">
          Applying for
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {jobData.job_title || 'Position Title'}
        </h1>
        <div className="text-base sm:text-lg text-gray-700 mb-3">
          {companyData.company_name || 'Company Name'}
        </div>

        {/* Job Description with Read More/Less */}
       {jobDescription && (
  <div className="mt-2 sm:mt-3">
    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
      {isDescriptionExpanded ? (
        <span
          className="block whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: jobDescription
          }}
        />
      ) : (
      <span
  className="block whitespace-pre-line"
  dangerouslySetInnerHTML={{
    __html: truncatedDescription
  }}
></span>

      )}
    </p>

    {jobDescription.split(' ').length > maxWords && (
      <button
        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium mt-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
      >
        {isDescriptionExpanded ? 'Read Less' : 'Read More'}
      </button>
    )}
  </div>
)}


        {/* Additional Job Information - can be expanded based on your needs */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
          {jobData.salary_range && (
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Salary Range:</span>
              <span>{jobData.salary_range}</span>
            </div>
          )}
          {jobData.job_type && (
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Job Type:</span>
              <span>{jobData.job_type}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyJobHeader;