import React from 'react';
import PropTypes from 'prop-types';
import {
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  DollarSign,
  PoundSterling,
} from 'lucide-react'; // Import Lucide icons

const JobOverview = ({ jobData }) => {
  // Basic validation to check if jobData has the required fields
  if (!jobData || !jobData.job_title || !jobData.city) {
    return <div className="text-red-500">Invalid job data provided.</div>;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md ">
      <div className='pb-4 '>
        <h4 >Job Overview</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Posted */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Date Posted:</p>
            <p className="text-gray-900 font-medium">
            {new Date(jobData.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Expiration Date */}
        {/* <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Expiration Date:</p>
            <p className="text-gray-900 font-medium">
              {jobData.application_deadline || "Not specified"}
            </p>
          </div>
        </div> */}

        {/* Location */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
            <MapPin className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Location:</p>
            <p className="text-gray-900 font-medium">
              {jobData.city || "Not specified"}, {jobData.country || "Not specified"}
            </p>
          </div>
        </div>

        {/* Job Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Job Title:</p>
            <p className="text-gray-900 font-medium">{jobData.job_title}</p>
          </div>
        </div>

        {/* Hours */}
        {/* <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Hours:</p>
            <p className="text-gray-900 font-medium">{jobData.experience || "Not specified"}</p>
          </div>
        </div> */}

        {/* Rate */}
        {/* <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
            <DollarSign className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Rate:</p>
            <p className="text-gray-900 font-medium">{jobData.offered_salary || "Not specified"}</p>
          </div>
        </div> */}

        {/* Salary */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
            <PoundSterling className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Salary:</p>
            <p className="text-gray-900 font-medium">{jobData.salary || "Not specified"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Adding PropTypes for validation
JobOverview.propTypes = {
  jobData: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    application_deadline: PropTypes.string,
    city: PropTypes.string.isRequired,
    country: PropTypes.string,
    job_title: PropTypes.string.isRequired,
    experience: PropTypes.string,
    offered_salary: PropTypes.string,
    salary: PropTypes.string,
  }).isRequired,
};

export default JobOverview;
