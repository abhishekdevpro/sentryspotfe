// import { useState, useEffect } from 'react';
// import { MdPhoto, MdEdit } from 'react-icons/md';

// // Define default image if URLs are missing
// const DEFAULT_IMAGE = "/api/placeholder/400/320";

// const AboutSection = ({ companyData = {}, onSave }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [formData, setFormData] = useState({
//     title: companyData?.title || "About Our Company",
//     description: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
//   });
//   const [editData, setEditData] = useState({
//     title: companyData?.title || "About Our Company",
//     about: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
//   });

//   // Update local state when companyData changes
//   useEffect(() => {
//     setFormData({
//       title: companyData?.title || "About Our Company",
//       description: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
//     });
//     setEditData({
//       title: companyData?.title || "About Our Company",
//       about: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
//     });
//   }, [companyData]);

//   // Safe image URL getter
//   const getImageUrl = (imageKey, index) => {
//     if (!companyData || !companyData[imageKey] || !companyData[imageKey][index]) {
//       return DEFAULT_IMAGE;
//     }
    
//     // Use BASE_IMAGE_URL if available, otherwise use the raw value
//     const BASE_IMAGE_URL = "https://api.sentryspot.co.uk";
//     return `${BASE_IMAGE_URL}${companyData[imageKey][index]}`;
//   };

//   const handleEditClick = () => {
//     setIsPopupOpen(true);
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedImages(files);
//   };

//   const handleSave = () => {
//     // Prepare data for saving
//     const formData = new FormData();
//     formData.append('title', editData.title);
//     formData.append('about', editData.about);
    
//     // Append images if any
//     selectedImages.forEach((image, index) => {
//       formData.append(`about_images`, image);
//     });

//     // Call the parent save handler
//     if (onSave) {
//       onSave(formData);
//     }
    
//     setIsPopupOpen(false);
//     setSelectedImages([]);
//   };

//   return (
//   <div className='w-full mx-auto py-8 border-2 border-red-900'>
//       <section className="py-16 bg-gray-50" id="about">
//       <div className="container mx-auto px-4">
//         <div className="flex flex-col lg:flex-row items-center">
//           {/* Content Column */}
//           <div className="lg:w-5/12 w-full lg:order-1 order-2 mb-10 lg:mb-0 relative">
//             <div className="bg-white shadow-xl rounded-3xl p-8 lg:p-10 max-w-lg mx-auto lg:mx-0 lg:absolute lg:-left-16 z-10">
//               <div className="border-b-4 border-red-700 w-24 mb-6"></div>
//               <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
//                 {formData.title || "About Our Company"}
//               </h2>
//               <div className="prose text-gray-700 mb-8">
//                 {formData.description ? (
//                   <div dangerouslySetInnerHTML={{ __html: formData.description }}></div>
//                 ) : (
//                   <p>We are a dedicated team committed to excellence and innovation in everything we do.</p>
//                 )}
//               </div>
//               {/* <button 
//                 className="text-white bg-blue-800 hover:bg-blue-900 transition-colors py-3 px-6 rounded-lg flex items-center gap-2"
//                 onClick={handleEditClick}
//               >
//                 <MdEdit size={20} /> Edit Section
//               </button> */}
//             </div>
//           </div>

//           {/* Image Column */}
//           <div className="lg:w-7/12 w-full lg:order-2 order-1">
//             <div className="relative rounded-xl overflow-hidden shadow-lg" data-aos="fade-left">
//               <div className="flex flex-col md:flex-row">
//                 <div className="md:w-7/12 w-full">
//                   <div className="h-full">
//                     <img 
//                       src={getImageUrl('about_images', 2)} 
//                       alt="Company Culture" 
//                       className="object-cover w-full h-full min-h-[300px]"
//                     />
//                   </div>
//                 </div>
//                 <div className="md:w-5/12 w-full">
//                   <div className="grid grid-rows-2 h-full">
//                     <div className="p-1">
//                       <img 
//                         src={getImageUrl('about_images', 0)} 
//                         alt="Team" 
//                         className="object-cover w-full h-full min-h-[150px]"
//                       />
//                     </div>
//                     <div className="p-1">
//                       <img 
//                         src={getImageUrl('about_images', 1)} 
//                         alt="Office" 
//                         className="object-cover w-full h-full min-h-[150px]"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-md py-2 px-4 bg-black bg-opacity-75 text-white hover:bg-opacity-90 transition-all">
//                 <MdPhoto size={20} />
//                 <span className="hidden sm:inline">View All Photos</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isPopupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-50">
//           <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-900">Edit About Section</h3>
//                 <button 
//                   className="text-gray-500 hover:text-gray-700"
//                   onClick={() => setIsPopupOpen(false)}
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
              
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   value={editData.title || ""}
//                   onChange={(e) => setEditData({ ...editData, title: e.target.value })}
//                   placeholder="Enter section title"
//                 />
//               </div>
              
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                 <textarea
//                   className="w-full border border-gray-300 p-3 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   value={editData.about || ""}
//                   onChange={(e) => setEditData({ ...editData, about: e.target.value })}
//                   placeholder="Enter section description"
//                 ></textarea>
//                 <p className="text-xs text-gray-500 mt-1">HTML formatting is supported</p>
//               </div>
              
//               <div className="mb-6">
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     className="w-full"
//                     onChange={handleImageChange}
//                   />
//                   <p className="text-sm text-gray-500 mt-2">
//                     {selectedImages.length > 0 ? `${selectedImages.length} image(s) selected` : 'Select up to 3 images for your about section'}
//                   </p>
//                 </div>
//               </div>
              
//               <div className="flex justify-end gap-4">
//                 <button
//                   className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
//                   onClick={() => setIsPopupOpen(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
//                   onClick={handleSave}
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </section>
//   </div>
//   );
// };

// export default AboutSection;


import { Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MdPhoto, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Define default image if URLs are missing
const DEFAULT_IMAGE = "/api/placeholder/400/320";

const AboutSection = ({ companyData = {},userInfo, onSave }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: companyData?.title || "About Our Company",
    description: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
  });
  const [editData, setEditData] = useState({
    title: companyData?.title || "About Our Company",
    about: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
  });

  // Update local state when companyData changes
  useEffect(() => {
    setFormData({
      title: companyData?.title || "About Our Company",
      description: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
    });
    setEditData({
      title: companyData?.title || "About Our Company",
      about: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
    });
  }, [companyData]);

  // Safe image URL getter with BASE_IMAGE_URL handling
  const getImageUrl = (imageKey, index) => {
    if (!companyData || !companyData[imageKey] || !companyData[imageKey][index]) {
      return DEFAULT_IMAGE;
    }
    
    // Define BASE_IMAGE_URL or use empty string if not available
    const BASE_IMAGE_URL = "https://api.sentryspot.co.uk";
    return `${BASE_IMAGE_URL}${companyData[imageKey][index]}`;
  };

  const handleEditClick = () => {
    navigate('/employers-dashboard/company-profile/?edit=about')
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSave = () => {
    // Prepare data for saving
    const formData = new FormData();
    formData.append('title', editData.title);
    formData.append('about', editData.about);
    
    // Append images if any
    selectedImages.forEach((image) => {
      formData.append('about_images', image);
    });

    // Call the parent save handler
    if (onSave) {
      onSave(formData);
    }
    
    setIsPopupOpen(false);
    setSelectedImages([]);
  };

  // Function to safely render HTML content
  const renderHTML = (htmlContent) => {
    try {
      return { __html: htmlContent || '' };
    } catch (error) {
      console.error("Error parsing HTML:", error);
      return { __html: '' };
    }
  };

  return (
    <div className='py-8  mx-auto'>

<section className="py-16 about-section" id="about">
      <div className="auto-container max-w-7xl mx-auto px-4">
        <div className="row flex flex-col lg:flex-row">
          {/* Content Column - Left side with text */}
          <div className="content-column w-full lg:w-4/12 order-2 lg:order-1 relative mb-10 lg:mb-0">
            <div className="lg:absolute top-1/4 lg:-left-16 bg-white shadow-2xl rounded-3xl p-8 z-10">
              <span className="inline-block border-b-2 border-blue-700 w-36 mb-8"></span>
              <p className="title text-2xl sm:text-3xl text-black font-bold mb-6">
                {formData.title || "About Our Company"}
              </p>
              <div className="mb-8 text-gray-700">
                {formData.description ? (
                  <div dangerouslySetInnerHTML={renderHTML(formData.description)}></div>
                ) : (
                  <p>We are a dedicated team committed to excellence and innovation in everything we do.</p>
                )}
              </div>
              <div className="mt-6">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-200 font-medium rounded-md px-5 py-2.5 flex items-center gap-2"
                  onClick={() => handleEditClick()}
                >
                  <Edit  />
                  Edit 
                </button>
              </div>
            </div>
          </div>

          {/* Image Column - Right side with images */}
          <div className="image-column w-full lg:w-8/12 order-1 lg:order-2">
            <figure className="image relative" data-aos="fade-right">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 w-full">
                  <img 
                    src={getImageUrl('about_images', 2)} 
                    alt="Culture 3" 
                    className="object-cover w-full h-full min-h-[300px] p-2" 
                  />
                </div>
                <div className="md:w-1/3 w-full grid grid-rows-2 gap-2">
                  <div className="p-2">
                    <img 
                      src={getImageUrl('about_images', 0)} 
                      alt="Culture 1" 
                      className="object-cover w-full h-full min-h-[150px]" 
                    />
                  </div>
                  <div className="p-2">
                    <img 
                      src={getImageUrl('about_images', 1)} 
                      alt="Culture 2" 
                      className="object-cover w-full h-full min-h-[150px]" 
                    />
                  </div>
                </div>
              </div>
              <button className="absolute bottom-3 right-3 flex items-center gap-3 rounded-md p-2 px-3 bg-slate-800 text-white hover:bg-slate-700 transition-colors">
                <MdPhoto size={24} />
                <span className="hidden sm:inline">View All Photos</span>
              </button>
            </figure>
          </div>
        </div>
      </div>

      {/* Edit Modal/Popup */}
      {/* {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Edit Content</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editData.title || ""}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Enter section title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full border p-2 rounded h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editData.about || ""}
                onChange={(e) => setEditData({ ...editData, about: e.target.value })}
                placeholder="Enter description (HTML is supported)"
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">HTML formatting is supported</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Upload Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full border p-2 rounded"
                onChange={handleImageChange}
              />
              {selectedImages.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  {selectedImages.length} image(s) selected.
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-950 hover:bg-blue-900 px-4 py-2 rounded transition-colors"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )} */}
    </section>
    </div>
  );
};

export default AboutSection;