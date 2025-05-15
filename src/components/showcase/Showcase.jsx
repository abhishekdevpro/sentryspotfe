import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
import InsideCognizant from "./InsideCognizant ";
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
  const {userInfo} = useSelector((state)=>state.auth)
  
  // console.log(userInfo,"user hu main");
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/employeer/company",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setCompanyData(response.data.data || []);
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
      }
    };

    fetchCompanyData();
  }, []);

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

  if (!companyData) {
    return (
      <div className="min-h-screen flex items-center justify-center h-64">
        <div className="bg-gray-100 border border-gray-300 text-gray-700 p-6 rounded-lg shadow-md w-96 text-center">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (Object.keys(companyData).length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center h-64">
        <div className="bg-blue-500 border border-red-300 p-6 rounded-lg shadow-md w-6xl text-center ">
          <p className="text-lg font-semibold text-white">
            No company data found
          </p>
          <p className="text-sm mt-2 text-white">
            Please add your company details to create a public profile.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate("/employers-dashboard/company-profile")}
          >
            Add Company Data
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AboutSection companyData={companyData} userInfo={userInfo} />

      <WhyChooseUsSection companyData={companyData} userInfo={userInfo} />

      <section id="inside-cognizant">
        <InsideCognizant companyData={companyData} userInfo={userInfo} />
      </section>
      <CompanyBenefits companyData={companyData} />
      <LeadershipTeam />
      <JobListings companyData={companyData} userInfo={userInfo} />

      {/* <div className="items-center justify-center text-center bg-gray-500 h-60">
        <h3 className="text-white font-semibold text-3xl pt-5 mb-6">
          Follow us
        </h3>
        <div className="flex items-center justify-center gap-3 ">
          <a
            href={companyData.linkedin_link}
            aria-label="Find us on LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-10 w-10 text-white" />
          </a>
          <a
            href={companyData.twitter_link}
            aria-label="Find us on Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="h-10 w-10 text-white" />
          </a>
          <a
            href={companyData.facebook_link}
            aria-label="Find us on Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="h-10 w-10 text-white" />
          </a>
          <a
            href={companyData.website_link}
            aria-label="Visit our website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGlobe className="h-10 w-10 text-white" />
          </a>
        </div>
        <h3 className="text-white font-semibold text-sm pt-5 ">
          All rights reserved © {companyData.company_name}
        </h3>
      </div> */}
      <SocialFooter companyData={companyData} />
    </>
  );
};

export default ShowcaseComponent;
