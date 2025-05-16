import Select from "react-select";
import ReactQuill from "react-quill";
import { ChevronDown } from "lucide-react";

const BasicInformationForm = ({
  courseData,
  handleInputChange,
  handleSelectChange,
  handleEditorChange,
  error,
  categoryOptions,
  levelOptions,
  languageOptions,
  selectStyle,
}) => {
  return (
    <div className="space-y-6">
      <h4 className="text-2xl font-semibold mb-6">Basic Information</h4>

      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="course_title"
        >
          Course Title
        </label>
        <input
          type="text"
          id="course_title"
          name="course_title"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          placeholder="Title of your Course"
          value={courseData.course_title}
          onChange={handleInputChange}
        />
        {error.course_title && (
          <p className="mt-2 text-sm text-red-600">{error.course_title}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Courses Category / Discipline
        </label>
        <Select
          options={categoryOptions}
          onChange={handleSelectChange("course_category")}
          placeholder="Select Category"
          styles={selectStyle}
          isMulti
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Courses Level
        </label>
        <Select
          options={levelOptions}
          onChange={handleSelectChange("course_level")}
          placeholder="Select Level"
          styles={selectStyle}
          isMulti
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Language
        </label>
        <div className="relative">
          <Select
            options={languageOptions}
            onChange={handleSelectChange("course_language_name")}
            placeholder="Select Language"
            styles={selectStyle}
          />
          <ChevronDown
            className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none"
            size={20}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Description
        </label>
        <ReactQuill
          value={courseData.course_description}
          onChange={handleEditorChange}
          placeholder="Enter course description..."
          className="h-16 mb-16"
        />
        {error.course_description && (
          <p className="mt-2 text-sm text-red-600">
            {error.course_description}
          </p>
        )}
      </div>

      <div className="">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What you will Learn
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          name="learning_objectives"
          value={courseData.learning_objectives}
          onChange={handleInputChange}
          rows="2"
        ></textarea>
        {error.learning_objectives && (
          <p className="mt-2 text-sm text-red-600">
            {error.learning_objectives}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Who is this Course for?
        </label>
        <input
          type="text"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          name="target_audience"
          placeholder="Target Audience"
          value={courseData.target_audience}
          onChange={handleInputChange}
        />
        {error.target_audience && (
          <p className="mt-2 text-sm text-red-600">{error.target_audience}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Spent on Course (in hours)
        </label>
        <input
          type="text"
          className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          name="time_spent_on_course"
          placeholder="Time spent on courses"
          value={courseData.time_spent_on_course}
          onChange={handleInputChange}
        />
        {error.time_spent_on_course && (
          <p className="mt-2 text-sm text-red-600">
            {error.time_spent_on_course}
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicInformationForm;
