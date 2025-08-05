import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import { Constant } from "@/utils/constant/constant";


function InterviewResult() {
  const { jobId } = useParams();
  const [interviewResult, setInterviewResult] = useState([]);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [searchParams] = useSearchParams();
  const isOnDemand = searchParams.get("on_demand");
  const navigate = useNavigate()

  useEffect(() => {
    const getInterviewResult = async () => {
      const API = isOnDemand
        ? `https://api.sentryspot.co.uk/api/jobseeker/interview/ondemand/lists/${jobId}`
        : `https://api.sentryspot.co.uk/api/jobseeker/interview/practice/lists/${jobId}`;
      const res = await axios.get(API, {
        headers: {
          Authorization: token,
        },
      });
      setInterviewResult(res.data.data);
    };
    getInterviewResult();
  }, [jobId]);

  return (
    <>
      <DashboardCandidatesHeader />
      <div
        className="max-w-4xl mx-auto py-10 px-4 mt-20"
      >
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition duration-300"
        >
          Back to List
        </button>
      
        <h1 className="text-2xl font-bold text-center mb-6 ">
         {isOnDemand ?"Interview Result":" Practice Interview Result"}
        </h1>

        {interviewResult.length > 0 ? (
          <div className="space-y-4">
            {interviewResult.map((item, index) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
                    <span className="text-blue-600 mr-2">#{index + 1}</span>
                    {item.question}
                  </h2>

                  <span
                    className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                      item.is_answer_correct
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.is_answer_correct ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="font-semibold text-sm text-gray-700">
                    Your Answer:
                  </p>
                  <p
                    className={`mt-1 text-base ${
                      item.is_answer_correct ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {item.user_transcript || "No answer submitted."}
                  </p>

                  {/* <div className="mt-4 bg-white border rounded p-3">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Your Response:
                    </h4>
                    <p className="text-gray-800 text-base">
                      {item.user_transcript || "No transcript available."}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      Submitted on: {" "}
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-4 shadow-sm mt-10">
            <p className="text-center text-gray-500">
              No interview results found.
            </p>
          </div>
        )}
      </div>
      <CopyrightFooter />
    </>
  );
}

export default InterviewResult;
