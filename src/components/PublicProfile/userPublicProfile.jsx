
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Phone, Share2, Calendar, User, FileText, Download, MapPin, Mail, Briefcase } from "lucide-react";
import { Constant } from "@/utils/constant/constant";

// Modular Components
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-2 sm:border-4 border-blue-900 border-t-transparent"></div>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="mx-2 sm:mx-4 bg-red-50 border border-red-200 text-red-700 px-3 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm">
    <p className="font-medium text-sm sm:text-base">Error</p>
    <p className="text-xs sm:text-sm mt-1">{message}</p>
  </div>
);

const InfoBadge = ({ label, value, icon: Icon }) => (
  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200 hover:shadow-sm transition-shadow">
    <div className="flex items-center gap-2 mb-2">
      {Icon && <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-900 flex-shrink-0" />}
      <p className="text-xs sm:text-sm font-medium text-gray-700">{label}</p>
    </div>
    <p className="text-sm sm:text-base font-semibold text-blue-900 break-words leading-tight">{value}</p>
  </div>
);

const StatusBadge = ({ label, value }) => (
  <div className="flex items-center justify-between p-2 sm:p-3 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
    <span className="text-xs sm:text-sm font-medium text-gray-700 pr-2">{label}</span>
    <span
      className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${
        value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  </div>
);

const EducationCard = ({ education }) => (
  <div className="bg-white border border-blue-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="space-y-2 sm:space-y-3">
      <h5 className="font-semibold text-blue-900 text-sm sm:text-lg leading-tight">{education.institute_name}</h5>
      <div className="grid grid-cols-1 gap-2 text-xs sm:text-sm">
        <div>
          <span className="font-medium text-gray-600">Course:</span>
          <span className="ml-2 text-blue-900">{education.course_type_name}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Year:</span>
          <span className="ml-2 text-blue-900">{education.graduation_year}</span>
        </div>
        <div>
          <span className="font-medium text-gray-600">Level:</span>
          <span className="ml-2 text-blue-900">{education.education_level_name}</span>
        </div>
      </div>
    </div>
  </div>
);

const ExperienceCard = ({ experience }) => (
  <div className="bg-white border border-blue-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="space-y-2 sm:space-y-3">
      <div>
        <h5 className="font-semibold text-blue-900 text-sm sm:text-lg leading-tight">{experience.job_title}</h5>
        <p className="text-gray-600 font-medium text-xs sm:text-base">{experience.organization}</p>
      </div>
      
      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{experience.description}</p>
      
      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
        <div>
          <span className="font-medium text-gray-600">Period:</span>
          <span className="ml-1 sm:ml-2 text-blue-900">
            {experience.time_period_start} - {experience.is_present === 1 ? "Present" : experience.time_period_end}
          </span>
        </div>
      </div>
    </div>
  </div>
);

const ProfileHeader = ({ userInfo, getFullName, getProfilePhoto, handleImageError, getLastLoginDate }) => (
  <div className="relative overflow-hidden">
    {/* Enhanced Cover Section */}
    <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
      <div className="absolute top-5 right-5 sm:top-10 sm:right-10 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-5 left-5 sm:bottom-10 sm:left-10 w-12 h-12 sm:w-24 sm:h-24 bg-blue-300/20 rounded-full blur-lg"></div>
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,0 100,0 80,100 0,100" fill="white" />
        </svg>
      </div>
    </div>
    
    {/* Profile Content */}
    <div className="relative -mt-16 sm:-mt-20 md:-mt-24 px-2 sm:px-4 lg:px-8">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-3 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-6">
          {/* Enhanced Profile Picture */}
          <div className="relative group flex-shrink-0">
            <div className="relative rounded-full h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 border-3 sm:border-4 border-white bg-white shadow-lg overflow-hidden">
              <img
                src={getProfilePhoto()}
                alt={getFullName()}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={handleImageError}
              />
            </div>
          </div>
          
          {/* Name, Title and Info */}
          <div className="flex-1 text-center sm:text-left w-full">
            <div className="mb-3 sm:mb-4">
              <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-1 sm:mb-2 leading-tight">
                {getFullName()}
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-gray-600 font-medium">
                {userInfo?.proffesional_title || "Professional"}
              </p>
            </div>
            
            {/* Quick Info Pills */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-1 sm:gap-2 mb-4 sm:mb-6">
              {userInfo?.current_location && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <MapPin className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  <span className="truncate max-w-[100px] sm:max-w-none">{userInfo.current_location}</span>
                </span>
              )}
              {userInfo?.work_experience_name && (
                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  <Briefcase className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{userInfo.work_experience_name}</span>
                </span>
              )}
            </div>
            
            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center sm:justify-start">
              {userInfo?.phone && (
                <button className="group relative overflow-hidden px-4 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <div className="relative flex items-center justify-center">
                    <Phone className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Call Now
                  </div>
                </button>
              )}
              <button className="group px-4 sm:px-6 py-2 sm:py-3 border-2 border-blue-900 text-blue-900 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-900 hover:text-white transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg text-sm sm:text-base">
                <div className="flex items-center justify-center">
                  <Share2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform duration-200" />
                  Share Profile
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Last Login Info */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center sm:justify-end text-xs sm:text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span>Last seen: {getLastLoginDate()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [education, setEducation] = useState([]);
  const [proffesional_details, setProffesionalDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("resume");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/user-profile`,
          {
            headers: {
              Authorization: localStorage.getItem(Constant.USER_TOKEN),
            },
          }
        );
        setUserInfo(response.data.data.personal_details);
        setEducation(response.data.data.education_details || []);
        setProffesionalDetails(response.data.data.professional_details || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const getFullName = () => {
    if (userInfo?.first_name) {
      return userInfo.last_name
        ? `${userInfo.first_name} ${userInfo.last_name}`
        : userInfo.first_name;
    }
    return "User";
  };

  const getLastLoginDate = () => {
    if (userInfo?.updated_at) {
      const date = new Date(userInfo.updated_at);
      return `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}`;
    }
    return "N.A";
  };

  const getProfilePhoto = () => {
    if (userInfo?.photo) {
      if (userInfo.photo.startsWith("/")) {
        return `https://api.sentryspot.co.uk${userInfo.photo}`;
      }
      return userInfo.photo;
    }
    return (
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(getFullName()) +
      "&background=1e3a8a&color=fff"
    );
  };

  const handleImageError = (e) => {
    e.target.src =
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(getFullName()) +
      "&background=1e3a8a&color=fff";
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Profile Header */}
      <ProfileHeader 
        userInfo={userInfo}
        getFullName={getFullName}
        getProfilePhoto={getProfilePhoto}
        handleImageError={handleImageError}
        getLastLoginDate={getLastLoginDate}
      />

      {/* User Details Cards */}
      <div className="px-2 sm:px-4 lg:px-8 py-4 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {userInfo?.current_location && (
            <InfoBadge
              icon={MapPin}
              label="Current Location"
              value={userInfo.current_location}
            />
          )}
          {userInfo?.work_experience_name && (
            <InfoBadge
              icon={Briefcase}
              label="Work Experience"
              value={userInfo.work_experience_name}
            />
          )}
          {userInfo?.email && (
            <InfoBadge
              icon={Mail}
              label="Email"
              value={userInfo.email}
            />
          )}
          {userInfo?.phone && (
            <InfoBadge
              icon={Phone}
              label="Phone"
              value={userInfo.phone}
            />
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4 sm:mb-6">
          <div className="flex border-b border-gray-200">
            {["resume", "profile"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-base transition-colors ${
                  activeTab === tab
                    ? "text-blue-900 bg-blue-50 border-b-2 border-blue-900"
                    : "text-gray-600 hover:text-blue-900 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center">
                  {tab === "resume" ? (
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  ) : (
                    <User className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  )}
                  <span className="hidden xs:inline">{tab.toUpperCase()}</span>
                  <span className="xs:hidden">{tab === "resume" ? "RESUME" : "PROFILE"}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-3 sm:p-4 lg:p-6">
            {activeTab === "resume" && (
              <div className="space-y-3 sm:space-y-4">
                {userInfo?.resume ? (
                  <>
                    {/* PDF Viewer - Fully Responsive */}
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src={`https://api.sentryspot.co.uk${userInfo.resume}`}
                        title="Resume"
                        className="w-full h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px] border-0"
                      />
                    </div>
                    
                    {/* Download Button */}
                    <div className="text-center">
                      <a
                        href={`https://api.sentryspot.co.uk${userInfo.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-md text-sm sm:text-base"
                      >
                        <Download className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Download Resume
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                    <p className="text-gray-600 text-base sm:text-lg font-medium">No Resume Found!</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 sm:mt-2">Please upload your resume to view it here.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6 sm:space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4 sm:mb-6 flex items-center">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {userInfo?.job_seeker_uuid && (
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">SentrySpot ID</p>
                        <p className="font-semibold text-blue-900 text-sm sm:text-base break-all">{userInfo.job_seeker_uuid}</p>
                      </div>
                    )}
                    {userInfo?.sector_name && (
                      <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border">
                        <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Sector</p>
                        <p className="font-semibold text-blue-900 text-sm sm:text-base">{userInfo.sector_name}</p>
                      </div>
                    )}
                  </div>

                  {/* Preferred Locations */}
                  {userInfo?.preferred_location && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Preferred Locations</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {userInfo.preferred_location.map((location, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-100 text-blue-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {userInfo?.job_applyer_skills?.length > 0 && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Skills</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {userInfo.job_applyer_skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-block bg-blue-900 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {userInfo?.additional_info?.languages && (
                    <div className="mb-4 sm:mb-6">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 sm:mb-3">Languages</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {userInfo.additional_info.languages.map((language, index) => (
                          <span
                            key={index}
                            className="inline-block bg-gray-200 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                          >
                            {language.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Education Section */}
                {education.length > 0 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-blue-900 mb-3 sm:mb-4">Education</h4>
                    <div className="space-y-3 sm:space-y-4">
                      {education.map((edu, index) => (
                        <EducationCard key={index} education={edu} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Professional Experience Section */}
                {proffesional_details.length > 0 && (
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-blue-900 mb-3 sm:mb-4">Professional Experience</h4>
                    <div className="space-y-3 sm:space-y-4">
                      {proffesional_details.map((exp, index) => (
                        <ExperienceCard key={index} experience={exp} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                {userInfo?.additional_info && (
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-3 sm:mb-4">Additional Information</h3>
                    <div className="grid grid-cols-1 gap-2 sm:gap-3">
                      <StatusBadge
                        label="Veteran or Ex-Military"
                        value={userInfo.additional_info.is_veteran_or_ex_military}
                      />
                      <StatusBadge
                        label="Reasonable Adjustments Required"
                        value={userInfo.additional_info.is_reasonable_adjustments}
                      />
                      <StatusBadge
                        label="Extended Work Schedules"
                        value={userInfo.additional_info.extended_work_schedules}
                      />
                      <StatusBadge
                        label="Has Handled Teams"
                        value={userInfo.additional_info.handled_team}
                      />
                      <StatusBadge
                        label="Willing to Relocate"
                        value={userInfo.additional_info.willing_to_relocate}
                      />
                      <StatusBadge
                        label="Willingness to Travel"
                        value={userInfo.additional_info.willingness_to_travel}
                      />
                      <StatusBadge
                        label="Work Permit for USA"
                        value={userInfo.additional_info.work_permit_usa}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;