import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PersonalInfoForm from "./PersonalForm";
import EmployeeQuestionsForm from "./EmployeeQuestions";
import ReviewForm from "./ReviewFrom";
import ProgressBar from "./ProgressBar";
import { toast } from "react-hot-toast";
import { Constant } from "@/utils/constant/constant";

const ApplyForm = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    resumeOption: "",
    coverLetterOption: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    question6: "",
    workExperience: [],
    education: [],
    certifications: [],
    skills: "",
  });
  const [errors, setErrors] = useState({});
  const [questions, setQuestions] = useState([]); // State to store questions

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const handleSubmit = async () => {
    const screeningQuestions = questions?.map((question, index) => ({
      question: question.question,
      description: question.description,
      options: question.options,
      answer: formData[`question${index + 1}`] || "",
    }));

    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone_no", formData.phone);

    // Append resume file if uploaded
    // if (formData.resumeOption === "select" && existingResume) {
    //   formData.resume = existingResume;
    // }
    if (formData.resumeOption === "upload" && formData.resume) {
      formDataToSend.append("resume_upload", formData.resume);
    } else {
      formDataToSend.append("resume_upload", "");
    }

    // Append cover letter file if uploaded
    if (formData.coverLetterOption === "upload" && formData.coverLetter) {
      formDataToSend.append("cover_letter_upload", formData.coverLetter);
    } else {
      formDataToSend.append("cover_letter_upload", "");
    }

    formDataToSend.append("resume_path", "");
    formDataToSend.append("cover_letter_path", "");
    formDataToSend.append(
      "screening_questions_answer",
      JSON.stringify(screeningQuestions)
    );

    try {
      const response = await fetch(
        `https://api.sentryspot.co.uk/api/jobseeker/apply-for-job/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: token, // Token is still passed in the headers
          },
          body: formDataToSend, // Use FormData as the request body
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success(
          responseData.data.message || "Application submitted successfully!"
        );
        console.log("API Response:", responseData); // Log the full response for debugging

        // Redirect to /id on success
        navigate(`/job-single-v3/${id}`);
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("An error occurred while submitting the application.");
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <PersonalInfoForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <EmployeeQuestionsForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            questions={questions} // Pass questions to EmployeeQuestionsForm
            setQuestions={setQuestions} // Pass setQuestions to update questions state
          />
        );
      case 3:
        return <ReviewForm formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProgressBar currentStep={step} totalSteps={3} />
      <h2 className="text-2xl font-bold mb-4">
        {step === 1 && "Personal Information"}
        {step === 2 && "Questions"}
        {step === 3 && "Review & Submit"}
      </h2>
      {renderForm()}
      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button
            onClick={prevStep}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Previous
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplyForm;
