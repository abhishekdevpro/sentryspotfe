import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ChevronRight, ChevronDown, Trash2 } from "lucide-react";

import TitleAutocomplete from "./TitleDropdown";

const WorkExperienceForm = ({ onNext, onPrevious }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

  const [workExperiences, setWorkExperiences] = useState([]);
  const [expandedSections, setExpandedSections] = useState([0]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      experiences: [
        {
          job_title: "",
          organization: "",
          time_period_start: "",
          time_period_end: "",
          is_present: false,
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  const watchAllFields = watch("experiences");

  useEffect(() => {
    const fetchWorkExperiences = async () => {
      try {
        const response = await axios.get(`${baseurl}user-profile`, {
          headers: { Authorization: token },
        });
        const workExperienceDetails = response.data.data.professional_details;
        if (workExperienceDetails?.length > 0) {
          setWorkExperiences(workExperienceDetails);
          reset({
            experiences: workExperienceDetails.map((exp) => ({
              job_title: exp.job_title,
              organization: exp.organization,
              time_period_start: exp.time_period_start,
              time_period_end: exp.time_period_end,
              is_present: exp.is_present === 1,
              description: exp.description,
            })),
          });
          setExpandedSections([0]);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchWorkExperiences();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const formatted = data.experiences.map((experience) => ({
        job_title: experience.job_title,
        organization: experience.organization,
        time_period_start: experience.time_period_start,
        time_period_end: experience.is_present
          ? null
          : experience.time_period_end,
        is_present: experience.is_present ? 1 : 0,
        description: experience.description,
      }));

      const response = await axios.put(
        `${baseurl}user-profile-professional`,
        formatted,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success" || response.data.code === 200) {
        toast.success(response?.data?.message || "Work experience saved!");
        onNext();
      }
    } catch (error) {
      toast.error("Failed to save work experience.");
      console.error("API error:", error);
    }
  };

  const addExperience = () => {
    const newIndex = fields.length;
    append({
      job_title: "",
      organization: "",
      time_period_start: "",
      time_period_end: "",
      is_present: false,
      description: "",
    });
    setExpandedSections((prev) => [...prev, newIndex]);
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const removeExperience = (index) => {
    remove(index);
    setExpandedSections((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div>
      <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const isExpanded = expandedSections.includes(index);
          const isPresent = watchAllFields?.[index]?.is_present;

          return (
            <div
              key={field.id}
              className="border rounded-lg bg-white p-4 mb-6 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">
                  {field.job_title || ` Work Experience ${index + 1}`}
                </h4>
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    className="text-blue-900 btn bg-gray-100 mt-2 font-medium underline text-sm"
                    onClick={() => toggleSection(index)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown />
                      </>
                    ) : (
                      <>
                        <ChevronRight />
                      </>
                    )}
                  </button>

                  <div className="md:col-span-2">
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="btn btn-danger mt-2"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="">
                  {/* <div>
                    <label className="font-medium">Job Title</label>
                    <input
                      type="text"
                      {...register(`experiences.${index}.job_title`, {
                        required: "Job title is required",
                      })}
                      className="form-control mt-1"
                      placeholder="Enter job title"
                      maxLength={50}
                    />
                    {errors.experiences?.[index]?.job_title && (
                      <span className="text-red-500 text-sm">
                        {errors.experiences[index].job_title.message}
                      </span>
                    )}
                  </div> */}
                  <div className="row">
                    <TitleAutocomplete
                      control={control}
                      setValue={setValue}
                      className="w-full col-12"
                      errors={errors.experiences?.[index] || {}}
                      profileData={{
                        job_title: getValues(`experiences.${index}.job_title`),
                      }}
                      fieldName={`experiences.${index}.job_title`}
                    />
                    {errors.experiences?.[index]?.job_title && (
                      <span className="text-red-500 text-sm">
                        {errors.experiences[index].job_title.message}
                      </span>
                    )}

                    <div className="form-group col-xl-6 col-12">
                      <label className="font-medium">Organization</label>
                      <input
                        type="text"
                        {...register(`experiences.${index}.organization`, {
                          required: "Organization is required",
                        })}
                        className="border font-light rounded-none mb-4 w-full p-2"
                        placeholder="Enter organization"
                        maxLength={70}
                      />
                      {errors.experiences?.[index]?.organization && (
                        <span className="text-red-500 text-sm">
                          {errors.experiences[index].organization.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row col-12">
                    <div className="col-6 flex flex-col ">
                      {/* start date */}
                      <div className="form-group col-12">
                        <label className="font-medium">Start Date</label>
                        <input
                          type="month"
                          {...register(`experiences.${index}.time_period_start`, {
                            required: "Start date is required",
                          })}
                          className="border font-light rounded-none w-full p-2"
                        />
                        {errors.experiences?.[index]?.time_period_start && (
                          <span className="text-red-500 text-sm">
                            {errors.experiences[index].time_period_start.message}
                          </span>
                        )}
                      </div>
                      {/* check box */}
                      <div className="form-group col-12 flex items-center gap-2">
                        <Controller
                          name={`experiences.${index}.is_present`}
                          control={control}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              id={`currently-working-${index}`}
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="rounded-none border bg-white cursor-pointer mb-2 h-5 w-5"
                            />
                          )}
                        />
                        <label
                          htmlFor={`currently-working-${index}`}
                          className="text-gray-700 select-none"
                        >
                          Currently working here
                        </label>

                      </div>
                    </div>
                    {/* end date */}
                    <div className="form-group col-xl-6">
                      <label className="font-medium">End Date</label>
                      <input
                        type="month"
                        {...register(`experiences.${index}.time_period_end`, {
                          required: !isPresent ? "End date is required" : false,
                        })}
                        className={`border font-light rounded-none mb-4 w-full p-2 ${isPresent
                          ? "cursor-not-allowed opacity-50"
                          : "opacity-100 "
                          }`}
                        disabled={isPresent}
                      />
                      {errors.experiences?.[index]?.time_period_end && (
                        <span className="text-red-500 text-sm">
                          {errors.experiences[index].time_period_end.message}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Job Description */}
                  <div className="form-group col-12">
                    <label className="font-medium">Job Description</label>
                    <textarea
                      {...register(`experiences.${index}.description`, {
                        required: "Description is required",
                      })}
                      className="border font-light rounded-none mb-4 w-full p-2"
                      placeholder="Enter job description"
                      rows="4"
                      maxLength={200}
                    ></textarea>
                    {errors.experiences?.[index]?.description && (
                      <span className="text-red-500 text-sm">
                        {errors.experiences[index].description.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* <div className="flex gap-4 flex-wrap  justify-between">
          <div className="form-group md:w-1/2 w-full">
            <button
              type="button"
              onClick={onPrevious}
              className="theme-btn btn-style-one bg-gray-500"
            >
              ◀ Back
            </button>

          </div>
          <div className="form-group md:w-1/2 w-full text-end">
            <button
              type="button"
              className="theme-btn btn-style-one bg-blue-950 text-white px-4 py-2 rounded"
              onClick={addExperience}
            >
              + Add Another Experience
            </button>
            <button
              type="submit"
              className="theme-btn btn-style-one bg-blue-950 text-white px-4 py-2 rounded"
            >
              Save & Next ➤
            </button>
          </div>
        </div> */}
        <div className="row mb-2 flex-wrap flex justify-between">
          <div className="form-group md:w-1/2 w-full">
            <button
              type="button"
              onClick={onPrevious}
              className="theme-btn btn-style-one bg-gray-500"
            >
              ◀ Back
            </button>

          </div>
          <div className="form-group md:w-1/2 w-full text-end">
            <button
              type="button"
              className="theme-btn btn-style-one bg-blue-950 mr-4 mb-2"
              onClick={addExperience}
            >
              + Add Another Experience
            </button>

            <button
              type="submit"
              className="theme-btn btn-style-one bg-blue-950"
            >
              Save & Next ➤
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default WorkExperienceForm;
