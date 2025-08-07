
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addLocation } from "../../../features/filter/filterSlice";
import axios from "axios";
import { MapPin } from "lucide-react";

const LocationBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobList } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // States for location and autocomplete
  const [getLocation, setLocation] = useState(
    searchParams.get("location") || jobList.location || ""
  );
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch locations from API
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/locations");
        setLocations(response.data.data.location_names || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  // Handle location input changes
  const locationHandler = (e) => {
    const location = e.target.value;
    setLocation(location);
    
    // Filter locations for autocomplete
    if (location.trim()) {
      const results = locations.filter((loc) =>
        loc.toLowerCase().includes(location.toLowerCase())
      );
      setFilteredLocations(results);
      setShowDropdown(true);
    } else {
      setFilteredLocations([]);
      setShowDropdown(false);
    }
    
    // Update Redux store
    dispatch(addLocation(location));

    // Update URL parameters
    const currentParams = Object.fromEntries(searchParams);
    if (location) {
      currentParams["location"] = location;
    } else {
      delete currentParams["location"];
    }
    setSearchParams(currentParams);
  };

  // Handle selection from dropdown
  const handleSelect = (location) => {
    setLocation(location);
    setShowDropdown(false);
    dispatch(addLocation(location));

    // Update URL parameters
    const currentParams = Object.fromEntries(searchParams);
    currentParams["location"] = location;
    setSearchParams(currentParams);
  };

  // Synchronize state with URL or Redux changes
  useEffect(() => {
    const urlLocation = searchParams.get("location");
    if (urlLocation !== null) {
      setLocation(urlLocation);
      dispatch(addLocation(urlLocation));
    } else {
      setLocation("");
    }
  }, [searchParams, jobList.location, dispatch]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* <input
        type="text"
        name="listing-search"
        placeholder="City "
        value={getLocation}
        onChange={locationHandler}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        autoComplete="off"
      />
      <span className="icon flaticon-map-locator absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"></span>
       */}
        <input
        type="text"
        name="listing-search"
        placeholder="City"
        value={getLocation}
        onChange={locationHandler}
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm 
                 placeholder-gray-400 font-normal
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                 transition-colors duration-200"
        autoComplete="off"
        maxLength={20}
      />
      <MapPin 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" 
      />
      {/* Autocomplete Dropdown */}
      {showDropdown && filteredLocations.length > 0 && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {filteredLocations.map((location, index) => (
            <li
              key={index}
              onClick={() => handleSelect(location)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationBox;
