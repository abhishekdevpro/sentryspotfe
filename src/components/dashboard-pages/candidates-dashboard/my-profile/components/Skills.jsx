import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Constant } from "@/utils/constant/constant";
import { Loader2 } from 'lucide-react';

const Skills = ({ onNext }) => {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");

  // Fetch skills from API on component mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem(Constant.USER_TOKEN);
        const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/skills-names', {
          headers: {
            Authorization: token,
          },
        });
        
        if (response.data.status === 'success') {
          setAllSkills(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError("Failed to load skills. Please refresh and try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Fetch user's existing skills if any
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem(Constant.USER_TOKEN);
        if (!token) {
          console.error("No authentication token found");
          return;
        }

        const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/user-profile`, {
          headers: {
            Authorization: token,
          },
        });
        
        if (response.data.status === 'success' && response.data.data) {
          const fetchedSkills = response.data.data.personal_details?.job_applyer_skills || [];
          setSkills(fetchedSkills);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  // Filter suggestions based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = allSkills.filter(skill => 
        skill.name.toLowerCase().includes(inputValue.toLowerCase()) &&
        !skills.includes(skill.name)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, allSkills, skills]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      addSkill(inputValue.trim());
    }
  };

  const addSkill = (skillName) => {
    if (!skills.includes(skillName) && skills.length < 15) {
      setSkills([...skills, skillName]);
      setInputValue("");
      setShowSuggestions(false);
    } else if (skills.length >= 15) {
      setError("You can add a maximum of 15 skills");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (skills.length === 0) {
      setError("Please add at least one skill");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      if (!token) {
        setError("Authentication failed. Please login again.");
        setLoading(false);
        return;
      }
      
      // Format the payload according to the API requirements
      const payload = {
        skills: skills
      };

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/skills",
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          },
        }
      );
      
      if (response.data.status === 'success') {
        onNext();
      } else {
        setError(response.data.message || "Failed to save skills");
      }
    } catch (error) {
      console.error("Error submitting skills:", error);
      setError(error.response?.data?.message || "Failed to save skills. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="w-full px-2 sm:px-4">
        <h5 className="text-lg sm:text-xl font-semibold mb-2">Skills</h5>
        <div className="form-group w-full my-4">
          <p className="text-sm sm:text-base text-gray-600 mb-2">Add Skills (Maximum 15):</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 rounded mb-4 text-sm sm:text-base">
              {error}
            </div>
          )}

          {/* Skills Tags Container */}
          <div className='flex flex-wrap gap-2 py-2 min-h-[40px]'>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-800 text-white px-2 sm:px-3 rounded-xl py-1 flex items-center text-sm sm:text-base"
              >
                <span className="mr-1 max-w-[150px] sm:max-w-[200px] truncate">{skill}</span>
                <button
                  type="button"
                  className="text-white font-bold ml-1 hover:text-red-200 text-sm sm:text-base"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Input Container */}
          <div className="border rounded flex items-center flex-wrap gap-2 p-2 sm:p-3 min-h-[40px] sm:min-h-[56px]">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none focus:outline-none flex-grow min-w-[120px] sm:min-w-[200px] text-sm sm:text-base"
              placeholder="Enter a skill and press Enter"
            />
          </div>
          
          <div className="text-right mt-1">
            <span className="text-gray-500 text-xs sm:text-sm">{skills.length}/15 skills added</span>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-[calc(100%-16px)] sm:w-full max-h-[200px] sm:max-h-[240px] overflow-y-auto bg-white border rounded-md shadow-lg mt-1 left-2 sm:left-0">
              {suggestions.slice(0, 10).map((skill) => (
                <div
                  key={skill.id}
                  className="px-3 sm:px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                  onClick={() => addSkill(skill.name)}
                >
                  {skill.name}
                </div>
              ))}
              {suggestions.length > 10 && (
                <div className="px-3 sm:px-4 py-2 text-gray-500 text-xs sm:text-sm border-t">
                  {suggestions.length - 10} more suggestions available. Continue typing to refine.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-group w-full mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto theme-btn btn-style-one bg-blue-800 text-white px-4 sm:px-6 py-2 rounded flex items-center justify-center gap-2 text-sm sm:text-base"
            disabled={loading || skills.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin"/>
                <span>Saving...</span>
              </>
            ) : (
              <>Save & Next ➤</>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Skills;
