import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// import ConfirmationModal from "./ConfirmationModal";
import PDFPopupViewer from "@/components/ui/PDFPopUpViewer";
import { Constant } from "@/utils/constant/constant";
import ConfirmationModal from "@/components/ui/ConfirmationModal";
import toast from "react-hot-toast";

const getBadgeStyle = (status) => {
  if (status === "Verified") {
    return "text-green-800 bg-green-100";
  } else if (status === "Rejected") {
    return "text-red-800 bg-red-100";
  } else {
    return "text-yellow-800 bg-yellow-100";
  }
};

const DocumentList = () => {
  const [docType, setDocType] = useState("");
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewDoc, setIsViewDoc] = useState(false);
  const fileInputRef = useRef(null);

  const documentTypeOptions = [
    { id: 1, label: "SSN" },
    { id: 2, label: "PassBook" },
    { id: 3, label: "Resume" },
    { id: 4, label: "Experience Letter" },
    { id: 5, label: "Cover Letter" },
    { id: 6, label: "Education" },
    { id: 7, label: "Certificate" },
  ];

  const getDocumentTypeId = (label) =>
    documentTypeOptions.find((item) => item.label === label)?.id;

  const getDocumentTypeLabel = (id) =>
    documentTypeOptions.find((item) => item.id === id)?.label;

  const fetchDocuments = async () => {
    try {
      const res = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/user-document",
        {
          headers: { Authorization: token },
        }
      );
      setDocuments(res.data.data || []);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleUpload = async () => {
    if (!docType) return toast.error("Please select a document type.");
    if (!file) return toast.error("Please select a file.");
    if (file.size > 2 * 1024 * 1024)
      return toast.error("File size should be less than 2MB");

    const formData = new FormData();
    formData.append("document_type_id", getDocumentTypeId(docType));
    formData.append("document_type_upload", file);

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/user-document",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (response.data.status === "success" || response.data.code === 200) {
        toast.success("Document uploaded successfully.");
        setDocType("");
        fileInputRef.current.value = "";
        fetchDocuments();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.sentryspot.co.uk/api/jobseeker/user-document/${id}`,
        {
          headers: { Authorization: token },
        }
      );
      toast.success("Document deleted successfully.");
      setSelectedDocId(null);
      fetchDocuments();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleClosePDF = () => {
    setSelectedPDF(null);
  };

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      {/* <h2 className="text-xl font-bold uppercase mb-6">Upload Document</h2> */}

      <div className="mb-4">
        <label className="app-text-label">Document Type</label>
        <select
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          className="form-select font-normal text-sm"
        >
          <option value="">Select Document Type</option>
          {documentTypeOptions.map((doc) => (
            <option key={doc.id} value={doc.label}>
              {doc.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="app-text-label">Upload File</label>
        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="w-full border rounded px-3 py-2 font-normal"
        />
      </div>

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-2 px-4 border-b">Document Type</th>
              <th className="py-2 px-4 border-b">File Name</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.length > 0 ? (
              documents.map((doc, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">
                    {getDocumentTypeLabel(doc.document_type_id)}
                  </td>
                  <td className="py-2 px-4">
                    {doc.document_path?.split("/").pop()}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(
                        doc.is_document_verified ? "Verified" : "In Progress"
                      )}`}
                    >
                      {doc.is_document_verified ? "Verified" : "In Progress"}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedDocId(doc.id);
                        setIsModalOpen(true);
                      }}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPDF(
                          `https://api.sentryspot.co.uk${doc.document_path}`
                        );
                        setIsViewDoc(true);
                      }}
                      className="bg-indigo-500 text-white px-3 py-1 rounded text-xs hover:bg-indigo-600"
                    >
                      View
                    </button>
                    <a
                      href={`https://api.sentryspot.co.uk${doc.document_path}`}
                      download={doc.document_path?.split("/").pop()}
                      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No documents uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Delete Document"
        message="Do you really want to delete this document?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={() => handleDelete(selectedDocId)}
        onCancel={() => setIsModalOpen(false)}
      />

      {isViewDoc && (
        <PDFPopupViewer
          show={selectedPDF !== null}
          onClose={handleClosePDF}
          fileUrl={selectedPDF}
        />
      )}
    </div>
  );
};

export default DocumentList;
