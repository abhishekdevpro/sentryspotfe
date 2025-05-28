import React, { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { Bell, MessageSquare, Briefcase } from "lucide-react";

const NotificationsHistory = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/notifications",
        {
          headers: { Authorization: ` ${token}` },
        }
      );
      if (response.data.status === "success") {
        setNotifications(response.data.data);
        setError(null);
      } else {
        setError("Failed to fetch notifications");
      }
    } catch (err) {
      setError("An error occurred while fetching notifications");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "job":
        return <Briefcase className="h-6 w-6 text-blue-500" />;
      case "message":
        return <MessageSquare className="h-6 w-6 text-green-500" />;
      default:
        return <Bell className="h-6 w-6 text-gray-500" />;
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header Section */}
      <div className="border-b border-gray-200">
        <div className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Notification History
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            <p>{error}</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-2">No Notifications Found</p>
            <p className="text-gray-500">
              You have no notifications at the moment.
            </p>
          </div>
        ) : (
          <div>
            <div className="space-y-6">
              {currentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="group flex items-center bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 p-4"
                >
                  {/* Notification Icon */}
                  <div className="mr-4">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-grow">
                    <p className="text-gray-800 font-medium">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(notification.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              <p className="text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsHistory;
