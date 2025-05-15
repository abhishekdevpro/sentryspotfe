
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Constant } from "@/utils/constant/constant";
// import { Loader2 } from 'lucide-react';

// const Skills = ({ onNext }) => {
//   const [skills, setSkills] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState([]);
//   const [allSkills, setAllSkills] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch skills from API on component mount
//   useEffect(() => {
//     const fetchSkills = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem(Constant.USER_TOKEN);
//         const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/skills-names', {
//           headers: {
//             Authorization: token,
//           },
//         });
        
//         if (response.data.status === 'success') {
//           setAllSkills(response.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching skills:', error);
//         setError("Failed to load skills. Please refresh and try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSkills();
    
//     // Also fetch user's existing skills if any
//     // const fetchUserSkills = async () => {
//     //   try {
//     //     const token = localStorage.getItem(Constant.USER_TOKEN);
//     //     const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/skills', {
//     //       headers: {
//     //         Authorization: token,
//     //       },
//     //     });
        
//     //     if (response.data.status === 'success' && response.data.data) {
//     //       setSkills(response.data.data.map(skill => skill.name || skill));
//     //     }
//     //   } catch (error) {
//     //     console.error('Error fetching user skills:', error);
//     //   }
//     // };

//     // fetchUserSkills();
//   }, []);

//   useEffect(() => {
//       const fetchProfileData = async () => {
//         try {
//           const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/user-profile`, {
//             headers: {
//               Authorization: token,
//             },
//           });
//           const FetchedSkills = response.data.data.personal_details.job_applyer_skills;
//           console.log(response,"response");
//           if(FetchedSkills){
//             setSkills(FetchedSkills)
//           }
         
  
//           // Set form values from profile data
         
//         } catch (error) {
//           console.error("Error fetching profile data:", error);
//         }
//       };
  
//       fetchProfileData();
//     }, []);

//     console.log(skills,"skills");

//   // Filter suggestions based on input
//   useEffect(() => {
//     if (inputValue.trim()) {
//       const filtered = allSkills.filter(skill => 
//         skill.name.toLowerCase().includes(inputValue.toLowerCase()) &&
//         !skills.includes(skill.name)
//       );
//       setSuggestions(filtered);
//       setShowSuggestions(true);
//     } else {
//       setSuggestions([]);
//       setShowSuggestions(false);
//     }
//   }, [inputValue, allSkills, skills]);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && inputValue.trim()) {
//       e.preventDefault();
//       addSkill(inputValue.trim());
//     }
//   };

//   const addSkill = (skillName) => {
//     if (!skills.includes(skillName) && skills.length < 15) {
//       setSkills([...skills, skillName]);
//       setInputValue("");
//       setShowSuggestions(false);
//     } else if (skills.length >= 15) {
//       setError("You can add a maximum of 15 skills");
//       setTimeout(() => setError(""), 3000);
//     }
//   };

//   const handleRemoveSkill = (skillToRemove) => {
//     setSkills(skills.filter((skill) => skill !== skillToRemove));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (skills.length === 0) {
//       setError("Please add at least one skill");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const token = localStorage.getItem(Constant.USER_TOKEN);
      
//       // Format the payload according to the API requirements
//       const payload = {
//         skills: skills
//       };

//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/skills",
//         payload,
//         {
//           headers: {
//             Authorization: token,
//             "Content-Type": "application/json"
//           },
//         }
//       );
      
//       if (response.data.status === 'success') {
//         onNext();
//       } else {
//         setError(response.data.message || "Failed to save skills");
//       }
//     } catch (error) {
//       console.error("Error submitting skills:", error);
//       setError(error.response?.data?.message || "Failed to save skills. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative">
//       <div>
//         <h5 className="text-xl font-semibold mb-2">Skills</h5>
//         <div className="form-group col-lg-12 col-md-12 my-4">
//           <p className="text-gray-600 mb-2">Add Skills (Maximum 15):</p>
          
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
//               {error}
//             </div>
//           )}
          
//           <div className="border rounded flex items-center flex-wrap gap-2 p-3 min-h-14">
//             {skills.map((skill, index) => (
//               <div
//                 key={index}
//                 className="bg-blue-800 text-white px-3 rounded-full py-1 flex items-center"
//               >
//                 <span className="mr-1">{skill}</span>
//                 <button
//                   type="button"
//                   className="text-white font-bold ml-1 hover:text-red-200"
//                   onClick={() => handleRemoveSkill(skill)}
//                 >
//                   ×
//                 </button>
//               </div>
//             ))}
//             <input
//               type="text"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyDown={handleKeyDown}
//               className="border-none focus:outline-none flex-grow min-w-40"
//               placeholder="Enter a skill and press Enter"
//             />
//           </div>
          
//           <div className="text-right mt-1">
//             <span className="text-gray-500 text-sm">{skills.length}/15 skills added</span>
//           </div>

//           {/* Suggestions dropdown */}
//           {showSuggestions && suggestions.length > 0 && (
//             <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded-md shadow-lg mt-1">
//               {suggestions.slice(0, 10).map((skill) => (
//                 <div
//                   key={skill.id}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                   onClick={() => addSkill(skill.name)}
//                 >
//                   {skill.name}
//                 </div>
//               ))}
//               {suggestions.length > 10 && (
//                 <div className="px-4 py-2 text-gray-500 text-sm border-t">
//                   {suggestions.length - 10} more suggestions available. Continue typing to refine.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="form-group col-lg-12 col-md-12">
//           <button
//             type="submit"
//             className="theme-btn btn-style-one bg-blue-800 text-white px-6 py-2 rounded flex items-center gap-2"
//             disabled={loading || skills.length === 0}
//           >
//             {loading ? (
//               <>
//                <Loader2 className='w-5 h-5 animate-spin'/>
//                 Saving...
//               </>
//             ) : (
//               <>Save & Next ➤</>
//             )}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Skills;

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
    <form onSubmit={handleSubmit} className="relative">
      <div>
        <h5 className="text-xl font-semibold mb-2">Skills</h5>
        <div className="form-group col-lg-12 col-md-12 my-4">
          <p className="text-gray-600 mb-2">Add Skills (Maximum 15):</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          <div className='flex gap-2 py-2'>
             {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-800 text-white px-3 rounded-xl py-1 flex items-center"
              >
                <span className="mr-1">{skill}</span>
                <button
                  type="button"
                  className="text-white font-bold ml-1 hover:text-red-200"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="border rounded flex items-center flex-wrap gap-2 p-3 min-h-14">
           
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none focus:outline-none flex-grow min-w-40"
              placeholder="Enter a skill and press Enter"
            />
          </div>
          
          <div className="text-right mt-1">
            <span className="text-gray-500 text-sm">{skills.length}/15 skills added</span>
          </div>

          {/* Suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-10 w-full max-h-60 overflow-y-auto bg-white border rounded-md shadow-lg mt-1">
              {suggestions.slice(0, 10).map((skill) => (
                <div
                  key={skill.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => addSkill(skill.name)}
                >
                  {skill.name}
                </div>
              ))}
              {suggestions.length > 10 && (
                <div className="px-4 py-2 text-gray-500 text-sm border-t">
                  {suggestions.length - 10} more suggestions available. Continue typing to refine.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one bg-blue-800 text-white px-6 py-2 rounded flex items-center gap-2"
            disabled={loading || skills.length === 0}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin"/>
                Saving...
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
