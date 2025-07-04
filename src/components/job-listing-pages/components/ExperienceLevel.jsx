// import React, { useCallback, useMemo, useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addExperience } from "../../../features/filter/filterSlice";
// import { experienceLavelCheck } from "../../../features/job/jobSlice";
// import axios from "axios";

// const ExperienceLevel = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { experienceLavel } = useSelector((state) => state.job) || {};
//   const dispatch = useDispatch();
//   const [experienceLevels, setExperienceLevels] = useState([]);

//   // Fetch experience levels from API
//   useEffect(() => {
//   const fetchExperienceLevels = async () => {
//     try {
//       const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/experience-level");
//       setExperienceLevels(response.data.data); // Extract the 'data' property
//     } catch (error) {
//       console.error("Failed to fetch experience levels:", error);
//     }
//   };

//   fetchExperienceLevels();
// }, []);

//   // Get array of selected experience IDs from URL
//   const selectedExperienceLevelIds = useMemo(() => {
//     const idsFromUrl = searchParams.get("experience_id");
//     return idsFromUrl ? idsFromUrl.split("+").map(Number) : [];
//   }, [searchParams]);

//   // Experience handler to toggle selection
//   const experienceHandler = useCallback(
//     (id) => {
//       const isSelected = selectedExperienceLevelIds.includes(id);
//       let newSelectedIds;

//       if (isSelected) {
//         // Remove ID if already selected
//         newSelectedIds = selectedExperienceLevelIds.filter(
//           (selectedId) => selectedId !== id
//         );
//         dispatch(experienceLavelCheck(id)); // Uncheck in Redux
//       } else {
//         // Add new ID to selection
//         newSelectedIds = [...selectedExperienceLevelIds, id];
//         dispatch(experienceLavelCheck(id)); // Check in Redux
//       }

//       // Update URL with new selection
//       const currentParams = Object.fromEntries(searchParams);
//       if (newSelectedIds.length > 0) {
//         currentParams["experience_id"] = newSelectedIds.join("+");
//       } else {
//         delete currentParams["experience_id"];
//       }

//       // Update URL and Redux state
//       setSearchParams(
//         Object.keys(currentParams).length > 0 ? currentParams : {},
//         { replace: true }
//       );
//       dispatch(addExperience(newSelectedIds.length > 0 ? newSelectedIds : null));
//     },
//     [selectedExperienceLevelIds, dispatch, searchParams, setSearchParams]
//   );

//   // Sync initial state
//   useEffect(() => {
//     if (selectedExperienceLevelIds.length > 0) {
//       // Reset all checked states first
//       experienceLavel?.forEach((item) => {
//         if (item.isChecked && !selectedExperienceLevelIds.includes(item.id)) {
//           dispatch(experienceLavelCheck(item.id));
//         }
//       });

//       // Set checked states based on URL
//       selectedExperienceLevelIds.forEach((id) => {
//         const itemToCheck = experienceLavel?.find((item) => item.id === id);
//         if (itemToCheck && !itemToCheck.isChecked) {
//           dispatch(experienceLavelCheck(id));
//         }
//       });

//       dispatch(addExperience(selectedExperienceLevelIds));
//     }
//   }, [selectedExperienceLevelIds, experienceLavel, dispatch]);

//   if (!experienceLevels || experienceLevels.length === 0) {
//     return (
//       <div className="w-full space-y-2">
//         <div className="text-sm text-gray-500 text-center py-2">
//           No experience levels found
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full space-y-2">
//       <ul className="space-y-2">
//         {experienceLevels.map((item) => (
//           <li key={item.id} className="w-full">
//             <label className="flex items-center group cursor-pointer">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={selectedExperienceLevelIds.includes(item.id)}
//                   onChange={() => experienceHandler(item.id)}
//                 />
//                 <div
//                   className="w-11 h-6 bg-gray-200 rounded-2xl peer 
//                                 peer-checked:bg-blue-500 
//                                 peer-focus:ring-4 peer-focus:ring-blue-300 
//                                 dark:peer-focus:ring-blue-800"
//                 ></div>
//                 <div
//                   className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
//                                 transition-all duration-300 ease-in-out
//                                 peer-checked:translate-x-5"
//                 ></div>
//               </div>
//               <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-grow truncate">
//                 {item.name}
//               </span>
//             </label>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default React.memo(ExperienceLevel);


import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addExperience } from "../../../features/filter/filterSlice";
import { experienceLavelCheck } from "../../../features/job/jobSlice";
import axios from "axios";

const ExperienceLevel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { experienceLavel } = useSelector((state) => state.job) || {};
  const dispatch = useDispatch();
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch experience levels from API
  useEffect(() => {
    const fetchExperienceLevels = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/experience-level");
        setExperienceLevels(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Failed to fetch experience levels:", error);
        setError("Could not load experience levels. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperienceLevels();
  }, []);

  // Get selected experience level IDs from URL
  const selectedExperienceLevelIds = useMemo(() => {
    const idsFromUrl = searchParams.get("experience_id");
    return idsFromUrl ? idsFromUrl.split("+").map(Number) : [];
  }, [searchParams]);

  // Handler to toggle experience selection
  const experienceHandler = useCallback(
    (id) => {
      const isSelected = selectedExperienceLevelIds.includes(id);
      let newSelectedIds = isSelected
        ? selectedExperienceLevelIds.filter((selectedId) => selectedId !== id)
        : [...selectedExperienceLevelIds, id];

      dispatch(experienceLavelCheck(id));

      const currentParams = Object.fromEntries(searchParams);
      if (newSelectedIds.length > 0) {
        currentParams["experience_id"] = newSelectedIds.join("+");
      } else {
        delete currentParams["experience_id"];
      }

      setSearchParams(currentParams, { replace: true });
      dispatch(addExperience(newSelectedIds.length > 0 ? newSelectedIds : null));
    },
    [selectedExperienceLevelIds, dispatch, searchParams, setSearchParams]
  );

  // Sync Redux state based on URL
  useEffect(() => {
    if (selectedExperienceLevelIds.length > 0) {
      experienceLavel?.forEach((item) => {
        if (item.isChecked && !selectedExperienceLevelIds.includes(item.id)) {
          dispatch(experienceLavelCheck(item.id));
        }
      });

      selectedExperienceLevelIds.forEach((id) => {
        const itemToCheck = experienceLavel?.find((item) => item.id === id);
        if (itemToCheck && !itemToCheck.isChecked) {
          dispatch(experienceLavelCheck(id));
        }
      });

      dispatch(addExperience(selectedExperienceLevelIds));
    }
  }, [selectedExperienceLevelIds, experienceLavel, dispatch]);

  const getDropdownHeaderText = () => {
    if (selectedExperienceLevelIds.length === 0) return "Select Experience Levels";
    if (selectedExperienceLevelIds.length === 1) {
      const selected = experienceLevels.find((item) => item.id === selectedExperienceLevelIds[0]);
      return selected ? selected.name : "1 experience level selected";
    }
    return `${selectedExperienceLevelIds.length} experience levels selected`;
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
            {isLoading ? "Loading experience levels..." : getDropdownHeaderText()}
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
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          <ul className="py-1 pr-2">
            {isLoading ? (
              <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
            ) : error ? (
              <li className="px-4 py-2 text-sm text-red-500">{error}</li>
            ) : experienceLevels.length === 0 ? (
              <li className="px-4 py-2 text-sm text-gray-500">No experience levels found</li>
            ) : (
              experienceLevels.map((item) => (
                <li key={item.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedExperienceLevelIds.includes(item.id)}
                      onChange={() => experienceHandler(item.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 truncate">{item.name}</span>
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

export default React.memo(ExperienceLevel);
