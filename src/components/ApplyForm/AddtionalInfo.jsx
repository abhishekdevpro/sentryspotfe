import React from 'react';

const WorkExperienceForm = ({ formData, setFormData, errors }) => {
  const handleChange = (e, index, field) => {
    const newData = [...formData[field]];
    newData[index] = { ...newData[index], [e.target.name]: e.target.value };
    setFormData(prev => ({ ...prev, [field]: newData }));
  };

  const addEntry = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], {}]
    }));
  };

  const removeEntry = (index, field) => {
    const newData = [...formData[field]];
    newData.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: newData }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
        {formData.workExperience.map((exp, index) => (
          <div key={index} className="mt-4 p-4 border rounded-md">
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={exp.company || ''}
              onChange={(e) => handleChange(e, index, 'workExperience')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={exp.position || ''}
              onChange={(e) => handleChange(e, index, 'workExperience')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={exp.duration || ''}
              onChange={(e) => handleChange(e, index, 'workExperience')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => removeEntry(index, 'workExperience')}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry('workExperience')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Work Experience
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Education</h3>
        {formData.education.map((edu, index) => (
          <div key={index} className="mt-4 p-4 border rounded-md">
            <input
              type="text"
              name="institution"
              placeholder="Institution"
              value={edu.institution || ''}
              onChange={(e) => handleChange(e, index, 'education')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={edu.degree || ''}
              onChange={(e) => handleChange(e, index, 'education')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={edu.year || ''}
              onChange={(e) => handleChange(e, index, 'education')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => removeEntry(index, 'education')}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry('education')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Education
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
        {formData.certifications.map((cert, index) => (
          <div key={index} className="mt-4 p-4 border rounded-md">
            <input
              type="text"
              name="name"
              placeholder="Certification Name"
              value={cert.name || ''}
              onChange={(e) => handleChange(e, index, 'certifications')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="issuer"
              placeholder="Issuer"
              value={cert.issuer || ''}
              onChange={(e) => handleChange(e, index, 'certifications')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <input
              type="text"
              name="year"
              placeholder="Year"
              value={cert.year || ''}
              onChange={(e) => handleChange(e, index, 'certifications')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => removeEntry(index, 'certifications')}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addEntry('certifications')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Certification
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
        <textarea
          name="skills"
          value={formData.skills || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
          placeholder="Enter your skills (comma-separated)"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="3"
        />
      </div>
    </div>
  );
};

export default WorkExperienceForm;

