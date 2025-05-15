import React from 'react';

const ReviewForm = ({ formData = {} }) => {
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

      <div>
        <h3 className="text-lg font-medium text-gray-900">Employee Questions</h3>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <p key={num}>Question {num}: {formData?.[`question${num}`] || 'N/A'}</p>
        ))}
      </div>

    </div>
  );
};

export default ReviewForm;

