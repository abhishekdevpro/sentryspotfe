
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const LocationAutocomplete = ({ className }) => {
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch locations on component mount
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/locations');
        
        // Transform location names into react-select compatible format
        const options = response.data.data.location_names.map((location, index) => ({
          value: location,
          label: location.split(',').slice(1).join(', ') // Display City, Area
        }));

        setLocationOptions(options);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  // Handle location selection
  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
  };

  return (
    <div className={className}>
      <label className="my mt-4 text-lg">Select Location</label>
      <Select
        value={selectedLocation}
        onChange={handleLocationChange}
        options={locationOptions}
        isSearchable={true}
        placeholder="Type to search locations..."
        noOptionsMessage={() => "No locations found"}
       
      />
      
      {/* Optional: Display selected location details */}
      {/* {selectedLocation && (
        <div className="mt-3">
          <strong>Selected Location:</strong> {selectedLocation.value}
        </div>
      )} */}
    </div>
  );
};

export default LocationAutocomplete;