

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