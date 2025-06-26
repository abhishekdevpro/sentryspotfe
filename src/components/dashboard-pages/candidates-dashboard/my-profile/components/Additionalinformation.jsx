import React, { useState, useEffect } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import { Trash, X } from "lucide-react";
import toast from "react-hot-toast";
// import LanguageSelector from "../LanguageSelector";

const Additionalinformation = () => {
  const [formData, setFormData] = useState({
    is_veteran_or_ex_military: false,
    is_reasonable_adjustments: false,
    handled_team: false,
    extended_work_schedules: false,
    willing_to_relocate: false,
    willingness_to_travel: false,
    work_permit_usa: false,
    languages: []
  });
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState("");
  const [proficiency, setProficiency] = useState("");
  const token = localStorage.getItem(Constant.USER_TOKEN);

  // Fetch additional information data
  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/user-profile",
          {
            headers: {
              Authorization: token
            }
          }
        );

        if (response.data.code === 200) {
          const additionalInfo = response.data.data.personal_details.additional_info;
          if (additionalInfo) {
            setFormData({
              is_veteran_or_ex_military: additionalInfo.is_veteran_or_ex_military || false,
              is_reasonable_adjustments: additionalInfo.is_reasonable_adjustments || false,
              handled_team: additionalInfo.handled_team || false,
              extended_work_schedules: additionalInfo.extended_work_schedules || false,
              willing_to_relocate: additionalInfo.willing_to_relocate || false,
              willingness_to_travel: additionalInfo.willingness_to_travel || false,
              work_permit_usa: additionalInfo.work_permit_usa || false,
              languages: additionalInfo.languages || []
            });

            // Set languages if they exist
            if (additionalInfo.languages && Array.isArray(additionalInfo.languages)) {
              setLanguages(additionalInfo.languages.map(lang => ({
                name: lang,
                proficiency: "Intermediate" // Default proficiency since it's not in the API
              })));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching additional information:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalInfo();
  }, [token]);

  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      setLanguages([
        ...languages,
        { name: languageInput.trim(), proficiency: proficiency || "Intermediate" },
      ]);
      setLanguageInput("");
      setProficiency("");
    }
  };

  const handleLanguageProficiencyChange = (index, proficiency) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].proficiency = proficiency;
    setLanguages(updatedLanguages);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages(languages.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    // Fix for radio buttons
    if (type === "radio") {
      // Convert the string value to boolean when it's "true" or "false"
      const boolValue = value === "true" ? true : false;
      setFormData({ ...formData, [name]: boolValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Transform languages array to match required format
      const languageNames = languages.map(lang => lang.name);

      const payload = {
        ...formData,
        languages: languageNames
      };

      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/additional-details",
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.code === 200 || response.data.status === "success") {
        toast.success( response.data.message ||"Additional information saved successfully!");
      }
    } catch (error) {
      console.error("Error submitting additional details:", error);
      toast.error( error?.response?.data?.message || "Failed to save additional information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (index, field, value) => {
    const updatedLanguages = [...formData.languages];
    updatedLanguages[index] = { ...updatedLanguages[index], [field]: value };
    setFormData({ ...formData, languages: updatedLanguages });
  };

  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { name: "", proficiency: "" }],
    });
  };

  const deleteLanguage = (index) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    setFormData({ ...formData, languages: updatedLanguages });
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="default-form w-full px-2 sm:px-4">
      <div className="space-y-4">
        {/* Radio Button Groups */}
        <div className="space-y-4">
          {/* Veteran Status */}
          <div className="form-group flex flex-col sm:flex-row gap-2 sm:gap-10">
            <label className="w-full sm:w-3/4 text-sm sm:text-base">Are you a veteran or ex-military?</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="is_veteran_or_ex_military"
                  value="true"
                  onChange={handleInputChange}
                  checked={formData.is_veteran_or_ex_military === true}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="is_veteran_or_ex_military"
                  value="false"
                  onChange={handleInputChange}
                  checked={formData.is_veteran_or_ex_military === false}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">No</label>
              </div>
            </div>
          </div>

          {/* Reasonable Adjustments */}
          <div className="form-group flex flex-col sm:flex-row gap-2 sm:gap-10">
            <label className="w-full sm:w-3/4 text-sm sm:text-base">
              Do you require any reasonable adjustments to perform your role effectively?
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="is_reasonable_adjustments"
                  value="true"
                  onChange={handleInputChange}
                  checked={formData.is_reasonable_adjustments === true}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="is_reasonable_adjustments"
                  value="false"
                  onChange={handleInputChange}
                  checked={formData.is_reasonable_adjustments === false}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">No</label>
              </div>
            </div>
          </div>

          {/* Team Handling */}
          <div className="form-group flex flex-col sm:flex-row gap-2 sm:gap-10">
            <label className="w-full sm:w-3/4 text-sm sm:text-base">Have you handled a team?</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="handled_team"
                  value="true"
                  onChange={handleInputChange}
                  checked={formData.handled_team === true}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="handled_team"
                  value="false"
                  onChange={handleInputChange}
                  checked={formData.handled_team === false}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">No</label>
              </div>
            </div>
          </div>

          {/* Work Schedules */}
          <div className="form-group flex flex-col sm:flex-row gap-2 sm:gap-10">
            <label className="w-full sm:w-3/4 text-sm sm:text-base">
              Are you open to flexible or extended work schedules, including weekends?
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="extended_work_schedules"
                  value="true"
                  onChange={handleInputChange}
                  checked={formData.extended_work_schedules === true}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="extended_work_schedules"
                  value="false"
                  onChange={handleInputChange}
                  checked={formData.extended_work_schedules === false}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">No</label>
              </div>
            </div>
          </div>

          {/* Relocation */}
          <div className="form-group flex flex-col sm:flex-row gap-2 sm:gap-10">
            <label className="w-full sm:w-3/4 text-sm sm:text-base">Are you willing to relocate?</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="willing_to_relocate"
                  value="true"
                  onChange={handleInputChange}
                  checked={formData.willing_to_relocate === true}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="willing_to_relocate"
                  value="false"
                  onChange={handleInputChange}
                  checked={formData.willing_to_relocate === false}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">No</label>
              </div>
            </div>
          </div>

          {/* Travel */}
          <div className="form-group flex flex-col sm:flex-row gap-2 sm:gap-10">
            <label className="w-full sm:w-3/4 text-sm sm:text-base">
              Are you comfortable traveling for work-related purposes?
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="willingness_to_travel"
                  value="true"
                  onChange={handleInputChange}
                  checked={formData.willingness_to_travel === true}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="willingness_to_travel"
                  value="false"
                  onChange={handleInputChange}
                  checked={formData.willingness_to_travel === false}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">No</label>
              </div>
            </div>
          </div>

          {/* Work Permit */}
          <div className="form-group flex flex-col sm:flex-row gap-2 sm:gap-10">
            <label className="w-full sm:w-3/4 text-sm sm:text-base">Do you have a work permit for the UK?</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="work_permit_usa"
                  value="true"
                  onChange={handleInputChange}
                  checked={formData.work_permit_usa === true}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="work_permit_usa"
                  value="false"
                  onChange={handleInputChange}
                  checked={formData.work_permit_usa === false}
                  className="w-4 h-4"
                />
                <label className="ml-2 text-sm sm:text-base">No</label>
              </div>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div className="mt-8">
          <h5 className="text-lg sm:text-xl font-semibold mb-4">Languages</h5>
          <div className="form-group w-full">
            <div className="border rounded-lg p-3 sm:p-4 space-y-4">
              {/* Language Tags */}
              <div className="flex flex-wrap gap-2">
                {languages.map((language, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm sm:text-base"
                  >
                    <span className="text-gray-800">
                      <strong>{language.name}</strong> - {language.proficiency}
                    </span>
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 p-1"
                      onClick={() => handleRemoveLanguage(index)}
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Language Input Form */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  className="flex-grow border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter a language"
                />
                <select
                  value={proficiency}
                  onChange={(e) => setProficiency(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native">Native</option>
                </select>
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="bg-blue-800 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-900 transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-800 text-white px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-blue-900 transition-colors"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Additionalinformation;
