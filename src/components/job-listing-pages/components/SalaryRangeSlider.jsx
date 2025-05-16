


// // import { useEffect, useState } from "react";
// // import InputRange from "react-input-range";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addSalary } from "../../../features/filter/filterSlice";

// // const SalaryRangeSlider = () => {
// //     const { jobList } = useSelector((state) => state.filter);
// //     const [salary, setSalary] = useState({
// //         min: jobList.salary.min,
// //         max: jobList.salary.max,
// //     });

// //     const dispatch = useDispatch();

// //     const handleOnChange = ({ min, max }) => {
// //         dispatch(addSalary({ min, max }));
// //     };

// //     useEffect(() => {
// //         setSalary({
// //             min: jobList.salary.min,
// //             max: jobList.salary.max,
// //         });
// //     }, [setSalary, jobList]);

// //     return (
// //         <div className="range-slider-one salary-range">
// //             <InputRange
// //                 formatLabel={(value) => ``}
// //                 minValue={0}
// //                 maxValue={20000}
// //                 value={{
// //                     min: salary.min,
// //                     max: salary.max,
// //                 }}
// //                 onChange={(value) => handleOnChange(value)}
// //             />
// //             <div className="input-outer">
// //                 <div className="amount-outer">
// //                     <span className="d-inline-flex align-items-center">
// //                         <span className="min">${salary.min}</span>
// //                         <span className="max ms-2">${salary.max}</span>
// //                     </span>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SalaryRangeSlider;
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addSalary } from "../../../features/filter/filterSlice";

// const SalaryRangeToggle = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [salaryRanges, setSalaryRanges] = useState([]);
//   const dispatch = useDispatch();

//   // Fetch salary ranges from API
//   useEffect(() => {
//     const fetchSalaryRanges = async () => {
//       try {
//         const response = await fetch('https://api.sentryspot.co.uk/api/employeer/salary-range');
//         const result = await response.json();
//         if (result.status === "success" && result.data) {
//           setSalaryRanges(result.data);
//         }
//       } catch (error) {
//         console.error('Error fetching salary ranges:', error);
//       }
//     };

//     fetchSalaryRanges();
//   }, []);

//   // Get selected salary range ID from URL
//   const selectedSalaryId = useMemo(() => {
//     const id = searchParams.get("salary_id");
//     return id ? Number(id) : null;
//   }, [searchParams]);

//   // Parse salary range string into min and max values
//   const parseSalaryRange = (rangeStr) => {
//     // Remove 'k' and split by '-'
//     const parts = rangeStr.toLowerCase().replace(/k/g, '').split('-');
//     return {
//       min: parseInt(parts[0]) * 1000, // Convert to actual value (e.g., 10k -> 10000)
//       max: parseInt(parts[1] || parts[0]) * 1000 // If no max, use min
//     };
//   };

//   // Handler to toggle salary range selection
//   const salaryRangeHandler = useCallback((id, rangeName) => {
//     const currentParams = Object.fromEntries(searchParams);
    
//     if (selectedSalaryId === id) {
//       // If clicking the same salary range, deactivate it
//       delete currentParams["salary_id"];
//       dispatch(addSalary({ min: 0, max: 0 }));
//     } else {
//       // If clicking a different salary range, activate it
//       currentParams["salary_id"] = id;
//       const { min, max } = parseSalaryRange(rangeName);
//       dispatch(addSalary({ min, max }));
//     }

//     // Update search params
//     setSearchParams(
//       Object.keys(currentParams).length > 0 ? currentParams : {},
//       { replace: true }
//     );
//   }, [dispatch, searchParams, setSearchParams, selectedSalaryId]);

//   // Format salary for display
//   const formatSalary = (value) => {
//     if (value >= 1000) {
//       return `${value/1000}k`;
//     }
//     return value.toString();
//   };

//   // Render salary range list
//   const salaryRangeListRender = useMemo(() => {
//     return salaryRanges.map((range) => (
//       <li key={range.id}>
//         <label className="switch">
//           <input
//             type="checkbox"
//             name="salary_range"
//             value={range.id}
//             checked={selectedSalaryId === range.id}
//             onChange={() => salaryRangeHandler(range.id, range.name)}
//           />
//           <span className="slider round"></span>
//           <span className="title">{range.name}</span>
//         </label>
//       </li>
//     ));
//   }, [salaryRanges, selectedSalaryId, salaryRangeHandler]);

//   return (
//     <div className="">
//       <ul className="switchbox">
//         {salaryRangeListRender}
//       </ul>
//     </div>
//   );
// };

// export default React.memo(SalaryRangeToggle);

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addSalary } from "../../../features/filter/filterSlice";

const SalaryRangeToggle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [salaryRanges, setSalaryRanges] = useState([]);
  const dispatch = useDispatch();

  // Fetch salary ranges from API
  useEffect(() => {
    const fetchSalaryRanges = async () => {
      try {
        const response = await fetch('https://api.sentryspot.co.uk/api/employeer/salary-range');
        const result = await response.json();
        if (result.status === "success" && result.data) {
          setSalaryRanges(result.data);
        }
      } catch (error) {
        console.error('Error fetching salary ranges:', error);
      }
    };

    fetchSalaryRanges();
  }, []);

  // Get selected salary range ID from URL
  const selectedSalaryId = useMemo(() => {
    const id = searchParams.get("salary_id");
    return id ? Number(id) : null;
  }, [searchParams]);

  // Parse salary range string into min and max values
  const parseSalaryRange = (rangeStr) => {
    const parts = rangeStr.toLowerCase().replace(/k/g, '').split('-');
    return {
      min: parseInt(parts[0]) * 1000,
      max: parseInt(parts[1] || parts[0]) * 1000
    };
  };

  // Handler to toggle salary range selection
  const salaryRangeHandler = useCallback((id, rangeName) => {
    const currentParams = Object.fromEntries(searchParams);
    
    if (selectedSalaryId === id) {
      delete currentParams["salary_id"];
      dispatch(addSalary({ min: 0, max: 0 }));
    } else {
      currentParams["salary_id"] = id;
      const { min, max } = parseSalaryRange(rangeName);
      dispatch(addSalary({ min, max }));
    }

    setSearchParams(
      Object.keys(currentParams).length > 0 ? currentParams : {},
      { replace: true }
    );
  }, [dispatch, searchParams, setSearchParams, selectedSalaryId]);

  return (
    <div className="w-full space-y-2">
    
      <ul className="space-y-2">
        {salaryRanges.map((range) => (
          <li key={range.id} className="w-full">
            <label className="flex items-center group cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedSalaryId === range.id}
                  onChange={() => salaryRangeHandler(range.id, range.name)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-xl peer 
                              peer-checked:bg-blue-500 
                              peer-focus:ring-4 peer-focus:ring-blue-300 
                              dark:peer-focus:ring-blue-800">
                </div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-md
                              transition-all duration-300 ease-in-out
                              peer-checked:translate-x-5">
                </div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {range.name}
              </span>
              {/* {selectedSalaryId === range.id && (
                <span className="ml-auto text-xs text-blue-600 font-medium">
                  Selected
                </span>
              )} */}
            </label>
          </li>
        ))}
      </ul>
      {salaryRanges.length === 0 && (
        <div className="text-sm text-gray-500 text-center py-2">
          Loading salary ranges...
        </div>
      )}
    </div>
  );
};

export default React.memo(SalaryRangeToggle);