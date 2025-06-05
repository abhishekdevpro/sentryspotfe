import React, { useState } from "react";
import { Link } from "react-router-dom";
import tab1 from "./img/Tab1.webp";
import tab2 from "./img/InnerSlider.webp";

const CoursesTabs = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabs = [
    { id: "1", title: "Health and Safety" },
    { id: "2", title: "First Aid" },
    { id: "3", title: "Security" },
    { id: "4", title: "Hospitality" },
    { id: "5", title: "Teaching & Academics" },
    { id: "6", title: "Construction" },
  ];

  const tabContent = {
    1: {
      img: "https://htmlsentryspot.vercel.app/img/Tab1.webp",
      header: "Health and Safety",
      description: "#1 Most popular topic on Hurak",
      link: "Explore Health and Safety Courses",
      courses: [
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
      ],
    },
    2: {
      img: "https://htmlsentryspot.vercel.app/img/Tab1.webp",
      header: "Health and Safety",
      description: "#1 Most popular topic on Hurak",
      link: "Explore Health and Safety Courses",
      courses: [
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
      ],
    },
    3: {
      img: "https://htmlsentryspot.vercel.app/img/Tab1.webp",
      header: "Health and Safety",
      description: "#1 Most popular topic on Hurak",
      link: "Explore Health and Safety Courses",
      courses: [
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
        {
          img: "https://htmlsentryspot.vercel.app/img/InnerSlider.webp",
          title: "IOSH Working Safely Course",
          providers: "1 Course Providers",
          price: "£107",
        },
      ],
    },
    // Add other tab content here similarly for other tabs (2, 3, 4, etc.)
  };

  return (
    <div className="p-2 sm:p-4 max-w-full">
      {/* Tabs - Now scrollable on mobile */}
      <div className="overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 mb-6 border-b-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 sm:px-4 py-2 font-medium whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? "border-b-2 border-black text-black"
                  : "text-gray-700"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {tabContent[activeTab] && (
        <div className="w-full">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 gap-4">
            <div className="TabContentHeadr w-full sm:w-auto">
              <img 
                src="https://htmlsentryspot.vercel.app/img/Tab1.webp" 
                className="w-full sm:w-auto h-auto object-cover rounded-lg"
              />
              <div className="TabIMgContent hidden sm:block p-4 sm:p-6">
                <h4 className="text-lg sm:text-xl font-bold mb-2 break-words">Health and Safety</h4>
                <p className="text-sm sm:text-base text-gray-600 mb-2 break-words">#1 Most popular topic on Hurak</p>
                <a href className="text-blue-600 hover:text-blue-800 text-sm sm:text-base inline-block">Explore Health and Safety Courses</a>
              </div>
            </div>
          </div>

          {/* Courses - Adjusted grid for better mobile display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {tabContent[activeTab].courses.map((course, index) => (
              <div
                key={index}
                className="p-3 sm:p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col"
              >
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-32 sm:h-40 object-cover mb-3 sm:mb-4 rounded"
                />
                <div className="flex-grow">
                  <h6 className="text-base sm:text-lg font-semibold line-clamp-2 mb-2 break-words">{course.title}</h6>
                  <p className="text-sm sm:text-base text-gray-500 mb-2">{course.providers}</p>
                  <h5 className="text-lg sm:text-xl font-bold">{course.price}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="BlogBtn mt-6">
        <Link to={"/job-list-v7#tab3"} className="block w-full">
          <button 
            type="button"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            Explore All Courses
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CoursesTabs;
