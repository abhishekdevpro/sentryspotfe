import React from "react";

export default function QuestionPanel({ question, onSubmit, isLoading }) {
  if (!question) return null;

  return (
    <div className="mt-6 bg-white p-2 md:p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">
        <span className="text-blue-600">Question:</span> {question.question}
      </h3>
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        {isLoading ? "Uploading..." : "Submit Answer"}
      </button>
    </div>
  );
}
