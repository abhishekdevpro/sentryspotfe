import React, { useEffect, useState } from "react";
import axios from "axios";
import "./JobType.css";

const JobType = () => {
  const [jobTypes, setJobTypes] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/job-types");
        setJobTypes(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error("Error fetching job types:", error);
        setJobTypes([]);
      }
    };

    fetchJobTypes();
  }, []);

  const handleJobTypeToggle = (id) => {
    setSelectedJobTypes((prev) =>
      prev.includes(id) ? prev.filter((typeId) => typeId !== id) : [...prev, id]
    );
  };

  return (
    <div className="job-type-container">
      <ul className="job-type-list">
        {jobTypes.map((jobType) => (
          <li key={jobType.id} className="job-type-item">
            <label className="job-type-label flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedJobTypes.includes(jobType.id)}
                  onChange={() => handleJobTypeToggle(jobType.id)}
                />
                <div
                  className="w-11 h-6 bg-gray-200 rounded-xl peer peer-checked:bg-blue-500 
                             peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800"
                ></div>
                <div
                  className="absolute left-1 top-1 w-4 h-4 bg-white rounded-xl 
                             transition-all duration-300 ease-in-out peer-checked:translate-x-5"
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                {jobType.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobType;