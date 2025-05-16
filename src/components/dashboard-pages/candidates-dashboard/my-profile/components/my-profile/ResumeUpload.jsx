import { useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
const ResumeUpload = () => {
  const [Resume, setResume] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(""); // To track the status of the upload
  const token = localStorage.getItem(Constant.USER_TOKEN);


  const ResumeHandler = (e) => {
    setResume(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!Resume) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("files", Resume);

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/resume-upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization":token, // Adding the token to the headers
          },
        }
      );

      if (response.status === 200) {
        setUploadStatus("Resume uploaded successfully!");
      } else {
        setUploadStatus("Failed to upload resume.");
      }
    } catch (error) {
      setUploadStatus("An error occurred during the upload.");
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="uploadButton">
          <input
            className="put"
            type="file"
            name="attachments[]"
            accept="application/pdf"
            id="upload"
            required
            onChange={ResumeHandler}
          />
        </div>
        <div className="text-xs mt-2">(Accepted format includes PDF)</div>
        <button onClick={handleUpload} className="bg-blue-900 text-white px-2 py-1 rounded-sm mt-2">
          Upload Resume
        </button>
        {uploadStatus && <div className="mt-2 text-sm">{uploadStatus}</div>}
      </div>
    </>
  );
};

export default ResumeUpload;
