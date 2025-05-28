import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Phone, Share2, Calendar, User, FileText } from 'lucide-react';

const UserProfilePage = () => {
  const user_id = localStorage.getItem('USER_ID'); // Get user_id from localStorage
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('resume');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/public/user-profile/${user_id}`);
        setUserInfo(response.data.data.personal_details);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user_id]);

  const getFullName = () => {
    if (userInfo?.first_name) {
      return userInfo.last_name ? `${userInfo.first_name} ${userInfo.last_name}` : userInfo.first_name;
    }
    return "User";
  };

  const getLastLoginDate = () => {
    if (userInfo?.updated_at) {
      const date = new Date(userInfo.updated_at);
      return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    }
    return "N.A";
  };

  const getProfilePhoto = () => userInfo?.photo || "/api/placeholder/100/100";

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Header */}
      <div className="w-full">
        <div className="h-24 sm:h-32 bg-blue-900 bg-opacity-30"></div>
        <div className="px-2 sm:px-4 relative">
          <div className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2">
            <div className="rounded-full h-24 w-24 sm:h-32 sm:w-32 border-4 border-white bg-blue-600 overflow-hidden">
              <img
                src={getProfilePhoto()}
                alt={getFullName()}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="pt-16 sm:pt-20 pb-4 text-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-blue-900">{getFullName()}</h1>
            <div className="flex flex-col sm:flex-row justify-center mt-4 mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
              {userInfo?.phone && (
                <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm sm:text-base">
                  <Phone className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Call</span>
                </button>
              )}
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm sm:text-base">
                <Share2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User details */}
      <div className="px-2 sm:px-4 py-4 border-t border-b border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {userInfo?.current_location && (
            <div className="text-center p-2">
              <p className="text-gray-500 text-xs sm:text-sm">Current Location</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base">{userInfo.current_location}</p>
            </div>
          )}
          {userInfo?.preferred_location && (
            <div className="text-center p-2">
              <p className="text-gray-500 text-xs sm:text-sm">Preferred Location</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base">{userInfo.preferred_location.join(', ')}</p>
            </div>
          )}
          {userInfo?.email && (
            <div className="text-center p-2">
              <p className="text-gray-500 text-xs sm:text-sm">Email</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base break-words">{userInfo.email}</p>
            </div>
          )}
          {userInfo?.phone && (
            <div className="text-center p-2">
              <p className="text-gray-500 text-xs sm:text-sm">Phone</p>
              <p className="font-medium text-blue-900 text-sm sm:text-base">{userInfo.phone}</p>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-4">
          <div className="flex items-center text-gray-500 text-xs sm:text-sm">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span>Last Login: {getLastLoginDate()}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-2 sm:px-4 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'resume' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('resume')}
          >
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              RESUME
            </div>
          </button>
          <button
            className={`px-3 sm:px-4 py-2 sm:py-3 font-medium whitespace-nowrap text-sm sm:text-base ${
              activeTab === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              PROFILE
            </div>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="p-2 sm:p-4 bg-gray-200">
        <div className="p-3 sm:p-6 bg-white rounded shadow-sm">
          {activeTab === 'resume' && (
            <div>
              {userInfo?.resume ? (
                <div className="resume-content">
                  <iframe
                    src={`https://api.sentryspot.co.uk${userInfo.resume}`}
                    title="Resume"
                    className="w-full h-64 sm:h-96 border rounded"
                  ></iframe>
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
                </div>
              ) : (
                <div className="text-center py-4 text-gray-600 text-sm sm:text-base">
                  No Resume Found!
                </div>
              )}
            </div>
          )}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-medium text-blue-900">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userInfo?.job_seeker_uuid && (
                  <div className="p-2">
                    <p className="text-xs sm:text-sm text-gray-500">Job Seeker ID</p>
                    <p className="font-medium text-sm sm:text-base break-words">{userInfo.job_seeker_uuid}</p>
                  </div>
                )}
                {userInfo?.proffesional_title && (
                  <div className="p-2">
                    <p className="text-xs sm:text-sm text-gray-500">Professional Title</p>
                    <p className="font-medium text-sm sm:text-base">{userInfo.proffesional_title}</p>
                  </div>
                )}
                {userInfo?.sector_name && (
                  <div className="p-2">
                    <p className="text-xs sm:text-sm text-gray-500">Sector Name</p>
                    <p className="font-medium text-sm sm:text-base">{userInfo.sector_name}</p>
                  </div>
                )}
                {userInfo?.work_experience_name && (
                  <div className="p-2">
                    <p className="text-xs sm:text-sm text-gray-500">Work Experience</p>
                    <p className="font-medium text-sm sm:text-base">{userInfo.work_experience_name}</p>
                  </div>
                )}
                {userInfo?.job_applyer_skills?.length > 0 && (
                  <div className="p-2">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;