import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';

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

  const updateSearchParams = (key, value) => {
    const currentParams = Object.fromEntries(searchParams);
    if (value) {
      currentParams[key] = value;
    } else {
      delete currentParams[key];
    }
    setSearchParams(currentParams);
  };

  const handleClearAll = () => {
    setSearchParams({});
  };

  // Data arrays
  const industries = [
    { label: 'BFSI', count: 201 },
    { label: 'Manufacturing', count: 94 },
    { label: 'IT Services', count: 57 },
    { label: 'Hospitality', count: 53 },
    { label: 'Retail', count: 49 },
    { label: 'Healthcare', count: 30 },
    { label: 'Education', count: 25 },
    { label: 'Construction', count: 20 },
    { label: 'Logistics', count: 15 },
    { label: 'Others', count: 10 },
  ];

  const jobTypes = [
    { label: 'Full Time', count: 447 },
    { label: 'Part Time', count: 6 },
    { label: 'Internship', count: 2 },
  ];

  const experienceLevels = [
    { label: 'Experience', count: 299 },
    { label: 'Fresher', count: 156 },
  ];

  const workModes = [
    { label: 'Onsite', count: 446 },
    { label: 'Hybrid', count: 1 },
    { label: 'Remote', count: 1 },
  ];

  // Helper for checkbox checked state
  const isChecked = (key, value) => searchParams.get(key) === value;

  // For location input
  const locationValue = searchParams.get('location') || '';

  return (
    <div className="filter-sidebar bg-white rounded-xl p-6 w-full max-w-xs shadow-md font-poppins">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">All Filters</h3>
        <button className="border border-gray-300 rounded-lg px-4 py-1 text-sm hover:bg-gray-100 transition" onClick={handleClearAll}>Clear all</button>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Search By Location</h4>
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <FiMapPin className="text-gray-400 mr-2 text-lg" />
          <input
            type="text"
            className="bg-transparent outline-none w-full text-sm"
            placeholder="Choose city"
            value={locationValue}
            onChange={e => updateSearchParams('location', e.target.value)}
          />
        </div>
      </div>

      {/* Industry */}
      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Industry</h4>
        {(showAllIndustries ? industries : industries.slice(0, 5)).map((industry, idx) => (
          <label key={industry.label} className="flex items-center justify-between text-sm mb-2 cursor-pointer">
            <span className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-red-500"
                checked={isChecked('industry', industry.label)}
                onChange={e => updateSearchParams('industry', e.target.checked ? industry.label : undefined)}
              />
              {industry.label}
            </span>
            <span className="text-gray-500">{industry.count}</span>
          </label>
        ))}
        {!showAllIndustries && (
          <button
            className="mt-3 w-full border border-red-500 text-red-500 rounded py-2 text-sm hover:bg-red-50 transition"
            onClick={() => setShowAllIndustries(true)}
          >
            Show More
          </button>
        )}
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Job Type</h4>
        {jobTypes.map((jobType, idx) => (
          <label key={jobType.label} className="flex items-center justify-between text-sm mb-2 cursor-pointer">
            <span className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-red-500"
                checked={isChecked('jobType', jobType.label)}
                onChange={e => updateSearchParams('jobType', e.target.checked ? jobType.label : undefined)}
              />
              {jobType.label}
            </span>
            <span className="text-gray-500">{jobType.count}</span>
          </label>
        ))}
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <h4 className="text-base font-semibold mb-2">Experience Level</h4>
        {experienceLevels.map((level, idx) => (
          <label key={level.label} className="flex items-center justify-between text-sm mb-2 cursor-pointer">
            <span className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 accent-red-500"
                checked={isChecked('experienceLevel', level.label)}
                onChange={e => updateSearchParams('experienceLevel', e.target.checked ? level.label : undefined)}
              />
              {level.label}
            </span>
            <span className="text-gray-500">{level.count}</span>
          </label>
        ))}
      </div>

      {/* Work Mode */}
      <div className="mb-2">
        <h4 className="text-base font-semibold mb-2">Work Mode</h4>
        <div className="flex flex-col gap-2">
          {workModes.map((mode, idx) => (
            <label key={mode.label} className="flex items-center justify-between text-sm cursor-pointer">
              <span className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 accent-red-500"
                  checked={isChecked('workMode', mode.label)}
                  onChange={e => updateSearchParams('workMode', e.target.checked ? mode.label : undefined)}
                />
                {mode.label}
              </span>
              <span className="text-gray-500">{mode.count}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;