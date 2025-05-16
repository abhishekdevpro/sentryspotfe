import React, { useState } from "react";
import { Constant } from "@/utils/constant/constant";

const InsideCognizant = ({ companyData }) => {
  const [activeTab, setActiveTab] = useState("culture");
  const BASEIMAGEURL = "https://api.sentryspot.co.uk";

  const getImageUrl = (tab, index) => {
    const backendImages = {
      culture: companyData?.inside_culture_images,
      people: companyData?.inside_people_images,
      workplace: companyData?.inside_workplace_images
    };

    const images = backendImages[tab];
    return images && images[index] 
      ? `${BASEIMAGEURL}${images[index]}` 
      : "/placeholder.svg?height=300&width=400";
  };

  return (
    <section className="inside-cognizant py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Inside {companyData?.company_name || 'Our Company'}
          </h2>
        </div>

        <div className="tabs-container">
          <div className="flex justify-center mb-6">
            <div className="grid w-[600px] grid-cols-3 gap-4">
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "culture"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("culture")}
              >
                Culture
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "people"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("people")}
              >
                People
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "workplace"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab("workplace")}
              >
                Workplace
              </button>
            </div>
          </div>

          <div className="tab-content">
            {activeTab === "culture" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Our Culture</h3>
                    <p className="text-gray-600">{companyData?.inside_culture_text || "Culture description here."}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={getImageUrl('culture', index)}
                          alt={`Culture ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "people" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Our People</h3>
                    <p className="text-gray-600">{companyData?.inside_people_text || "People description here."}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={getImageUrl('people', index)}
                          alt={`People ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "workplace" && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Our Workplace</h3>
                    <p className="text-gray-600">{companyData?.inside_workplace_text || "Workplace description here."}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={getImageUrl('workplace', index)}
                          alt={`Workplace ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsideCognizant; 