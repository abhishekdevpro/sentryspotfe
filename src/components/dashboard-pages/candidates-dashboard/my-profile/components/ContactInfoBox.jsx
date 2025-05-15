// import { useState } from "react";
// import ResumeUpload from "./my-profile/ResumeUpload";

// const ContactInfoBox = ({ onNext }) => {
//   const [resumeFile, setResumeFile] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);
//   const [showSampleVideo, setShowSampleVideo] = useState(false);
//   const [videoError, setVideoError] = useState("");

//   const handleResumeChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const allowedFormats = [
//         "application/pdf",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!allowedFormats.includes(file.type)) {
//         alert("Only PDF and DOCX files are allowed.");
//         setResumeFile(null);
//       } else if (file.size > 10 * 1024 * 1024) {
//         alert("File size should not exceed 10 MB.");
//         setResumeFile(null);
//       } else {
//         setResumeFile(file);
//       }
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 50 * 1024 * 1024) {
//         setVideoError("File size should not exceed 50 MB.");
//         setVideoFile(null);
//       } else {
//         setVideoError("");
//         setVideoFile(file);
//       }
//     }
//   };

//   const handleRemoveVideo = () => {
//     setVideoFile(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     onNext();
//   };

//   return (
//     <form className="default-form" onSubmit={handleSubmit}>
//       <div className="row">
//         {/* Resume Upload */}
//         <div className="form-group flex gap-10 col-lg-12 col-md-12 mb-5">
//           <label className="w-1/4">Attach Resume</label>
//           <div className="w-full">
//             <input
//               type="file"
//               accept=".pdf, .docx"
//               onChange={handleResumeChange}
//               className="border h-10 w-full rounded-lg p-2"
//             />
//             {resumeFile && (
//               <p className="text-green-500">Uploaded: {resumeFile.name}</p>
//             )}
//             <p className="text-gray-600">
//               Accepts PDF or DOCX (max size: 10 MB).
//             </p>
//           </div>
//         </div>

//         {/* Video Upload */}
//         <div className="form-group flex gap-10 col-lg-12 col-md-12 my-5">
//           <label className="w-1/4">Upload Video Profile</label>
//           <div className="w-full">
//             <input
//               type="file"
//               accept="video/*"
//               onChange={handleVideoChange}
//               className="border h-10 w-full rounded-lg p-2"
//             />
//             {videoError && <p className="text-red-500">{videoError}</p>}
//             {videoFile && (
//               <div className="flex items-center mt-2 gap-2">
//                 <p className="text-green-500">Uploaded: {videoFile.name}</p>
//                 <button
//                   type="button"
//                   className="text-red-500 underline"
//                   onClick={handleRemoveVideo}
//                 >
//                   Remove
//                 </button>
//               </div>
//             )}
//             <button
//               type="button"
//               className="text-blue-500 underline mt-2"
//               onClick={() => setShowSampleVideo(true)}
//             >
//               View sample here
//             </button>
//             <p className="text-gray-600">
//               Upload a video file (max size: 50 MB, max length: 60 seconds).
//             </p>
//           </div>
//         </div>

//         {/* Video Sample Popup */}
//         {showSampleVideo && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg p-5 max-w-lg">
//               <video controls width="100%">
//                 <source
//                   src="/path-to-your-video/Self-Intro-Video.webm"
//                   type="video/webm"
//                 />
//                 Your browser does not support the video tag.
//               </video>
//               <button
//                 className="mt-4 text-red-500 underline"
//                 onClick={() => setShowSampleVideo(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Cover Letter */}
//         <div className="form-group flex gap-10 col-lg-12 col-md-12 mt-5">
//           <label className="w-1/4">Cover Letter</label>
//           <div className="flex-col col-lg-10">
//             {/* <button className="float-end border p-2 mb-1 rounded-lg border-black">
//               + AI Assist
//             </button> */}
//             <textarea
//               name="coverLetter"
//               className="border h-60 w-full rounded-lg"
//               placeholder="Enter your cover letter"
//               required
//             />
//           </div>
//         </div>

//         <div className="form-group col-lg-12 col-md-12">
//           <button type="submit" class="theme-btn btn-style-one bg-blue-800">
//             Save &amp; Next ➤
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default ContactInfoBox;


import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const ContactInfoBox = ({ onNext }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSampleVideo, setShowSampleVideo] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const token = localStorage.getItem(Constant.USER_TOKEN)
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
            Authorization:token,
            "Content-Type": "multipart/form-data",
            // Add any authorization headers if needed
            // "Authorization": "Bearer your-token-here"
          },
          // onUploadProgress: (progressEvent) => {
          //   const percentCompleted = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   setUploadProgress(percentCompleted);
          // },
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
            {resumeFile && resumeFile[0] && (
              <p className="text-green-500">Uploaded: {resumeFile[0].name}</p>
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
            {videoFile && videoFile[0] && (
              <div className="flex items-center mt-2 gap-2">
                <p className="text-green-500">Uploaded: {videoFile[0].name}</p>
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