import React, { useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";
import { Trash, X } from "lucide-react";
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
  const [inputValue, setInputValue] = useState("");
  const [languages, setLanguages] = useState([]);
  const [languageInput, setLanguageInput] = useState("");
  const [proficiency, setProficiency] = useState("");

  
  const handleAddLanguage = () => {
    if (languageInput.trim()) {
      setLanguages([
        ...languages,
        { name: languageInput.trim(), proficiency: "Intermediate" },
      ]);
      setLanguageInput("");
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
      const token = localStorage.getItem(Constant.USER_TOKEN);
      
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
      console.log("Additional details submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting additional details:", error);
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
  return (
    <form onSubmit={handleSubmit} className="default-form">
      <div className="row">
        {/* <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">IIT-JEE All India Rank (AIR)</label>
          <input
            type="text"
            name="iit_jee_rank"
            value={formData.iit_jee_rank}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">CAT Percentile</label>
          <input
            type="text"
            name="cat_percentile"
            value={formData.cat_percentile}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">GMAT Score</label>
          <input
            type="text"
            name="gmat_score"
            value={formData.gmat_score}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">Marital Status</label>
          <input
            type="text"
            name="marital_status"
            value={formData.marital_status}
            onChange={handleInputChange}
          />
        </div> */}

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Are you a veteran or ex-military?</label>
          <div className="flex">
            <input
              type="radio"
              name="is_veteran_or_ex_military"
              value="true"
              onChange={handleInputChange}
              checked={formData.is_veteran_or_ex_military === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="is_veteran_or_ex_military"
              value="false"
              onChange={handleInputChange}
              checked={formData.is_veteran_or_ex_military === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">
            Do you require any reasonable adjustments to perform your role
            effectively?
          </label>
          <div className="flex">
            <input
              type="radio"
              name="is_reasonable_adjustments"
              value="true"
              onChange={handleInputChange}
              checked={formData.is_reasonable_adjustments === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="is_reasonable_adjustments"
              value="false"
              onChange={handleInputChange}
              checked={formData.is_reasonable_adjustments === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Have you handled a team?</label>
          <div className="flex">
            <input
              type="radio"
              name="handled_team"
              value="true"
              onChange={handleInputChange}
              checked={formData.handled_team === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="handled_team"
              value="false"
              onChange={handleInputChange}
              checked={formData.handled_team === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">
            Are you open to flexible or extended work schedules, including
            weekends?
          </label>
          <div className="flex">
            <input
              type="radio"
              name="extended_work_schedules"
              value="true"
              onChange={handleInputChange}
              checked={formData.extended_work_schedules === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="extended_work_schedules"
              value="false"
              onChange={handleInputChange}
              checked={formData.extended_work_schedules === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Have you willing to relocate?</label>
          <div className="flex">
            <input
              type="radio"
              name="willing_to_relocate"
              value="true"
              onChange={handleInputChange}
              checked={formData.willing_to_relocate === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="willing_to_relocate"
              value="false"
              onChange={handleInputChange}
              checked={formData.willing_to_relocate === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        {/* <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">Have you open to startups?</label>
          <div className="flex">
            <input
              type="radio"
              name="open_to_startups"
              value="true"
              onChange={handleInputChange}
              checked={formData.open_to_startups === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="open_to_startups"
              value="false"
              onChange={handleInputChange}
              checked={formData.open_to_startups === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div> */}

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">
            Are you comfortable traveling for work-related purposes?
          </label>
          <div className="flex">
            <input
              type="radio"
              name="willingness_to_travel"
              value="true"
              onChange={handleInputChange}
              checked={formData.willingness_to_travel === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="willingness_to_travel"
              value="false"
              onChange={handleInputChange}
              checked={formData.willingness_to_travel === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-3/4">Do you have a work permit for the UK?</label>
          <div className="flex">
            <input
              type="radio"
              name="work_permit_usa"
              value="true"
              onChange={handleInputChange}
              checked={formData.work_permit_usa === true}
            />
            <label htmlFor="yes" className="pt-1 me-4 ms-1">
              Yes
            </label>
            <input
              type="radio"
              name="work_permit_usa"
              value="false"
              onChange={handleInputChange}
              checked={formData.work_permit_usa === false}
            />
            <label htmlFor="No" className="pt-1 me-4 ms-1">
              No
            </label>
          </div>
        </div>

        {/* Continue with other form fields in a similar manner */}
        {/* <div className="form-group flex gap-10 col-lg-12 col-md-12 ">
          <label className="w-1/4">Languages</label>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleInputChange}
          />
        </div> */}
        {/* Add Languages */}

        <h5 className="text-xl mt-6">Languages</h5>
        <div className="form-group col-lg-12flex gap-10 col-md-12 my-4">
          <div className="border rounded flex items-center flex-wrap gap-2 p-3">
            {/* {languages.map((language, index) => (
              <div key={index} className="flex flex-wrap gap-2 items-center">
                <span>{language.name}</span>
                <select
                  value={language.proficiency}
                  onChange={(e) =>
                    handleLanguageProficiencyChange(index, e.target.value)
                  }
                  className="border rounded p-1"
                >
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                  <option value="Fluent">Fluent</option>
                </select>
                <button
                  type="button"
                  className="theme-btn btn-style-one bg-blue-950 "
                  onClick={() => handleRemoveLanguage(index)}
                >
                  ×
                </button>
              </div>
            ))} */}
            {languages.map((language, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 border rounded px-3 py-1"
              >
                <span className="text-gray-800">
                  <strong>{language.name}</strong> - {language.proficiency}
                </span>
                <button
                  type="button"
                  className="theme-btn btn-style-one bg-red-600 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveLanguage(index)}
                >
                  <X size={20}  />
                </button>
              </div>
            ))}
            <div className="w-full flex flex-col md:flex-row gap-2 ">
              <input
                type="text"
                value={languageInput}
                onChange={(e) => setLanguageInput(e.target.value)}
                className="border-none focus:outline-none flex-grow"
                placeholder="Enter a language"
              />
              <select
                value={proficiency}
                onChange={(e) => setProficiency(e.target.value)}
                className="border border-gray-300 rounded px-4 py-1  focus:outline-none"
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
                className="theme-btn btn-style-one bg-blue-950 ml-2"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
        {/* <LanguageSelector/> */}
        <div className="form-group col-lg-12 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one bg-blue-800"
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
