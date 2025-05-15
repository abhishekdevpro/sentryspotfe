import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoBagHandleOutline, IoPlay } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import {
  MdOutlineHealthAndSafety,
  MdPhoto,
  MdLocalCafe,
  MdEdit,
} from "react-icons/md";
import {
  FaHospital,
  FaHeart,
  FaCalendarAlt,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { FaCarBurst } from "react-icons/fa6";
import DOMPurify from "dompurify";
import InsideCognizant from "./InsideCognizant";
import { Constant } from "@/utils/constant/constant";
import ReactQuill from "react-quill";
import CompanyWTSSection from "./WtsSection";
import LeadershipTeam from "./LeaderShipTeams";
import AboutSection from "./AboutSection";
import WhyChooseUsSection from "./WhyCompanySection";
import CompanyBenefits from "./CompanyBenefits";
import JobListings from "./HiringSection";
import { useSelector } from "react-redux";
import SocialFooter from "./Footer";

const ShowcaseComponent = () => {
  const [companyData, setCompanyData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [openImageGallery, setOpenImageGallery] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=250&width=400",
      "/placeholder.svg?height=250&width=400",
    ],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const BASE_IMAGE_URL = "https://api.sentryspot.co.uk";
  const navigate = useNavigate();
  const { id } = useParams(); // Get company ID from URL
  const { userInfo } = useSelector((state) => state.auth);
  
  // console.log(userInfo,"user hu main");
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!id) {
          throw new Error("Company ID is required");
        }

        const headers = {};
        if (token) {
          headers.Authorization = token;
        }

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/employeer/companies/${id}`,
          { headers }
        );

        if (!response.data || !response.data.data) {
          throw new Error("Invalid response format from server");
        }

        setCompanyData(response.data.data);
        setFormData({
          title: response.data.data.title || "Passion for making difference",
          description:
            response.data.data.about ||
            "We innovate to find a better way—for the clients who depend on us, the customers who rely on them and the communities who count on us all",
          image: [
            response.data.cover_image ||
              "/placeholder.svg?height=300&width=400",
            "/placeholder.svg?height=250&width=400",
            "/placeholder.svg?height=250&width=400",
          ],
        });
      } catch (error) {
        console.error("Error fetching company data:", error);
        if (error.response?.status === 401) {
          setError("Please login to view this company's profile");
        } else {
          setError(error.message || "Failed to load company data. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyData();
  }, [id, token]);

  const handleEditClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: URL.createObjectURL(e.target.files[0]),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.put(
        "https://api.sentryspot.co.uk/api/employeer/company",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Update Successful", response.data);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const handleImageChange2 = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("You can upload a maximum of 3 images.");
    } else {
      setSelectedImages(files);
    }
  };

  const handleSave2 = async () => {
    if (selectedImages.length > 3) {
      alert("Please ensure only 3 images are selected.");
      return;
    }

    const formData = new FormData();

    formData.append("title", companyData.title);
    formData.append("about", companyData.about);
    selectedImages.forEach((image) =>
      formData.append("about_images_upload", image)
    );

    try {
      const response = await axios.patch(
        "https://api.sentryspot.co.uk/api/employeer/company-about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Content updated successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to update content. Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleSave3 = async () => {
    const formData = new FormData();

    // formData.append("title", companyData.title)
    formData.append("summery", companyData.summery);

    try {
      const response = await axios.patch(
        "https://api.sentryspot.co.uk/api/employeer/company-about",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Content updated successfully!");
        setIsPopupOpen(false);
      } else {
        alert("Failed to update content. Please try again.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
          {error.includes("login") && (
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!companyData || Object.keys(companyData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg shadow-md max-w-md text-center">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">No Company Data</h3>
          <p className="text-blue-600 mb-4">
            The requested company profile could not be found.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AboutSection companyData={companyData} userInfo={userInfo} />
      <WhyChooseUsSection companyData={companyData} userInfo={userInfo} />
      <section id="inside-cognizant">
        <InsideCognizant companyData={companyData} userInfo={userInfo} />
      </section>
      <CompanyBenefits companyData={companyData} />
      <LeadershipTeam />
      <JobListings companyData={companyData} userInfo={userInfo} />
      <SocialFooter companyData={companyData} />
    </div>
  );
};

export default ShowcaseComponent;
