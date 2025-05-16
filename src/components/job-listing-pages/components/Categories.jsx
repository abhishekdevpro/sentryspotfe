


// // import { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { addCategory } from "../../../features/filter/filterSlice";

// // const Categories = () => {
// //     const { jobList } = useSelector((state) => state.filter) || {};
// //     const [getCategory, setCategory] = useState(jobList.category);

// //     const dispatch = useDispatch();

// //     // category handler
// //     const categoryHandler = (e) => {
// //         dispatch(addCategory(e.target.value));
// //     };

// //     useEffect(() => {
// //         setCategory(jobList.category);
// //     }, [setCategory, jobList]);

// //     return (
// //         <>
// //             <select
// //                 className="form-select"
// //                 value={jobList.category}
// //                 onChange={categoryHandler}
// //             >
// //                 <option value="">Choose a category</option>
// //                 <option value="residential">Residential</option>
// //                 <option value="commercial">Commercial</option>
// //                 <option value="industrial">Industrial</option>
// //                 <option value="apartments">Apartments</option>
// //             </select>
// //             <span className="icon flaticon-briefcase"></span>
// //         </>
// //     );
// // };

// // export default Categories;
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useSearchParams } from "react-router-dom";
// import { addCategory } from "../../../features/filter/filterSlice";

// const Categories = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [categories, setCategories] = useState([]);
//   const dispatch = useDispatch();

//   // Fetch categories from API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('https://api.sentryspot.co.uk/api/jobseeker/industries');
//         const result = await response.json();
//         if (result.status === "success" && result.data) {
//           setCategories(result.data);
//         }
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Get selected category ID from URL
//   const selectedCategoryId = useMemo(() => {
//     const id = searchParams.get("category_id");
//     return id ? Number(id) : null;
//   }, [searchParams]);

//   // Handler to toggle category selection
//   const categoryHandler = useCallback((id, name) => {
//     const currentParams = Object.fromEntries(searchParams);
    
//     if (selectedCategoryId === id) {
//       // If clicking the same category, deactivate it
//       delete currentParams["industry_id"];
//       dispatch(addCategory(""));
//     } else {
//       // If clicking a different category, activate it
//       currentParams["industry_id"] = id;
//       dispatch(addCategory(name));
//     }

//     // Update search params
//     setSearchParams(
//       Object.keys(currentParams).length > 0 ? currentParams : {},
//       { replace: true }
//     );
//   }, [dispatch, searchParams, setSearchParams, selectedCategoryId]);

//   return (
//     <div className="w-full space-y-2">
      
//       <ul className="space-y-2">
//         {categories.map((category) => (
//           <li key={category.id} className="w-full">
//             <label className="flex items-center group cursor-pointer">
//               <div className="relative">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer"
//                   checked={selectedCategoryId === category.id}
//                   onChange={() => categoryHandler(category.id, category.name)}
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-2xl peer 
//                               peer-checked:bg-blue-500 
//                               peer-focus:ring-4 peer-focus:ring-blue-300 
//                               dark:peer-focus:ring-blue-800">
//                 </div>
//                 <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
//                               transition-all duration-300 ease-in-out
//                               peer-checked:translate-x-5">
//                 </div>
//               </div>
//               <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-grow truncate">
//                 {category.name}
//               </span>
//               {selectedCategoryId === category.id && (
//                 <span className="ml-2 text-xs text-blue-600 font-medium flex-shrink-0">
//                   Selected
//                 </span>
//               )}
//             </label>
//           </li>
//         ))}
//       </ul>
//       {categories.length === 0 && (
//         <div className="text-sm text-gray-500 text-center py-2">
//           Loading categories...
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(Categories);

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

//   // Get selected industry ID from URL
//   const selectedIndustryId = useMemo(() => {
//     const id = searchParams.get("industry_id");
//     return id ? Number(id) : null;
//   }, [searchParams]);

//   // Handler to toggle industry selection
//   const industryHandler = useCallback((id, name) => {
//     const currentParams = Object.fromEntries(searchParams);
    
//     if (selectedIndustryId === id) {
//       // If clicking the same industry, deactivate it
//       delete currentParams["industry_id"];
//     } else {
//       // If clicking a different industry, activate it
//       currentParams["industry_id"] = id;
//     }

//     // Update search params
//     setSearchParams(
//       Object.keys(currentParams).length > 0 ? currentParams : {},
//       { replace: true }
//     );
//   }, [searchParams, setSearchParams, selectedIndustryId]);

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
//                     checked={selectedIndustryId === industry.id}
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
//                 {/* {selectedIndustryId === industry.id && (
//                   <span className="ml-2 text-xs text-blue-600 font-medium flex-shrink-0">
//                     Selected
//                   </span>
//                 )} */}
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

  // Fetch industries from API
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.sentryspot.co.uk/api/jobseeker/industries');
        const result = await response.json();
        
        if (result.status === "success" && result.data) {
          setIndustries(result.data);
        } else {
          throw new Error('Failed to fetch industries');
        }
      } catch (error) {
        console.error('Error fetching industries:', error);
        setError('Could not load industries. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndustries();
  }, []);

  // Get selected industry IDs from URL
  const selectedIndustryIds = useMemo(() => {
    const ids = searchParams.get("industry_id");
    return ids ? ids.split('+').map(Number) : [];
  }, [searchParams]);

  // Handler to toggle industry selection
  const industryHandler = useCallback((id, name) => {
    const currentParams = Object.fromEntries(searchParams);
    
    let newSelectedIds;
    if (selectedIndustryIds.includes(id)) {
      // Remove the id if it's already selected
      newSelectedIds = selectedIndustryIds.filter(industryId => industryId !== id);
    } else {
      // Add the id if it's not selected
      newSelectedIds = [...selectedIndustryIds, id];
    }

    if (newSelectedIds.length > 0) {
      // Sort IDs for consistent URL formatting
      newSelectedIds.sort((a, b) => a - b);
      currentParams["industry_id"] = newSelectedIds.join('+');
    } else {
      // If no industries selected, remove the parameter
      delete currentParams["industry_id"];
    }

    // Update search params
    setSearchParams(
      Object.keys(currentParams).length > 0 ? currentParams : {},
      { replace: true }
    );
  }, [searchParams, setSearchParams, selectedIndustryIds]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        <div className="text-sm text-gray-500 text-center py-2">
          Loading industries...
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="w-full space-y-2">
        <div className="text-sm text-red-500 text-center py-2">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {industries.length === 0 ? (
        <div className="text-sm text-gray-500 text-center py-2">
          No industries found
        </div>
      ) : (
        <ul className="space-y-2">
          {industries.map((industry) => (
            <li key={industry.id} className="w-full">
              <label className="flex items-center group cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedIndustryIds.includes(industry.id)}
                    onChange={() => industryHandler(industry.id, industry.name)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-2xl peer 
                                peer-checked:bg-blue-500 
                                peer-focus:ring-4 peer-focus:ring-blue-300 
                                dark:peer-focus:ring-blue-800">
                  </div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                                transition-all duration-300 ease-in-out
                                peer-checked:translate-x-5">
                  </div>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-grow truncate">
                  {industry.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(Industries);