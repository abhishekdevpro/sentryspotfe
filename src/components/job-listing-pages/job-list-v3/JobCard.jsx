import { Link } from "react-router-dom";
import { BsBriefcase, BsGeoAlt, BsBuilding, BsHeart, BsHeartFill } from 'react-icons/bs';
import { FiAward } from 'react-icons/fi';

const JobCard = ({ 
  job, 
  onSaveJob, 
  onApplyJob, 
  isLoading = false,
  actionStatus = {},
  showApplyButton = true,
  showSaveButton = true,
  cardClassName = "",
  onCardClick = null
}) => {
  const {
    id,
    logo,
    company_name,
    created_at,
    job_title,
    location,
    complete_address,
    city,
    salary_min,
    salary_max,
    freshers_can_apply,
    skills = [],
    job_type_name = [],
    job_category_name = [],
    industry,
    experience_level_min_name,
    experience_level_max_name,
    functional_area_name,
    is_favorite,
    is_applied
  } = job;

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const hours = Math.floor((Date.now() - new Date(dateString)) / (1000 * 60 * 60));
    return `${hours} hours ago`;
  };

  const formatSalary = () => {
    if (salary_min && salary_max) {
      return (
        <>
          <span className="font-bold text-gray-900">₹</span>
          {salary_min} - {salary_max} / month
        </>
      );
    }
    return "Salary Not Specified";
  };

  const getLocationText = () => {
    return location || complete_address || city || "Location Not Specified";
  };

  const getExperienceText = () => {
    let text = experience_level_min_name || 'Not Specified';
    if (experience_level_max_name) {
      text += ` - ${experience_level_max_name}`;
    }
    return text;
  };

  const formatPostedDate = () => {
    if (!created_at) return "Posted Date Not Available";
    return `Posted ${new Date(created_at).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const handleCardClick = () => {
    if (onCardClick) {
      onCardClick(job);
    }
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    if (onSaveJob) {
      await onSaveJob(id);
    }
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    if (onApplyJob) {
      onApplyJob(id);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col transition-all duration-200 hover:shadow-md ${cardClassName} ${onCardClick ? 'cursor-pointer' : ''}`}
      style={{ minHeight: '280px' }}
      onClick={handleCardClick}
    >
      {/* Top Row: Logo, Company, Heart */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img
            src={logo || "/images/resource/company-logo/1-1.png"}
            alt="company logo"
            className="w-10 h-10 rounded-full border border-gray-200 object-contain mr-3"
          />
          <div>
            <div className="font-semibold text-gray-900">{job_title}</div>
            {/* <div className="text-gray-500 text-sm">{formatTimeAgo(created_at)}</div> */}
          </div>
        </div>
        {showSaveButton && (
          <button
            onClick={handleSaveClick}
            className="p-1 hover:bg-gray-50 rounded-full transition-colors"
            style={{ zIndex: 2 }}
            aria-label="Save Job"
            disabled={actionStatus[id] === "saving"}
          >
            {is_favorite ? (
              <BsHeartFill className="text-red-500 text-xl" />
            ) : (
              <BsHeart className="text-gray-400 text-xl hover:text-red-500 transition-colors" />
            )}
          </button>
        )}
      </div>

      {/* Job Title */}
      {/* <div className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">{job_title}</div> */}

      {/* Location */}
      <div className="flex items-center text-gray-600 mb-3">
        <BsGeoAlt className="mr-2 flex-shrink-0" />
        <span className="truncate">{getLocationText()}</span>
      </div>

      {/* Salary & Freshers */}
      <div className="flex items-center mb-3 flex-wrap gap-2">
        <span className="flex items-center text-gray-600">
          <BsBriefcase className="mr-1 flex-shrink-0" />
          <span className="text-sm">{formatSalary()}</span>
        </span>
        {freshers_can_apply && (
          <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-medium">
            Freshers can apply
          </span>
        )}
      </div>

      {/* Skills Tags */}
      {skills.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1">
          {skills.slice(0, 3).map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-xs">
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-xs">
              +{skills.length - 3} More
            </span>
          )}
        </div>
      )}

      {/* Job Type and Category Tags */}
      <div className="mb-3 flex flex-wrap gap-1">
        {Array.isArray(job_type_name) && job_type_name.map((type, idx) => (
          <span key={`type-${idx}`} className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs">
            {type}
          </span>
        ))}
        {Array.isArray(job_category_name) && job_category_name.slice(0, 2).map((cat, idx) => (
          <span key={`cat-${idx}`} className="px-2 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs">
            {cat}
          </span>
        ))}
      </div>

      {/* Extra Info: Industry, Experience, Functional Area */}
      <div className="mb-3 flex flex-wrap gap-1">
        <span className="px-2 py-1 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-full text-xs flex items-center">
          <BsBuilding className="mr-1" />
          {industry || 'Industry Not Specified'}
        </span>
        <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs flex items-center">
          <FiAward className="mr-1" />
          Experience: {getExperienceText()}
        </span>
        <span className="px-2 py-1 bg-gray-50 text-gray-600 border border-gray-200 rounded-full text-xs flex items-center">
          <BsBriefcase className="mr-1" />
          {functional_area_name || 'Functional Area Not Specified'}
        </span>
      </div>

      {/* Posted Date */}
      <div className="text-gray-500 text-sm mb-4">
        {formatPostedDate()}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-2 mt-auto">
        <Link
          to={`/job-single-v3/${id}`}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          View Job
        </Link>
        {showApplyButton && (
          <button
            onClick={handleApplyClick}
            disabled={is_applied || actionStatus[id] === "applying"}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
              is_applied || actionStatus[id] === "applied"
                ? 'bg-green-500 text-white cursor-not-allowed'
                : actionStatus[id] === "applying"
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-blue-900 text-white hover:bg-blue-700'
            }`}
          >
            {is_applied || actionStatus[id] === "applied" 
              ? 'Applied' 
              : actionStatus[id] === "applying" 
              ? 'Applying...' 
              : 'Quick Apply'
            }
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;