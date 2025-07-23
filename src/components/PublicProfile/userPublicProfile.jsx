import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Phone, Share2, Calendar, User, FileText } from "lucide-react";
import { Constant } from "@/utils/constant/constant";

const UserProfilePage = () => {
  const user_id = localStorage.getItem("USER_ID"); // Get user_id from localStorage
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
  }, [user_id]);

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
      // If the photo URL is relative, prepend the API base URL
      if (userInfo.photo.startsWith("/")) {
        return `https://api.sentryspot.co.uk${userInfo.photo}`;
      }
      return userInfo.photo;
    }
    // Use a default avatar image
    return (
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(getFullName()) +
      "&background=0D8ABC&color=fff"
    );
  };

  const handleImageError = (e) => {
    // If image fails to load, set a fallback avatar
    e.target.src =
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(getFullName()) +
      "&background=0D8ABC&color=fff";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg shadow-md">
        {error}
      </div>
    );
  }
  const InfoBadge = ({ label, value }) => {
  return (
    <div className="flex gap-3 items-center">
      <p className="text-xs sm:text-sm text-gray-500">{label} : </p>
      <span
        className={` px-2 py-1 text-xs sm:text-sm rounded font-medium ${
          value ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}
      >
        {value ? "Yes" : "No"}
      </span>
    </div>
  );
};


  return (
    <div className="min-h-screen bg-gray-100  py-4">
      {/* Profile Header */}
      <div className="w-full">
        <div className="h-24 sm:h-32 bg-blue-900 bg-opacity-50" />
        <div className="px-2 sm:px-4 relative">
          <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2">
            <div className="rounded-full h-24 w-24 sm:h-32 sm:w-32 border-4 border-white bg-blue-600 overflow-hidden">
              <img
                src={getProfilePhoto()}
                alt={getFullName()}
                className="h-full w-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>
          <div className="pt-16 sm:pt-20 pb-4 text-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-900">
              {getFullName()}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              {userInfo?.proffesional_title || "nhoi too"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center mt-4 mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
              {userInfo?.phone && (
                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm sm:text-base hover:bg-blue-700 transition">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Call</span>
                </button>
              )}
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base hover:bg-gray-200 transition">
                <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User details */}
      <div className="px-2 sm:px-4 py-4 border-t border-b border-gray-200 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {userInfo?.current_location && (
            <div className="text-center">
              <p className="text-gray-500 text-xs sm:text-sm">
                Current Location
              </p>
              <p className="font-medium text-blue-900 text-sm sm:text-base">
                {userInfo.current_location}
              </p>
            </div>
          )}
          {userInfo?.work_experience_name && (
            <div className="text-center">
              <p className="text-gray-500 text-xs sm:text-sm">
                work Experience
              </p>
              {console.log(
                "Preferred Location:",
                userInfo.work_experience_name
              )}
              <p className="font-medium text-blue-900 text-sm sm:text-base">
                {userInfo.work_experience_name}
              </p>
            </div>
          )}
          {userInfo?.email && (
            <div className="text-center">
              <p className="text-gray-500 text-xs sm:text-sm">Email</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base break-words">
                {userInfo.email}
              </p>
            </div>
          )}
          {userInfo?.phone && (
            <div className="text-center">
              <p className="text-gray-500 text-xs sm:text-sm">Phone</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base">
                {userInfo.phone}
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <div className="flex items-center text-gray-500 text-xs sm:text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Last Login: {getLastLoginDate()}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-2 sm:px-4 border-b border-gray-200 bg-white">
        <div className="flex overflow-x-auto">
          {["resume", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 sm:px-4 py-2 sm:py-3 font-medium whitespace-nowrap text-sm sm:text-base transition ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              <div className="flex items-center">
                {tab === "resume" ? (
                  <FileText className="h-4 w-4 mr-1" />
                ) : (
                  <User className="h-4 w-4 mr-1" />
                )}
                {tab.toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="py-2  ">
        <div className=" sm:p-6 bg-white rounded ">
          {activeTab === "resume" && (
            <div>
              {userInfo?.resume ? (
                <>
                  <iframe
                    src={`https://api.sentryspot.co.uk${userInfo.resume}`}
                    title="Resume"
                    className="w-full h-64 sm:h-96 border rounded"
                  />
                  <div className="mt-4 text-center">
                    <a
                      href={`https://api.sentryspot.co.uk${userInfo.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm sm:text-base"
                    >
                      Download Resume
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-gray-600 text-sm sm:text-base">
                  No Resume Found!
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-blue-900">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userInfo?.job_seeker_uuid && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Job Seeker ID
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {userInfo.job_seeker_uuid}
                    </p>
                  </div>
                )}
                {userInfo?.proffesional_title && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Professional Title
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {userInfo.proffesional_title}
                    </p>
                  </div>
                )}
                {userInfo?.sector_name && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Sector Name
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {userInfo.sector_name}
                    </p>
                  </div>
                )}
                {userInfo?.preferred_location && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Preferred Location
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {userInfo.preferred_location.join(", ")}
                    </p>
                  </div>
                )}
                {userInfo?.job_applyer_skills?.length > 0 && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Skills</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {userInfo.job_applyer_skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {userInfo?.additional_info.languages && (
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Languages
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {userInfo.additional_info.languages
                        .join(", ")
                        .toUpperCase()}
                    </p>
                  </div>
                )}

                {/* Education */}
              </div>
              {/* Education Section */}
              {education.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm sm:text-base font-semibold text-blue-900">
                    Education
                  </h4>
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-white border border-blue-200 rounded-md p-3 space-y-1 text-sm text-blue-900"
                    >
                      <p>
                        <span className="font-medium">Institute:</span>{" "}
                        {edu.institute_name}
                      </p>
                      <p>
                        <span className="font-medium">Course Type:</span>{" "}
                        {edu.course_type_id}
                      </p>
                      <p>
                        <span className="font-medium">Graduation Year:</span>{" "}
                        {edu.graduation_year_id}
                      </p>
                      <p>
                        <span className="font-medium">Education Level:</span>{" "}
                        {edu.education_level_id}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Professional Experience Section */}
              {proffesional_details.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm sm:text-base font-semibold text-blue-900">
                    Professional Experience
                  </h4>
                  {proffesional_details.map((exp, index) => (
                    <div
                      key={index}
                      className="bg-white border border-blue-200 rounded-md p-3 space-y-1 text-sm text-blue-900"
                    >
                      <p>
                        <span className="font-medium">Organization:</span>{" "}
                        {exp.organization}
                      </p>
                      <p>
                        <span className="font-medium">Job Title:</span>{" "}
                        {exp.job_title}
                      </p>
                      <p>
                        <span className="font-medium">Description:</span>{" "}
                        {exp.description}
                      </p>
                      <p>
                        <span className="font-medium">Time Period:</span>{" "}
                        {exp.time_period_start} - {exp.time_period_end}
                      </p>
                      <p>
                        <span className="font-medium">Education Level:</span>{" "}
                        {exp.education_level_id}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {userInfo?.additional_info && (
                <>
                  <h3 className="text-base sm:text-lg font-medium text-blue-900 pt-4">
                    Additional Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    

                    <InfoBadge
                      label="Veteran or Ex-Military"
                      value={userInfo.additional_info.is_veteran_or_ex_military}
                    />
                    <InfoBadge
                      label="Reasonable Adjustments Required"
                      value={userInfo.additional_info.is_reasonable_adjustments}
                    />
                    <InfoBadge
                      label="Extended Work Schedules"
                      value={userInfo.additional_info.extended_work_schedules}
                    />
                    <InfoBadge
                      label="Has Handled Teams"
                      value={userInfo.additional_info.handled_team}
                    />
                    <InfoBadge
                      label="Willing to Relocate"
                      value={userInfo.additional_info.willing_to_relocate}
                    />
                    <InfoBadge
                      label="Willingness to Travel"
                      value={userInfo.additional_info.willingness_to_travel}
                    />
                    <InfoBadge
                      label="Work Permit for USA"
                      value={userInfo.additional_info.work_permit_usa}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
