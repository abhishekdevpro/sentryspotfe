// // import React, { useState, useEffect } from 'react';
// // import { useSearchParams } from 'react-router-dom';
// // import { FiMapPin } from 'react-icons/fi';

// // const FilterSidebar = () => {
// //   const [searchParams, setSearchParams] = useSearchParams();
// //   const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
// //   const [showAllIndustries, setShowAllIndustries] = useState(false);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setIsMobile(window.innerWidth <= 1023);
// //     };
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   const updateSearchParams = (key, value) => {
// //     const currentParams = Object.fromEntries(searchParams);
// //     if (value) {
// //       currentParams[key] = value;
// //     } else {
// //       delete currentParams[key];
// //     }
// //     setSearchParams(currentParams);
// //   };

// //   const handleClearAll = () => {
// //     setSearchParams({});
// //   };

// //   // Data arrays
// //   const industries = [
// //     { label: 'BFSI', count: 201 },
// //     { label: 'Manufacturing', count: 94 },
// //     { label: 'IT Services', count: 57 },
// //     { label: 'Hospitality', count: 53 },
// //     { label: 'Retail', count: 49 },
// //     { label: 'Healthcare', count: 30 },
// //     { label: 'Education', count: 25 },
// //     { label: 'Construction', count: 20 },
// //     { label: 'Logistics', count: 15 },
// //     { label: 'Others', count: 10 },
// //   ];

// //   const jobTypes = [
// //     { label: 'Full Time', count: 447 },
// //     { label: 'Part Time', count: 6 },
// //     { label: 'Internship', count: 2 },
// //   ];

// //   const experienceLevels = [
// //     { label: 'Experience', count: 299 },
// //     { label: 'Fresher', count: 156 },
// //   ];

// //   const workModes = [
// //     { label: 'Onsite', count: 446 },
// //     { label: 'Hybrid', count: 1 },
// //     { label: 'Remote', count: 1 },
// //   ];

// //   // Helper for checkbox checked state
// //   const isChecked = (key, value) => searchParams.get(key) === value;

// //   // For location input
// //   const locationValue = searchParams.get('location') || '';

// //   return (
// //     <div className="filter-sidebar bg-white rounded-xl p-6 w-full max-w-xs shadow-md font-poppins">
// //       <div className="flex items-center justify-between mb-6">
// //         <h3 className="text-xl font-semibold">All Filters</h3>
// //         <button className="border border-gray-300 rounded-lg px-4 py-1 text-sm hover:bg-gray-100 transition" onClick={handleClearAll}>Clear all</button>
// //       </div>

// //       {/* Location */}
// //       <div className="mb-6">
// //         <h4 className="text-base font-semibold mb-2">Search By Location</h4>
// //         <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
// //           <FiMapPin className="text-gray-400 mr-2 text-lg" />
// //           <input
// //             type="text"
// //             className="bg-transparent outline-none w-full text-sm"
// //             placeholder="Choose city"
// //             value={locationValue}
// //             onChange={e => updateSearchParams('location', e.target.value)}
// //           />
// //         </div>
// //       </div>

// //       {/* Industry */}
// //       <div className="mb-6">
// //         <h4 className="text-base font-semibold mb-2">Industry</h4>
// //         {(showAllIndustries ? industries : industries.slice(0, 5)).map((industry, idx) => (
// //           <label key={industry.label} className="flex items-center justify-between text-sm mb-2 cursor-pointer">
// //             <span className="flex items-center">
// //               <input
// //                 type="checkbox"
// //                 className="mr-2 accent-red-500"
// //                 checked={isChecked('industry', industry.label)}
// //                 onChange={e => updateSearchParams('industry', e.target.checked ? industry.label : undefined)}
// //               />
// //               {industry.label}
// //             </span>
// //             <span className="text-gray-500">{industry.count}</span>
// //           </label>
// //         ))}
// //         {!showAllIndustries && (
// //           <button
// //             className="mt-3 w-full border border-red-500 text-red-500 rounded py-2 text-sm hover:bg-red-50 transition"
// //             onClick={() => setShowAllIndustries(true)}
// //           >
// //             Show More
// //           </button>
// //         )}
// //       </div>

// //       {/* Job Type */}
// //       <div className="mb-6">
// //         <h4 className="text-base font-semibold mb-2">Job Type</h4>
// //         {jobTypes.map((jobType, idx) => (
// //           <label key={jobType.label} className="flex items-center justify-between text-sm mb-2 cursor-pointer">
// //             <span className="flex items-center">
// //               <input
// //                 type="checkbox"
// //                 className="mr-2 accent-red-500"
// //                 checked={isChecked('jobType', jobType.label)}
// //                 onChange={e => updateSearchParams('jobType', e.target.checked ? jobType.label : undefined)}
// //               />
// //               {jobType.label}
// //             </span>
// //             <span className="text-gray-500">{jobType.count}</span>
// //           </label>
// //         ))}
// //       </div>

// //       {/* Experience Level */}
// //       <div className="mb-6">
// //         <h4 className="text-base font-semibold mb-2">Experience Level</h4>
// //         {experienceLevels.map((level, idx) => (
// //           <label key={level.label} className="flex items-center justify-between text-sm mb-2 cursor-pointer">
// //             <span className="flex items-center">
// //               <input
// //                 type="checkbox"
// //                 className="mr-2 accent-red-500"
// //                 checked={isChecked('experienceLevel', level.label)}
// //                 onChange={e => updateSearchParams('experienceLevel', e.target.checked ? level.label : undefined)}
// //               />
// //               {level.label}
// //             </span>
// //             <span className="text-gray-500">{level.count}</span>
// //           </label>
// //         ))}
// //       </div>

// //       {/* Work Mode */}
// //       <div className="mb-2">
// //         <h4 className="text-base font-semibold mb-2">Work Mode</h4>
// //         <div className="flex flex-col gap-2">
// //           {workModes.map((mode, idx) => (
// //             <label key={mode.label} className="flex items-center justify-between text-sm cursor-pointer">
// //               <span className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   className="mr-2 accent-red-500"
// //                   checked={isChecked('workMode', mode.label)}
// //                   onChange={e => updateSearchParams('workMode', e.target.checked ? mode.label : undefined)}
// //                 />
// //                 {mode.label}
// //               </span>
// //               <span className="text-gray-500">{mode.count}</span>
// //             </label>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FilterSidebar;


// import React, { useState, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import Categories from "../components/Categories";
// import DatePosted from "../components/DatePosted";
// import DestinationRangeSlider from "../components/DestinationRangeSlider";
// import ExperienceLevel from "../components/ExperienceLevel";
// import JobType from "../components/JobType";
// import LocationBox from "../components/LocationBox";
// import SalaryRangeSlider from "../components/SalaryRangeSlider";
// import SearchBox from "../components/SearchBox";
// import Tag from "../components/Tag";

// // FilterSidebar Component with URL Parameter Management
// const FilterSidebar = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
  
//   // Handler functions for each filter type
//   const updateSearchParams = (key, value) => {
//     const currentParams = Object.fromEntries(searchParams);
    
//     if (value) {
//       currentParams[key] = value;
//     } else {
//       delete currentParams[key];
//     }
    
//     setSearchParams(currentParams);
//   };

//   return (
//     <div className="inner-column">
//       <div className="filters-outer">
//         <button
//           type="button"
//           className="btn-close text-reset close-filters show-1023"
//           data-bs-dismiss="offcanvas"
//           aria-label="Close"
//         ></button>

//         <div className="filter-block">
//           <h4>Search by Keywords</h4>
//           <div className="form-group">
//             <SearchBox 
//               onSearch={(query) => updateSearchParams('keywords', query)} 
//             />
//           </div>
//         </div>

//         <div className="filter-block">
//           <h4>Location</h4>
//           <div className="form-group">
//             <LocationBox 
//               onLocationChange={(location) => updateSearchParams('location', location)} 
//             />
//           </div>
          
//           {/* <p>Radius around selected destination</p>
//           <DestinationRangeSlider 
//             onRangeChange={(range) => updateSearchParams('radius', range)}
//           /> */}
//         </div>

//         <div className="filter-block">
//           <h4>Industries</h4>
//           <div className="form-group">
//             <Categories 
//               onCategorySelect={(category) => updateSearchParams('category', category)} 
//             />
//           </div>
//         </div>

//         <div className="switchbox-outer">
//           <h4>Job type</h4>
//           <JobType 
//             onJobTypeChange={(jobType) => updateSearchParams('jobType', jobType)}
//           />
//         </div>

//         {/* <div className="checkbox-outer">
//           <h4>Date Posted</h4>
//           <DatePosted 
//             onDateSelect={(dateRange) => updateSearchParams('datePosted', dateRange)}
//           />
//         </div> */}

//         <div className="checkbox-outer">
//           <h4>Experience Level</h4>
//           <ExperienceLevel 
//             onExperienceLevelChange={(level) => updateSearchParams('experienceLevel', level)}
//           />
//         </div>

//         {/* <div className="filter-block">
//           <h4>Salary</h4>
//           <SalaryRangeSlider 
//             onSalaryRangeChange={(range) => updateSearchParams('salaryRange', JSON.stringify(range))}
//           />
//         </div> */}

//         {/* <div className="filter-block">
//           <h4>Tags</h4>
//           <Tag 
//             onTagSelect={(tags) => updateSearchParams('tags', tags.join(','))}
//           />
//         </div> */}
//       </div>
//     </div>
//   );
// };
// export default FilterSidebar

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Categories from "../components/Categories";
import DatePosted from "../components/DatePosted";
import DestinationRangeSlider from "../components/DestinationRangeSlider";
import ExperienceLevel from "../components/ExperienceLevel";
import JobType from "../components/JobType";
import LocationBox from "../components/LocationBox";
import SalaryRangeSlider from "../components/SalaryRangeSlider";
import SearchBox from "../components/SearchBox";
import Tag from "../components/Tag";

// FilterSidebar Component with URL Parameter Management
const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
     
  // Handler functions for each filter type
  const updateSearchParams = (key, value) => {
    const currentParams = Object.fromEntries(searchParams);
        
    if (value) {
      currentParams[key] = value;
    } else {
      delete currentParams[key];
    }
        
    setSearchParams(currentParams);
  };

  return (
    <div className="w-full max-w-sm mx-auto mb-4">
      <div className="bg-white rounded-lg p-6 space-y-6 max-h-[600px] overflow-y-auto border border-gray-200 shadow-"
        style={{ scrollbarWidth: "none",scrollBehavior: "smooth", }}
      >
        {/* Close button for mobile */}
        <button
          type="button"
          className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Search by Keywords */}
        <div className="filter-section">
          <button 
            onClick={() => setSearchParams({})}
            className={`w-full px-4 py-2 mb-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 ${searchParams.toString() ? 'bg-red-500 text-white hover:bg-red-400 ' : 'opacity-50 cursor-not-allowed'}`}
            disabled={!searchParams.toString()}
          >
            Clear All Filters
          </button>
          <div className="py-2 border-t border-gray-200">
          
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Search by Keywords
          </h4>
          <div className="space-y-2">
            <SearchBox 
              onSearch={(query) => updateSearchParams('keywords', query)}
            />
          </div>
        </div>

        {/* Location */}
        <div className="filter-section">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Location
          </h4>
          <div className="space-y-2">
            <LocationBox 
              onLocationChange={(location) => updateSearchParams('location', location)}
            />
          </div>
          
          {/* Commented out radius slider */}
          {/* <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Radius around selected destination</p>
            <DestinationRangeSlider 
              onRangeChange={(range) => updateSearchParams('radius', range)}
            />
          </div> */}
        </div>

        {/* Industries */}
        <div className="filter-section">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Industries
          </h4>
          <div className="space-y-2">
            <Categories 
              onCategorySelect={(category) => updateSearchParams('category', category)}
            />
          </div>
        </div>

        {/* Job Type */}
        <div className="filter-section">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Job type
          </h4>
          <div className="space-y-2">
            <JobType 
              onJobTypeChange={(jobType) => updateSearchParams('jobType', jobType)}
            />
          </div>
        </div>

        {/* Commented out Date Posted */}
        {/* <div className="filter-section">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Date Posted
          </h4>
          <div className="space-y-2">
            <DatePosted 
              onDateSelect={(dateRange) => updateSearchParams('datePosted', dateRange)}
            />
          </div>
        </div> */}

        {/* Experience Level */}
        <div className="filter-section">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Experience Level
          </h4>
          <div className="space-y-2">
            <ExperienceLevel 
              onExperienceLevelChange={(level) => updateSearchParams('experienceLevel', level)}
            />
          </div>
        </div>

        {/* Commented out Salary Range */}
        {/* <div className="filter-section">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Salary
          </h4>
          <div className="space-y-2">
            <SalaryRangeSlider 
              onSalaryRangeChange={(range) => updateSearchParams('salaryRange', JSON.stringify(range))}
            />
          </div>
        </div> */}

        {/* Commented out Tags */}
        {/* <div className="filter-section">
          <h4 className="text-lg font-semibold text-gray-800 mb-3 border-b border-gray-200 pb-2">
            Tags
          </h4>
          <div className="space-y-2">
            <Tag 
              onTagSelect={(tags) => updateSearchParams('tags', tags.join(','))}
            />
          </div>
        </div> */}

        {/* Clear Filters Button */}
        
      </div>
    </div>
  );
};

export default FilterSidebar;