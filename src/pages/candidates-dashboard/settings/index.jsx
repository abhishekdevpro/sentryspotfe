 


import React, { useState, useEffect } from "react";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "@/components/header/DashboardCandidatesSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("notification");
  const navigate = useNavigate();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(true);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notificationLoading, setNotificationLoading] = useState(false);
   const {userInfo} = useSelector((state)=>state.auth)

   console.log("User Info from Redux:", userInfo);
  useEffect(() => {
    if (selectedTab === "account") {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem(Constant.USER_TOKEN);
      setAccount(userInfo)
      setLoading(false);
    } else if (selectedTab === "notification") {
      fetchNotificationPreferences();
    }
  }, [selectedTab]);

  const fetchNotificationPreferences = async () => {
    setNotificationLoading(true);
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/notification-permission",
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      if (response.data.status === "success" && response.data.data) {
        const { is_email, is_sms, is_marketing_notification } = response.data.data;
        setEmailNotif(is_email);
        setSmsNotif(is_sms);
        setMarketingNotif(is_marketing_notification);
      }
    } catch (error) {
      console.error("Error fetching notification preferences:", error);
      toast.error("Failed to load notification preferences");
    } finally {
      setNotificationLoading(false);
    }
  };

  const updateNotificationPreferences = async () => {
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.put(
        "https://api.sentryspot.co.uk/api/jobseeker/notification-permission",
        {
          is_email: emailNotif,
          is_sms: smsNotif,
          is_marketing_notification: marketingNotif,
          lang: "",
        },
        {
          headers: {
            Authorization: ` ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Notification preferences updated successfully");
      } else {
        toast.error(response.data.message || "Failed to update preferences");
      }
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      toast.error(error.response?.data?.message || "Failed to update preferences");
    }
  };

  // 💡 This handles state-based updates
  useEffect(() => {
    if (selectedTab === "notification") {
      const timeout = setTimeout(() => {
        updateNotificationPreferences();
      }, 400); // debounce

      return () => clearTimeout(timeout);
    }
  }, [emailNotif, smsNotif, marketingNotif]);

  const handleToggleChange = (type) => {
    if (type === "email") setEmailNotif((prev) => !prev);
    if (type === "sms") setSmsNotif((prev) => !prev);
    if (type === "marketing") setMarketingNotif((prev) => !prev);
  };

  return (
    <div className="page-wrapper dashboard min-h-screen bg-white text-blue-900">
      <DashboardCandidatesHeader />
      <DashboardCandidatesSidebar />
      <div className="pt-20 md:pt-36 px-4 md:px-0 flex justify-center">
        <div className="w-full mx-auto flex flex-col  gap-4 md:gap-8">
          {/* Sidebar */}
          <div className="w-fit-content mx-auto ">
            <div className="bg-blue-900 rounded-xl shadow p-0.5 flex gap-4 overflow-x-auto md:overflow-x-visible">
              {["account", "notification", "subscription"].map((tab) => (
                <button
                  key={tab}
                  className={`flex-shrink-0 text-left px-4 py-2 rounded-lg font-medium mb-1 transition-colors ${
                    selectedTab === tab
                      ? "bg-white text-blue-900"
                      : "hover:bg-blue-800 text-white"
                  }`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab === "account" && " Account"}
                  {tab === "notification" && "Notification"}
                  {tab === "subscription" && "Subscription"}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow p-4 md:p-6 min-w-[280px]">
              {selectedTab === "notification" && (
                <>
                  <h2 className="text-xl font-bold mb-4 text-blue-900">Notifications</h2>
                  {notificationLoading ? (
                    <div className="text-gray-500 p-6">Loading...</div>
                  ) : (
                    <div>
                      <div className="mb-4">
                        <div className="font-semibold">Product Notifications</div>
                        <div className="text-sm text-gray-600 mb-3">
                          Get updates about job matches, applications, and new features.
                        </div>

                        {/* Email toggle */}
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            type="button"
                            onClick={() => handleToggleChange("email")}
                            className={`w-10 h-6 flex items-center rounded-full p-1 transition duration-200 ${
                              emailNotif ? "bg-blue-900" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
                                emailNotif ? "translate-x-4" : ""
                              }`}
                            ></span>
                          </button>
                          <span className="text-blue-900 text-sm">Email Notifications</span>
                        </div>

                        {/* SMS toggle */}
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            type="button"
                            onClick={() => handleToggleChange("sms")}
                            className={`w-10 h-6 flex items-center rounded-full p-1 transition duration-200 ${
                              smsNotif ? "bg-blue-900" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
                                smsNotif ? "translate-x-4" : ""
                              }`}
                            ></span>
                          </button>
                          <span className="text-blue-900 text-sm">SMS Notifications</span>
                        </div>
                      </div>

                      {/* Marketing notifications (disabled) */}
                      <div className="mt-6">
                        <div className="font-semibold">Marketing Notifications</div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            type="button"
                            className="w-10 h-6 flex items-center rounded-full p-1 bg-gray-300 cursor-not-allowed"
                            disabled
                          >
                            <span className="w-4 h-4 bg-white rounded-full shadow"></span>
                          </button>
                          <span className="text-sm text-blue-900">
                            I am open to receive marketing communications.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              {selectedTab === "account" && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Account</h2>
                  {loading ? (
                    <div className="text-gray-500 p-6">Loading...</div>
                  ) : error ? (
                    <div className="text-red-500 p-6">{error}</div>
                  ) : account ? (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 text-gray-500 text-sm font-medium">
                        <div className="p-3">Account ID</div>
                        <div className="p-3 md:col-span-2">{userInfo.job_seeker_uuid || "N/A"}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 border-t text-sm">
                        <div className="p-3 text-gray-500 font-medium">Email Address</div>
                        <div className="p-3 md:col-span-2">{userInfo.email || "N/A"}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 border-t text-sm">
                        <div className="p-3 text-gray-500 font-medium">Name</div>
                        <div className="p-3 md:col-span-2">{`${userInfo.first_name || ""} ${userInfo.last_name || ""}`.trim() || "N/A"}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 p-6">No account data found.</div>
                  )}
                </>
              )}
              {selectedTab === "subscription" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Subscription</h2>
                  {/* Help/Contact Box */}
                  <div className="border rounded-lg p-4 mb-4 flex flex-col gap-4 bg-gray-50">
                    <div>
                      <div className="font-semibold mb-1">Need help or want to change your subscription?</div>
                      <div className="text-sm">Contact us at:</div>
                      <div className="flex items-center gap-2 mt-1">
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z' /></svg>
                        <span className="text-blue-700 text-sm">support@SentrySpot.com</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Available days a week:</div>
                      <div className="text-sm">• Monday-Friday: 8 AM - 8 PM (IST)</div>
                      <div className="text-sm">• Saturday: 8 AM - 5 PM (IST)</div>
                    </div>
                  </div>
                  {/* Account ID */}
                  <div className="mb-2 text-sm font-medium">Account ID: <span className="font-normal">{account?.job_seeker_uuid || "N/A"}</span></div>
                  {/* Subscription Details */}
                  <div className="border-t pt-4 mt-4">
                    <div className="font-semibold mb-2">Subscription details</div>
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-sm">Status:</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${account?.is_active_plan ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {account?.is_active_plan ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-sm">Current Plan:</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${account?.plan_name ? 'bg-gray-100 text-pink-600' : 'bg-gray-100 text-gray-600'}`}>
                          {account?.plan_name || 'Free'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded" 
                          onClick={() => navigate('/candidates-dashboard/pricing')}
                        >
                          Upgrade
                        </button>
                        <button 
                          className={`text-sm font-semibold px-4 py-2 rounded bg-gray-200 text-gray-400 cursor-not-allowed`} 
                          disabled
                        >
                          Cancel Subscription
                        </button>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      For more information or changes to your subscription, contact us at <a href="mailto:support@SentrySpot.com" className="text-blue-700 underline">support@SentrySpot.com</a>.
                    </div>
                  </div>
                </div>
              )}

              {/* Add your Account and Subscription tabs below if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
