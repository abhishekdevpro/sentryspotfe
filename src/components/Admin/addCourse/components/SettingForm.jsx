"use client";
// import { Link } from "react-router-dom"
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

const SettingsTab = ({
  courseData,
  handleInputChange,
  handleQuillChange,
  onPrevious,
  onSave,
}) => {
  return (
    // <div className="add-course-info">
    //   <div className="add-course-inner-header">
    //     <h4>Course Settings</h4>
    //   </div>
    //   <div className="add-course-form">
    //     <form action="#">
    //       {/* Course Requirements */}
    //       <div className="input-block">
    //         <label className="add-course-label">Requirements</label>
    //         <ReactQuill
    //           value={courseData.requirements}
    //           onChange={(content) => handleQuillChange("requirements", content)}
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

    //       {/* Course Price */}
    //       <div className="input-block">
    //         <label className="add-course-label">Course Price</label>
    //         <input
    //           type="number"
    //           className="form-control"
    //           placeholder="0"
    //           name="course_price"
    //           value={courseData.course_price}
    //           onChange={handleInputChange}
    //           step="0.01"
    //         />
    //       </div>

    //       {/* Discount Percent */}
    //       <div className="input-block">
    //         <label className="add-course-label">Discount Percent</label>
    //         <input
    //           type="number"
    //           className="form-control"
    //           placeholder="0"
    //           name="discount_percent"
    //           value={courseData.discount_percent}
    //           onChange={handleInputChange}
    //           step="0.01"
    //         />
    //       </div>

    //       {/* Price After Discount */}
    //       <div className="input-block">
    //         <label className="add-course-label">Price After Discount</label>
    //         <input
    //           type="number"
    //           className="form-control"
    //           placeholder="0"
    //           name="after_discount_price"
    //           value={courseData.after_discount_price}
    //           onChange={handleInputChange}
    //           step="0.01"
    //         />
    //       </div>

    //       {/* Coupon Code */}
    //       <div className="input-block">
    //         <label className="add-course-label">Coupon Code</label>
    //         <input
    //           type="text"
    //           className="form-control"
    //           placeholder="Enter coupon code"
    //           name="coupon_code"
    //           value={courseData.coupon_code}
    //           onChange={handleInputChange}
    //         />
    //       </div>
    //     </form>
    //   </div>

    //   {/* Navigation Buttons */}
    //   <div className="widget-btn">
    //     <button className="btn btn-black prev_btn" onClick={onPrevious}>
    //       Previous
    //     </button>
    //     <button className="btn btn-info-light next_btn" onClick={onSave}>
    //       Save Changes
    //     </button>
    //   </div>
    // </div>

    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Header */}
      <div className="border-b pb-4 mb-4">
        <h4 className="text-xl font-semibold">Course Settings</h4>
      </div>

      {/* Form */}
      <form>
        {/* Course Requirements */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Requirements
          </label>
          <ReactQuill
            value={courseData.requirements}
            onChange={(content) => handleQuillChange("requirements", content)}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            className="bg-white border rounded-lg"
          />
        </div>

        {/* Course Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Course Price
          </label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            name="course_price"
            value={courseData.course_price}
            onChange={handleInputChange}
            step="0.01"
          />
        </div>

        {/* Discount Percent */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Discount Percent
          </label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            name="discount_percent"
            value={courseData.discount_percent}
            onChange={handleInputChange}
            step="0.01"
          />
        </div>

        {/* Price After Discount */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Price After Discount
          </label>
          <input
            type="number"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            name="after_discount_price"
            value={courseData.after_discount_price}
            onChange={handleInputChange}
            step="0.01"
          />
        </div>

        {/* Coupon Code */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Coupon Code
          </label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter coupon code"
            name="coupon_code"
            value={courseData.coupon_code}
            onChange={handleInputChange}
          />
        </div>
      </form>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={onSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Prop Validation
SettingsTab.propTypes = {
  courseData: PropTypes.shape({
    requirements: PropTypes.string,
    course_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    discount_percent: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    after_discount_price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    coupon_code: PropTypes.string,
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleQuillChange: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default SettingsTab;
