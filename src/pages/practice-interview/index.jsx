// import { useState } from "react";


// const Index = () => {
//   return (
//     <>
//       {/* Header Span */}
//       <span className="header-span"></span>

//       <LoginPopup />
//       <DefaulHeader2 />

//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 md:px-12">
//         <div className="max-w-5xl mx-auto text-center">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
//             Ace Your Next Job Interview
//           </h1>
//           <p className="text-lg text-gray-200 md:text-xl mb-6">
//             Simulate real interview scenarios, build confidence, and sharpen your responses with our practice interview sessions.
//           </p>
//           <button className="bg-white text-blue-700 hover:bg-blue-100 font-semibold py-3 px-6 rounded-lg shadow transition duration-300">
//             Start the Interview
//           </button>
//         </div>
//       </section>

//       {/* Optional Info Section */}
//       <section className="bg-white py-12 px-4 md:px-12">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
//             Why Practice with Us?
//           </h2>
//           <p className="text-gray-600 text-md md:text-lg">
//             Our platform helps job seekers prepare through mock interviews, real-time feedback, and AI-generated questions tailored to their job roles and experience.
//           </p>
//         </div>
//       </section>

//       <FooterDefault footerStyle="alternate5" />
//     </>
//   );
// };

// export default Index;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer";
import Sidebar from "./Sidebar";
import VideoRecorder from "./VideoRecorder";
import QuestionPanel from "./QuestionPanel";
import { Constant } from "@/utils/constant/constant";

export default function PracticeInterviewPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordingFile, setRecordingFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [showInterview, setShowInterview] = useState(false);

  const token = localStorage.getItem(Constant.USER_TOKEN);
  const { jobId } = useParams();
  const [searchParams] = useSearchParams();
  const isOnDemand = searchParams.get("on_demand");
  const navigate = useNavigate();

  const practiceInterview = async () => {
    setIsLoading(true);
    try {
      const API = isOnDemand
        ? `https://api.sentryspot.co.uk/api/jobseeker/interview/ondemand/${jobId}`
        : `https://api.sentryspot.co.uk/api/jobseeker/interview/practice/${jobId}`;
      const res = await axios.get(API, {
        headers: { Authorization: token },
      });

      if (res.data.code === 200 || res.data.status === "success") {
        setQuestions(res.data.data.questions || []);
        setInterviewId(res.data.data.id);
        setShowInterview(true);
      } else {
        toast.error("Failed to load questions.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "API Error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!recordingFile) return toast.warning("No recording found!");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("question", questions[currentIndex]?.question);
    formData.append("video_file_upload", recordingFile);

    try {
      const API = isOnDemand
        ? `https://api.sentryspot.co.uk/api/jobseeker/interview/ondemand/${jobId}/${interviewId}`
        : `https://api.sentryspot.co.uk/api/jobseeker/interview/practice/${jobId}/${interviewId}`;

      const res = await axios.post(API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      if (res.data.status === "success" && res.data.code === 200) {
        toast.success(res.data.message || "Answer submitted successfully!");
      } else {
        toast.error(res.data.message);
      }

      setRecordingFile(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        toast.success("Interview completed successfully!");
        navigate(isOnDemand ? `/user/apply/${jobId}` : `/user/jobs/${jobId}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <DefaulHeader2 />
      <div className="max-w-8xl h-screen items-center mx-auto p-4">
        {!showInterview ? (
          <div className="bg-white p-6 rounded shadow text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              {isOnDemand ? "Interview" : "Practice Interview"}
            </h2>
            <p className="text-gray-600 mb-6">
              Ready to enhance your interview skills? Start a mock interview
              session to practice common questions and build confidence.
            </p>
            <button
              onClick={practiceInterview}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              {isLoading ? "Loading..." : isOnDemand ? "Start Interview" : "Start Mock Interview"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="hidden md:block col-span-1 bg-gray-100 p-4 rounded shadow">
              <Sidebar questions={questions} currentIndex={currentIndex} />
            </div>
            <div className="col-span-3 py-2 md:p-4 mb-2">
              <VideoRecorder
                onRecordingComplete={setRecordingFile}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
              />
              <QuestionPanel
                question={questions[currentIndex]}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}
      </div>
      <FooterDefault />
    </>
  );
}

