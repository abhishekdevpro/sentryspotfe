// import React from "react";
// import { Controller } from "react-hook-form";

// const JobTypeDropdown = ({ jobTypes, control, setValue, errors }) => {
//   const handleCheckboxChange = (jobTypeId, currentSelected) => {
//     const selectedAsStrings = currentSelected.map(String);
//     const idAsString = String(jobTypeId);

//     const isSelected = selectedAsStrings.includes(idAsString);

//     let updatedSelection;
//     if (isSelected) {
//       updatedSelection = selectedAsStrings.filter(id => id !== idAsString);
//     } else {
//       updatedSelection = [...selectedAsStrings, idAsString];
//     }

//     setValue("job_type", updatedSelection);
//     console.log(updatedSelection, "updatedSelection");
//     return updatedSelection;
//   };

//   return (
//     <div className="form-group col-lg-12 col-md-12 font-light">
//       <label className="block mb-1 text-gray-700 font-semibold">Job Type*</label>

//       <Controller
//         name="job_type"
//         control={control}
//         rules={{
//           required: "Please select at least one job type",
//           validate: (value) =>
//             value.length > 0 || "Please select at least one job type",
//         }}
//         defaultValue={[]}
//         render={({ field }) => (
//           <div className="job-type-container row">
//             {jobTypes.map((type) => {
//               const isChecked =
//                 Array.isArray(field.value) &&
//                 field.value.map(String).includes(String(type.id));

//               return (
//                 <div key={type.id} className="checkbox-wrapper col-lg-3 flex mt-1 gap-2">
//                   <input
//                     type="checkbox"
//                     id={`jobtype-${type.id}`}
//                     checked={isChecked}
//                     onChange={() => {
//                       const newValue = handleCheckboxChange(type.id, field.value || []);
//                       field.onChange(newValue);
//                     }}
//                     className="cursor-pointer"
//                   />
//                   <label htmlFor={`jobtype-${type.id}`} className="cursor-pointer">
//                     {type.name}
//                   </label>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       />

//       {errors.job_type && (
//         <p className="text-red-500 text-sm mt-1">{errors.job_type.message}</p>
//       )}
//     </div>
//   );
// };

// export default JobTypeDropdown;

// import React, { useEffect } from "react";
// import { Controller } from "react-hook-form";

// const JobTypeDropdown = ({ jobTypes, control, setValue, errors, profileData }) => {
//   // When component mounts or profileData changes, set the default job types
//   useEffect(() => {
//     // Check if profileData exists and has job_type as an array
//     if (profileData && profileData.job_type && Array.isArray(profileData.job_type)) {
//       // Use the job_type array directly (it's already an array of string IDs)
//       setValue("job_type", profileData.job_type);
//       console.log("Pre-selecting job types:", profileData.job_type);
//     }
//   }, [profileData, setValue]);

//   const handleCheckboxChange = (jobTypeId, currentSelected) => {
//     const selectedAsStrings = currentSelected.map(String);
//     const idAsString = String(jobTypeId);
    
//     const isSelected = selectedAsStrings.includes(idAsString);
    
//     let updatedSelection;
//     if (isSelected) {
//       updatedSelection = selectedAsStrings.filter(id => id !== idAsString);
//     } else {
//       updatedSelection = [...selectedAsStrings, idAsString];
//     }
    
//     setValue("job_type", updatedSelection);
//     console.log(updatedSelection, "updatedSelection");
//     return updatedSelection;
//   };

//   return (
//     <div className="form-group col-lg-12 col-md-12 font-light">
//       <label className="block mb-1 text-gray-700 font-semibold">Job Type*</label>
      
//       <Controller
//         name="job_type"
//         control={control}
//         rules={{
//           required: "Please select at least one job type",
//           validate: (value) =>
//             value.length > 0 || "Please select at least one job type",
//         }}
//         defaultValue={[]}
//         render={({ field }) => (
//           <div className="job-type-container row">
//             {jobTypes.map((type) => {
//               const isChecked =
//                 Array.isArray(field.value) &&
//                 field.value.map(String).includes(String(type.id));
              
//               return (
//                 <div key={type.id} className="checkbox-wrapper col-lg-3 flex mt-1 gap-2">
//                   <input
//                     type="checkbox"
//                     id={`jobtype-${type.id}`}
//                     checked={isChecked}
//                     onChange={() => {
//                       const newValue = handleCheckboxChange(type.id, field.value || []);
//                       field.onChange(newValue);
//                     }}
//                     className="cursor-pointer"
//                   />
//                   <label htmlFor={`jobtype-${type.id}`} className="cursor-pointer">
//                     {type.name}
//                   </label>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       />
      
//       {errors.job_type && (
//         <p className="text-red-500 text-sm mt-1">{errors.job_type.message}</p>
//       )}
//     </div>
//   );
// };

// export default JobTypeDropdown;

import React, { useEffect } from "react";
import { Controller } from "react-hook-form";

const JobTypeDropdown = ({ jobTypes, control, setValue, errors, profileData }) => {
  useEffect(() => {
    if (profileData && Array.isArray(profileData.job_type)) {
      setValue("job_type", profileData.job_type.map(String)); // Ensure all are strings
      console.log("Pre-selecting job types:", profileData.job_type);
    }
  }, [profileData, setValue]);

  const handleCheckboxChange = (jobTypeId, currentSelected) => {
    const selectedAsStrings = currentSelected.map(String);
    const idAsString = String(jobTypeId);
    const isSelected = selectedAsStrings.includes(idAsString);

    return isSelected
      ? selectedAsStrings.filter(id => id !== idAsString)
      : [...selectedAsStrings, idAsString];
  };

  return (
    <div className="form-group col-lg-12 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">Job Type*</label>

      <Controller
        name="job_type"
        control={control}
        rules={{
          required: "Please select at least one job type",
          validate: (value) =>
            value.length > 0 || "Please select at least one job type",
        }}
        render={({ field }) => (
          <div className="job-type-container row">
            {jobTypes.map((type) => {
              const isChecked =
                Array.isArray(field.value) &&
                field.value.map(String).includes(String(type.id));

              return (
                <div key={type.id} className="checkbox-wrapper col-lg-3 flex mt-1 gap-2">
                  <input
                    type="checkbox"
                    id={`jobtype-${type.id}`}
                    checked={isChecked}
                    onChange={() => {
                      const newValue = handleCheckboxChange(type.id, field.value || []);
                      field.onChange(newValue);
                    }}
                    className="cursor-pointer"
                  />
                  <label htmlFor={`jobtype-${type.id}`} className="cursor-pointer">
                    {type.name}
                  </label>
                </div>
              );
            })}
          </div>
        )}
      />

      {errors.job_type && (
        <p className="text-red-500 text-sm mt-1">{errors.job_type.message}</p>
      )}
    </div>
  );
};

export default JobTypeDropdown;
