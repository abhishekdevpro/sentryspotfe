// import { useState, useEffect } from "react"

// const WorkExperienceDropdown = ({ workExperience = [], register, errors, profileData }) => {
//   // Initialize with previous selection from profileData if available, otherwise use 0
//   console.log(profileData.work_experience_id,"profileData.work_experience_id");
//   const [selectedExperience, setSelectedExperience] = useState(
//     profileData?.work_experience_id ? profileData?.work_experience_id && parseInt(profileData.work_experience_id) : 0
//   )
  
//   // Update selected experience when profileData changes
//   useEffect(() => {
//     if (profileData?.work_experience_id) {
//       setSelectedExperience(parseInt(profileData.work_experience_id))
//     }
//   }, [profileData])
  
//   // Handle experience change
//   const handleExpChange = (e) => {
//     const selectedId = parseInt(e.target.value)
//     console.log(selectedId, "handleExpChange")
//     setSelectedExperience(selectedId)
//   }


//   console.log(selectedExperience,);
  
//   return (
//     <div className="form-group col-lg-12 col-md-12 font-light">
//       <label className="block mb-1 text-gray-700 font-semibold">
//         Work Experience * <span className="text-sm text-gray-500">How many years of work experience do you have?</span>
//       </label>
      
//       <select
//         {...register("work_experience_id", { 
//           required: "Work experience is required",
//           onChange: handleExpChange, // Add the onChange handler here
//           setValueAs: value => value ? parseInt(value) : "", // Convert to integer
//           value: selectedExperience // Set initial value from profileData
//         })}
//         className="w-full p-2 border rounded-md"
//         defaultValue={profileData?.work_experience_id || ""}
//       >
//         <option value="">Select experience level</option>
//         {workExperience.map((exp) => (
//           <option key={exp.id} value={exp.id}
//           selected={profileData?.work_experience_id && parseInt(profileData.work_experience_id) === exp.id}

//           >
//             {exp.name}
//           </option>
//         ))}
//       </select>
      
//       {errors?.work_experience_id && (
//         <p className="text-red-500 text-sm">{errors.work_experience_id.message}</p>
//       )}
//     </div>
//   )
// }

// export default WorkExperienceDropdown

import { useState, useEffect } from "react";

const WorkExperienceDropdown = ({ workExperience = [], register, errors, profileData, setValue }) => {
  const [selectedExperience, setSelectedExperience] = useState(
    profileData?.work_experience_id ? parseInt(profileData.work_experience_id) : ""
  );

  // Update state and form value when profileData changes
  useEffect(() => {
    if (profileData?.work_experience_id) {
      const parsed = parseInt(profileData.work_experience_id);
      setSelectedExperience(parsed);
      setValue("work_experience_id", parsed); // Important: Sync with form
    }
  }, [profileData, setValue]);

  // Handle change
  const handleExpChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setSelectedExperience(selectedId);
    setValue("work_experience_id", selectedId); // Update react-hook-form
  };

  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">
        Work Experience *{" "}
        <span className="text-sm text-gray-500">How many years of work experience do you have?</span>
      </label>

      <select
        {...register("work_experience_id", {
          required: "Work experience is required"
        })}
        value={selectedExperience}
        onChange={handleExpChange}
        className="w-full p-2 border rounded-md"
      >
        <option value="">Select experience level</option>
        {workExperience.map((exp) => (
          <option key={exp.id} value={exp.id}>
            {exp.name}
          </option>
        ))}
      </select>

      {errors?.work_experience_id && (
        <p className="text-red-500 text-sm">{errors.work_experience_id.message}</p>
      )}
    </div>
  );
};

export default WorkExperienceDropdown;
