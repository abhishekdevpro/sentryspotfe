

import React, { useState } from 'react';
import { LinkedinShareButton, TwitterShareButton, FacebookShareButton, WhatsappShareButton } from 'react-share';

const LinkedInShareButton = ({ post }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `https://sentryspotfe.vercel.app/community/${post.id}`;
  const shareTitle = post.content;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    setShowPopup(true);
    setCopied(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  //  console.log(post,"post data");
  return (
    <>
      <button
        onClick={handleShare}
        className="text-gray-500 hover:text-green-600 flex items-center"
      >
        <i className="fas fa-share mr-2"></i>
        <span className="hidden md:block"> Share </span>
      </button>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Share Post</h2>

            {/* Social Media Buttons */}
            <div className="flex flex-wrap gap-4 mb-4">
              <LinkedinShareButton url={shareUrl} title={post.content} summary={post.content}  className="flex items-center">
                <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">LinkedIn</button>
              </LinkedinShareButton>

              <TwitterShareButton url={shareUrl} title={shareTitle} className="flex items-center">
                <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500">Twitter</button>
              </TwitterShareButton>

              <FacebookShareButton url={shareUrl} quote={shareTitle} className="flex items-center">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Facebook</button>
              </FacebookShareButton>

              <WhatsappShareButton url={shareUrl} title={shareTitle} separator=" - " className="flex items-center">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">WhatsApp</button>
              </WhatsappShareButton>
            </div>

            {/* Copy Link Section */}
            <div className="flex items-center mb-4">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-grow p-2 border rounded-l-md bg-gray-100"
              />
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={handleClosePopup}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LinkedInShareButton;
