import { Constant } from "@/utils/constant/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const EmployeeQuestionsForm = ({
  formData,
  setFormData,
  errors,
  questions,
  setQuestions,
}) => {
  const { id } = useParams(); // Get the job ID from the URL
  console.log(id, "Job ID from URL");
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem(Constant.USER_TOKEN);
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/job-list/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        console.log(response, "Response from API");
        // Parse screening_questions if it's a JSON string
        // const screeningQuestions = response.data.data.screening_question_output
        //   ? JSON.parse(response.data.data.screening_question_output)
        //   : [];

        console.log(
          response.data.data.screening_question_output,
          "Screening Questions from API"
        );

        setQuestions(response.data.data.screening_question_output); // Pass questions to ApplyForm
      } catch (error) {
        console.error("Error fetching questions:", error);
        setQuestions([]); // Fallback to an empty array
      }
    };

    if (id) {
      fetchQuestions();
    }
  }, []);

  console.log(questions, "Screening Questions");

  // const handleChange = (e) => {
  //   console.log(e.target, "Selected Option");
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e, question, index) => {
    const { value } = e.target;
    const key = `question${index + 1}`;

    setFormData((prev) => ({
      ...prev,
      [key]: {
        question: question.question,
        answer: value,
      },
    }));
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800">
        Screening Questions
      </h2>
      {questions && questions?.length > 0 ? (
        questions.map((question, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:shadow-sm transition-shadow"
          >
            <label
              htmlFor={`question${index + 1}`}
              className="block text-base font-medium text-gray-800"
            >
              {question.question}
            </label>
            <p className="text-sm text-gray-600 mt-1">{question.description}</p>
            {question.options && question.options.length > 0 ? (
              <div className="space-y-2 mt-3">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center">
                    <input
                      type="radio"
                      id={`${question.question}_${optIndex}`}
                      name={`question${index + 1}`}
                      value={option}
                      checked={
                        formData[`question${index + 1}`]?.answer === option
                      }
                      onChange={(e) => handleChange(e, question, index)}
                      className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />

                    <label
                      htmlFor={`question${index + 1}_option${optIndex}`}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <textarea
                id={`question${index + 1}`}
                name={`question${index + 1}`}
                value={formData[`question${index + 1}`]?.answer || ""}
                onChange={(e) => handleChange(e, question, index)}
                className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="3"
                placeholder="Type your answer here..."
              />
            )}
            {errors[`question${index + 1}`] && (
              <p className="mt-2 text-sm text-red-600">
                {errors[`question${index + 1}`]}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No questions available.</p>
      )}
    </div>
  );
};

export default EmployeeQuestionsForm;
