// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// const PreferredLocations = () => {
//   const [locationOptions, setLocationOptions] = useState([]);
//   const [selectedLocations, setSelectedLocations] = useState([]);

//   // Fetch locations on component mount
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations');
        
//         // Transform location names into react-select compatible format
//         const options = response.data.data.location_names.map((location) => ({
//           value: location,
//           label: location.split(',').slice(1).join(', ') // Display City, Area
//         }));

//         setLocationOptions(options);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchLocations();
//   }, []);

//   // Handle location selection (restrict to 3 locations max)
//   const handleLocationChange = (selectedOptions) => {
//     if (selectedOptions.length <= 3) {
//       setSelectedLocations(selectedOptions);
//     }
//   };

//   return (
//     <div className="form-group col-lg-8 col-md-12 font-light">
//       <label className="my mt-4 text-lg">Select Preferred Locations (Max 3)</label>
//       <Select
//         value={selectedLocations}
//         onChange={handleLocationChange}
//         options={locationOptions}
//         isMulti
//         isSearchable
//         placeholder="Type to search locations..."
//         noOptionsMessage={() => "No locations found"}
//       />
      
//       {/* Optional: Display selected locations */}
      
//     </div>
//   );
// };

// export default PreferredLocations;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import { Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { Constant } from '@/utils/constant/constant';

// const PreferredLocations = ({ control, setValue, errors }) => {
//   const [locationOptions, setLocationOptions] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const token = localStorage.getItem(Constant.USER_TOKEN);


//   // Fetch locations on component mount
//   useEffect(() => {
//     const fetchLocations = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations', {
//           headers: { Authorization: token }
//         });
        
//         // Transform location names into react-select compatible format
//         const options = response.data.data.location_names.map((location) => ({
//           value: location,
//           label: location
//         }));

//         setLocationOptions(options);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//         toast.error('Failed to load locations');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchLocations();
//   }, [token]);

//   const customStyles = {
//     control: (provided) => ({
//       ...provided,
//       borderRadius: '10px',
//       border: 'none',
//       minHeight: 'calc(2.5em + 1rem + 3px)',
//       fontSize: '1rem',
//       lineHeight: '1.5',
//       backgroundColor: '#F0F5F7',
//     }),
//     placeholder: (provided) => ({
//       ...provided,
//       fontSize: '1rem',
//       color: '#6c757d'
//     })
//   };

//   return (
//     <div className="form-group col-lg-8 col-md-12 font-light">
//       <label className="block mb-1 text-gray-700 font-semibold">Preferred Locations</label>
//       <Controller
//         name="preferred_locations"
//         control={control}
//         render={({ field }) => (
//           <Select
//             {...field}
//             options={locationOptions}
//             isMulti
//             isSearchable={true}
//             isLoading={isLoading}
//             placeholder="Select preferred locations (optional)"
//             noOptionsMessage={() => "No locations found"}
//             styles={customStyles}
//             value={locationOptions.filter(option => field.value?.includes(option.value))} // 👈 ensures correct display
//             onChange={(selectedOptions) => {
//               const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
//               console.log(values);
//               field.onChange(values); // ✅ pass only array of strings to form
//               setValue('preferred_locations', values);
//             }}
//           />
//         )}
//       />
//       <p className="mt-2 text-sm text-gray-500">You can select multiple locations where you'd prefer to work</p>
//     </div>
//   );
// };

// export default PreferredLocations;


// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { Constant } from '@/utils/constant/constant';

// const PreferredLocations = ({ control, setValue, errors ,profileData}) => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [selectedLocations, setSelectedLocations] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const inputRef = useRef(null);
//   const suggestionsRef = useRef(null);

//   // Handle clicks outside the suggestions box to close it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
//           inputRef.current && !inputRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Update form values when selected locations change
//   useEffect(() => {
//     setValue('preferred_location', selectedLocations);
//   }, [selectedLocations, setValue]);

//   // Fetch location suggestions based on user input
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (!query.trim()) {
//         setSuggestions([]);
//         return;
//       }

//       setIsLoading(true);
//       try {
//         // Using query parameter to filter locations on the backend
//         const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(query)}`, {
//           headers: { Authorization: token }
//         });

//         // Filter out locations that are already selected
//         const filteredSuggestions = (response.data.data.location_names || [])
//           .filter(location => !selectedLocations.includes(location));
        
//         setSuggestions(filteredSuggestions);
//       } catch (error) {
//         console.error('Error fetching location suggestions:', error);
//         toast.error('Failed to load location suggestions');
//         setSuggestions([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Debounce API calls
//     const timeoutId = setTimeout(() => {
//       if (query.trim().length >= 2) {
//         fetchSuggestions();
//       } else {
//         setSuggestions([]);
//       }
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [query, token, selectedLocations]);

//   const handleSelectLocation = (location) => {
//     setSelectedLocations(prev => [...prev, location]);
//     setQuery('');
//     setSuggestions([]);
//   };

//   const handleRemoveLocation = (locationToRemove) => {
//     setSelectedLocations(selectedLocations.filter(location => location !== locationToRemove));
//   };

//   return (
//     <div className="form-group col-lg-8 col-md-12 font-light">
//       <label className="block mb-1 text-gray-700 font-semibold">Preferred Locations</label>
//       <Controller
//         name="preferred_location"
//         control={control}
//         render={({ field }) => (
//           <div className="relative">
//             {/* Selected location tags */}
//             <div className="flex flex-wrap gap-2 mb-2">
//               {selectedLocations.map((location, index) => (
//                 <div 
//                   key={index} 
//                   className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl flex items-center gap-1"
//                 >
//                   <span>{location}</span>
//                   <button
//                     type="button"
//                     className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
//                     onClick={() => handleRemoveLocation(location)}
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
            
//             {/* Input field */}
//             <div className="relative">
//               <input
//                 ref={inputRef}
//                 type="text"
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Type to search locations..."
//                 value={query}
//                 onChange={(e) => {
//                   setQuery(e.target.value);
//                   setShowSuggestions(true);
//                 }}
//                 onFocus={() => setShowSuggestions(true)}
//               />
//               {isLoading && (
//                 <div className="absolute right-3 top-3">
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
//                 </div>
//               )}
              
//               {/* Suggestions dropdown */}
//               {showSuggestions && suggestions.length > 0 && (
//                 <div 
//                   ref={suggestionsRef}
//                   className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none"
//                 >
//                   {suggestions.map((suggestion, index) => (
//                     <div
//                       key={index}
//                       className="cursor-pointer px-4 py-2 hover:bg-blue-50"
//                       onClick={() => handleSelectLocation(suggestion)}
//                     >
//                       {suggestion}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       />
//       <p className="mt-2 text-sm text-gray-500">You can select multiple locations where you'd prefer to work</p>
//     </div>
//   );
// };

// export default PreferredLocations;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';

const PreferredLocations = ({ control, setValue, errors, profileData }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // ✅ Load previously selected locations
  useEffect(() => {
    if (profileData?.preferred_location?.length) {
      const initialLocations = Array.isArray(profileData.preferred_location)
        ? profileData.preferred_location
        : profileData.preferred_location.split(',').map(loc => loc.trim());
      setSelectedLocations(initialLocations);
    }
  }, [profileData]);

  // ✅ Keep form value in sync
  useEffect(() => {
    setValue('preferred_location', selectedLocations);
  }, [selectedLocations, setValue]);

  // Handle outside click to close dropdown
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

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/locations?locations=${encodeURIComponent(query)}`,
          {
            headers: { Authorization: token },
          }
        );

        const filtered = (response.data.data.location_names || []).filter(
          (loc) => !selectedLocations.includes(loc)
        );

        setSuggestions(filtered);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        toast.error('Failed to load location suggestions');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) fetchSuggestions();
      else setSuggestions([]);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, token, selectedLocations]);

  const handleSelectLocation = (location) => {
    setSelectedLocations((prev) => [...prev, location]);
    setQuery('');
    setSuggestions([]);
  };

  const handleRemoveLocation = (locationToRemove) => {
    setSelectedLocations((prev) => prev.filter((loc) => loc !== locationToRemove));
  };

  return (
    <div className="form-group col-lg-8 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">Preferred Locations</label>
      <Controller
        name="preferred_location"
        control={control}
        render={({ field }) => (
          <div className="relative">
            {/* Selected location tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedLocations.map((location, index) => (
                <div
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-xl flex items-center gap-1"
                >
                  <span>{location}</span>
                  <button
                    type="button"
                    className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                    onClick={() => handleRemoveLocation(location)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Input field */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type to search locations..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              {isLoading && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                </div>
              )}

              {/* Suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div
                  ref={suggestionsRef}
                  className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none"
                >
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="cursor-pointer px-4 py-2 hover:bg-blue-50"
                      onClick={() => handleSelectLocation(suggestion)}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      />
      <p className="mt-2 text-sm text-gray-500">
        You can select multiple locations where you'd prefer to work
      </p>
    </div>
  );
};

export default PreferredLocations;
