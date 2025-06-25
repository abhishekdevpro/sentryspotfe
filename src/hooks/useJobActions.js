// src/hooks/useJobActions.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import toast from "react-hot-toast";

const useJobActions = ({ setFilteredJobs }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [actionStatus, setActionStatus] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem(Constant.USER_TOKEN);

  const applyToJob = (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setActionStatus((prev) => ({ ...prev, [jobId]: "applying" }));

    navigate(`/apply/${jobId}`);
    setSelectedJobId(jobId);
    setShowPopup(true);

    setActionStatus((prev) => ({ ...prev, [jobId]: "applied" }));

    // Optionally update local job state
    setFilteredJobs?.((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, is_applied: true } : job
      )
    );
  };

  const saveJob = async (jobId) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setActionStatus((prev) => ({ ...prev, [jobId]: "saving" }));

    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-job-favorite/${jobId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "status" || response.data.code === 200) {
        toast.success(response.message || "Job saved successfully!");
        setActionStatus((prev) => ({ ...prev, [jobId]: "saved" }));

        setFilteredJobs?.((prevJobs) =>
          prevJobs.map((job) =>
            job.id === jobId
              ? { ...job, is_favorite: !job.is_favorite }
              : job
          )
        );
      } else {
        toast.error("Failed to save the job.");
        setActionStatus((prev) => ({ ...prev, [jobId]: "error" }));
      }
    } catch (error) {
      toast.error("Error saving the job.");
      setActionStatus((prev) => ({ ...prev, [jobId]: "error" }));
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedJobId(null);
  };

  const closeLoginModal = () => setShowLoginModal(false);

  return {
    applyToJob,
    saveJob,
    selectedJobId,
    showPopup,
    closePopup,
    showLoginModal,
    closeLoginModal,
    actionStatus,
  };
};

export default useJobActions;
