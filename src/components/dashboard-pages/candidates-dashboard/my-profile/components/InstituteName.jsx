import { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const InstituteAutoComplete = () => {
  const [institute, setInstitute] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN)

  // Fetch Institutions
  const fetchInstitutes = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/institues",
        {
          headers: {
            Authorization: token, // Replace with your token
          },
        }
      );

      if (response.data && response.data.data) {
        const institutions = response.data.data
          .map((inst) => inst.name) // Extracting only the names
          .filter((name) => name.toLowerCase().includes(query.toLowerCase()));

        setSuggestions(institutions);
      }
    } catch (error) {
      console.error("Error fetching institutions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInstitute(value);
    fetchInstitutes(value);
  };

  // Handle Suggestion Click
  const handleSuggestionClick = (name) => {
    setInstitute(name);
    setSuggestions([]);
  };

  return (
    <div className="form-group col-lg-6 col-md-12">
      <label className="block text-gray-700 font-medium mb-1">
        Institution Name
      </label>
      <input
        type="text"
        name="institute"
        value={institute}
        onChange={handleInputChange}
        placeholder="Enter institute name"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
      />
      {/* Loader */}
      {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 shadow-md rounded-md mt-1 max-h-40 overflow-auto">
          {suggestions.map((inst, index) => (
            <li
              key={index}
              className="p-2 hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={() => handleSuggestionClick(inst)}
            >
              {inst}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InstituteAutoComplete;
