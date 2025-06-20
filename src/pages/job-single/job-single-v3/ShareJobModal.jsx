import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { toast } from 'react-toastify';

const ShareJobModal = ({ show, onClose, shareUrl }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        show ? 'flex items-center justify-center bg-black bg-opacity-50' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-lg font-bold">Share this job</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>
        </div>

        <div className="text-center">
          <p className="mb-4 text-sm text-gray-600">Share via social media</p>
          <div className="flex justify-center flex-wrap gap-4 mb-6">
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={48} round />
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={48} round />
            </LinkedinShareButton>
            <WhatsappShareButton url={shareUrl}>
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
          </div>

          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={shareUrl}
              readOnly
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 text-sm rounded-r-md hover:bg-blue-600 transition"
              onClick={handleCopy}
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareJobModal;
