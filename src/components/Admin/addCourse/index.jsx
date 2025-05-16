import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { debounce } from "lodash";

// import CourseHeader from "../header";
import CoursePageHeader from "./components/CoursePageHeader";
import ProgressTabs from "./components/ProgressBar";
import BasicInfoTab from "./components/BasicInfoForm";
import MediaTab from "./components/MediaForm";
import SettingsTab from "./components/SettingForm";
import { fetchCategoryOptions, fetchLevelOptions } from "./Services/api";
import Footer from "@/components/footer/common-footer";

const AddCourse = () => {
  const navigate = useNavigate();
  // const mobileSidebar = useSelector((state) => state.sidebarSlice.expandMenu);
  const [activeTab, setActiveTab] = useState("basic");
  const [courseData, setCourseData] = useState({
    course_title: "",
    course_category_id: "",
    course_category_name: "",
    course_level_id: "",
    course_level_name: "",
    course_description: "",
    course_banner_image: null,
    course_intro_video: null,
    youtube_url: "", // Added YouTube URL field
    requirements: "",
    course_price: "",
    after_discount_price: "",
    coupon_code: "",
    course_language: "",
    discount_percent: "",
    learning_objectives: "",
    target_audience: "",
    time_spent_on_course: "",
  });
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get token and determine user type
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");
  // let userType;
  // if (localStorage.getItem("adminToken")) {
  //   userType = "admin";
  // }

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [categoriesResult, levelsResult] = await Promise.all([
          fetchCategoryOptions(token),
          fetchLevelOptions(token),
        ]);

        setCategoryOptions(categoriesResult);
        setLevelOptions(levelsResult);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Error loading data. Please try again.");
        // navigate(`/${userType}/${userType}-dashboard`);
        navigate("/admin-dashboard/dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [token, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle select changes
  const handleSelectChange = (name) => (selectedOption) => {
    setCourseData((prevState) => ({
      ...prevState,
      [name]: selectedOption.value,
    }));
  };

  // Handle file changes - Updated to handle both files and text fields
  const handleFileChange = (e) => {
    const { name, type, files, value } = e.target;

    // If it's a file input
    if (type === "file" && files && files.length > 0) {
      setCourseData((prevState) => ({ ...prevState, [name]: files[0] }));
    }
    // If it's a text input (for YouTube URL)
    else if (type === "text" || !type) {
      setCourseData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Handle rich text editor changes
  const handleQuillChange = (name) => (content) => {
    setCourseData((prevState) => ({ ...prevState, [name]: content }));
  };

  // Save course data
  const handleSave = debounce(async () => {
    try {
      const formData = new FormData();
      for (const key in courseData) {
        if (courseData[key] !== undefined && courseData[key] !== null) {
          if (key === "course_banner_image" || key === "course_intro_video") {
            if (courseData[key] instanceof File) {
              formData.append(key, courseData[key], courseData[key]?.name);
            }
          } else {
            formData.append(key, courseData[key]);
          }
        }
      }
      console.log(adminToken, "admin token");
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/admin/create-course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: adminToken,
          },
        }
      );

      console.log("Course created successfully:", response.data.data);
      toast.success("Course created successfully!");

      // Navigate to the dashboard or optionally to add sections
      const courseId = response.data.data.course_id || response.data.data.id;
      if (courseId) {
        navigate(`/add-section/${courseId}`);
      } else {
        // navigate(`/${userType}/${userType}-dashboard`);
        navigate("/admin-dashboard/dashboard");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Error creating course. Please try again.");
    }
  }, 500);

  // Validate form before proceeding to next step
  const validateForm = (tab) => {
    if (tab === "basic") {
      if (
        !courseData.course_title ||
        !courseData.course_category_id ||
        !courseData.course_level_id
      ) {
        toast.error("Please fill all required fields");
        return false;
      }
      return true;
    }
    return true;
  };

  // Render the appropriate tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <BasicInfoTab
            courseData={courseData}
            categoryOptions={categoryOptions}
            levelOptions={levelOptions}
            // mobileSidebar={mobileSidebar}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            handleQuillChange={handleQuillChange}
            onContinue={() => {
              if (validateForm("basic")) {
                setActiveTab("media");
              }
            }}
          />
        );
      case "media":
        return (
          <MediaTab
            courseData={courseData}
            handleFileChange={handleFileChange}
            onPrevious={() => setActiveTab("basic")}
            onContinue={() => setActiveTab("settings")}
          />
        );
      case "settings":
        return (
          <SettingsTab
            courseData={courseData}
            handleInputChange={handleInputChange}
            handleQuillChange={handleQuillChange}
            onPrevious={() => setActiveTab("media")}
            onSave={handleSave}
          />
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="main-wrapper">
        {/* <CourseHeader activeMenu={"AddCourse"} /> */}
        <div
          className="page-content d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    // <div className="main-wrapper">
    //   {/* <CourseHeader activeMenu={"AddCourse"} /> */}

    //   <section className="page-content course-sec">
    //     <div className="container">
    //       <div className="row align-items-center">
    //         <div className="col-md-12">
    //           <CoursePageHeader
    //             title="Add New Course"
    //             onSave={handleSave}
    //             userType={userType}
    //           />
    //         </div>
    //       </div>
    //       <div className="row">
    //         <div className="col-md-12">
    //           <div className="card">
    //             <div className="widget-set">
    //               <ProgressTabs activeTab={activeTab} />

    //               <div className="widget-content multistep-form">
    //                 {renderTabContent()}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>
    <div className="w-full">
      {/* Page Content Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-6">
            <CoursePageHeader
              title="Add New Course"
              onSave={handleSave}
              // userType={userType}
            />
          </div>

          {/* Card Container */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="space-y-6">
              <ProgressTabs activeTab={activeTab} />
              <div className="mt-4">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddCourse;
