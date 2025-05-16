
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// const LocationAutocomplete = ({ className }) => {
//   const [locationOptions, setLocationOptions] = useState([]);
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   // Fetch locations on component mount
//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations');
        
//         // Transform location names into react-select compatible format
//         const options = response.data.data.location_names.map((location, index) => ({
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

//   // Handle location selection
//   const handleLocationChange = (selectedOption) => {
//     setSelectedLocation(selectedOption);
//   };

//   return (
//     <div className={className}>
//       <label className="my mt-4 text-lg">Select Location</label>
//       <Select
//         value={selectedLocation}
//         onChange={handleLocationChange}
//         options={locationOptions}
//         isSearchable={true}
//         placeholder="Type to search locations..."
//         noOptionsMessage={() => "No locations found"}
       
//       />
      
//       {/* Optional: Display selected location details */}
//       {/* {selectedLocation && (
//         <div className="mt-3">
//           <strong>Selected Location:</strong> {selectedLocation.value}
//         </div>
//       )} */}
//     </div>
//   );
// };

// export default LocationAutocomplete;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import { Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { Constant } from '@/utils/constant/constant';

// const LocationSelector = ({ className, control, setValue, errors }) => {
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
//     <div className={className}>
//       <label className="block mb-1 text-gray-700 font-semibold">Location*</label>
//       <Controller
//         name="location"
//         control={control}
//         rules={{ required: "Location is required" }}
//         render={({ field }) => (
//           <Select
//             {...field}
//             options={locationOptions}
//             isSearchable={true}
//             isLoading={isLoading}
//             placeholder="Type to search locations..."
//             noOptionsMessage={() => "No locations found"}
//             styles={customStyles}
//             onChange={(selectedOption) => {
//               // field.onChange(selectedOption);
//               {console.log(selectedOption.value)}
//               setValue('location', selectedOption.value);
//             }}
//           />
//         )}
//       />
//       {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//     </div>
//   );
// };

// export default LocationSelector;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Controller } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import { Constant } from '@/utils/constant/constant';

// const LocationSelector = ({ className, control, setValue, errors ,profileData}) => {
//   console.log(profileData.current_location,"profileData from location");
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
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
//   useEffect(() => {
//   if (profileData?.current_location) {
//     setQuery(profileData.current_location);
//     setValue('current_location', profileData.current_location); // sync with form
//   }
// }, [profileData, setValue]);

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

//         setSuggestions(response.data.data.location_names || []);
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
//   }, [query, token]);

//   const handleSelectLocation = (location) => {
//     setValue('current_location', location);
//     setQuery(location);
//     setShowSuggestions(false);
//   };

//   return (
//     <div className={className}>
//       <label className="block mb-1 text-gray-700 font-semibold">Location*</label>
//       <Controller
//         name="current_location"
//         control={control}
//         rules={{ required: "Location is required" }}
//         render={({ field }) => (
//           <div className="relative">
//             <input
//               ref={inputRef}
//               type="text"
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
//               placeholder="Type to search locations..."
//               value={query}
//               onChange={(e) => {
//                 setQuery(e.target.value);
//                 setShowSuggestions(true);
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
//                 {suggestions.map((suggestion, index) => (
//                   <div
//                     key={index}
//                     className="cursor-pointer px-4 py-2 hover:bg-blue-50"
//                     onClick={() => handleSelectLocation(suggestion)}
//                   >
//                     {suggestion}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       />
//       {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
//     </div>
//   );
// };

// export default LocationSelector;

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';

const LocationSelector = ({ className, control, setValue, errors, profileData }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Close dropdown on outside click
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

  // Set initial value from profileData
  useEffect(() => {
    if (profileData?.current_location) {
      setQuery(profileData.current_location);
      setValue('current_location', profileData.current_location); // sync with form
    }
  }, [profileData, setValue]);

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
          { headers: { Authorization: token } }
        );

        setSuggestions(response.data.data.location_names || []);
      } catch (error) {
        console.error('Error fetching location suggestions:', error);
        toast.error('Failed to load location suggestions');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (query.trim().length >= 2) {
        fetchSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, token]);

  const handleSelectLocation = (location, onChange) => {
    setQuery(location);
    setShowSuggestions(false);
    setValue('current_location', location); // optional
    onChange(location); // ✅ notify react-hook-form
  };

  return (
    <div className={className}>
      <label className="block mb-1 text-gray-700 font-semibold">Location*</label>
      <Controller
        name="current_location"
        control={control}
        rules={{ required: "Location is required" }}
        render={({ field }) => (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type to search locations..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                field.onChange(e.target.value); // ✅ sync form state
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
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
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-50"
                    onClick={() => handleSelectLocation(suggestion, field.onChange)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
      {errors.current_location && (
        <p className="text-red-500 text-sm">{errors.current_location.message}</p>
      )}
    </div>
  );
};

export default LocationSelector;
