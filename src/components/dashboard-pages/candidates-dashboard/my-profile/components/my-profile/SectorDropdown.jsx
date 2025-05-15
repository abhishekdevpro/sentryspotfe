
// import React, { useState } from "react";

// const SectorDropdown = ({ sectors = [], register, errors,profileData }) => {
//   const [selectedSector, setSelectedSector] = useState(0);

//   const handleSectorChange = (e) => {
//     const selectedId = parseInt(e.target.value);
//     setSelectedSector(selectedId);
//   };

//   return (
//     <div className="form-group col-lg-6 col-md-12 font-light">
//       <label className="block mb-1 text-gray-700 font-semibold">Select Sector*</label>

//       {register ? (
//         <>
//           <select
//             {...register("sector_id", {
//               required: "Sector is required",
//               setValueAs: (v) => Number(v), // 👈 Convert string to number
//             })}
//             onChange={handleSectorChange}
//             className="w-full p-2 border rounded-md"
//           >
//             <option value="">Select a sector</option>
//             {sectors.map((sector) => (
//               <option key={sector.id} value={sector.id}
//               selected={profileData?.sector_id && parseInt(profileData.sector_id) === sector.id}

//               >
//                 {sector.name}
//               </option>
//             ))}
//           </select>
//           {errors?.sector_id && (
//             <p className="text-red-500 text-sm">{errors.sector_id.message}</p>
//           )}
//         </>
//       ) : (
//         <select
//           value={selectedSector}
//           onChange={handleSectorChange}
//           className="w-full p-2 border rounded-md"
//         >
//           <option value="">Select a sector</option>
//           {sectors.map((sector) => (
//             <option key={sector.id} value={sector.id}>
//               {sector.name}
//             </option>
//           ))}
//         </select>
//       )}
//     </div>
//   );
// };

// export default SectorDropdown;


import React, { useEffect, useState } from "react";

const SectorDropdown = ({ sectors = [], register, errors, setValue, profileData }) => {
  const [selectedSector, setSelectedSector] = useState("");

  useEffect(() => {
    if (profileData?.sector_id) {
      setSelectedSector(profileData.sector_id);
      if (setValue) {
        setValue("sector_id", profileData.sector_id);
      }
    }
  }, [profileData, setValue]);

  const handleSectorChange = (e) => {
    const value = e.target.value;
    setSelectedSector(value);
    if (setValue) {
      setValue("sector_id", value);
    }
  };

  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">Select Sector*</label>

      {register ? (
        <>
          <select
            {...register("sector_id", {
              required: "Sector is required",
              setValueAs: (v) => Number(v),
            })}
            value={selectedSector}
            onChange={handleSectorChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select a sector</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.id}>
                {sector.name}
              </option>
            ))}
          </select>
          {errors?.sector_id && (
            <p className="text-red-500 text-sm">{errors.sector_id.message}</p>
          )}
        </>
      ) : (
        <select
          value={selectedSector}
          onChange={handleSectorChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a sector</option>
          {sectors.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SectorDropdown;
