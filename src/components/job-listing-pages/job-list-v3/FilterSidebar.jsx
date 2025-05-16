
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
    <div className="inner-column">
      <div className="filters-outer">
        <button
          type="button"
          className="btn-close text-reset close-filters show-1023"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>

        <div className="filter-block">
          <h4>Search by Keywords</h4>
          <div className="form-group">
            <SearchBox 
              onSearch={(query) => updateSearchParams('keywords', query)} 
            />
          </div>
        </div>

        <div className="filter-block">
          <h4>Location</h4>
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

        <div className="filter-block">
          <h4>Industries</h4>
          <div className="form-group">
            <Categories 
              onCategorySelect={(category) => updateSearchParams('category', category)} 
            />
          </div>
        </div>

        <div className="switchbox-outer">
          <h4>Job type</h4>
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

        <div className="checkbox-outer">
          <h4>Experience Level</h4>
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
      </div>
    </div>
  );
};
export default FilterSidebar