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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1023);
  const [showAllIndustries, setShowAllIndustries] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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

  const handleApplyFilters = () => {
    const currentParams = Object.fromEntries(searchParams);
    setSearchParams(currentParams);
    
    // Close the offcanvas on mobile after applying filters
    if (isMobile) {
      const offcanvas = document.getElementById('filter-sidebar');
      if (offcanvas) {
        const bsOffcanvas = window.bootstrap.Offcanvas.getInstance(offcanvas);
        if (bsOffcanvas) {
          bsOffcanvas.hide();
        }
      }
    }
  };

  const handleClearAll = () => {
    setSearchParams({});
  };

  const industries = [
    { label: 'BFSI', count: 198 },
    { label: 'Manufacturing', count: 94 },
    { label: 'IT Services', count: 54 },
    { label: 'Hospitality', count: 53 },
    { label: 'Retail', count: 47 },
    // Add more industries if needed
  ];

  const jobTypes = [
    { label: 'Full Time', count: 448, checked: true },
    // Add more job types if needed
  ];

  const experienceLevels = [
    { label: 'Experience', count: 292 },
    { label: 'Fresher', count: 156 },
  ];

  const workModes = [
    { label: 'Onsite', count: 446 },
    { label: 'Hybrid', count: 1 },
    { label: 'Remote', count: 1 },
  ];

  return (
    <div className="filter-sidebar bg-white rounded-xl p-6 w-full max-w-xs">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">All Filters</h3>
        <button className="border border-gray-300 rounded px-3 py-1 text-sm" onClick={handleClearAll}>Clear all</button>
      </div>

      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Search By Location</h4>
        <LocationBox onLocationChange={(location) => updateSearchParams('location', location)} />
      </div>

      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Industry</h4>
        <Categories onCategorySelect={(category) => updateSearchParams('category', category)} showAll={showAllIndustries} />
        {!showAllIndustries && (
          <button className="mt-3 w-full border border-red-500 text-red-500 rounded py-2 text-sm" onClick={() => setShowAllIndustries(true)}>
            Show More
          </button>
        )}
      </div>

      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Job Type</h4>
        <JobType onJobTypeChange={(jobType) => updateSearchParams('jobType', jobType)} />
      </div>

      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Experience Level</h4>
        <ExperienceLevel onExperienceLevelChange={(level) => updateSearchParams('experienceLevel', level)} />
      </div>

      <div className="mb-2">
        <h4 className="text-base font-semibold mb-2">Work Mode</h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center justify-between text-sm">
            <span>
              <input type="checkbox" className="mr-2" onChange={e => updateSearchParams('workMode', e.target.checked ? 'Onsite' : undefined)} checked={searchParams.get('workMode') === 'Onsite'} /> Onsite
            </span>
            <span>446</span>
          </label>
          <label className="flex items-center justify-between text-sm">
            <span>
              <input type="checkbox" className="mr-2" onChange={e => updateSearchParams('workMode', e.target.checked ? 'Hybrid' : undefined)} checked={searchParams.get('workMode') === 'Hybrid'} /> Hybrid
            </span>
            <span>1</span>
          </label>
          <label className="flex items-center justify-between text-sm">
            <span>
              <input type="checkbox" className="mr-2" onChange={e => updateSearchParams('workMode', e.target.checked ? 'Remote' : undefined)} checked={searchParams.get('workMode') === 'Remote'} /> Remote
            </span>
            <span>1</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar