"use client";
import { Link } from "react-router-dom";
import Select, { components } from "react-select";
import FeatherIcon from "feather-icons-react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledSelect = styled(Select)`
  .select__control {
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    min-height: 44px;
    box-shadow: none;

    &:hover {
      border-color: #b3b3b3;
    }
  }

  .select__indicator-separator {
    display: none;
  }

  .select__dropdown-indicator {
    color: #333;
  }

  .select__menu {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e5e5;
  }

  .select__option {
    background-color: ${(props) =>
      props.mobileSidebar === "disabled" ? "#fff" : "#000"};
    color: ${(props) => (props.mobileSidebar === "disabled" ? "#000" : "#fff")};
    font-size: 14px;

    &:hover {
      background-color: ${(props) =>
        props.mobileSidebar === "disabled" ? "#FFDEDA" : "#2b2838"};
    }
  }
`;

const DropdownIcon = styled(FeatherIcon)`
  width: 18px;
  height: 18px;
`;

const BasicInfoTab = ({
  courseData,
  categoryOptions,
  levelOptions,
  mobileSidebar,
  handleInputChange,
  handleSelectChange,
  handleQuillChange,
  onContinue,
}) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: "44px",
    }),
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropdownIcon icon="chevron-down" />
      </components.DropdownIndicator>
    );
  };

  const languageOptions = [
    { label: "English", value: "English" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
  ];

  return (
    // <div className="add-course-info">
    //   <div className="add-course-inner-header">
    //     <h4>Basic Information</h4>
    //   </div>
    //   <div className="add-course-form">
    //     <form action="#">
    //       <div className="input-block">
    //         <label className="add-course-label">Course Title</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Course Title"
    //           name="course_title"
    //           value={courseData.course_title}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //       <div className="input-block">
    //         <label className="add-course-label">Courses Category</label>
    //         <StyledSelect
    //           options={categoryOptions}
    //           onChange={handleSelectChange("course_category_id")}
    //           value={categoryOptions.find(
    //             (option) => option.value === courseData.course_category_id
    //           )}
    //           placeholder="Select Category"
    //           styles={customStyles}
    //           components={{ DropdownIndicator }}
    //           mobileSidebar={mobileSidebar}
    //         />
    //       </div>
    //       <div className="input-block">
    //         <label className="add-course-label">Courses Level</label>
    //         <StyledSelect
    //           options={levelOptions}
    //           onChange={handleSelectChange("course_level_id")}
    //           value={levelOptions.find(
    //             (option) => option.value === courseData.course_level_id
    //           )}
    //           placeholder="Select Level"
    //           styles={customStyles}
    //           components={{ DropdownIndicator }}
    //           mobileSidebar={mobileSidebar}
    //         />
    //       </div>
    //       <div className="input-block">
    //         <label className="add-course-label">Course Language</label>
    //         <StyledSelect
    //           options={languageOptions}
    //           onChange={handleSelectChange("course_language")}
    //           value={languageOptions.find(
    //             (option) => option.value === courseData.course_language
    //           )}
    //           placeholder="Select Language"
    //           styles={customStyles}
    //           components={{ DropdownIndicator }}
    //           mobileSidebar={mobileSidebar}
    //         />
    //       </div>
    //       <div className="input-block mb-0">
    //         <label className="add-course-label">Course Description</label>
    //         <ReactQuill
    //           value={courseData.course_description}
    //           onChange={handleQuillChange("course_description")}
    //           modules={{
    //             toolbar: [
    //               [{ header: [1, 2, false] }],
    //               ["bold", "italic", "underline", "strike", "blockquote"],
    //               [{ list: "ordered" }, { list: "bullet" }],
    //               ["link", "image"],
    //               ["clean"],
    //             ],
    //           }}
    //         />
    //       </div>
    //       <div className="input-block">
    //         <label className="add-course-label">Learning Objectives</label>
    //         <ReactQuill
    //           value={courseData.learning_objectives}
    //           onChange={handleQuillChange("learning_objectives")}
    //           modules={{
    //             toolbar: [
    //               [{ header: [1, 2, false] }],
    //               ["bold", "italic", "underline", "strike", "blockquote"],
    //               [{ list: "ordered" }, { list: "bullet" }],
    //               ["link", "image"],
    //               ["clean"],
    //             ],
    //           }}
    //         />
    //       </div>
    //       <div className="input-block">
    //         <label className="add-course-label">Target Audience</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="target_audience"
    //           value={courseData.target_audience}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //       <div className="input-block">
    //         <label className="add-course-label">Time Spent on Course</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="time_spent_on_course"
    //           value={courseData.time_spent_on_course}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //     </form>
    //   </div>
    //   <div className="widget-btn">
    //     <Link
    //       to="#"
    //       className="btn btn-info-light next_btn"
    //       onClick={onContinue}
    //     >
    //       Continue
    //     </Link>
    //   </div>
    // </div>
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="border-b pb-3 mb-4">
        <h4 className="text-lg font-semibold text-gray-800">
          Basic Information
        </h4>
      </div>

      {/* Form */}
      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Course Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Course Title
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Course Title"
              name="course_title"
              value={courseData.course_title}
              onChange={handleInputChange}
            />
          </div>

          {/* Course Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Course Category
            </label>
            <StyledSelect
              options={categoryOptions}
              onChange={handleSelectChange("course_category_id")}
              value={categoryOptions.find(
                (option) => option.value === courseData.course_category_id
              )}
              placeholder="Select Category"
            />
          </div>

          {/* Course Level */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Course Level
            </label>
            <StyledSelect
              options={levelOptions}
              onChange={handleSelectChange("course_level_id")}
              value={levelOptions.find(
                (option) => option.value === courseData.course_level_id
              )}
              placeholder="Select Level"
            />
          </div>

          {/* Course Language */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Course Language
            </label>
            <StyledSelect
              options={languageOptions}
              onChange={handleSelectChange("course_language")}
              value={languageOptions.find(
                (option) => option.value === courseData.course_language
              )}
              placeholder="Select Language"
            />
          </div>

          {/* Course Description */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Course Description
            </label>
            <ReactQuill
              value={courseData.course_description}
              onChange={handleQuillChange("course_description")}
              className="bg-white border border-gray-300 rounded-md"
            />
          </div>

          {/* Learning Objectives */}
          <div className="col-span-1 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Learning Objectives
            </label>
            <ReactQuill
              value={courseData.learning_objectives}
              onChange={handleQuillChange("learning_objectives")}
              className="bg-white border border-gray-300 rounded-md"
            />
          </div>

          {/* Target Audience */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Target Audience
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="target_audience"
              value={courseData.target_audience}
              onChange={handleInputChange}
            />
          </div>

          {/* Time Spent on Course */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Time Spent on Course
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="time_spent_on_course"
              value={courseData.time_spent_on_course}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>

      {/* Continue Button */}
      <div className="mt-6 flex justify-end">
        <Link
          to="#"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          onClick={onContinue}
        >
          Continue
        </Link>
      </div>
    </div>
  );
};
BasicInfoTab.propTypes = {
  courseData: PropTypes.shape({
    course_title: PropTypes.string,
    course_category_id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    course_level_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    course_language: PropTypes.string,
    course_description: PropTypes.string,
    learning_objectives: PropTypes.string,
    target_audience: PropTypes.string,
    time_spent_on_course: PropTypes.string,
  }).isRequired,
  categoryOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  levelOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  mobileSidebar: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  handleQuillChange: PropTypes.func.isRequired,
  onContinue: PropTypes.func.isRequired,
};
export default BasicInfoTab;
