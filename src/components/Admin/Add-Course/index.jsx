import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";

import BasicInformationForm from "./BasicInformationForm";
import CourseMediaForm from "./CourseMediaForm";
import CourseSettingsForm from "./CourseSettingsForm";

const AddCourse = () => {
  const [errors, setErrors] = useState({
    courseBannerImage: "",
    courseIntroVideo: "",
  });
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [courseData, setCourseData] = useState({
    course_title: "",
    course_category_name: [],
    course_level_name: [],
    course_description: "",
    course_banner_image: null,
    course_intro_video: null,
    requirements: "",
    course_price: 0,
    after_discount_price: 0,
    coupon_code: "",
    course_language_name: [],
    discount_percent: 0,
    learning_objectives: "",
    target_audience: "",
    time_spent_on_course: "",
  });

  const handleInputChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name) => (selectedOptions) => {
    if (selectedOptions && selectedOptions.length > 0) {
      const selectedLabels = selectedOptions.map((option) => option.label);
      const selectedValues = selectedOptions.map((option) => option.value);

      setCourseData((prevData) => ({
        ...prevData,
        [`${name}_names`]: selectedLabels,
        [`${name}_ids`]: selectedValues,
      }));

      console.log(`Updated ${name}:`, selectedOptions);
    } else {
      console.warn(`No options selected for ${name}`);
      setCourseData((prevData) => ({
        ...prevData,
        [`${name}_names`]: [],
        [`${name}_ids`]: [],
      }));
    }
  };

  const handleEditorChange = (value) => {
    setCourseData({ ...courseData, course_description: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "course_banner_image" && file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          courseBannerImage:
            "Invalid file type. Only JPEG and PNG are allowed.",
        }));
        toast.error("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, courseBannerImage: "" }));
      }
    }

    if (name === "course_intro_video" && file) {
      if (file.type !== "video/mp4") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          courseIntroVideo: "Invalid file type. Only MP4 is allowed.",
        }));
        toast.error("Invalid file type. Only MP4 is allowed.");
        return;
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, courseIntroVideo: "" }));
      }
    }

    setCourseData((prevData) => ({
      ...prevData,
      [name]: file || "",
    }));
  };

  useEffect(() => {
    if (courseData.course_price && courseData.discount_percent) {
      const price = Number.parseFloat(courseData.course_price);
      const discount = Number.parseFloat(courseData.discount_percent);
      const discountedPrice = price - price * (discount / 100);
      setCourseData((prevData) => ({
        ...prevData,
        after_discount_price: discountedPrice.toFixed(2),
      }));
    }
  }, [courseData.course_price, courseData.discount_percent]);

  const handleSave = debounce(async () => {
    console.log("check");
    await saveCourse();
  }, 3000);

  const saveCourse = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      console.log(courseData);

      for (const key in courseData) {
        if (key === "course_banner_image" || key === "course_intro_video") {
          if (courseData[key] instanceof File) {
            formData.append(key, courseData[key], courseData[key]?.name);
          }
        } else {
          formData.append(key, courseData[key]);
        }
      }
      console.log(formData, "FormData contents");

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Course saved successfully:", formData);
      toast.success("Course created successfully!");
      setTimeout(() => {
        navigate("/admin-dashboard/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error details:", error);
      toast.error("Failed to create section. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { label: "Web Development", value: "web-dev" },
    { label: "Mobile Development", value: "mobile-dev" },
    { label: "Data Science", value: "data-science" },
  ];

  const levelOptions = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
  ];

  const languageOptions = [{ id: 1, label: "English", value: "English" }];

  const selectStyle = {
    control: (base) => ({
      ...base,
      border: "1px solid #e2e8f0",
      borderRadius: "0.375rem",
      minHeight: "2.5rem",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      marginTop: "0.5rem",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
        ? "#e2e8f0"
        : "white",
      color: state.isSelected ? "white" : "black",
    }),
  };

  const validateForm = (tab) => {
    let isValid = true;
    const newErrors = {};

    const basicFields = [
      "course_title",
      "course_category_name",
      "course_level_name",
      "course_description",
      "course_language_name",
      "learning_objectives",
      "target_audience",
      "time_spent_on_course",
    ];

    const fieldsToValidate = tab === "basic" ? basicFields : [];

    console.log("Fields to validate:", fieldsToValidate);
    console.log("Current courseData:", courseData);

    fieldsToValidate.forEach((field) => {
      if (!courseData[field]) {
        newErrors[field] = "This field is required";
        isValid = false;
        console.log(`Validation failed for field: ${field}`);
      }
    });

    setError(newErrors);
    console.log("Errors after validation:", newErrors);

    return isValid;
  };

  const handleContinue = () => {
    if (validateForm("basic")) {
      console.log("Validation successful, moving to the next step");
      setActiveTab("media");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Add New Course</h2>
        <nav className="text-sm breadcrumbs">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link to="/home" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="flex items-center">Add New Course</li>
          </ol>
        </nav>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex mb-8">
            <div
              className={`flex-1 text-center ${
                activeTab === "basic" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                1
              </span>
              Basic Information
            </div>
            <div
              className={`flex-1 text-center ${
                activeTab === "media" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                2
              </span>
              Courses Media
            </div>
            <div
              className={`flex-1 text-center ${
                activeTab === "settings" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                3
              </span>
              Settings
            </div>
          </div>

          {activeTab === "basic" && (
            <BasicInformationForm
              courseData={courseData}
              handleInputChange={handleInputChange}
              handleSelectChange={handleSelectChange}
              handleEditorChange={handleEditorChange}
              error={error}
              categoryOptions={categoryOptions}
              levelOptions={levelOptions}
              languageOptions={languageOptions}
              selectStyle={selectStyle}
            />
          )}

          {activeTab === "media" && (
            <CourseMediaForm
              courseData={courseData}
              handleFileChange={handleFileChange}
              errors={errors}
            />
          )}

          {activeTab === "settings" && (
            <CourseSettingsForm
              courseData={courseData}
              handleInputChange={handleInputChange}
            />
          )}

          <div className="mt-8 flex justify-between">
            {activeTab !== "basic" && (
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() =>
                  setActiveTab(activeTab === "media" ? "basic" : "media")
                }
              >
                Previous
              </button>
            )}
            {activeTab !== "settings" ? (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() =>
                  setActiveTab(activeTab === "basic" ? "media" : "settings")
                }
              >
                Continue
              </button>
            ) : (
              <button
                className={`${
                  isLoading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                onClick={handleSave}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : (
                  "Save Course"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
