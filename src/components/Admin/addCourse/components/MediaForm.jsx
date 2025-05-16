import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const MediaTab = ({ courseData, handleFileChange, onPrevious, onContinue }) => {
  const [selectedVideo, setSelectedVideo] = useState(
    courseData.course_intro_video_url
  );
  const [videoSource, setVideoSource] = useState(
    courseData.youtube_url ? "youtube" : "upload"
  );

  // Update videoSource if courseData changes externally
  useEffect(() => {
    if (courseData.youtube_url) {
      setVideoSource("youtube");
    }
  }, [courseData.youtube_url]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedVideo(file.name);
      setVideoSource("upload");
      handleFileChange(e); // To propagate the change to the parent component

      // Clear YouTube URL when uploading a file
      handleFileChange({
        target: {
          name: "youtube_url",
          value: "",
          type: "text",
        },
      });
    }
  };

  const handleYoutubeUrlChange = (e) => {
    const url = e.target.value;

    // Pass the YouTube URL directly to the parent component
    handleFileChange({
      target: {
        name: "youtube_url",
        value: url,
        type: "text",
      },
    });

    if (url) {
      setVideoSource("youtube");

      // Clear uploaded video when adding YouTube URL
      if (courseData.course_intro_video) {
        handleFileChange({
          target: {
            name: "course_intro_video",
            value: null,
            type: "text",
          },
        });
      }
    }
  };

  const handleVideoSourceChange = (source) => {
    setVideoSource(source);
  };

  return (
    // <div className="add-course-info">
    //   <div className="add-course-inner-header">
    //     <h4>Courses Media</h4>
    //   </div>
    //   <div className="add-course-form">
    //     <form action="#">
    //       {/* Course Cover Image */}
    //       <div className="input-block">
    //         <label className="add-course-label">Course Cover Image</label>
    //         <div className="relative-form">
    //           <span>
    //             {courseData.course_banner_image instanceof File
    //               ? courseData.course_banner_image.name
    //               : courseData.course_banner_image || "No image selected"}
    //           </span>
    //           <label className="relative-file-upload">
    //             Upload File
    //             <input
    //               type="file"
    //               name="course_banner_image"
    //               onChange={handleFileChange}
    //               accept="image/*"
    //             />
    //           </label>
    //         </div>
    //       </div>

    //       {/* Video Source Selection */}
    //       <div className="input-block">
    //         <label className="add-course-label">Video Source</label>
    //         <div className="video-source-selector">
    //           <div className="form-check form-check-inline">
    //             <input
    //               type="radio"
    //               id="upload-video"
    //               name="video-source"
    //               className="form-check-input"
    //               checked={videoSource === "upload"}
    //               onChange={() => handleVideoSourceChange("upload")}
    //             />
    //             <label className="form-check-label" htmlFor="upload-video">
    //               Upload MP4
    //             </label>
    //           </div>
    //           <div className="form-check form-check-inline">
    //             <input
    //               type="radio"
    //               id="youtube-video"
    //               name="video-source"
    //               className="form-check-input"
    //               checked={videoSource === "youtube"}
    //               onChange={() => handleVideoSourceChange("youtube")}
    //             />
    //             <label className="form-check-label" htmlFor="youtube-video">
    //               YouTube URL
    //             </label>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Conditional rendering based on video source */}
    //       {videoSource === "upload" ? (
    //         <div className="input-block">
    //           <label className="add-course-label">
    //             Course Intro Video (MP4)
    //           </label>
    //           <div className="relative-form">
    //             <span>
    //               {/* {courseData.course_intro_video instanceof File
    //                 ? courseData.course_intro_video.name
    //                 : courseData.course_intro_video || "No video selected"} */}
    //               {selectedVideo instanceof File
    //                 ? selectedVideo.name
    //                 : selectedVideo || "No video selected"}
    //             </span>
    //             <label className="relative-file-upload">
    //               Upload File
    //               <input
    //                 type="file"
    //                 name="course_intro_video"
    //                 onChange={handleVideoChange}
    //                 accept="video/mp4"
    //               />
    //             </label>
    //           </div>
    //         </div>
    //       ) : (
    //         <div className="input-block">
    //           <label className="add-course-label">YouTube URL</label>
    //           <input
    //             type="text"
    //             name="youtube_url"
    //             className="form-control"
    //             placeholder="https://www.youtube.com/watch?v=..."
    //             value={courseData.youtube_url || ""}
    //             onChange={handleYoutubeUrlChange}
    //           />
    //         </div>
    //       )}
    //     </form>
    //   </div>

    //   {/* Navigation Buttons */}
    //   <div className="widget-btn">
    //     <Link className="btn btn-black prev_btn" onClick={onPrevious}>
    //       Previous
    //     </Link>
    //     <Link className="btn btn-info-light next_btn" onClick={onContinue}>
    //       Continue
    //     </Link>
    //   </div>
    // </div>

    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h4 className="text-xl font-semibold">Courses Media</h4>
      </div>

      {/* Form */}
      <form>
        {/* Course Cover Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Course Cover Image
          </label>
          <div className="flex items-center justify-between border rounded-lg px-4 py-2">
            <span className="text-gray-500 text-sm">
              {courseData.course_banner_image instanceof File
                ? courseData.course_banner_image.name
                : courseData.course_banner_image || "No image selected"}
            </span>
            <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
              Upload File
              <input
                type="file"
                name="course_banner_image"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Video Source Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Video Source
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="video-source"
                checked={videoSource === "upload"}
                onChange={() => handleVideoSourceChange("upload")}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">Upload MP4</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="video-source"
                checked={videoSource === "youtube"}
                onChange={() => handleVideoSourceChange("youtube")}
                className="form-radio text-blue-600"
              />
              <span className="text-gray-700">YouTube URL</span>
            </label>
          </div>
        </div>

        {/* Conditional rendering based on video source */}
        {videoSource === "upload" ? (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Course Intro Video (MP4)
            </label>
            <div className="flex items-center justify-between border rounded-lg px-4 py-2">
              <span className="text-gray-500 text-sm">
                {selectedVideo instanceof File
                  ? selectedVideo.name
                  : selectedVideo || "No video selected"}
              </span>
              <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                Upload File
                <input
                  type="file"
                  name="course_intro_video"
                  onChange={handleVideoChange}
                  accept="video/mp4"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              YouTube URL
            </label>
            <input
              type="text"
              name="youtube_url"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://www.youtube.com/watch?v=..."
              value={courseData.youtube_url || ""}
              onChange={handleYoutubeUrlChange}
            />
          </div>
        )}
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Link
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={onPrevious}
        >
          Previous
        </Link>
        <Link
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={onContinue}
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

// Prop Validation
MediaTab.propTypes = {
  courseData: PropTypes.shape({
    course_banner_image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(File),
    ]),
    course_intro_video: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(File),
    ]),
    course_intro_video_url: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(File),
    ]),
    youtube_url: PropTypes.string,
  }).isRequired,
  handleFileChange: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default MediaTab;
