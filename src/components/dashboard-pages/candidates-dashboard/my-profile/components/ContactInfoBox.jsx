import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const ContactInfoBox = ({ onNext }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSampleVideo, setShowSampleVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      cover_letter: "",
      resume_upload: null,
      intro_video_upload: null,
    }
  });

  const resumeFile = watch("resume_upload");
  const videoFile = watch("intro_video_upload");

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token
            }
          }
        );

        if (response.data.code === 200) {
          setProfileData(response.data.data);
          // Set cover letter from API response
          setValue("cover_letter", response.data.data.personal_details.cover_letter || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [token, setValue]);

  const handleRemoveVideo = () => {
    setValue("intro_video_upload", null);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setUploadProgress(0);
      
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("cover_letter", data.cover_letter);
      
      if (data.resume_upload && data.resume_upload[0]) {
        formData.append("resume_upload", data.resume_upload[0]);
      }
      
      if (data.intro_video_upload && data.intro_video_upload[0]) {
        formData.append("intro_video_upload", data.intro_video_upload[0]);
      }

      // Send the PUT request
      await axios.put(
        "https://api.sentryspot.co.uk/api/jobseeker/user-profile-resume",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      
      // If successful, proceed to next step
      onNext();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to upload. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateResumeFile = (files) => {
    if (!files || !files[0]) return true;
    
    const file = files[0];
    const allowedFormats = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    
    if (!allowedFormats.includes(file.type)) {
      return "Only PDF and DOCX files are allowed";
    }
    
    if (file.size > 10 * 1024 * 1024) {
      return "File size should not exceed 10 MB";
    }
    
    return true;
  };

  const validateVideoFile = (files) => {
    if (!files || !files[0]) return true;
    
    const file = files[0];
    
    if (file.size > 50 * 1024 * 1024) {
      return "File size should not exceed 50 MB";
    }
    
    return true;
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* Resume Upload */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 mb-5">
          <label className="w-1/4">Attach Resume</label>
          <div className="w-full">
            <input
              type="file"
              accept=".pdf, .docx"
              className="border h-10 w-full rounded-lg p-2"
              {...register("resume_upload", {
                validate: validateResumeFile
              })}
            />
            {errors.resume_upload && (
              <p className="text-red-500">{errors.resume_upload.message}</p>
            )}
            {profileData?.personal_details?.resume && (
              <p className="text-green-500">Current Resume: {profileData.personal_details.resume}</p>
            )}
            {resumeFile && resumeFile[0] && (
              <p className="text-green-500">New Upload: {resumeFile[0].name}</p>
            )}
            <p className="text-gray-600">
              Accepts PDF or DOCX (max size: 10 MB).
            </p>
          </div>
        </div>

        {/* Video Upload */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 my-5">
          <label className="w-1/4">Upload Video Profile</label>
          <div className="w-full">
            <input
              type="file"
              accept="video/*"
              className="border h-10 w-full rounded-lg p-2"
              {...register("intro_video_upload", {
                validate: validateVideoFile
              })}
            />
            {errors.intro_video_upload && (
              <p className="text-red-500">{errors.intro_video_upload.message}</p>
            )}
            {profileData?.personal_details?.intro_video_url && (
              <p className="text-green-500">Current Video: {profileData.personal_details.intro_video_url}</p>
            )}
            {videoFile && videoFile[0] && (
              <div className="flex items-center mt-2 gap-2">
                <p className="text-green-500">New Upload: {videoFile[0].name}</p>
                <button
                  type="button"
                  className="text-red-500 underline"
                  onClick={handleRemoveVideo}
                >
                  Remove
                </button>
              </div>
            )}
            <button
              type="button"
              className="text-blue-500 underline mt-2"
              onClick={() => setShowSampleVideo(true)}
            >
              View sample here
            </button>
            <p className="text-gray-600">
              Upload a video file (max size: 50 MB, max length: 60 seconds).
            </p>
          </div>
        </div>

        {/* Video Sample Popup */}
        {showSampleVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-5 max-w-lg">
              <video controls width="100%">
                <source
                  src="/path-to-your-video/Self-Intro-Video.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
              <button
                className="mt-4 text-red-500 underline"
                onClick={() => setShowSampleVideo(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Cover Letter */}
        <div className="form-group flex gap-10 col-lg-12 col-md-12 mt-5">
          <label className="w-1/4">Cover Letter</label>
          <div className="flex-col col-lg-10 w-full">
            <textarea
              className="border h-60 w-full rounded-lg p-2"
              placeholder="Enter your cover letter"
              {...register("cover_letter", { required: "Cover letter is required" })}
            />
            {errors.cover_letter && (
              <p className="text-red-500">{errors.cover_letter.message}</p>
            )}
          </div>
        </div>

        {/* Upload Progress */}
        {isSubmitting && uploadProgress > 0 && (
          <div className="form-group col-lg-12 col-md-12 mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-center mt-1">{uploadProgress}% Uploaded</p>
          </div>
        )}

        <div className="form-group col-lg-12 col-md-12 mt-5">
          <button 
            type="submit" 
            className="theme-btn btn-style-one bg-blue-800 text-white px-6 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Save & Next ➤"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;