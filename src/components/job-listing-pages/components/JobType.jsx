// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./JobType.css";

// const JobType = () => {
//   const [jobTypes, setJobTypes] = useState([]);
//   const [selectedJobTypes, setSelectedJobTypes] = useState([]);

//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-types");
//         setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
//       } catch (error) {
//         console.error("Error fetching job types:", error);
//         setJobTypes([]);
//       }
//     };

//     fetchJobTypes();
//   }, []);

//   const handleJobTypeToggle = (id) => {
//     setSelectedJobTypes((prev) =>
//       prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
//     );
//   };

//   return (
//     <div className="job-type-container">
//       <ul className="job-type-list">
//         {jobTypes.map((jobType) => (
//           <li key={jobType.id} className="job-type-item">
//             <label className="job-type-label flex items-center cursor-pointer">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={selectedJobTypes.includes(jobType.id)}
//                   onChange={() => handleJobTypeToggle(jobType.id)}
//                 />
//                 <div
//                   className="w-11 h-6 bg-gray-200 rounded-xl peer peer-checked:bg-blue-500 
//                              peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"
//                 ></div>
//                 <div
//                   className="absolute left-1 top-1 w-4 h-4 bg-white rounded-xl 
//                              transition-all duration-300 ease-in-out peer-checked:translate-x-5"
//                 ></div>
//               </div>
//               <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
//                 {jobType.name}
//               </span>
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default JobType;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const JobType = () => {
//   const [jobTypes, setJobTypes] = useState([]);
//   const [selectedJobTypes, setSelectedJobTypes] = useState([]);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchJobTypes = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-types");
//         setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
//       } catch (error) {
//         console.error("Error fetching job types:", error);
//         setError("Could not load job types. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchJobTypes();
//   }, []);

//   const handleJobTypeToggle = (id) => {
//     setSelectedJobTypes((prev) =>
//       prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
//     );
//   };

//   const getDropdownHeaderText = () => {
//     if (selectedJobTypes.length === 0) return "Select Job Types";
//     if (selectedJobTypes.length === 1) {
//       const selected = jobTypes.find((type) => type.id === selectedJobTypes[0]);
//       return selected ? selected.name : "1 job type selected";
//     }
//     return `${selectedJobTypes.length} job types selected`;
//   };

//   return (
//     <div className="relative w-full">
//       <button
//         type="button"
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none"
//         disabled={isLoading}
//       >
//         <div className="flex justify-between items-center">
//           <span className="text-sm font-medium text-gray-700 truncate">
//             {isLoading ? "Loading job types..." : getDropdownHeaderText()}
//           </span>
//           <svg
//             className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
//               isExpanded ? "rotate-180" : ""
//             }`}
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </button>

//       {isExpanded && (
//         <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto"
//           style={{ scrollbarWidth: "none" }}
//         >
//           <ul className="py-1 pr-2">
//             {isLoading ? (
//               <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
//             ) : error ? (
//               <li className="px-4 py-2 text-sm text-red-500">{error}</li>
//             ) : jobTypes.length === 0 ? (
//               <li className="px-4 py-2 text-sm text-gray-500">No job types found</li>
//             ) : (
//               jobTypes.map((jobType) => (
//                 <li key={jobType.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={selectedJobTypes.includes(jobType.id)}
//                       onChange={() => handleJobTypeToggle(jobType.id)}
//                       className="form-checkbox h-4 w-4 text-blue-600"
//                     />
//                     <span className="text-sm text-gray-700 truncate">{jobType.name}</span>
//                   </label>
//                 </li>
//               ))
//             )}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobType;

import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const JobType = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobTypes, setJobTypes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job types
  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-types");
        setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching job types:", error);
        setError("Could not load job types. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobTypes();
  }, []);

  // Get selected job_type ids from the URL
  const selectedJobTypeIds = useMemo(() => {
    const ids = searchParams.get("job_type");
    return ids ? ids.split("+").map(Number) : [];
  }, [searchParams]);

  // Handle job type toggle and update search params
  const jobTypeHandler = useCallback(
    (id) => {
      const currentParams = Object.fromEntries(searchParams);
      let newSelectedIds;

      if (selectedJobTypeIds.includes(id)) {
        newSelectedIds = selectedJobTypeIds.filter((typeId) => typeId !== id);
      } else {
        newSelectedIds = [...selectedJobTypeIds, id];
      }

      if (newSelectedIds.length > 0) {
        newSelectedIds.sort((a, b) => a - b);
        currentParams["job_type"] = newSelectedIds.join("+");
      } else {
        delete currentParams["job_type"];
      }

      setSearchParams(currentParams, { replace: true });
    },
    [searchParams, setSearchParams, selectedJobTypeIds]
  );

  // Dropdown text
  const getDropdownHeaderText = () => {
    if (selectedJobTypeIds.length === 0) return "Select Job Types";
    if (selectedJobTypeIds.length === 1) {
      const selected = jobTypes.find((type) => type.id === selectedJobTypeIds[0]);
      return selected ? selected.name : "1 job type selected";
    }
    return `${selectedJobTypeIds.length} job types selected`;
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none"
        disabled={isLoading}
      >
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 truncate">
            {isLoading ? "Loading job types..." : getDropdownHeaderText()}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <ul className="py-1 pr-2">
            {isLoading ? (
              <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
            ) : error ? (
              <li className="px-4 py-2 text-sm text-red-500">{error}</li>
            ) : jobTypes.length === 0 ? (
              <li className="px-4 py-2 text-sm text-gray-500">No job types found</li>
            ) : (
              jobTypes.map((jobType) => (
                <li key={jobType.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedJobTypeIds.includes(jobType.id)}
                      onChange={() => jobTypeHandler(jobType.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 truncate">{jobType.name}</span>
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(JobType);

