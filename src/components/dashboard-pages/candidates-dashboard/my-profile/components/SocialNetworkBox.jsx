// import { useState, useEffect } from "react";
// import { Constant } from "@/utils/constant/constant";
// import axios from "axios";

// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import toast from "react-hot-toast";

// const EducationForm = ({ onNext }) => {
//   const token = localStorage.getItem(Constant.USER_TOKEN);
//   const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

//   const [coursetype, setCoursetype] = useState([]);
//   const [batchYears, setBatchYears] = useState([]);
//   const [educationLevels, setEducationLevels] = useState([]);
//   const [educationalDetails,setEducationalDetails] = useState([])

//   // React Hook Form setup
//   const { control, handleSubmit, register, formState: { errors }, reset } = useForm({
//     defaultValues: {
//       educations: [
//         {
//           institute_name: "",
//           education_level_id: "",
//           course_type_id: "",
//           graduation_year_id: ""
//         }
//       ]
//     }
//   });

//   // Field array for managing multiple education entries
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "educations"
//   });

//     useEffect(() => {
//       const fetchEducations = async () => {
//         try {
//           const response = await axios.get(`${baseurl}user-profile`, {
//             headers: {
//               Authorization: token,
//             },
//           });
//           const EducationalDetails = response.data.data.education_details;
//           if(EducationalDetails && EducationalDetails.length > 0) {
//             // Reset form with existing education details
//             reset({
//               educations: EducationalDetails.map(edu => ({
//                 institute_name: edu.institute_name,
//                 education_level_id: edu.education_level_id.toString(),
//                 course_type_id: edu.course_type_id.toString(),
//                 graduation_year_id: edu.graduation_year_id.toString()
//               }))
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching profile data:", error);
//         }
//       };

//       fetchEducations();
//     }, [reset]);
//   // Fetch all required data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [coursesResponse, yearsResponse, levelsResponse] = await Promise.all([
//           axios.get(`${baseurl}institues`, { headers: { Authorization: token } }),
//           axios.get(`${baseurl}years`, { headers: { Authorization: token } }),
//           axios.get(`${baseurl}education-level`, { headers: { Authorization: token } })
//         ]);

//         setCoursetype(coursesResponse.data.data);
//         setBatchYears(yearsResponse.data.data);
//         setEducationLevels(levelsResponse.data.data);
//       } catch (error) {
//         toast.error("Failed to fetch form data");
//       }
//     };

//     fetchData();
//   }, []);
//    const getLevelName = (id, levels = educationLevels) => {
//     const level = levels.find(l => l.id === id);
//     return level ? level.name : "Unknown";
//   };

//   const getCourseName = (id, courses = coursetype) => {
//     const course = courses.find(c => c.id === id);
//     return course ? course.name : "Unknown";
//   };

//   const getYearName = (id, years = batchYears) => {
//     const year = years.find(y => y.id === id);
//     return year ? year.name : "Unknown";
//   };
// console.log(educationalDetails,"fetchEducations");
//   const onSubmit = async (data) => {
//     try {
//       // Format the data according to the required structure
//       const newEducation = data.educations.map(education => ({
//         institute_name: education.institute_name,
//         education_level_id: parseInt(education.education_level_id, 10),
//         course_type_id: parseInt(education.course_type_id, 10),
//         graduation_year_id: parseInt(education.graduation_year_id, 10)
//       }));

//       const payload  = [...educationalDetails, ...newEducation]

//       await axios.put(`${baseurl}user-profile-education`, payload, {
//         headers: {
//           Authorization: token,
//           "Content-Type": "application/json",
//         },
//       });

//       toast.success("Education details saved successfully!");
//       onNext();
//     } catch (error) {
//       toast.error("Failed to save education details.");
//     }
//   };

//   const addEducation = () => {
//     append({
//       institute_name: "",
//       education_level_id: "",
//       course_type_id: "",
//       graduation_year_id: ""
//     });
//   };

//   return (
//     <div>
//       <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((field, index) => (
//           <div key={field.id} className="education-entry mb-6">
//             <h4 className="text-lg font-medium mb-2">Education {index + 1}</h4>
//             <div className="row">
//               <div className="form-group col-lg-6 col-md-12">
//                 <label>Institution Name</label>
//                 <input
//                   type="text"
//                   {...register(`educations.${index}.institute_name`, { required: "Institution name is required" })}
//                   placeholder="Enter institute name"
//                   className="form-control"
//                    maxLength={200}
//                 />
//                 {errors.educations?.[index]?.institute_name && (
//                   <span className="text-red-500 text-sm">{errors.educations[index].institute_name.message}</span>
//                 )}
//               </div>

//               <div className="form-group col-lg-6 col-md-12">
//                 <label>Education Level</label>
//                 <Controller
//                   name={`educations.${index}.education_level_id`}
//                   control={control}
//                   rules={{ required: "Education level is required" }}
//                   render={({ field }) => (
//                     <select {...field} className="form-control">
//                       <option value="">Select Education Level</option>
//                       {educationLevels.map((level) => (
//                         <option key={level.id} value={level.id}>
//                           {level.name}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 />
//                 {errors.educations?.[index]?.education_level_id && (
//                   <span className="text-red-500 text-sm">{errors.educations[index].education_level_id.message}</span>
//                 )}
//               </div>

//               <div className="form-group col-lg-6 col-md-12">
//                 <label>Field of Study (Course)</label>
//                 <Controller
//                   name={`educations.${index}.course_type_id`}
//                   control={control}
//                   rules={{ required: "Course is required" }}
//                   render={({ field }) => (
//                     <select {...field} className="form-control">
//                       <option value="">Select a course</option>
//                       {coursetype.map((type) => (
//                         <option key={type.id} value={type.id}>
//                           {type.name}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 />
//                 {errors.educations?.[index]?.course_type_id && (
//                   <span className="text-red-500 text-sm">{errors.educations[index].course_type_id.message}</span>
//                 )}
//               </div>

//               <div className="form-group col-lg-6 col-md-12">
//                 <label>Graduation Year</label>
//                 <Controller
//                   name={`educations.${index}.graduation_year_id`}
//                   control={control}
//                   rules={{ required: "Graduation year is required" }}
//                   render={({ field }) => (
//                     <select {...field} className="form-control">
//                       <option value="">Select Graduation Year</option>
//                       {batchYears.map((year) => (
//                         <option key={year.id} value={year.id}>
//                           {year.name}
//                         </option>
//                       ))}
//                     </select>
//                   )}
//                 />
//                 {errors.educations?.[index]?.graduation_year_id && (
//                   <span className="text-red-500 text-sm">{errors.educations[index].graduation_year_id.message}</span>
//                 )}
//               </div>

//               {index > 0 && (
//                 <div className="form-group col-12">
//                   <button
//                     type="button"
//                     className="btn btn-danger"
//                     onClick={() => remove(index)}
//                   >
//                     Remove Education
//                   </button>
//                 </div>
//               )}
//             </div>
//             <hr className="my-4" />
//           </div>
//         ))}

//         <div className="row mb-2">
//           <div className="form-group col-12">
//             <button
//               type="button"
//               className="theme-btn btn-style-one bg-blue-950 mr-4 mb-2"
//               onClick={addEducation}
//             >
//               + Add Another Education
//             </button>

//             <button type="submit" className="theme-btn btn-style-one bg-blue-950">
//               Save & Next ➤
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EducationForm;
import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import axios from "axios";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronRight,
  ChevronRightIcon,
  ChevronUpIcon,
  Trash,
  Trash2,
} from "lucide-react";

const EducationForm = ({ onNext }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

  const [coursetype, setCoursetype] = useState([]);
  const [batchYears, setBatchYears] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [educationalDetails, setEducationalDetails] = useState([]);
  const [expandedSections, setExpandedSections] = useState([0]); // first section open by default

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      educations: [
        {
          institute_name: "",
          education_level_id: "",
          course_type_id: "",
          graduation_year_id: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await axios.get(`${baseurl}user-profile`, {
          headers: { Authorization: token },
        });
        const details = response.data.data.education_details;
        setEducationalDetails(details);
        if (details?.length > 0) {
          reset({
            educations: details.map((edu, index) => ({
              institute_name: edu.institute_name,
              education_level_id: edu.education_level_id.toString(),
              course_type_id: edu.course_type_id.toString(),
              graduation_year_id: edu.graduation_year_id.toString(),
            })),
          });
          setExpandedSections([0]); // only first expanded by default
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchEducations();
  }, [reset]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, years, levels] = await Promise.all([
          axios.get(`${baseurl}institues`, {
            headers: { Authorization: token },
          }),
          axios.get(`${baseurl}years`, { headers: { Authorization: token } }),
          axios.get(`${baseurl}education-level`, {
            headers: { Authorization: token },
          }),
        ]);
        setCoursetype(courses.data.data);
        setBatchYears(years.data.data);
        setEducationLevels(levels.data.data);
      } catch {
        toast.error("Failed to fetch dropdown data");
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formatted = data.educations.map((edu) => ({
        institute_name: edu.institute_name,
        education_level_id: parseInt(edu.education_level_id, 10),
        course_type_id: parseInt(edu.course_type_id, 10),
        graduation_year_id: parseInt(edu.graduation_year_id, 10),
      }));

      const payload = [...educationalDetails, ...formatted];

      await axios.put(`${baseurl}user-profile-education`, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      toast.success("Education details saved!");
      onNext();
    } catch (error) {
      toast.error("Failed to save education.");
    }
  };

  const addEducation = () => {
    const newIndex = fields.length;
    append({
      institute_name: "",
      education_level_id: "",
      course_type_id: "",
      graduation_year_id: "",
    });
    setExpandedSections((prev) => [...prev, newIndex]);
  };

  const toggleSection = (index) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const removeEducation = (index) => {
    remove(index);
    setExpandedSections((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div>
      <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const isExpanded = expandedSections.includes(index);

          return (
            <div
              key={field.id}
              className="education-entry border rounded-lg p-4 mb-6 shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">{field.institute_name || `Education ${index+1}`}</h4>
                <div className="flex items-center gap-3 ">
                  <button
                    type="button"
                    className="text-blue-900 btn bg-gray-100 mt-2 font-medium underline text-sm"
                    onClick={() => toggleSection(index)}
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown   />
                      </>
                    ) : (
                      <>
                        <ChevronRight />
                      </>
                    )}
                  </button>
                  <div className="">
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="btn btn-danger mt-2"
                    >
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4">
                  <div className="row">
                    <div className="form-group col-lg-6">
                      <label>Institution Name</label>
                      <input
                        type="text"
                        {...register(`educations.${index}.institute_name`, {
                          required: "Institution name is required",
                        })}
                        placeholder="Enter institute name"
                        className="form-control"
                        maxLength={100}
                      />
                      {errors.educations?.[index]?.institute_name && (
                        <span className="text-red-500 text-sm">
                          {errors.educations[index].institute_name.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group col-lg-6">
                      <label>Education Level</label>
                      <Controller
                        name={`educations.${index}.education_level_id`}
                        control={control}
                        rules={{ required: "Education level is required" }}
                        render={({ field }) => (
                          <select {...field} className="form-control">
                            <option value="">Select Education Level</option>
                            {educationLevels.map((level) => (
                              <option key={level.id} value={level.id}>
                                {level.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.educations?.[index]?.education_level_id && (
                        <span className="text-red-500 text-sm">
                          {errors.educations[index].education_level_id.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group col-lg-6">
                      <label>Field of Study (Course)</label>
                      <Controller
                        name={`educations.${index}.course_type_id`}
                        control={control}
                        rules={{ required: "Course is required" }}
                        render={({ field }) => (
                          <select {...field} className="form-control">
                            <option value="">Select Course</option>
                            {coursetype.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.educations?.[index]?.course_type_id && (
                        <span className="text-red-500 text-sm">
                          {errors.educations[index].course_type_id.message}
                        </span>
                      )}
                    </div>

                    <div className="form-group col-lg-6">
                      <label>Graduation Year</label>
                      <Controller
                        name={`educations.${index}.graduation_year_id`}
                        control={control}
                        rules={{ required: "Graduation year is required" }}
                        render={({ field }) => (
                          <select {...field} className="form-control">
                            <option value="">Select Graduation Year</option>
                            {batchYears.map((year) => (
                              <option key={year.id} value={year.id}>
                                {year.name}
                              </option>
                            ))}
                          </select>
                        )}
                      />
                      {errors.educations?.[index]?.graduation_year_id && (
                        <span className="text-red-500 text-sm">
                          {errors.educations[index].graduation_year_id.message}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className="row mb-2">
          <div className="form-group col-12">
            <button
              type="button"
              className="theme-btn btn-style-one bg-blue-950 mr-4 mb-2"
              onClick={addEducation}
            >
              + Add Another Education
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

export default EducationForm;
