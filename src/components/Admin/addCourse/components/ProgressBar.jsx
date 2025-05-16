// import React from 'react';
// import PropTypes from 'prop-types';

// const ProgressBar = ({ activeTab }) => {
//   return (
//     <div className="widget-setcount">
//       <ul id="progressbar">
//         <li className={activeTab === "basic" ? "progress-active" : "progress-activated"}>
//           <p>
//             <span></span> Basic Information
//           </p>
//         </li>
//         <li
//           className={activeTab === "media" ? "progress-active" : activeTab === "settings" ? "progress-activated" : ""}
//         >
//           <p>
//             <span></span> Courses Media
//           </p>
//         </li>
//         <li className={activeTab === "settings" ? "progress-active" : ""}>
//           <p>
//             <span></span> Settings
//           </p>
//         </li>
//       </ul>
//     </div>
//   )
// }

// // Add PropTypes for validation
// ProgressBar.propTypes = {
//   activeTab: PropTypes.oneOf(['basic', 'media', 'settings']).isRequired
// }

// // Add default props
// ProgressBar.defaultProps = {
//   activeTab: 'basic'
// }

// export default ProgressBar
import React from "react";
import PropTypes from "prop-types";

const ProgressBar = ({ activeTab }) => {
  return (
    <div className="w-full flex justify-center">
      <ul className="flex space-x-6 md:space-x-10">
        <li
          className={`relative flex flex-col items-center text-sm font-medium ${
            activeTab === "basic" ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
              activeTab === "basic"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-400 bg-white"
            }`}
          >
            1
          </span>
          <p className="mt-2">Basic Information</p>
        </li>

        <li
          className={`relative flex flex-col items-center text-sm font-medium ${
            activeTab === "media"
              ? "text-blue-600"
              : activeTab === "settings"
              ? "text-gray-600"
              : "text-gray-400"
          }`}
        >
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
              activeTab === "media"
                ? "border-blue-600 bg-blue-600 text-white"
                : activeTab === "settings"
                ? "border-gray-600 bg-gray-600 text-white"
                : "border-gray-400 bg-white"
            }`}
          >
            2
          </span>
          <p className="mt-2">Courses Media</p>
        </li>

        <li
          className={`relative flex flex-col items-center text-sm font-medium ${
            activeTab === "settings" ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <span
            className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${
              activeTab === "settings"
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-gray-400 bg-white"
            }`}
          >
            3
          </span>
          <p className="mt-2">Settings</p>
        </li>
      </ul>
    </div>
  );
};

// Add PropTypes for validation
ProgressBar.propTypes = {
  activeTab: PropTypes.oneOf(["basic", "media", "settings"]).isRequired,
};

// Add default props
ProgressBar.defaultProps = {
  activeTab: "basic",
};

export default ProgressBar;
