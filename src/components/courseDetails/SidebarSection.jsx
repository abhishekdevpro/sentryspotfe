
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from 'lucide-react';
import { toast } from "react-toastify";
import ShareButton from "./Sharebutton";
import { EnrollmentFormModal } from './EnrollPopup'; // Added import
import { Constant } from "@/utils/constant/constant";

const SidebarSection = ({ courseId, courseData, courseFeatureData }) => {
  const [showEnrollmentModal, setShowEnrollmentModal] = useState(false); // Added state
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const navigate = useNavigate();
  const [isClassAdded, setIsClassAdded] = useState([]);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTakeTest = () => {
    setShowTestModal(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      window.location.href = `/student/student-skilltest/${courseData.course_id}/${courseData.course_title}`;
    }, 2000);
  };

  const truncateLength = 100;
  const fullContent = courseFeatureData.learning_objectives || "";
  const isTruncated = fullContent.length > truncateLength;

  const handleEnrollClick = () => { // Updated function
    if (token) {
      setShowEnrollmentModal(true);
    } else {
      navigate("/");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        `https://api.novajobs.us/api/students/certificate/${courseId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate_${courseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Error downloading certificate:", error);
      toast.error("Failed to download certificate. Please try again.");
    }
  };

  const toggleClass = async (courseId, isFavorite) => {
    const updatedClasses = [...isClassAdded];
    updatedClasses[courseId] = !isFavorite;
    setIsClassAdded(updatedClasses);

    try {
      await axios.post(
        "https://api.novajobs.us/api/students/course-favorite",
        { course_id: courseId },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(isFavorite ? "Course removed from favorites!" : "Course added to favorites!");
    } catch (error) {
      console.error("Failed to update course favorites:", error);
      toast.error("You need to login first.");
      navigate("/");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://api.novajobs.us/api/students/buy",
        {
          amount: 1,
          course_id: Number(courseId),
          net_amount: 1,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Purchase Successful");
      setShowEnrollmentModal(false); // Updated to close the new modal
    } catch (error) {
      console.error("Error during purchase:", error);
      toast.error("There was an issue with the purchase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPlay = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.novajobs.us/api/students/streaming/${courseId}`,
        {
          responseType: "blob",
        }
      );

      const videoBlob = new Blob([response.data], { type: "video/mp4" });
      const videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error("Error fetching video:", error);
      toast.error("Unable to fetch video. Please try again later.");
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
      setVideoPlaying(true);
    }, 2000);
  };

  const isFavorite = isClassAdded[courseData.course_id];

  // New function to handle enrollment form submission
  const handleEnrollmentSubmit = async (formData) => {
    setLoading(true);
    try {
      console.log('Enrollment form data:', formData); // Log form data
      setShowEnrollmentModal(false); // Close modal
      toast.success('Enrollment successful!'); // Success message
    } catch (error) {
      console.error('Error during enrollment:', error);
      toast.error('There was an issue with the enrollment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:w-1/3 px-4">
      <div className="space-y-6">
        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative">
            {videoPlaying ? (
              videoUrl ? (
                <video 
                  controls 
                  className="w-full h-auto"
                  onLoadStart={() => setLoading(true)} 
                  onLoadedData={() => setLoading(false)}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  src={`https://api.novajobs.us${courseFeatureData.course_banner_image}`} 
                  alt="Course Banner" 
                  className="w-full h-auto"
                />
              )
            ) : (
              <button 
                onClick={handleVideoPlay} 
                className="relative w-full pt-[56.25%]"
              >
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader className="animate-spin" />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center transition-colors hover:bg-white">
                      <i className="fa-solid fa-play text-gray-800" />
                    </div>
                  </div>
                )}
              </button>
            )}
          </div>

          <div className="p-6">
            {courseFeatureData.course_price === 0 && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-green-500">FREE</h2>
                <p className="text-sm text-gray-600">
                  <span className="line-through mr-2">$99.00</span>
                  50% off
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => toggleClass(courseData.course_id, isFavorite)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  isFavorite && token
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <i className="feather icon-heart mr-2" />
                {isFavorite && token ? "Remove" : "Add to Wishlist"}
              </button>

              {/* <ShareButton 
                courseUrl={`http://localhost:3000/course-info/${courseData.course_id}`}
              /> */}
            </div>

            <div className="space-y-4 mt-6">
              {token && courseData.is_student_enroll ? (
                <button disabled className="w-full py-2 px-4 bg-gray-400 text-white rounded-md cursor-not-allowed">
                  Enrolled
                </button>
              ) : (
                <button
                  onClick={handleEnrollClick}
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Enroll Now
                </button>
              )}

              {token && courseData.is_student_enroll && courseData.is_certificate && (
                <button
                  onClick={handleDownload}
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Download Certificate
                </button>
              )}

              {token && (
                <button
                  onClick={() => setShowTestModal(true)}
                  className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  Take Test
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Includes Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold mb-4">Includes</h4>
          <ul className="space-y-3">
            <li>On-demand video</li>
            <li>Downloadable resources</li>
            <li>Full access</li>
            <li>Access on mobile screen</li>
            <li>Assignments</li>
            <li>Certificate of Completion</li>
          </ul>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold mb-4">Features</h4>
          <ul className="space-y-3">
            <li>
              Enrolled: <span>{courseFeatureData.enrolled_student_count}</span>
            </li>
            <li>
              Duration: <span>{courseFeatureData.time_spent_on_course}</span>
            </li>
            <li>
              Lectures: <span>{courseFeatureData.total_lectures}</span>
            </li>
            <li>
              Level: <span>{courseFeatureData.course_level_name}</span>
            </li>
          </ul>
        </div>

        {/* Learning Objectives Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h4 className="text-xl font-semibold mb-4">Learning Objective</h4>
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: isExpanded || !isTruncated 
                  ? fullContent 
                  : fullContent.slice(0, truncateLength) + '...',
              }}
              className="prose max-w-none"
            />
            {isTruncated && (
              <button
                onClick={toggleReadMore}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                {isExpanded ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>

        {/* Enrollment Form Modal */}
        {showEnrollmentModal && ( // Added new modal
          <EnrollmentFormModal
            isOpen={showEnrollmentModal}
            onClose={() => setShowEnrollmentModal(false)}
            onSubmit={handleEnrollmentSubmit}
          />
        )}

        {showTestModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Confirm Action</h3>
                <button onClick={() => setShowTestModal(false)} className="text-gray-500 hover:text-gray-700">
                  ×
                </button>
              </div>
              <p className="mb-6">Are you sure you want to take the test for this course?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowTestModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  // onClick={handleTakeTest}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    'Confirm and Take Test'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

SidebarSection.propTypes = {
  courseId: PropTypes.number.isRequired,
  courseFeatureData: PropTypes.shape({
    enrolled_student_count: PropTypes.number.isRequired,
    course_price: PropTypes.number.isRequired,
    time_spent_on_course: PropTypes.string.isRequired,
    total_lectures: PropTypes.number.isRequired,
    course_level_name: PropTypes.string.isRequired,
    learning_objectives: PropTypes.string.isRequired,
    course_banner_image: PropTypes.string.isRequired,
  }).isRequired,
  courseData: PropTypes.shape({
    course_id: PropTypes.number.isRequired,
    course_title: PropTypes.string.isRequired,
    is_student_enroll: PropTypes.bool.isRequired,
    is_certificate: PropTypes.bool.isRequired,
  }).isRequired,
};

export default SidebarSection;

