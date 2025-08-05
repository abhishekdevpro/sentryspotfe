import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";
import { formatDaysAgo } from "@/components/common/DateUtils";

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("practice");
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const navigate = useNavigate();

  const getInterviewList = async (type) => {
    setLoading(true);
    try {
      const endpoint =
        type === "practice"
          ? "/api/jobseeker/interview/practice/lists"
          : "/api/jobseeker/interview/ondemand/lists";

      const res = await axios.get(`https://api.sentryspot.co.uk${endpoint}`, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.code === 200 || res.data.status === "success") {
        setInterviewList(res.data.data || []);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch interview questions."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewResult = (id) => {
    if (activeTab === "practice") {
      navigate(`/candidates-dashboard/interview-view-result/${id}`);
    } else {
      navigate(`/candidates-dashboard/interview-view-result/${id}/?on_demand=true`);
    }
  };

  useEffect(() => {
    getInterviewList(activeTab);
  }, [activeTab]);

  return (
    <>
      <div className="bg-white min-h-screen ">
        

            <div className="col-span-1 md:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                

                {/* Tab Toggle Buttons */}
                <div className="flex space-x-4 mb-6">
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeTab === "practice"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab("practice")}
                  >
                    Practice Interviews
                  </button>
                  <button
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      activeTab === "ondemand"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab("ondemand")}
                  >
                    Interviews
                  </button>
                </div>

                {/* Interview List */}
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : interviewList.length > 0 ? (
                    interviewList.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 p-4 rounded shadow-sm"
                      >
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            <span className="text-blue-600 mr-2">#{index + 1}</span>
                            {activeTab === "practice" ? "Practice" : "Live"} Interview {index + 1}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDaysAgo(item.created_at)}
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <button
                            onClick={() => handleViewResult(item.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full md:w-auto"
                          >
                            View Results
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      <p>
                        No {activeTab === "practice" ? "practice" : "live"} interviews found.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            </div>
         

    </>
  );
};

export default InterviewList;
