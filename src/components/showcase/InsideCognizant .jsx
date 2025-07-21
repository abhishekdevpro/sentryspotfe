
import React, { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

const InsideCompany = ({ companyData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [availableTabs, setAvailableTabs] = useState([]);
  const navigate = useNavigate()
  const [tempImageFiles, setTempImageFiles] = useState({
    cultureImgs: Array(3).fill(null),
    peopleImgs: Array(3).fill(null),
    workplaceImgs: Array(3).fill(null),
  });
   
  const BASEURL = "https://api.sentryspot.co.uk/api/employeer";
  const BASEIMAGEURL = "https://api.sentryspot.co.uk";
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const uploadFieldNames = {
    culture: "inside_culture_images_upload",
    people: "inside_people_images_upload",
    workplace: "inside_workplace_images_upload"
  };

  // Determine which tabs should be visible based on data availability
  useEffect(() => {
    const tabs = [];
     
    if (companyData?.inside_culture_images?.some(img => img)) {
      tabs.push("culture");
    }
     
    if (companyData?.inside_people_images?.some(img => img)) {
      tabs.push("people");
    }
     
    if (companyData?.inside_workplace_images?.some(img => img)) {
      tabs.push("workplace");
    }
     
    setAvailableTabs(tabs);
     
    // Set default active tab to the first available one
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0]);
    }
  }, [companyData]);

  // If there are no tabs to show and we're not editing, don't render anything
  if (availableTabs.length === 0 && !isEditing) {
    return null;
  }

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setTempImageFiles({
        cultureImgs: Array(3).fill(null),
        peopleImgs: Array(3).fill(null),
        workplaceImgs: Array(3).fill(null),
      });
    }
  };

  const openImageModal = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && activeTab) {
      setTempImageFiles(prev => ({
        ...prev,
        [`${activeTab}Imgs`]: prev[`${activeTab}Imgs`].map((item, i) => 
          i === selectedImageIndex ? file : item
        )
      }));
    }
    setShowModal(false);
  };

  const handleUpdate = async () => {
    try {
      // Add all tabs to available tabs when editing
      if (isEditing) {
        const allTabs = ["culture", "people", "workplace"];
        const updatedTabs = new Set([...availableTabs]);
         
        for (const tab of allTabs) {
          if (tempImageFiles[`${tab}Imgs`].some(file => file)) {
            updatedTabs.add(tab);
          }
        }
         
        setAvailableTabs([...updatedTabs]);
      }
       
      // Upload all changed images to the backend
      for (const tab of ['culture', 'people', 'workplace']) {
        const files = tempImageFiles[`${tab}Imgs`];
         
        for (let i = 0; i < files.length; i++) {
          if (files[i]) {
            const formDataObj = new FormData();
            formDataObj.append(uploadFieldNames[tab], files[i]);
            formDataObj.append("image_indexes", i.toString());

            const apiUrl = `${BASEURL}/company-inside-${tab}`;
            const response = await fetch(apiUrl, {
              method: "PATCH",
              headers: {
                Authorization: `${token}`,
              },
              body: formDataObj,
            });

            if (!response.ok) {
              throw new Error(`Failed to upload ${tab} image ${i}`);
            }
          }
        }
      }

      // Reset temporary files and exit edit mode
      setTempImageFiles({
        cultureImgs: Array(3).fill(null),
        peopleImgs: Array(3).fill(null),
        workplaceImgs: Array(3).fill(null),
      });
      setIsEditing(false);
       
      // You might want to refresh the company data here
      // by calling an API or triggering a parent component refresh
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const getImageUrl = (tab, index) => {
    const backendImages = {
      culture: companyData?.inside_culture_images || [],
      people: companyData?.inside_people_images || [],
      workplace: companyData?.inside_workplace_images || []
    };

    // Show default image when in edit mode and no image exists yet
    if (isEditing && (!backendImages[tab] || !backendImages[tab][index])) {
      return "/api/placeholder/400/300";
    }

    const images = backendImages[tab];
    return images && images[index] 
      ? `${BASEIMAGEURL}${images[index]}`
      : "/api/placeholder/400/300";
  };

  // If we're editing, show all tabs; otherwise, show only tabs with content
  const tabsToShow = isEditing ? ["culture", "people", "workplace"] : availableTabs;
   
  // If there are no tabs to show and we're not editing, don't render the section
  if (tabsToShow.length === 0 && !isEditing) {
    return null;
  }
  const handleEditClick = () => {
    navigate('/employers-dashboard/company-profile/?edit=images')
  }

  return (
    <section className="inside-company py-12">
      <div className="auto-container w-[90%] mx-auto">
        <div className="sec-title text-center mb-6">
          <p className="font-bold text-xl sm:text-3xl text-black">
            Inside {companyData?.company_name || "Company"}
          </p>
        </div>

        {/* <div className="flex justify-end mb-4">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 transition-colors duration-200 font-medium rounded-md px-5 py-2.5 flex items-center gap-2"
            onClick={() => handleEditClick()}
          >
            <Edit />
            Edit 
          </button>
        </div> */}

        {tabsToShow.length > 0 && (
          <div className="w-full flex flex-col justify-center align-middle">
            {/* Tab Navigation */}
            <div className="w-full flex justify-center mb-6">
              <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${
                tabsToShow.length === 1 ? 'w-[200px]' : 
                tabsToShow.length === 2 ? 'w-[400px]' : 
                'w-full sm:w-[600px]'
              }`}>
                <div className={`grid w-full ${
                  tabsToShow.length === 1 ? '' :
                  tabsToShow.length === 2 ? 'grid-cols-2' : 
                  'grid-cols-3'
                }`}>
                  {tabsToShow.includes("culture") && (
                    <button
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        activeTab === "culture" 
                          ? "bg-white text-gray-950 shadow-sm" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setActiveTab("culture")}
                    >
                      Culture
                    </button>
                  )}
                  {tabsToShow.includes("people") && (
                    <button
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        activeTab === "people" 
                          ? "bg-white text-gray-950 shadow-sm" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setActiveTab("people")}
                    >
                      People
                    </button>
                  )}
                  {tabsToShow.includes("workplace") && (
                    <button
                      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                        activeTab === "workplace" 
                          ? "bg-white text-gray-950 shadow-sm" 
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      onClick={() => setActiveTab("workplace")}
                    >
                      Workplace
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            {tabsToShow.includes("culture") && activeTab === "culture" && (
              <div className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2">
                <div className="w-full rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative h-auto lg:h-full">
                      <img
                        src={getImageUrl('culture', 2)}
                        alt="Culture 3"
                        className="w-full h-[300px] lg:h-full object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => openImageModal(2)}
                          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Change Image
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
                      {[0, 1].map((index) => (
                        <div key={index} className="relative">
                          <img
                            src={getImageUrl('culture', index)}
                            alt={`Culture ${index + 1}`}
                            className="w-full h-[250px] object-cover rounded-lg"
                          />
                          {isEditing && (
                            <button
                              onClick={() => openImageModal(index)}
                              className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Change Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tabsToShow.includes("people") && activeTab === "people" && (
              <div className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2">
                <div className="w-full rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative h-auto lg:h-full">
                      <img
                        src={getImageUrl('people', 2)}
                        alt="People 3"
                        className="w-full h-[300px] lg:h-full object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => openImageModal(2)}
                          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Change Image
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
                      {[0, 1].map((index) => (
                        <div key={index} className="relative">
                          <img
                            src={getImageUrl('people', index)}
                            alt={`People ${index + 1}`}
                            className="w-full h-[250px] object-cover rounded-lg"
                          />
                          {isEditing && (
                            <button
                              onClick={() => openImageModal(index)}
                              className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Change Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tabsToShow.includes("workplace") && activeTab === "workplace" && (
              <div className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2">
                <div className="w-full rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="relative h-auto lg:h-full">
                      <img
                        src={getImageUrl('workplace', 2)}
                        alt="Workplace 3"
                        className="w-full h-[300px] lg:h-full object-cover rounded-lg"
                      />
                      {isEditing && (
                        <button
                          onClick={() => openImageModal(2)}
                          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          Change Image
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-1 gap-4">
                      {[0, 1].map((index) => (
                        <div key={index} className="relative">
                          <img
                            src={getImageUrl('workplace', index)}
                            alt={`Workplace ${index + 1}`}
                            className="w-full h-[250px] object-cover rounded-lg"
                          />
                          {isEditing && (
                            <button
                              onClick={() => openImageModal(index)}
                              className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                            >
                              Change Image
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {isEditing && (
          <div className="flex justify-center mt-6">
            <button
              onClick={handleUpdate}
              className="mt-6 px-4 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-800 transition-colors"
            >
              Update
            </button>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
            <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-gray-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
              <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                  Change Image
                </h2>
              </div>
              <div className="p-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 h-10 px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InsideCompany;