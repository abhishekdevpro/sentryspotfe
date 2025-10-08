
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import DOMPurify from 'dompurify';
// import { Edit } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function WhyChooseUsSection({ companyData, setCompanyData }) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate()
//   const handleSave = () => {
//     // Here you would typically save data to your backend
//     setIsModalOpen(false);

//     // Optionally add a success notification
    
//   };
//   const handleEditClick =()=>{
//     navigate('/employers-dashboard/company-profile/?edit=about')

//   }

//   return (
//     <section className=" py-16" id="why-choose-us">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-2 border-gray-100 rounded-md py-2">
//         <div className="text-center mb-12">
//           <h2 className="app-text-h2">
//             Why Choose {companyData.company_name}?
//           </h2>
//           <div className="w-48 h-1 bg-blue-600 mx-auto mt-4"></div>
//         </div>

//         <div className="flex flex-col md:flex-row items-center gap-8">
         
//           <div className="w-full ">
//             <div className="">
//               <div 
//                 className="prose max-w-none mb-6 text-gray-700 leading-relaxed" 
//                 dangerouslySetInnerHTML={{ 
//                   __html: DOMPurify.sanitize(companyData.summery) 
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
    
//     </section>
//   );
// }

import React from "react";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";
import parse from "html-react-parser"
import CompanyCard from "../ui/CompanyCard";

export default function WhyChooseUsSection({ companyData }) {
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/employers-dashboard/company-profile/?edit=about");
  };

  return (
    <section id="why-choose-us">
      <CompanyCard>
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center w-full">
            <h2 className="app-text-h1 !text-blue-800">
              Why Choose {companyData.company_name}?
            </h2>
            {/* <div className="w-20 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div> */}
          </div>          
        </div>

        {/* Content */}
        <p
          className="prose max-w-none text-gray-700 leading-relaxed"
        >
        {parse(companyData.summery)}
      </p>
      </CompanyCard>
    </section>
  );
}
