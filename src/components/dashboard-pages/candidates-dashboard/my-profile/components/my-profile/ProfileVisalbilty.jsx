import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const WorkExperienceForm = ({ onNext }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

  const [workExperiences, setWorkExperiences] = useState([]);
  
  // React Hook Form setup
  const { control, handleSubmit, register, formState: { errors }, reset } = useForm({
    defaultValues: {
      experiences: [
        { 
          job_title: "", 
          organization: "", 
          time_period_start: "", 
          time_period_end: "",
          is_present: false,
          description: ""
        }
      ]
    }
  });
  
  // Field array for managing multiple work experience entries
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences"
  });

  // Fetch existing work experiences on component mount
  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await axios.get(`${baseurl}user-profile`, {
          headers: {
            Authorization: token,
          },
        });
        const workExperienceDetails = response.data.data.professional_details;
        if (workExperienceDetails && workExperienceDetails.length > 0) {
          setWorkExperiences(workExperienceDetails);
          // If there are existing work experiences, populate the form with them
          reset({
            experiences: workExperienceDetails.map(exp => ({
              job_title: exp.job_title,
              organization: exp.organization,
              time_period_start: exp.time_period_start,
              time_period_end: exp.time_period_end,
              is_present: exp.is_present === 1,
              description: exp.description
            }))
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchWorkExperiences();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      // Format the data according to the required structure
      const newExp = data.experiences.map(experience => ({
        job_title: experience.job_title,
        organization: experience.organization,
        time_period_start: experience.time_period_start,
        time_period_end: experience.is_present ? null : experience.time_period_end,
        is_present: experience.is_present ? 1 : 0,
        description: experience.description
      }));

      const response = await axios.put(`${baseurl}user-profile-professional`, newExp, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      console.log(response,"Work exp")
      if(response.data.status === "success" || response.data.code ===200){
         toast.success( response?.data?.message || "Work experience details saved successfully!");
         onNext();
      }

    } catch (error) {
      toast.error("Failed to save work experience details.");
      console.error("API error:", error);
    }
  };

  const addExperience = () => {
    append({ 
      job_title: "", 
      organization: "", 
      time_period_start: "", 
      time_period_end: "",
      is_present: false,
      description: ""
    });
  };

  return (
    <div>
      <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id} className="work-experience-entry mb-6">
            <h4 className="text-lg font-medium mb-2">Work Experience {index + 1}</h4>
            <div className="row">
              <div className="form-group col-lg-6 col-md-12">
                <label>Job Title</label>
                <input
                  type="text"
                  {...register(`experiences.${index}.job_title`, { required: "Job title is required" })}
                  placeholder="Enter job title"
                  className="form-control"
                  maxLength={100}
                />
                {errors.experiences?.[index]?.job_title && (
                  <span className="text-red-500 text-sm">{errors.experiences[index].job_title.message}</span>
                )}
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>Organization</label>
                <input
                  type="text"
                  {...register(`experiences.${index}.organization`, { required: "Organization name is required" })}
                  placeholder="Enter organization name"
                  className="form-control"
                  maxLength={100}
                />
                {errors.experiences?.[index]?.organization && (
                  <span className="text-red-500 text-sm">{errors.experiences[index].organization.message}</span>
                )}
                
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <label>Start Date</label>
                <input
                  type="month"
                  {...register(`experiences.${index}.time_period_start`, { required: "Start date is required" })}
                  className="form-control"
                />
                {errors.experiences?.[index]?.time_period_start && (
                  <span className="text-red-500 text-sm">{errors.experiences[index].time_period_start.message}</span>
                )}
              </div>

              <div className="form-group col-lg-6 col-md-12">
                <Controller
                  name={`experiences.${index}.is_present`}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center mt-6">
                      <input
                        type="checkbox"
                        id={`currently-working-${index}`}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mr-2"
                      />
                      <label htmlFor={`currently-working-${index}`}>Currently working here</label>
                    </div>
                  )}
                />
              </div>

              <div className={`form-group col-lg-6 col-md-12 ${field.is_present ? 'hidden' : ''}`}>
                <label>End Date</label>
                <Controller
                  name={`experiences.${index}.time_period_end`}
                  control={control}
                  rules={{ 
                    required: field.is_present ? false : "End date is required" 
                  }}
                  render={({ field: endDateField }) => (
                    <input
                      type="month"
                      value={endDateField.value || ""}
                      onChange={endDateField.onChange}
                      disabled={field.is_present}
                      className="form-control"
                    />
                  )}
                />
                {errors.experiences?.[index]?.time_period_end && (
                  <span className="text-red-500 text-sm">{errors.experiences[index].time_period_end.message}</span>
                )}
              </div>

              <div className="form-group col-12">
                <label>Job Description</label>
                <textarea
                  {...register(`experiences.${index}.description`, { required: "Job description is required" })}
                  placeholder="Enter job description"
                  className="form-control"
                  rows="4"
                  style={{ overflowY: 'auto', maxHeight: '200px' }}
                  maxLength={500}
                ></textarea>
                {errors.experiences?.[index]?.description && (
                  <span className="text-red-500 text-sm">{errors.experiences[index].description.message}</span>
                )}
              </div>

              {index > 0 && (
                <div className="form-group col-12">
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={() => remove(index)}
                  >
                    Remove Experience
                  </button>
                </div>
              )}
            </div>
            <hr className="my-4" />
          </div>
        ))}

        <div className="row">
          <div className="form-group col-12">
            <button
              type="button"
              className="theme-btn btn-style-one bg-blue-950 mr-4 mb-2"
              onClick={addExperience}
            >
              + Add Another Experience
            </button>
            
            <button type="submit" className="theme-btn btn-style-one bg-blue-950 mb-2">
              Save & Next ➤
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceForm;