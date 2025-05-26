import React, { useState, useEffect } from "react";
import DashboardCandidatesHeader from "@/components/header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "@/components/header/DashboardCandidatesSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import { toast } from "react-hot-toast";

const SettingsPage = () => {
  const [selectedTab, setSelectedTab] = useState("account");
  const navigate = useNavigate();
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [marketingNotif, setMarketingNotif] = useState(true);
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notificationLoading, setNotificationLoading] = useState(false);

  useEffect(() => {
    if (selectedTab === "account") {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem(Constant.USER_TOKEN);
      axios.get("https://api.sentryspot.co.uk/api/jobseeker/user-profile", {
        headers: {
          Authorization: ` ${token}`,
        },
      })
        .then(res => {
          if (res.data.status === "success" && res.data.data?.personal_details) {
            setAccount(res.data.data.personal_details);
          } else {
            setAccount(null);
          }
          setLoading(false);
        })
        .catch(err => {
          setError("Failed to load account info");
          setLoading(false);
        });
    } else if (selectedTab === "notification") {
      fetchNotificationPreferences();
    }
  }, [selectedTab]);

  const fetchNotificationPreferences = async () => {
    setNotificationLoading(true);
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/notification-permission", {
        headers: {
          Authorization: ` ${token}`,
        },
      });
      
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
    setNotificationLoading(true);
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.put(
        "https://api.sentryspot.co.uk/api/jobseeker/notification-permission",
        {
          is_email: emailNotif,
          is_sms: smsNotif,
          is_marketing_notification: marketingNotif,
          lang: "" // Adding lang field as per API response structure
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
        toast.error(response.data.message || "Failed to update notification preferences");
      }
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      toast.error(error.response?.data?.message || "Failed to update notification preferences");
    } finally {
      setNotificationLoading(false);
    }
  };

  const handleToggleChange = (type) => {
    switch (type) {
      case 'email':
        setEmailNotif(prev => !prev);
        break;
      case 'sms':
        setSmsNotif(prev => !prev);
        break;
      case 'marketing':
        setMarketingNotif(prev => !prev);
        break;
    }
    // Update preferences after a short delay to avoid too many API calls
    setTimeout(updateNotificationPreferences, 500);
  };

  return (
    <div className="page-wrapper dashboard min-h-screen bg-[#f8fafc]">
      <DashboardCandidatesHeader />
      <DashboardCandidatesSidebar />
      <div className="pt-40 px-4 md:px-0 flex justify-center">
        <div className="w-full max-w-5xl flex gap-8">
          {/* Sidebar */}
          <div className="w-48">
            <div className="bg-white rounded-xl shadow p-0.5">
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium mb-1 transition-colors ${selectedTab === "account" ? "bg-orange-500 text-white" : "hover:bg-gray-100 text-gray-800"}`}
                onClick={() => setSelectedTab("account")}
              >
                <span className="mr-2">🔶</span> Account
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium mb-1 transition-colors ${selectedTab === "notification" ? "bg-orange-500 text-white" : "hover:bg-gray-100 text-gray-800"}`}
                onClick={() => setSelectedTab("notification")}
              >
                <span className="mr-2">🔔</span> Notification
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "subscription" ? "bg-orange-500 text-white" : "hover:bg-gray-100 text-gray-800"}`}
                onClick={() => setSelectedTab("subscription")}
              >
                <span className="mr-2">💳</span> Subscription
              </button>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow p-6 min-w-[320px]">
              {selectedTab === "account" && (
                <>
                  <h2 className="text-xl font-semibold mb-4">Account</h2>
                  {loading ? (
                    <div className="text-gray-500 p-6">Loading...</div>
                  ) : error ? (
                    <div className="text-red-500 p-6">{error}</div>
                  ) : account ? (
                    <div className="border rounded-lg overflow-hidden">
                      <div className="grid grid-cols-3 bg-gray-50 text-gray-500 text-sm font-medium">
                        <div className="p-3">Account ID</div>
                        <div className="p-3 col-span-2">{account.job_seeker_uuid || "N/A"}</div>
                      </div>
                      <div className="grid grid-cols-3 border-t text-sm">
                        <div className="p-3 text-gray-500 font-medium">Email Address</div>
                        <div className="p-3 col-span-2">{account.email || "N/A"}</div>
                      </div>
                      {/* <div className="grid grid-cols-3 border-t text-sm">
                        <div className="p-3 text-gray-500 font-medium">Contact</div>
                        <div className="p-3 col-span-2">{account.phone || "N/A"}</div>
                      </div> */}
                      <div className="grid grid-cols-3 border-t text-sm">
                        <div className="p-3 text-gray-500 font-medium">Name</div>
                        <div className="p-3 col-span-2">{`${account.first_name || ""} ${account.last_name || ""}`.trim() || "N/A"}</div>
                      </div>
                      {/* <div className="grid grid-cols-3 border-t text-sm">
                        <div className="p-3 text-gray-500 font-medium">Location</div>
                        <div className="p-3 col-span-2">{account.current_location || "N/A"}</div>
                      </div> */}
                    </div>
                  ) : (
                    <div className="text-gray-500 p-6">No account data found.</div>
                  )}
                </>
              )}
              {selectedTab === "notification" && (
                <div className="">
                  <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                  {notificationLoading ? (
                    <div className="text-gray-500 p-6">Loading...</div>
                  ) : (
                    <div className="bg-white">
                      <div className="mb-4">
                        <div className="font-bold">Product notifications</div>
                        <div className="text-gray-600 text-sm mb-3">
                          Stay ahead in your job search with SentrySpot Resume Builder! Get notified about new job matches and applications requiring your attention, ensuring you are among the first to apply and increasing your chances of landing your dream job.
                        </div>
                        {/* Email notifications toggle */}
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            type="button"
                            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${emailNotif ? 'bg-green-500' : 'bg-gray-300'}`}
                            onClick={() => handleToggleChange('email')}
                          >
                            <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${emailNotif ? 'translate-x-4' : ''}`}></span>
                          </button>
                          <span className="text-gray-800">Email notifications</span>
                        </div>
                        {/* SMS notifications toggle */}
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            type="button"
                            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${smsNotif ? 'bg-green-500' : 'bg-gray-300'}`}
                            onClick={() => handleToggleChange('sms')}
                          >
                            <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${smsNotif ? 'translate-x-4' : ''}`}></span>
                          </button>
                          <span className="text-gray-800">SMS notifications</span>
                        </div>
                      </div>
                      <div className="mt-6">
                        <div className="font-bold">Marketing notifications</div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            type="button"
                            className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${marketingNotif ? 'bg-green-500' : 'bg-gray-300'}`}
                            onClick={() => handleToggleChange('marketing')}
                          >
                            <span className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${marketingNotif ? 'translate-x-4' : ''}`}></span>
                          </button>
                          <span className="text-gray-800">I am open to receive marketing communications.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {selectedTab === "subscription" && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Subscription</h2>
                  {/* Help/Contact Box */}
                  <div className="border rounded-lg p-4 mb-4 flex flex-col md:flex-row md:justify-between gap-4 bg-gray-50">
                    <div>
                      <div className="font-semibold mb-1">Need help or want to change your subscription?</div>
                      <div className="text-sm">Contact us at:</div>
                      <div className="flex items-center gap-2 mt-1">
                        <svg xmlns='http://www.w3.org/2000/svg' className='w-4 h-4 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 12H8m8 0a8 8 0 11-16 0 8 8 0 0116 0z' /></svg>
                        <span className="text-blue-700 text-sm">customersupport@SentrySpot.com</span>
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
                    <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-4">
                      <div className="mb-2 md:mb-0 flex items-center gap-2">
                        <span className="font-medium text-sm">Status:</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${account?.is_active_plan ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {account?.is_active_plan ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="mb-2 md:mb-0 flex items-center gap-2">
                        <span className="font-medium text-sm">Current Plan:</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${account?.plan_name ? 'bg-gray-100 text-pink-600' : 'bg-gray-100 text-gray-600'}`}>
                          {account?.plan_name || 'Free'}
                        </span>
                      </div>
                      <button 
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded mr-2" 
                        onClick={() => navigate('/candidates-dashboard/pricing')}
                      >
                        Upgrade
                      </button>
                      <button 
                        className={`text-sm font-semibold px-4 py-2 rounded ${account?.is_active_plan ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`} 
                        disabled
                      >
                        Cancel Subscription
                      </button>
                    </div>
                    <div className="text-xs text-gray-600 mt-2">
                      For more information or changes to your subscription, contact us at <a href="mailto:customersupport@SentrySpot.com" className="text-blue-700 underline">customersupport@SentrySpot.com</a>.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 