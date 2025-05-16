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
    <div className="p-4">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium   ${
              activeTab === tab.id
                ? "border-b-2 border-black text-black"
                : " text-gray-700"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tabContent[activeTab] && (
        <div className="">
          <div className="flex items-center mb-6">
            <div className="TabContentHeadr">
              <img src="https://htmlsentryspot.vercel.app/img/Tab1.webp" />
              <div className="TabIMgContent">
                <h4>Health and Safety</h4>
                <p>#1 Most popular topic on Hurak</p>
                <a href>Explore Health and Safety Courses</a>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tabContent[activeTab].courses.map((course, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={course.img}
                  alt={course.title}
                  className="w-full h-40 object-cover mb-4"
                />
                <h6 className="text-lg font-semibold">{course.title}</h6>
                <p className="text-gray-500">{course.providers}</p>
                <h5 className="text-xl font-bold mt-2">{course.price}</h5>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* <Link to={"/job-list-v7#tab3"}>
        <button
          type="button"
          className="mt-5 w-full bg-pink-600 hover:bg-pink-700 hover:text-blue-900 text-white rounded-xl py-4 px-4 text-lg"
        >
          Explore All Coureses
        </button>
      </Link> */}
      <div className="BlogBtn">
        <Link to={"/job-list-v7#tab3"}>
          {" "}
          <button type="button">Explore All Coureses</button>
        </Link>
      </div>
    </div>
  );
};

export default CoursesTabs;
