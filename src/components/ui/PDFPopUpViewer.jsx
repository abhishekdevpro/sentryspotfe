import React from "react";
import { FiExternalLink } from "react-icons/fi";

const PDFPopupViewer = ({ show, onClose, fileUrl, fileName }) => {
  if (!show) return null;

  const openInNewTab = () => {
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">

      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{fileName}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={openInNewTab}
              title="Open in new tab"
              className="p-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
            >
              <FiExternalLink size={18} />
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
            >
              Close
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="h-[60vh]">
          <iframe
            src={fileUrl}
            title="PDF Viewer"
            width="100%"
            height="100%"
            className="border-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PDFPopupViewer;
