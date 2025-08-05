
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useSearchParams } from "react-router-dom";

// const Industries = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [industries, setIndustries] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch industries from API
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch('https://api.sentryspot.co.uk/api/jobseeker/industries');
//         const result = await response.json();
        
//         if (result.status === "success" && result.data) {
//           setIndustries(result.data);
//         } else {
//           throw new Error('Failed to fetch industries');
//         }
//       } catch (error) {
//         console.error('Error fetching industries:', error);
//         setError('Could not load industries. Please try again later.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchIndustries();
//   }, []);

//   // Get selected industry IDs from URL
//   const selectedIndustryIds = useMemo(() => {
//     const ids = searchParams.get("industry_id");
//     return ids ? ids.split('+').map(Number) : [];
//   }, [searchParams]);

//   // Handler to toggle industry selection
//   const industryHandler = useCallback((id, name) => {
//     const currentParams = Object.fromEntries(searchParams);
    
//     let newSelectedIds;
//     if (selectedIndustryIds.includes(id)) {
//       // Remove the id if it's already selected
//       newSelectedIds = selectedIndustryIds.filter(industryId => industryId !== id);
//     } else {
//       // Add the id if it's not selected
//       newSelectedIds = [...selectedIndustryIds, id];
//     }

//     if (newSelectedIds.length > 0) {
//       // Sort IDs for consistent URL formatting
//       newSelectedIds.sort((a, b) => a - b);
//       currentParams["industry_id"] = newSelectedIds.join('+');
//     } else {
//       // If no industries selected, remove the parameter
//       delete currentParams["industry_id"];
//     }

//     // Update search params
//     setSearchParams(
//       Object.keys(currentParams).length > 0 ? currentParams : {},
//       { replace: true }
//     );
//   }, [searchParams, setSearchParams, selectedIndustryIds]);

//   // Render loading state
//   if (isLoading) {
//     return (
//       <div className="w-full space-y-2">
//         <div className="text-sm text-gray-500 text-center py-2">
//           Loading industries...
//         </div>
//       </div>
//     );
//   }

//   // Render error state
//   if (error) {
//     return (
//       <div className="w-full space-y-2">
//         <div className="text-sm text-red-500 text-center py-2">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full space-y-2">
//       {industries.length === 0 ? (
//         <div className="text-sm text-gray-500 text-center py-2">
//           No industries found
//         </div>
//       ) : (
//         <ul className="space-y-2">
//           {industries.map((industry) => (
//             <li key={industry.id} className="w-full">
//               <label className="flex items-center group cursor-pointer">
//                 <div className="relative">
//                   <input
//                     type="checkbox"
//                     className="sr-only peer"
//                     checked={selectedIndustryIds.includes(industry.id)}
//                     onChange={() => industryHandler(industry.id, industry.name)}
//                   />
//                   <div className="w-11 h-6 bg-gray-200 rounded-2xl peer 
//                                 peer-checked:bg-blue-500 
//                                 peer-focus:ring-4 peer-focus:ring-blue-300 
//                                 dark:peer-focus:ring-blue-800">
//                   </div>
//                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
//                                 transition-all duration-300 ease-in-out
//                                 peer-checked:translate-x-5">
//                   </div>
//                 </div>
//                 <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-grow truncate">
//                   {industry.name}
//                 </span>
//               </label>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default React.memo(Industries);

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const Industries = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://api.sentryspot.co.uk/api/jobseeker/industries");
        const result = await response.json();
        if (result.status === "success" && result.data) {
          setIndustries(result.data);
        } else {
          throw new Error("Failed to fetch industries");
        }
      } catch (error) {
        setError("Could not load industries. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  const selectedIndustryIds = useMemo(() => {
    const ids = searchParams.get("industry_id");
    return ids ? ids.split("+").map(Number) : [];
  }, [searchParams]);

  const industryHandler = useCallback(
    (id) => {
      const currentParams = Object.fromEntries(searchParams);
      let newSelectedIds;

      if (selectedIndustryIds.includes(id)) {
        newSelectedIds = selectedIndustryIds.filter((industryId) => industryId !== id);
      } else {
        newSelectedIds = [...selectedIndustryIds, id];
      }

      if (newSelectedIds.length > 0) {
        newSelectedIds.sort((a, b) => a - b);
        currentParams["industry_id"] = newSelectedIds.join("+");
      } else {
        delete currentParams["industry_id"];
      }

      setSearchParams(currentParams, { replace: true });
    },
    [searchParams, setSearchParams, selectedIndustryIds]
  );

  const getDropdownHeaderText = () => {
    if (selectedIndustryIds.length === 0) return "Select Industries";
    if (selectedIndustryIds.length === 1) {
      const selected = industries.find((ind) => ind.id === selectedIndustryIds[0]);
      return selected ? selected.name : "1 industry selected";
    }
    return `${selectedIndustryIds.length} industries selected`;
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
          <span className="text-sm font-normal text-gray-500 truncate">
            {isLoading ? "Loading industries..." : getDropdownHeaderText()}
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
          <ul className="py-1 pr-2" style={{ scrollbarWidth: "none" }}>
            {isLoading ? (
              <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
            ) : error ? (
              <li className="px-4 py-2 text-sm text-red-500">{error}</li>
            ) : industries.length === 0 ? (
              <li className="px-4 py-2 text-sm text-gray-500">No industries found</li>
            ) : (
              industries.map((industry) => (
                <li key={industry.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedIndustryIds.includes(industry.id)}
                      onChange={() => industryHandler(industry.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 truncate">{industry.name}</span>
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

export default React.memo(Industries);
