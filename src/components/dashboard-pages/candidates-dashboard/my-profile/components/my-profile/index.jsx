
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Constant } from "@/utils/constant/constant";
import ImageUpload from "./ImageUpload";
import LocationSelector from "./LocationSelector";
import PreferredLocations from "./PreferdLocations";
import JobTypeDropdown from "./JobTypeDropdown";
import TitleDropdown from "./TitleDropdown";
import SectorDropdown from "./SectorDropdown";
import WorkExperienceDropdown from "./WorkExperienceDropdown";

const JobSeekerForm = ({ onNext }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState({
    jobTypes: [],
    sectors: [],
    titles: [],
    workExperience: [],
    salaryRanges: [],
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      job_title: "",
      sector_id: 0,
      salary: 0,
      salaryType: "per month",
      work_experience_id: 0,
      profile_visibility: 0,
      photo_upload:""

    },
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${baseurl}user-profile`, {
          headers: {
            Authorization: token,
          },
        });
        const personalDetails = response.data.data.personal_details;
        localStorage.setItem(
          Constant.USER_INFO,
          JSON.stringify(personalDetails)
        );
        setProfileData(personalDetails);

        // Set form values from profile data
        if (personalDetails) {
          setValue("first_name", personalDetails.first_name || "");
          setValue("last_name", personalDetails.last_name || "");
          setValue("email", personalDetails.email || "");
          setValue("phone", personalDetails.phone || "");
          setValue("salary", profileData.current_salary);
          setValue("salaryType", profileData.salary_type || "");
          setValue("profile_visibility", profileData.profile_visibility || 0);

        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [setValue]);

  // Fetch all necessary data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          jobTypesResponse,
          sectorsResponse,
          titlesResponse,
          workExperienceResponse,
          salaryRangesResponse,
        ] = await Promise.all([
          axios.get(`${baseurl}job-types`, {
            headers: { Authorization: token },
          }),
          axios.get(`https://api.sentryspot.co.uk/api/jobseeker/industries`, {
            headers: { Authorization: token },
          }),
          axios.get(`https://api.sentryspot.co.uk/api/employeer/job-titles`, {
            headers: { Authorization: token },
          }),
          axios.get(`${baseurl}experience-level`, {
            headers: { Authorization: token },
          }),
          axios.get(`${baseurl}salary-range`, {
            headers: { Authorization: token },
          }),
        ]);

        setApiData({
          jobTypes: jobTypesResponse.data.data,
          sectors: sectorsResponse.data.data,
          titles: titlesResponse.data.data,
          workExperience: workExperienceResponse.data.data,
          salaryRanges: salaryRangesResponse.data.data,
        });
      } catch (error) {
        toast.error("Failed to fetch data from API.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handlePhoneVerification = () => {
    // Phone verification logic
    const phoneValue = control._formValues.phone_number;
    if (phoneValue && phoneValue.length > 5) {
      toast.success("Phone number verified!");
      setIsPhoneVerified(true);
    } else {
      toast.error("Please enter a valid phone number.");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
       const formData = new FormData();
      console.log("Form data to submit:", data);
      Object.keys(data).forEach(key => {
      // Handle file upload separately
      if (key === 'photo_upload') {
        if (data[key] instanceof File) {
          formData.append('photo_upload', data[key]);
        }
      } else {
        // Add other form fields normally
        formData.append(key, data[key]);
      }
    });


      const response = await axios.put(
        `${baseurl}user-profile`,
        formData, // No need to wrap in { data } unless API expects it like that
        {
          headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Details saved successfully!");
        onNext(); // Move to next step after success
      }
    } catch (error) {
      console.error("Error in my profile:", error);
      toast.error(
        error.response?.data?.message || "Failed to save profile data."
      );
    } finally {
      setLoading(false); // Always stop loading
    }
    // onNext()
  };

  // console.log(profileData, "personalDetails");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="default-form">
      <div className="row">
        {/* Profile Picture Upload */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-4">
            {/* Label */}
            <label
              htmlFor="profile_visibility"
              className="font-bold text-gray-700 cursor-pointer flex items-center"
            >
              Profile and CV Visibility
              {/* Toggle Switch */}
              <Controller
                name="profile_visibility"
                control={control}
                render={({ field }) => (
                  <div className="relative ml-4">
                    <input
                      type="checkbox"
                      id="profile_visibility"
                      {...field}
                      checked={field.value}
                      // onChange={(e) => field.onChange(e.target.checked)}
                       onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                      className="sr-only peer"
                    />
                    {/* Toggle Background */}
                    <div className="w-12 h-6 bg-gray-300 rounded-2xl shadow-inner peer-checked:bg-blue-500 transition-colors duration-300 cursor-pointer">
                      {/* Toggle Knob */}
                      <div
                        className={`absolute top-0 left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ${
                          field.value ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                )}
              />
            </label>
          </div>
          <div className="relative inline-block">
            <p
              className="text border-2 px-2 border-gray-500 rounded-full cursor-pointer"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              ℹ
            </p>
            {/* Tooltip Content */}
            {isTooltipVisible && (
              <div className="absolute left-0 bottom-full mb-1 w-48 p-2 bg-white border border-gray-300 rounded shadow-lg text-black">
                Activating this shows basic details to employers, including
                contact details.
              </div>
            )}
          </div>
        </div>
        <ImageUpload profileData={profileData} setValue={setValue} register={register}/>
        {/* Form Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <label className="block mb-1 text-gray-700 font-semibold">
            First Name*
          </label>
          <input
            type="text"
            {...register("first_name", { required: "First name is required" })}
            className="border font-light rounded-none mb-4 w-full p-2"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name.message}</p>
          )}

          <label className="block mb-1 text-gray-700 font-semibold">
            Last Name*
          </label>
          <input
            type="text"
            {...register("last_name", { required: "Last name is required" })}
            className="border rounded-none font-light w-full p-2"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name.message}</p>
          )}
        </div>
        {/* Phone Number with Controller */}
        <div className="form-group col-lg-6 col-md-12 font-light">
          <label className="block mb-1 text-gray-700 font-semibold">
            Phone Number*
          </label>
          <div className="relative">
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <PhoneInput
                inputmode="numeric"
                  country={"gb"}
                  value={field.value}
                  onChange={field.onChange}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "10px",
                    border: "none",
                    height: "calc(2.5em + 1rem + 3px)",
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    backgroundColor: "#F0F5F7",
                    backgroundClip: "padding-box",
                    paddingRight: isPhoneVerified ? "3rem" : "1rem",
                  }}
                  containerStyle={{ width: "100%" }}
                  buttonStyle={{
                    borderRadius: "none",
                    border: "none",
                    backgroundColor: "#f8f9fa",
                  }}
                />
              )}
            />
            {isPhoneVerified && (
              <i className="fas fa-check absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 text-white p-1.5 rounded-full text-sm shadow-md"></i>
            )}
          </div>
          {errors.phone_number && (
            <p className="text-red-500 text-sm">
              {errors.phone_number.message}
            </p>
          )}
          {!isPhoneVerified && (
            <button
              type="button"
              onClick={handlePhoneVerification}
              className="bg-blue-600 text-white py-1 px-4 mt-2 rounded-lg cursor-pointer"
            >
              Verify
            </button>
          )}
        </div>
        {/* Email Field (Read-only) */}
        <div className="form-group col-lg-6 col-md-12 font-light relative">
          <label className="block mb-1 text-gray-700 font-semibold">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              {...register("email")}
              className="email w-full pr-12 py-2 pl-3 border rounded text-gray-700 bg-gray-100"
              readOnly
              disabled
            />
            <i className="fas fa-check absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 text-white p-1.5 rounded-full text-sm shadow-md"></i>
          </div>
        </div>
        {/* Location Components */}
        <LocationSelector
          className="form-group col-lg-4 col-md-12 font-light"
          control={control}
          setValue={setValue}
          errors={errors}
          profileData={profileData}
        />{" "}
        <PreferredLocations
          control={control}
          setValue={setValue}
          errors={errors}
          profileData={profileData}
        />
        {/* Job Preference Components */}
        <JobTypeDropdown
          jobTypes={apiData.jobTypes}
          control={control}
          setValue={setValue}
          errors={errors}
           profileData={profileData}
        />
        <TitleDropdown
          control={control}
          setValue={setValue}
          errors={errors}
          className="mb-4"
           profileData={profileData}
        />
        <SectorDropdown
          sectors={apiData.sectors}
          register={register}
          errors={errors}
           profileData={profileData}
        />
        {/* Salary Field */}
        <div className="form-group col-lg-6 col-md-12 font-light">
          <label className="font-medium">
            Salary*{" "}
            <span className="text-sm text-gray-500">
              Minimum salary (please enter at least one type of salary)
            </span>
          </label>

          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="relative">
                <span className="absolute text-center z-10 top-[20%] p-2 left-0 flex items-center text-gray-500">
                  £
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  {...register("salary", {
                    required: "Salary is required",
                    min: { value: 1, message: "Salary must be greater than 0" },
                  })}
                  className="w-full pl-10 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5000"
                />
              </div>
              {errors.salary && (
                <p className="text-red-500 text-sm">{errors.salary.message}</p>
              )}
            </div>

            <div className="col-lg-6 col-md-12">
              <select
                {...register("salaryType")}
                className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 px-4 py-2 bg-white text-gray-700"
              >
                <option value="">Select type</option>
                <option value="per hour">Per Hour</option>
                <option value="per month">Per Month</option>
                <option value="per annum">Per Annum</option>
              </select>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Read our Salary Blog to find out more
          </p>
        </div>
        {/* Work Experience Dropdown */}
        <WorkExperienceDropdown
          workExperience={apiData.workExperience}
          register={register}
          errors={errors}
          setValue={setValue}
          profileData={profileData}
        />
        {/* Submit Button */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one bg-blue-900">
            Save & Next ➤
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobSeekerForm;
