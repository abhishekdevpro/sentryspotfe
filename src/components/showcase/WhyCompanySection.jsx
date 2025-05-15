// import { useState, useEffect } from 'react';
// import { MdEdit } from 'react-icons/md';
// import ReactQuill from 'react-quill';
// import DOMPurify from 'dompurify';

// const WhyCompanySection = ({ companyData = {}, onSave }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editData, setEditData] = useState({
//     company_name: companyData?.company_name || "Company",
//     summery: companyData?.summery || ""
//   });

//   // Update local state when companyData changes
//   useEffect(() => {
//     setEditData({
//       company_name: companyData?.company_name || "Company",
//       summery: companyData?.summery || ""
//     });
//   }, [companyData]);

//   const handleSave = () => {
//     if (onSave) {
//       onSave(editData);
//     }
//     setIsModalOpen(false);
//   };

//   // Function to safely render HTML content
//   const renderHTML = (htmlContent) => {
//     try {
//       return { __html: DOMPurify.sanitize(htmlContent || '') };
//     } catch (error) {
//       console.error("Error parsing HTML:", error);
//       return { __html: '' };
//     }
//   };

//   return (
//     <section className="about-section mb-10" id="why-cognizant">
//       <div className="auto-container w-[90%] mx-auto">
//         <div className="flex flex-col md:flex-row items-start md:items-center">
//           <div className="w-full md:w-5/12 mb-6 md:mb-0">
//             <p className="title text-xl md:text-3xl text-black font-bold px-0 sm:px-7 md:px-16">
//               Why {companyData?.company_name || "Company"}?
//             </p>
//           </div>
          
//           <span className="border-l-2 border-gray-300 h-16 hidden md:inline-block"></span>
          
//           <div className="w-full md:w-7/12 px-0 sm:px-7 md:px-16">
//             <div className="text-lg sm:text-xl text-gray-700" dangerouslySetInnerHTML={renderHTML(companyData?.summery)}></div>
//             <button
//               className="text-white bg-blue-950 border p-2 rounded-lg px-4 mt-4 flex items-center gap-2 hover:bg-blue-900 transition-colors"
//               onClick={() => setIsModalOpen(true)}
//             >
//               <MdEdit size={18} /> Edit
//             </button>
//           </div>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[60%] md:w-[40%] max-h-[90%] overflow-y-auto">
//             <h3 className="text-2xl font-semibold text-gray-800 mb-4">Edit Content</h3>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
//               <input
//                 type="text"
//                 className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={editData.company_name}
//                 onChange={(e) => setEditData({ ...editData, company_name: e.target.value })}
//                 placeholder="Enter company name"
//               />
//             </div>
            
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <div className="border rounded-lg">
//                 <ReactQuill
//                   theme="snow"
//                   value={editData.summery}
//                   onChange={(value) => setEditData({ ...editData, summery: value })}
//                   className="h-48"
//                 />
//               </div>
//             </div>
            
//             <div className="flex justify-end gap-2">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default WhyCompanySection;


import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WhyChooseUsSection({ companyData, setCompanyData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const handleSave = () => {
    // Here you would typically save data to your backend
    setIsModalOpen(false);

    // Optionally add a success notification
    alert('Content saved successfully!');
  };
  const handleEditClick =()=>{
    navigate('/employers-dashboard/company-profile/?edit=about')

  }

  return (
    <section className="bg-gray-50 py-16" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose {companyData.company_name}?
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left image */}
          {/* <div className="w-full md:w-2/5">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/api/placeholder/600/400" 
                alt="Why choose us" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div> */}
          
          {/* Right content */}
          <div className="w-full ">
            <div className="">
              <div 
                className="prose max-w-none mb-6 text-gray-700 leading-relaxed" 
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(companyData.summery) 
                }}
              />
              
              <div className="mt-6">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-200 font-medium rounded-md px-5 py-2.5 flex items-center gap-2"
                  onClick={() => handleEditClick()}
                >
                  <Edit />
                  Edit 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit Why Choose Us Content
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name Preview
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={`Why ${companyData.company_name}?`}
                  readOnly
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <div className="border border-gray-300 rounded-md">
                  <ReactQuill
                    theme="snow"
                    value={companyData.summery}
                    onChange={(value) => setCompanyData({ ...companyData, summery: value })}
                    className="h-64"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}