import { useState } from 'react';

const LanguageSection = () => {
  const [languages, setLanguages] = useState([
    { name: 'English', proficiency: 'Native Speaker' }
  ]);
  const [languageInput, setLanguageInput] = useState('');

  // Handle adding a new language
  const handleAddLanguage = () => {
    if (languageInput.trim() === '') return;
    setLanguages([...languages, { name: languageInput, proficiency: 'Intermediate' }]);
    setLanguageInput('');
  };

  // Handle removing a language
  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  // Handle changing the proficiency level of a language
  const handleLanguageProficiencyChange = (index, value) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index].proficiency = value;
    setLanguages(updatedLanguages);
  };

  // Handle adding a new section
  const handleAddSection = () => {
    // Implementation would depend on your overall form structure
    console.log('Add new section clicked');
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top language selectors row */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-2">First Language</label>
          <select className="w-full border rounded p-2">
            {languages.map((lang, idx) => (
              <option key={idx} value={lang.name}>{lang.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-2">Proficiency</label>
          <select 
            className="w-full border rounded p-2"
            value={languages[0]?.proficiency || 'Native Speaker'} 
            onChange={(e) => handleLanguageProficiencyChange(0, e.target.value)}
          >
            <option value="Native Speaker">Native Speaker</option>
            <option value="Fluent">Fluent</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic</option>
          </select>
        </div>
        <div className="mt-6">
          <button 
            className="bg-red-500 text-white p-2 rounded flex items-center justify-center"
            onClick={() => languages.length > 1 && handleRemoveLanguage(0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Languages collection */}
      <div className="form-group col-lg-12 flex gap-10 col-md-12 my-4">
        <div className="border rounded flex items-center flex-wrap gap-2 p-3 w-full">
          {languages.map((language, index) => (
            <div key={index} className="flex flex-wrap gap-2 items-center">
              <span>{language.name}</span>
              <select
                value={language.proficiency}
                onChange={(e) => handleLanguageProficiencyChange(index, e.target.value)}
                className="border rounded p-1"
              >
                <option value="Native Speaker">Native Speaker</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              <button
                type="button"
                className="theme-btn btn-style-one bg-blue-950 text-white w-6 h-6 rounded-full flex items-center justify-center"
                onClick={() => handleRemoveLanguage(index)}
              >
                ×
              </button>
            </div>
          ))}
          <input
            type="text"
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            className="border-none focus:outline-none flex-grow"
            placeholder="Enter a language"
          />
          <button
            type="button"
            onClick={handleAddLanguage}
            className="theme-btn btn-style-one bg-blue-950 text-white px-3 py-1 rounded"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Add section button */}
      <div>
        <button 
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded"
          onClick={handleAddSection}
        >
          <span>+</span> Add section
        </button>
      </div>
    </div>
  );
};

export default LanguageSection;