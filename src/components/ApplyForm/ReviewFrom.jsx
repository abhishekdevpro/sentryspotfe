// import React from 'react';

// const ReviewForm = ({ formData = {} }) => {
//   console.log(formData, "Form Data in ReviewForm");
//   return (
//     <div className="space-y-8">
//       <div>
//         <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
//         <p>Name: {formData?.firstName || 'N/A'} {formData?.lastName || 'N/A'}</p>
//         <p>Email: {formData?.email || 'N/A'}</p>
//         <p>Phone: {formData?.phone || 'N/A'}</p>
//         <p>Location: {formData?.location || 'N/A'}</p>
//         <p>Resume: {formData?.resumeOption || 'N/A'}</p>
//         <p>Cover Letter: {formData?.coverLetterOption || 'N/A'}</p>
//       </div>

//       <div>
//         <h3 className="text-lg font-medium text-gray-900">Employee Questions</h3>
//         {[1, 2, 3, 4, 5, 6].map((num) => (
//           <p key={num}>Question {num}: {formData?.[`question${num}`] || 'N/A'}</p>
//         ))}
//       </div>

//     </div>
//   );
// };

// export default ReviewForm;


import React from 'react';

const ReviewForm = ({ formData = {} }) => {
  console.log(formData, "Form Data in ReviewForm");

  // Extract screening questions dynamically
  const screeningQuestions = Object.entries(formData)
    .filter(([key]) => key.startsWith('question'))
    .map(([key, value], index) => {
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={key} className="mb-3">
            <p className="font-medium text-gray-800">
              Q{index + 1}: {value.question}
            </p>
            <p className="text-gray-700">Answer: {value.answer || 'N/A'}</p>
          </div>
        );
      } else if (typeof value === 'string' && value.trim() !== '') {
        return (
          <div key={key} className="mb-3">
            <p className="font-medium text-gray-800">Q{index + 1}</p>
            <p className="text-gray-700">Answer: {value}</p>
          </div>
        );
      }
      return null; // Skip empty or undefined
    });

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
        <p>Name: {formData?.firstName || 'N/A'} {formData?.lastName || 'N/A'}</p>
        <p>Email: {formData?.email || 'N/A'}</p>
        <p>Phone: {formData?.phone || 'N/A'}</p>
        <p>Location: {formData?.location || 'N/A'}</p>
        <p>Resume: {formData?.resumeOption || 'N/A'}</p>
        <p>Cover Letter: {formData?.coverLetterOption || 'N/A'}</p>
      </div>

   { screeningQuestions.length > 0 &&  <div>
        <h3 className="text-lg font-medium text-gray-900">Screening Questions</h3>
        {screeningQuestions.length > 0 ? screeningQuestions : <p className="text-gray-600">No screening questions answered.</p>}
      </div>}
    </div>
  );
};

export default ReviewForm;
