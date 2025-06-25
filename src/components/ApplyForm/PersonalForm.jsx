// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Constant } from '@/utils/constant/constant';

// const PersonalInfoForm = ({ formData, setFormData, errors }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const token = localStorage.getItem(Constant.USER_TOKEN)

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/user-profile', {
//           headers: {
//             Authorization: token // Assuming the token is stored in localStorage
//           }
//         });
//         console.log(response,"<<<<");

//         const userData = response.data.data.personal_details;
//         setFormData(prevData => ({
//           ...prevData,
//           firstName: userData.first_name || '',
//           lastName: userData.last_name || '',
//           email: userData.email || '',
//           phone: userData.phone || '',
//           location: userData.location || '',
//           resumeOption: 'none',
//           coverLetterOption: 'none'
//         }));
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching user profile:', err);
//         setError('Failed to load user profile. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [setFormData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e, type) => {
//     const file = e.target.files[0];
//     setFormData(prev => ({ ...prev, [type]: file }));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-600">{error}</div>;

//   return (
//     <div className="space-y-4">
//       <div>
//         <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
//         <input
//           type="text"
//           id="firstName"
//           name="firstName"
//           value={formData.firstName}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
//       </div>
//       <div>
//         <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
//         <input
//           type="text"
//           id="lastName"
//           name="lastName"
//           value={formData.lastName}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
//       </div>
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           readOnly
//           className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div>
//         <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           readOnly
//           className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div>
//         <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
//         <input
//           type="text"
//           id="location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//         {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
//       </div>
//       <div className="space-y-4">
//         <div>
//           <h3 className="text-xl font-medium text-navy-900 mb-4">Resumé</h3>
//           <div className="space-y-3">
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="resumeOption"
//                 value="upload"
//                 checked={formData.resumeOption === 'upload'}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-blue-600"
//               />
//               <span className="text-gray-700">Upload a resumé</span>
//             </label>
//             {formData.resumeOption === 'upload' && (
//               <div className="ml-8 mt-2">
//                 <input
//                   type="file"
//                   id="resumeUpload"
//                   name="resumeUpload"
//                   onChange={(e) => handleFileChange(e, 'resume')}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100"
//                 />
//               </div>
//             )}
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="resumeOption"
//                 value="select"
//                 checked={formData.resumeOption === 'select'}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-blue-600"
//               />
//               <span className="text-gray-700">Select a resumé</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="resumeOption"
//                 value="none"
//                 checked={formData.resumeOption === 'none'}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-blue-600"
//               />
//               <span className="text-gray-700">Don't include a resumé</span>
//             </label>
//           </div>
//         </div>

//         <div>
//           <h3 className="text-xl font-medium text-navy-900 mb-4">Cover letter</h3>
//           <div className="space-y-3">
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="coverLetterOption"
//                 value="upload"
//                 checked={formData.coverLetterOption === 'upload'}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-blue-600"
//               />
//               <span className="text-gray-700">Upload a cover letter</span>
//             </label>
//             {formData.coverLetterOption === 'upload' && (
//               <div className="ml-8 mt-2">
//                 <input
//                   type="file"
//                   id="coverLetterUpload"
//                   name="coverLetterUpload"
//                   onChange={(e) => handleFileChange(e, 'coverLetter')}
//                   className="block w-full text-sm text-gray-500
//                     file:mr-4 file:py-2 file:px-4
//                     file:rounded-full file:border-0
//                     file:text-sm file:font-semibold
//                     file:bg-blue-50 file:text-blue-700
//                     hover:file:bg-blue-100"
//                 />
//               </div>
//             )}
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="coverLetterOption"
//                 value="write"
//                 checked={formData.coverLetterOption === 'write'}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-blue-600"
//               />
//               <span className="text-gray-700">Write a cover letter</span>
//             </label>
//             <label className="flex items-center space-x-3">
//               <input
//                 type="radio"
//                 name="coverLetterOption"
//                 value="none"
//                 checked={formData.coverLetterOption === 'none'}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-blue-600"
//               />
//               <span className="text-gray-700">Don't include a cover letter</span>
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalInfoForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import LocationAutocomplete from "../dashboard-pages/candidates-dashboard/my-profile/components/my-profile/LocationSelector";
import { FileIcon } from "lucide-react";

const PersonalInfoForm = ({ formData, setFormData, errors }) => {
  const [loading, setLoading] = useState(true);
  const [existingResume, setExistingResume] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const userData = response.data.data.personal_details;
        setExistingResume(userData.resume);
        setFormData((prevData) => ({
          ...prevData,
          firstName: userData.first_name || "",
          lastName: userData.last_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          location: userData.location || "",
          resumeOption: "",
          coverLetterOption: "",
        }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    // console.log(file, "Selected file for", type);
    setFormData((prev) => ({ ...prev, [type]: file }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg shadow-md">
        {error}
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>
      </div>

      {/* <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        />
        {errors.location && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            {errors.location}
          </p>
        )}
      </div> */}
      {/* <LocationAutocomplete
    className="w-full" // Dynamic styling
    selectedLocation={formData.location} // Pass selected location
    onChange={(selectedOption) =>
      setFormData({ ...formData, location: selectedOption ? selectedOption.value : "" })
    } 
  /> */}

      <div className="space-y-6">
        {/* Resume Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <FileIcon className="w-6 h-6 mr-2 text-blue-600" />
            Resumé
          </h3>
          <div className="space-y-3">
            {["upload", "select"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="resumeOption"
                  value={option}
                  checked={formData.resumeOption === option}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700 capitalize">
                  {option === "none"
                    ? "Don't include a resumé"
                    : `${option} a resumé`}
                </span>
              </label>
            ))}
            {formData.resumeOption === "upload" && (
              <div className="ml-8 mt-2">
                <input
                  type="file"
                  id="resumeUpload"
                  name="resumeUpload"
                  onChange={(e) => handleFileChange(e, "resume")}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            {formData.resumeOption === "select" && (
              <div className="ml-8 mt-2">
                {existingResume ? (
                  <div className="border rounded-md p-3 bg-white shadow-md space-y-2">
                    <p className="text-sm text-gray-700 font-medium mb-2">
                       Selected resume:
                    </p>
                    <iframe
                      src={`https://api.sentryspot.co.uk${existingResume}`}
                      title="Resume Preview"
                      className="w-full h-[500px] border rounded"
                    ></iframe>
                    <p className="text-xs text-gray-500">
                      This resume will be submitted with your application.
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-red-500">
                    No resume found. Please upload one.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cover Letter Section */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            Cover Letter
          </h3>
          <div className="space-y-3">
            {["upload", "none"].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="coverLetterOption"
                  value={option}
                  checked={formData.coverLetterOption === option}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700 capitalize">
                  {option === "none"
                    ? "Don't include a cover letter"
                    : `${option} a cover letter`}
                </span>
              </label>
            ))}
            {formData.coverLetterOption === "upload" && (
              <div className="ml-8 mt-2">
                <input
                  type="file"
                  id="coverLetterUpload"
                  name="coverLetterUpload"
                  onChange={(e) => handleFileChange(e, "coverLetter")}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
