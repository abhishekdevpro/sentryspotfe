import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const ApplyJobPopup = ({ jobId, token, onClose }) => {
  const [formData, setFormData] = useState({
    cvFile: null,
    phoneNumber: '',
    whyYouWantToJoinUs: '',
    lastCompanyName: '',
    totalWorkExperience: '',
    relevantWorkExperience: '',
    noticePeriodInDays: '',
    currentSalary: '',
    expectedSalary: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/apply-for-job/${jobId}`,
        formDataObj,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success('You have successfully applied for the job!');
        onClose(); // Close the popup on success
      }
      
      else {
        toast.error('Failed to apply for the job. Please try again.');
      }
    } catch (error ) {
      toast.warning('Error applying for job, Alreday applied for this job', error);
     
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-gray- px-5 ">
      <ToastContainer/>
      <div className="bg-white   mt-8 h-3/4  w-3/4 border-x-2 pb-4 border-b-2 border-blue-950  overflow-y-scroll rounded-lg">
        <h2 className="text-xl text-white bg-blue-950 shadow-lg py-2  text-center  mb-4">Apply for Job</h2>
        <form onSubmit={handleSubmit} className="space-y-4 form-group  px-5">
            
          <div>
            <label className="block text-sm font-medium text-gray-700">CV File</label>
            <input type="file" name="cvFile" onChange={handleChange} required className="mt-1 block w-full  rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="number" name="phoneNumber" onChange={handleChange} required className="mt-1 block w-full rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Why You Want To Join Us</label>
            <textarea name="whyYouWantToJoinUs" onChange={handleChange} required className="mt-1 block w-full h-20  rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Company Name</label>
            <input type="text" name="lastCompanyName" onChange={handleChange} required className="mt-1 block w-full rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Work Experience</label>
            <input type="number" name="totalWorkExperience" onChange={handleChange} required className="mt-1 block w-full rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Relevant Work Experience</label>
            <input type="number" name="relevantWorkExperience" onChange={handleChange} required className="mt-1 block w-full rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Notice Period in Days</label>
            <input type="number" name="noticePeriodInDays" onChange={handleChange} required className="mt-1 block w-full rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Salary</label>
            <input type="number" name="currentSalary" onChange={handleChange} required className="mt-1 block w-full rounded-lg p-3 bg-blue-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Salary</label>
            <input type="number" name="expectedSalary" onChange={handleChange} required className="mt-1 block w-full rounded-lg p-3 bg-blue-50" />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-950 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobPopup;
