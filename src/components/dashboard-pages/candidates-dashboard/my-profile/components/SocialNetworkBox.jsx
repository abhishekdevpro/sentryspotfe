
import { useState, useEffect } from "react";
import { Constant } from "@/utils/constant/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm, useFieldArray, Controller } from "react-hook-form";

const EducationForm = ({ onNext }) => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const baseurl = "https://api.sentryspot.co.uk/api/jobseeker/";

  const [coursetype, setCoursetype] = useState([]);
  const [batchYears, setBatchYears] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [educationalDetails,setEducationalDetails] = useState([])
  
  // React Hook Form setup
  const { control, handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      educations: [
        { 
          institute_name: "", 
          education_level_id: "", 
          course_type_id: "", 
          graduation_year_id: "" 
        }
      ]
    }
  });
  
  // Field array for managing multiple education entries
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations"
  });

    useEffect(() => {
      const fetchEducations = async () => {
        try {
          const response = await axios.get(`${baseurl}user-profile`, {
            headers: {
              Authorization: token,
            },
          });
          const EducationalDetails =  response.data.data.education_details
          if(EducationalDetails){
            setEducationalDetails(EducationalDetails)
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
  
      fetchEducations();
    }, []);
  // Fetch all required data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, yearsResponse, levelsResponse] = await Promise.all([
          axios.get(`${baseurl}institues`, { headers: { Authorization: token } }),
          axios.get(`${baseurl}years`, { headers: { Authorization: token } }),
          axios.get(`${baseurl}education-level`, { headers: { Authorization: token } })
        ]);
        
        setCoursetype(coursesResponse.data.data);
        setBatchYears(yearsResponse.data.data);
        setEducationLevels(levelsResponse.data.data);
      } catch (error) {
        toast.error("Failed to fetch form data");
      }
    };

    fetchData();
  }, []);
   const getLevelName = (id, levels = educationLevels) => {
    const level = levels.find(l => l.id === id);
    return level ? level.name : "Unknown";
  };

  const getCourseName = (id, courses = coursetype) => {
    const course = courses.find(c => c.id === id);
    return course ? course.name : "Unknown";
  };

  const getYearName = (id, years = batchYears) => {
    const year = years.find(y => y.id === id);
    return year ? year.name : "Unknown";
  };
console.log(educationalDetails,"fetchEducations");
  const onSubmit = async (data) => {
    try {
      // Format the data according to the required structure
      const newEducation = data.educations.map(education => ({
        institute_name: education.institute_name,
        education_level_id: parseInt(education.education_level_id, 10),
        course_type_id: parseInt(education.course_type_id, 10),
        graduation_year_id: parseInt(education.graduation_year_id, 10)
      }));

      const payload  = [...educationalDetails, ...newEducation]

      await axios.put(`${baseurl}user-profile-education`, payload, {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      
      toast.success("Education details saved successfully!");
      onNext();
    } catch (error) {
      toast.error("Failed to save education details.");
    }
  };

  const addEducation = () => {
    append({ 
      institute_name: "", 
      education_level_id: "", 
      course_type_id: "", 
      graduation_year_id: "" 
    });
  };

  return (

    <div>
       
      <form className="default-form" onSubmit={handleSubmit(onSubmit)}>
    

      {fields.map((field, index) => (
        <div key={field.id} className="education-entry mb-6">
          <h4 className="text-lg font-medium mb-2">Education {index + 1}</h4>
          <div className="row">
            <div className="form-group col-lg-6 col-md-12">
              <label>Institution Name</label>
              <input
                type="text"
                {...register(`educations.${index}.institute_name`, { required: "Institution name is required" })}
                placeholder="Enter institute name"
                className="form-control"
              />
              {errors.educations?.[index]?.institute_name && (
                <span className="text-red-500 text-sm">{errors.educations[index].institute_name.message}</span>
              )}
            </div>

            <div className="form-group col-lg-6 col-md-12">
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
                <span className="text-red-500 text-sm">{errors.educations[index].education_level_id.message}</span>
              )}
            </div>

            <div className="form-group col-lg-6 col-md-12">
              <label>Field of Study (Course)</label>
              <Controller
                name={`educations.${index}.course_type_id`}
                control={control}
                rules={{ required: "Course is required" }}
                render={({ field }) => (
                  <select {...field} className="form-control">
                    <option value="">Select a course</option>
                    {coursetype.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {errors.educations?.[index]?.course_type_id && (
                <span className="text-red-500 text-sm">{errors.educations[index].course_type_id.message}</span>
              )}
            </div>

            <div className="form-group col-lg-6 col-md-12">
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
                <span className="text-red-500 text-sm">{errors.educations[index].graduation_year_id.message}</span>
              )}
            </div>

            {index > 0 && (
              <div className="form-group col-12">
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => remove(index)}
                >
                  Remove Education
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
            className="theme-btn btn-style-one bg-blue-950 mr-4"
            onClick={addEducation}
          >
            + Add Another Education
          </button>
          
          <button type="submit" className="theme-btn btn-style-one bg-blue-950">
            Save & Next ➤
          </button>
        </div>
      </div>
      </form>
      {educationalDetails.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-medium mb-4">Your Education History</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {educationalDetails.map((edu, index) => (
                  <div
                    key={edu.id || index}
                    className={`bg-white shadow-md rounded-lg p-6 border ${
                      ""? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
                    } hover:shadow-lg transition-shadow duration-300`}
                  >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {edu.institute_name}
                    </h2>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <span className="font-medium">Education Level:</span>{' '}
                        {getLevelName(edu.education_level_id)}
                      </p>
                      <p>
                        <span className="font-medium">Field of Study:</span>{' '}
                        {getCourseName(edu.course_type_id)}
                      </p>
                      <p>
                        <span className="font-medium">Graduation Year:</span>{' '}
                        {getYearName(edu.graduation_year_id)}
                      </p>
                    </div>

                    {/* <button
                      // onClick={() => onEdit(edu)}
                      className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      // disabled={editingId !== null}
                    >
                      Edit
                      {/* {editingId === edu.id ? 'Currently Editing' : 'Edit'} 
                    </button> */}
                  </div>
                ))}
              </div>
            </div>
          )}
    </div>
  );
};

export default EducationForm;
