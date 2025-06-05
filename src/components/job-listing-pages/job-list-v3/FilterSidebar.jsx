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

  return (
    <div className="inner-column">
      <div className="filters-outer">
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        <div className="filter-block mb-4">
          <h4 className="text-lg font-semibold mb-3">Search by Keywords</h4>
          <div className="form-group">
            <SearchBox 
              onSearch={(query) => updateSearchParams('keywords', query)} 
            />
          </div>
        </div>

        <div className="filter-block mb-4">
          <h4 className="text-lg font-semibold mb-3">Location</h4>
          <div className="form-group">
            <LocationBox 
              onLocationChange={(location) => updateSearchParams('location', location)} 
            />
          </div>
          
          {/* <p>Radius around selected destination</p>
          <DestinationRangeSlider 
            onRangeChange={(range) => updateSearchParams('radius', range)}
          /> */}
        </div>

        <div className="filter-block mb-4">
          <h4 className="text-lg font-semibold mb-3">Industries</h4>
          <div className="form-group">
            <Categories 
              onCategorySelect={(category) => updateSearchParams('category', category)} 
            />
          </div>
        </div>

        <div className="switchbox-outer mb-4">
          <h4 className="text-lg font-semibold mb-3">Job type</h4>
          <JobType 
            onJobTypeChange={(jobType) => updateSearchParams('jobType', jobType)}
          />
        </div>

        {/* <div className="checkbox-outer">
          <h4>Date Posted</h4>
          <DatePosted 
            onDateSelect={(dateRange) => updateSearchParams('datePosted', dateRange)}
          />
        </div> */}

        <div className="checkbox-outer mb-4">
          <h4 className="text-lg font-semibold mb-3">Experience Level</h4>
          <ExperienceLevel 
            onExperienceLevelChange={(level) => updateSearchParams('experienceLevel', level)}
          />
        </div>

        {/* <div className="filter-block">
          <h4>Salary</h4>
          <SalaryRangeSlider 
            onSalaryRangeChange={(range) => updateSearchParams('salaryRange', JSON.stringify(range))}
          />
        </div> */}

        {/* <div className="filter-block">
          <h4>Tags</h4>
          <Tag 
            onTagSelect={(tags) => updateSearchParams('tags', tags.join(','))}
          />
        </div> */}

        <div className="mt-6 px-3">
          <button
            type="button"
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar