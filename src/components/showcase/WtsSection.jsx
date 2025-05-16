

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Upload, Play } from "lucide-react";
import { Constant } from "@/utils/constant/constant";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";

const baseUrl = "https://api.sentryspot.co.uk/api/employeer";
const baseImageUrl = "https://api.sentryspot.co.uk";
const token = localStorage.getItem(Constant.USER_TOKEN);

const CompanyWTSSection = () => {
  const [wtsData, setWtsData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    media_file: null,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchWTSData();
  }, []);

  const fetchWTSData = async () => {
    try {
      const response = await fetch(`${baseUrl}/company-wts`, {
        headers: { Authorization: token },
      });
      const data = await response.json();
      setWtsData(data.data);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      media_file: null,
    });
    setPreviewUrl(`${baseImageUrl}${item.media}`);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm((prev) => ({
        ...prev,
        media_file: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", editForm.title);
      formData.append("description", editForm.description);
      if (editForm.media_file) {
        formData.append("media_upload", editForm.media_file);
      }

      const response = await fetch(`${baseUrl}/company-wts/${editingItem.id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      setEditingItem(null);
      fetchWTSData();
    } catch (error) {
      setError("Failed to update. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % wtsData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + wtsData.length) % wtsData.length);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Watch What We Have to Say
          </h2>
          <div className="w-28 h-1.5 bg-pink-500 mx-auto rounded-full"></div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        )}

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {wtsData.map((item, index) => (
                <div
                  key={index}
                  className="flex-none w-full lg:w-[70%] xl:w-[60%] mx-auto p-4"
                >
                  {editingItem?.id === item.id ? (
                    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-gray-100">
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                title: e.target.value,
                              })
                            }
                            placeholder="Enter title"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Media
                          </label>
                          <div className="relative">
                            <input
                              type="file"
                              onChange={handleImageChange}
                              accept="image/*,video/*"
                              className="hidden"
                              id="media-upload"
                            />
                            <label
                              htmlFor="media-upload"
                              className="block w-full px-4 py-4 text-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-pink-500 transition-colors"
                            >
                              <div className="space-y-1">
                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                <div className="text-sm text-gray-600">
                                  {editForm.media_file
                                    ? editForm.media_file.name
                                    : "Click to upload media"}
                                </div>
                              </div>
                            </label>
                            {previewUrl && (
                              <div className="mt-4 relative rounded-lg overflow-hidden">
                                <img
                                  src={previewUrl}
                                  alt="Preview"
                                  className="w-full h-48 object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <ReactQuill
                            value={editForm.description}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                description: e.target.value,
                              })
                            }
                            placeholder="Enter description"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 outline-none resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 justify-end pt-4">
                        <button
                          onClick={() => setEditingItem(null)}
                          className="px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdate}
                          className="px-6 py-2.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 font-medium"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-transform hover:scale-[1.02] duration-300">
                      <div className="flex flex-col lg:flex-row">
                        <div className="relative lg:w-1/2">
                          <img
                            src={`${baseImageUrl}${item.media}`}
                            alt={item.title}
                            className="h-[320px] w-full object-cover"
                          />
                          <div className="absolute bottom-4 right-4 bg-pink-500 h-14 w-14 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer transform hover:scale-110 duration-200">
                            <Play size={30} className="text-white ml-1" />
                          </div>
                        </div>

                        <div className="lg:w-1/2 p-8 flex flex-col justify-between bg-gradient-to-br from-white to-gray-50 ">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                              {item.title}
                            </h3>
                            {/* <div 
                              className="text-gray-600 border-2 text-ellipsis"
                              dangerouslySetInnerHTML={{ 
                                __html: DOMPurify.sanitize(item.description || '') 
                              }}
                            /> */}
                            <div
                              className="text-gray-600
                               overflow-hidden break-words max-h-40 overflow-ellipsis"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  item.description || ""
                                ),
                              }}
                            />
                          </div>

                          <button
                            onClick={() => handleEdit(item)}
                            className="mt-8 w-fit px-6 py-2.5 border-2 border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors font-medium"
                          >
                            Edit Content
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {wtsData.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:border-pink-500 transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200 hover:border-pink-500 transition-all duration-200 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyWTSSection;
