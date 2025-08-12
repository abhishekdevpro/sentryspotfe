import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import InsideCognizant from "./InsideCognizant ";
import { Constant } from "@/utils/constant/constant";
import LeadershipTeam from "./LeaderShipTeams";
import WhyChooseUsSection from "./WhyCompanySection";
import CompanyBenefits from "./CompanyBenefits";
import JobListings from "./HiringSection";
import { useSelector } from "react-redux";
import SocialFooter from "./Footer";
import ReactPlayer from 'react-player'
import CompanyCard from "../ui/CompanyCard";
import NavigationBar from "./NavigationBar";
import AboutSection from "./AboutSection.jsx"


const ShowcaseComponent = ({ companyId }) => {
  const [companyData, setCompanyData] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
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
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/companies/${companyId}`,
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
      <div className="app-gradient-bg w-full">
        <div className="max-w-7xl mx-auto px-2 space-y-4 py-4">
          {/* About Section */}
          {/* <AboutSection companyData={companyData} userInfo={userInfo} /> */}

          {/* Navigation Bar */}
          <NavigationBar />

          {/* Other Sections */}
          <WhyChooseUsSection companyData={companyData} userInfo={userInfo} />

          <section id="inside-cognizant">
            <InsideCognizant companyData={companyData} userInfo={userInfo} />
          </section>

          {companyData?.video_urls?.[0] && (
            <CompanyCard >
              <ReactPlayer
                url={companyData?.video_urls?.[0] || "https://youtu.be/zAeQAiP8PwA"}
                controls
                width="100%"
                height={window.innerWidth <= 768 ? "250px" : "500px"}
                style={{ borderRadius: "8px", overflow: "hidden" }}
              />
            </CompanyCard>
          )}

          <section id="company-benefits">
            <CompanyBenefits companyData={companyData} />
          </section>

          <section id="leadership-team">
            <LeadershipTeam companyId={companyId} />
          </section>

          <section id="job-listings">
            <JobListings companyData={companyData} userInfo={userInfo} />
          </section>

          <section id="social-footer">
            <SocialFooter companyData={companyData} />
          </section>
        </div>
      </div>
    </>
  );
};

export default ShowcaseComponent;
