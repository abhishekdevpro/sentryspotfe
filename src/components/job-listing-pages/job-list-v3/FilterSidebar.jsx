
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
        {/* <button
          type="button"
          className="lg:hidden absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button> */}

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