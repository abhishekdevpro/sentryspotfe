import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import toast from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";
import ImageUpload from "./ImageUpload";
import LocationSelector from "./LocationSelector";
import PreferredLocations from "./PreferdLocations";
import JobTypeDropdown from "./JobTypeDropdown";
import TitleDropdown from "./TitleDropdown";
import SectorDropdown from "./SectorDropdown";
import WorkExperienceDropdown from "./WorkExperienceDropdown";
import { Button } from "@/components/ui/button";
import { updateUserProfile } from "@/store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const JobSeekerForm = ({ onNext }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState({
    jobTypes: [],
    sectors: [],
    titles: [],
    workExperience: [],
    salaryRanges: [],
  });

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm(); // ❌ removed static defaultValues

  const phoneValue = watch("phone");
  const isPhoneValid = phoneValue && phoneValue.length > 5;

  useEffect(() => {
    if (userInfo) {
      const data = userInfo.data || userInfo; // 
      console.log("User Info from store:", data);
      reset({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        job_title: data.job_title || "",
        proffesional_title: data.proffesional_title || "",
        sector_id: data.sector_id || 0,
        salary: data.current_salary || 0,
        salary_type: data.salary_type || "per month",
        work_experience_id: data.work_experience_id || 0,
        profile_visibility: data.profile_visibility || 0,
        country_id: data.country_id || "",
        state_id: data.state_id || "",
        city_id: data.city_id || "",
        current_location: data.current_location || "",
        preferred_location: Array.isArray(data.preferred_location)
          ? data.preferred_location
          : data.preferred_location?.split(",") || [],
        job_type: Array.isArray(data.job_type)
          ? data.job_type
          : data.job_type?.split(",") || [],
      });
    }
  }, [userInfo, reset]);

  // useEffect(() => {
  //   console.log("User Info from store:", userInfo);
  //   if (userInfo || userInfo?.data) {
  //     reset({
  //       first_name: userInfo.data?.first_name || "",
  //       last_name: userInfo.data?.last_name || "",
  //       email: userInfo.data?.email || "",
  //       phone: userInfo.data?.phone || "",
  //       job_title: userInfo.data?.job_title || "",
  //       proffesional_title: userInfo.data?.proffesional_title || "",
  //       sector_id: userInfo.data?.sector_id || 0,
  //       salary: userInfo.data?.current_salary || 0,
  //       salary_type: userInfo.data?.salary_type || "per month",
  //       work_experience_id: userInfo.data?.work_experience_id || 0,
  //       profile_visibility: userInfo.data?.profile_visibility || 0,
  //       country_id: userInfo.data?.country_id || "",
  //       state_id: userInfo.data?.state_id || "",
  //       city_id: userInfo.data?.city_id || "",
  //       current_location: userInfo.data?.current_location || "",
  //       preferred_location: Array.isArray(userInfo.data?.preferred_location)
  //         ? userInfo.data?.preferred_location
  //         : userInfo.data?.preferred_location?.split(",") || [],
  //       job_type: Array.isArray(userInfo.data?.job_type)
  //         ? userInfo.data?.job_type
  //         : userInfo.data?.job_type?.split(",") || [],
  //     });
  //   }
  // }, [userInfo, reset]);

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
          axios.get(`${baseurl}industries`, {
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
        toast.error("Failed to fetch data");
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const onSubmit = async (formValues) => {
    if (!isPhoneValid) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("first_name", formValues.first_name);
      formData.append("last_name", formValues.last_name);
      formData.append("email", formValues.email);
      formData.append("phone", formValues.phone);
      formData.append("job_title", formValues.job_title || "");
      formData.append(
        "proffesional_title",
        formValues.proffesional_title || ""
      );
      formData.append("sector_id", formValues.sector_id);
      formData.append("salary", formValues.salary);
      formData.append("salary_type", formValues.salary_type || "");
      formData.append("work_experience_id", formValues.work_experience_id);
      formData.append("profile_visibility", formValues.profile_visibility);
      formData.append("country_id", formValues.country_id || "");
      formData.append("state_id", formValues.state_id || "");
      formData.append("city_id", formValues.city_id || "");
      formData.append("current_location", formValues.current_location || "");

      if (Array.isArray(formValues.preferred_location)) {
        formValues.preferred_location.forEach((loc) =>
          formData.append("preferred_location", loc)
        );
      }

      if (Array.isArray(formValues.job_type)) {
        formValues.job_type.forEach((type) =>
          formData.append("job_type", type)
        );
      }

      if (formValues.photo_upload) {
        formData.append("photo_upload", formValues.photo_upload);
      }

      setLoading(true);
      const updated = await dispatch(updateUserProfile(formData)).unwrap();
      toast.success("Profile updated successfully");
      onNext?.();
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Optional: prevent form rendering if data not ready
  if (!userInfo || !userInfo.data)
    return <p className="text-center py-10">Loading profile...</p>;

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
        <ImageUpload
          profileData={userInfo.data}
          setValue={setValue}
          register={register}
        />
        {/* Form Fields */}
        <div className="form-group col-lg-6 col-md-12">
          <label className="block mb-1 text-gray-700 font-semibold">
            First Name*
          </label>
          <input
            type="text"
            {...register("first_name", { required: "First name is required" })}
            className="border font-light rounded-none mb-4 w-full p-2"
            maxLength={50}
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
            maxLength={50}
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
              rules={{
                required: "Phone number is required",
                validate: (value) => {
                  if (!value || value.length <= 5) {
                    return "Please enter a valid phone number";
                  }
                  return true;
                },
              }}
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
                    paddingRight: isPhoneValid ? "3rem" : "1rem",
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
            {isPhoneValid && (
              <i className="fas fa-check absolute right-3 top-1/2 -translate-y-1/2 bg-green-500 text-white p-1.5 rounded-full text-sm shadow-md"></i>
            )}
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}
          {isPhoneValid && (
            <p className="text-green-600 text-sm mt-1">
              ✓ Phone number is valid
            </p>
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
          profileData={userInfo.data}
        />{" "}
        <PreferredLocations
          control={control}
          setValue={setValue}
          errors={errors}
          profileData={userInfo.data}
        />
        {/* Job Preference Components */}
        <JobTypeDropdown
          jobTypes={apiData.jobTypes}
          control={control}
          setValue={setValue}
          errors={errors}
          profileData={userInfo.data}
        />
        <TitleDropdown
          control={control}
          setValue={setValue}
          errors={errors}
          className="mb-4"
          profileData={userInfo.data}
        />
        <SectorDropdown
          sectors={apiData.sectors}
          register={register}
          errors={errors}
          profileData={userInfo.data}
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
                {...register("salary_type")}
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
          profileData={userInfo.data}
        />
        {/* Submit Button */}
        <div className="form-group ">
          <Button
            type="submit"
            variant="default"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Next ➤"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default JobSeekerForm;
