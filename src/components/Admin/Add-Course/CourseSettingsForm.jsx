const CourseSettingsForm = ({ courseData, handleInputChange }) => {
    return (
      <div className="space-y-6">
        <h4 className="text-2xl font-semibold mb-6">Course Settings</h4>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Note by Trainer</label>
          <textarea
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            name="requirements"
            value={courseData.requirements}
            onChange={handleInputChange}
            rows="4"
          ></textarea>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Price</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
            name="course_price"
            value={courseData.course_price}
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount Percent</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
            name="discount_percent"
            value={courseData.discount_percent}
            onChange={handleInputChange}
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price After Discount</label>
          <input
            type="number"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="0"
            name="after_discount_price"
            value={courseData.after_discount_price}
            readOnly
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
          <input
            type="text"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Enter coupon code"
            name="coupon_code"
            value={courseData.coupon_code}
            onChange={handleInputChange}
          />
        </div>
      </div>
    )
  }
  
  export default CourseSettingsForm
  
  