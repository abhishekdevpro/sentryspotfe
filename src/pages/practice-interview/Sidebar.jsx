import React from "react";

export default function Sidebar({ questions, currentIndex }) {
  return (
    <div className="space-y-2 overflow-y-auto h-[calc(100vh-120px)] pr-1">
      {questions.map((q, i) => (
        <div
          key={i}
          className={`p-3 rounded cursor-pointer text-sm font-medium ${
            i === currentIndex
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-800 border"
          }`}
        >
          <span className="font-semibold">Q{i + 1}:</span> {q.question}
        </div>
      ))}
    </div>
  );
}
