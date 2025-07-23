

// // // import React, { useState } from "react";

// // import { useState } from "react";

// // // const TitleAutocomplete = ({ titles }) => {
// // //   // console.log(titles,"jobtitle");
// // //   const [query, setQuery] = useState(""); // Stores user input
// // //   const [filteredTitles, setFilteredTitles] = useState([]); // Stores filtered titles
// // //   const [showDropdown, setShowDropdown] = useState(false); // Toggles dropdown visibility

// // //   const handleInputChange = (e) => {
// // //     const value = e.target.value;
// // //     setQuery(value);

// // //     // Filter titles based on the query
// // //     if (value.trim()) {
// // //       const results = titles.filter((title) =>
// // //         title.name.toLowerCase().includes(value.toLowerCase())
// // //       );
// // //       setFilteredTitles(results);
// // //       setShowDropdown(true);
// // //     } else {
// // //       setFilteredTitles([]);
// // //       setShowDropdown(false);
// // //     }
// // //   };

// // //   const handleSelect = (title) => {
// // //     setQuery(title.name); // Update input with selected title
// // //     setShowDropdown(false); // Close dropdown
// // //   };

// // //   return (
// // //     <div className="form-group col-lg-6 col-md-12 font-light">
// // //       <label htmlFor="job-title">Job Title*</label>
// // //       <input
// // //         type="text"
// // //         id="job-title"
// // //         name="job_title"
// // //         required
// // //         value={query}
// // //         onChange={handleInputChange}
// // //         className="border font-normal rounded-none mb-4 w-full px-2 py-1"
// // //         placeholder="Type a job title"
// // //         autoComplete="off"
// // //       />
// // //       {showDropdown && filteredTitles.length > 0 && (
// // //         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md">
// // //           {filteredTitles.map((title) => (
// // //             <li
// // //               key={title.id}
// // //               onClick={() => handleSelect(title)}
// // //               className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
// // //             >
// // //               {title.name}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // };



// //  const TitleAutocomplete = ({ titles, register, setValue }) => {
// //   const [query, setQuery] = useState("");
// //   const [filteredTitles, setFilteredTitles] = useState([]);
// //   const [showDropdown, setShowDropdown] = useState(false);

// //   const handleInputChange = (e) => {
// //     const value = e.target.value;
// //     setQuery(value);

// //     if (value.trim()) {
// //       const results = titles.filter((title) =>
// //         title.name.toLowerCase().includes(value.toLowerCase())
// //       );
// //       setFilteredTitles(results);
// //       setShowDropdown(true);
// //     } else {
// //       setFilteredTitles([]);
// //       setShowDropdown(false);
// //     }

// //     // Always update React Hook Form too:
// //     setValue("job_title", value);
// //   };

// //   const handleSelect = (title) => {
// //     setQuery(title.name);
// //     setShowDropdown(false);
// //     setValue("job_title", title.name); // ✅ Set selected value in React Hook Form
// //   };

// //   return (
// //     <div className="form-group col-lg-6 col-md-12 font-light">
// //       <label htmlFor="job-title">Job Title*</label>
// //       <input
// //         type="text"
// //         id="job-title"
// //         {...register("job_title", { required: true })}
// //         value={query}
// //         onChange={handleInputChange}
// //         className="border font-normal rounded-none mb-4 w-full px-2 py-1"
// //         placeholder="Type a job title"
// //         autoComplete="off"
// //       />
// //       {showDropdown && filteredTitles.length > 0 && (
// //         <ul className="border bg-white mt-1 max-h-48 overflow-y-auto rounded-md shadow-md">
// //           {filteredTitles.map((title) => (
// //             <li
// //               key={title.id}
// //               onClick={() => handleSelect(title)}
// //               className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
// //             >
// //               {title.name}
// //             </li>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // };
// // export default TitleAutocomplete;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { Constant } from '@/utils/constant/constant';

// const TitleAutocomplete = ({ className, control, setValue, errors,profileData }) => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   // Close the suggestions dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         suggestionsRef.current &&
//         !suggestionsRef.current.contains(event.target) &&
//         inputRef.current &&
//         !inputRef.current.contains(event.target)
//       ) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);
//   useEffect(() => {
//   if (profileData?.job_title) {
//     setQuery(profileData.job_title);
//     setValue('current_location', profileData.job_title); // sync with form
//   }
// }, [profileData, setValue]);

//   // Fetch suggestions when query changes
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (!query.trim()) {
//         setSuggestions([]);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `https://api.sentryspot.co.uk/api/jobseeker/job-title?job-title=${encodeURIComponent(query)}`,
//           { headers: { Authorization: token } }
//         );

//         // Expecting response like: [{ id, name, status }]
//         setSuggestions(response.data.data || []);
//       } catch (error) {
//         console.error('Error fetching job-titles suggestions:', error);
//         toast.error('Failed to load job titles suggestions');
//         setSuggestions([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     const timeoutId = setTimeout(() => {
//       if (query.trim().length >= 2) {
//         fetchSuggestions();
//       } else {
//         setSuggestions([]);
//       }
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [query, token]);

//   const handleSelectJobTitle = (jobTitleName) => {
//     setValue('job_title', jobTitleName); 
//     setQuery(jobTitleName);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label className="block mb-1 text-gray-700 font-semibold">Job Title*</label>
//       <Controller
//         name="job_title"
//         control={control}
//         rules={{ required: 'Job title is required' }}
//         render={({ field }) => (
//           <div className="relative">
//             <input
//               ref={inputRef}
//               type="text"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Type to search job titles..."
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setShowSuggestions(true);
//                 field.onChange(e); // important to sync with react-hook-form
//               }}
//               onFocus={() => setShowSuggestions(true)}
//             />
//             {isLoading && (
//               <div className="absolute right-3 top-3">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
//               </div>
//             )}

//             {showSuggestions && suggestions.length > 0 && (
//               <div
//                 ref={suggestionsRef}
//                 className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none"
//               >
//                 {suggestions.map((suggestion) => (
//                   <div
//                     key={suggestion.id}
//                     className="cursor-pointer px-4 py-2 hover:bg-blue-50 flex justify-between items-center"
//                     onClick={() => handleSelectJobTitle(suggestion.name)}
//                   >
//                     <span>{suggestion.name}</span>
//                     {/* {suggestion.status && (
//                       <span className="text-xs text-gray-400">{suggestion.status}</span>
//                     )} */}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       />
//       {errors && <p className="text-red-500 text-sm">{errors?.data?.message}</p>}
//     </div>
//   );
// };

// export default TitleAutocomplete;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';

const TitleAutocomplete = ({ className, control, setValue, errors, profileData }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set default job title from profileData
  useEffect(() => {
    if (profileData?.job_title) {
      setValue('job_title', profileData.job_title);
    }
  }, [profileData, setValue]);

  // Fetch job title suggestions
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(query)}`,
        { headers: { Authorization: token } }
      );

      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error('Error fetching job titles:', error);
      toast.error('Failed to load job titles');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">Job Title*</label>
      <Controller
        name="job_title"
        control={control}
        rules={{ required: 'Job title is required' }}
        render={({ field }) => (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type to search job titles..."
              value={field.value || ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value); // sync with RHF
                setShowSuggestions(true);
                if (value.length >= 2) {
                  fetchSuggestions(value);
                } else {
                  setSuggestions([]);
                }
              }}
              onFocus={() => {
                setShowSuggestions(true);
                if ((field.value || '').length >= 2) {
                  fetchSuggestions(field.value);
                }
              }}
            />
            {isLoading && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto"
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-50"
                    onClick={() => {
                      field.onChange(suggestion.name); // update RHF
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
      {errors?.job_title && (
        <p className="text-red-500 text-sm">{errors.job_title.message}</p>
      )}
    </div>
  );
};

export default TitleAutocomplete;
