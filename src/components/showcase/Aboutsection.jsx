// import { Edit } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { MdPhoto, MdEdit } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';

// // Define default image if URLs are missing
// const DEFAULT_IMAGE = "/api/placeholder/400/320";

// const AboutSection = ({ companyData = {},userInfo, onSave }) => {
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [selectedImages, setSelectedImages] = useState([]);
//   const navigate = useNavigate()
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

//   // Safe image URL getter with BASE_IMAGE_URL handling
//   const getImageUrl = (imageKey, index) => {
//     if (!companyData || !companyData[imageKey] || !companyData[imageKey][index]) {
//       return DEFAULT_IMAGE;
//     }

//     // Define BASE_IMAGE_URL or use empty string if not available
//     const BASE_IMAGE_URL = "https://api.sentryspot.co.uk";
//     return `${BASE_IMAGE_URL}${companyData[imageKey][index]}`;
//   };

//   const handleEditClick = () => {
//     navigate('/employers-dashboard/company-profile/?edit=about')
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
//     selectedImages.forEach((image) => {
//       formData.append('about_images', image);
//     });

//     // Call the parent save handler
//     if (onSave) {
//       onSave(formData);
//     }

//     setIsPopupOpen(false);
//     setSelectedImages([]);
//   };

//   // Function to safely render HTML content
//   const renderHTML = (htmlContent) => {
//     try {
//       return { __html: htmlContent || '' };
//     } catch (error) {
//       console.error("Error parsing HTML:", error);
//       return { __html: '' };
//     }
//   };

//   return (
//     <div className='py-8  mx-auto'>

// <section className="py-16 about-section" id="about">
//       <div className="auto-container max-w-7xl mx-auto px-4">
//         <div className="row flex flex-col lg:flex-row">
//           {/* Content Column - Left side with text */}
//           <div className="content-column w-full lg:w-4/12 order-2 lg:order-1 relative mb-10 lg:mb-0">
//             <div className="lg:absolute top-1/4 lg:-left-16 bg-white shadow-2xl rounded-3xl p-8 z-10">
//               <span className="inline-block border-b-2 border-blue-700 w-36 mb-8"></span>
//               <p className="title text-2xl sm:text-3xl text-black font-bold mb-6">
//                 {formData.title || "About Our Company"}
//               </p>
//               <div className="mb-8 text-gray-700">
//                 {formData.description ? (
//                   <div dangerouslySetInnerHTML={renderHTML(formData.description)}></div>
//                 ) : (
//                   <p>We are a dedicated team committed to excellence and innovation in everything we do.</p>
//                 )}
//               </div>

//             </div>
//           </div>

//           {/* Image Column - Right side with images */}
//           <div className="image-column w-full lg:w-8/12 order-1 lg:order-2">
//             <figure className="image relative" data-aos="fade-right">
//               <div className="flex flex-col md:flex-row">
//                 <div className="md:w-2/3 w-full">
//                   <img
//                     src="https://api.sentryspot.co.uk/sentryspot/employeer/compnay_inside/34/image2-1746516527.jpg"
//                     alt="Culture 3"
//                     className="object-cover w-full h-full min-h-[300px] p-2"
//                   />
//                 </div>
//                 <div className="md:w-1/3 w-full grid grid-rows-2 gap-2">
//                   <div className="p-2">
//                     <img
//                       src={"https://api.sentryspot.co.uk/sentryspot/employeer/compnay_inside/34/image2-1746516527.jpg"}
//                       alt="Culture 1"
//                       className="object-cover w-full h-full min-h-[150px]"
//                     />
//                   </div>
//                   <div className="p-2">
//                     <img
//                       src="https://api.sentryspot.co.uk/sentryspot/employeer/compnay_inside/34/image2-1746516527.jpg"
//                       alt="Culture 2"
//                       className="object-cover w-full h-full min-h-[150px]"
//                     />
//                   </div>
//                 </div>
//               </div>
//               <button className="absolute bottom-3 right-3 flex items-center gap-3 rounded-md p-2 px-3 bg-slate-800 text-white hover:bg-slate-700 transition-colors">
//                 <MdPhoto size={24} />
//                 <span className="hidden sm:inline">View All Photos</span>
//               </button>
//             </figure>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal/Popup */}
//       {/* {isPopupOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
//             <h3 className="text-xl font-bold mb-4">Edit Content</h3>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Title</label>
//               <input
//                 type="text"
//                 className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={editData.title || ""}
//                 onChange={(e) => setEditData({ ...editData, title: e.target.value })}
//                 placeholder="Enter section title"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Description</label>
//               <textarea
//                 className="w-full border p-2 rounded h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={editData.about || ""}
//                 onChange={(e) => setEditData({ ...editData, about: e.target.value })}
//                 placeholder="Enter description (HTML is supported)"
//               ></textarea>
//               <p className="text-xs text-gray-500 mt-1">HTML formatting is supported</p>
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-2">Upload Images</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 className="w-full border p-2 rounded"
//                 onChange={handleImageChange}
//               />
//               {selectedImages.length > 0 && (
//                 <p className="text-sm text-gray-500 mt-2">
//                   {selectedImages.length} image(s) selected.
//                 </p>
//               )}
//             </div>
//             <div className="flex justify-end gap-2">
//               <button
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
//                 onClick={() => setIsPopupOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="text-white bg-blue-950 hover:bg-blue-900 px-4 py-2 rounded transition-colors"
//                 onClick={handleSave}
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )} */}
//     </section>
//     </div>
//   );
// };

// export default AboutSection;

import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import CompanyCard from "../ui/CompanyCard";
import { useEffect, useState } from "react";

export default function AboutSection({ companyData }) {
  const navigate = useNavigate();

  const images =
    companyData?.about_images?.length > 0
      ? companyData.about_images.map(
          (img) => `https://api.sentryspot.co.uk${img}`
        )
      : [
          "https://picsum.photos/500/400?1",
          "https://picsum.photos/500/400?2",
          "https://picsum.photos/500/400?3",
        ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <CompanyCard
      id="why-choose-us"
      style={{ maxHeight: "calc(100vh - 300px)" }}
      // className="bg-gradient-to-br from-blue-200 to-blue-100 py-20"
    >
      <div className="max-w-6xl mx-auto md:px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-left">
          <h2 className="app-text-h1 !text-blue-700 mb-8">
            {companyData?.company_name}
          </h2>

          {companyData?.about && (
            <div
              className="app-text-p"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(companyData.about),
              }}
            />
          )}
         
        </div>

        {/* Right Image */}
        <div className="flex-1 flex flex-col items-center">
          {/* Image */}
          <div className="w-full max-w-[500px] h-[400px] overflow-hidden rounded-xl shadow-lg border border-blue-100">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-blue-500 scale-110"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </CompanyCard>
  );
}
