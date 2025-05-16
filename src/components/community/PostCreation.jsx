import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const PostCreation = ({ addPost, token, setLoginModal }) => {
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (!token) {
      setLoginModal(true);
      return;
    }
    addPost(content, image, isAnonymous);
    setContent("");
    setIsAnonymous(false);
    setImage(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6 border-t-4 border-blue-900">
      <textarea
        className="w-full p-3 text-lg text-gray-800 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ask anything (even anonymously)..."
      />

      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="file-upload"
            className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
          >
            <i className="fas fa-camera mr-2"></i>
            <span className="text-sm">Upload Image</span>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="hidden"
            />
            {/* <label
              htmlFor="anonymous"
              className="flex items-center cursor-pointer text-gray-700 hover:text-blue-900"
            >
              <span
                className={`w-5 h-5 mr-2 border rounded ${
                  isAnonymous
                    ? "bg-blue-900 border-blue-900"
                    : "border-gray-300"
                }`}
              >
                {isAnonymous && (
                  <i className="fas fa-check text-white text-xs"></i>
                )}
              </span>
              Anonymous Post
            </label> */}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
        >
          Post
        </button>
      </div>

      {image && (
        <div className="mt-4 relative ">
          <img
            src={image}
            alt="Uploaded"
            className="max-w-full h-auto rounded-md shadow-sm"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCreation;

