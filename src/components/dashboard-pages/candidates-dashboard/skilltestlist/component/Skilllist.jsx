import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Constant } from "@/utils/constant/constant.js";
import { GraduationCap, X } from "lucide-react";

const InstructionsModal = ({ isOpen, onClose, onProceed, skillId, skillName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="app-light-bg rounded-lg w-full max-w-2xl mx-4 relative">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="inline-block">📝</span> Instructions
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">
            Following instructions are common for all Users:
          </h3>
          
          <ol className="space-y-3 list-decimal pl-6">
            <li>The duration of the test is 10 minutes*. Your answer gets automatically submitted after 10 minutes*.</li>
            <li>This test consists of 15* multiple-choice questions.</li>
            <li>You may attempt the questions in any order.</li>
            <li>Please select the correct answer and click the Save and next button.</li>
            <li>Please click skip if you wish to skip a question. You may come back and answer the question later.</li>
            <li>Please click on the Submit Assessment button after answering all the questions.</li>
            <li>Do not close the window before submitting the test.</li>
            <li>Tests will be automatically submitted after the given time limit.</li>
          </ol>
        </div>
        
        <div className="border-t p-4 flex justify-end">
          <Link to={`/candidates-dashboard/testpaper/${skillId}/${skillName}`}>
            <button 
              onClick={onProceed}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Proceed to Test
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SkillCard = ({ skill, onTakeTest }) => (
  <div className="app-light-bg rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-800">
            {skill.name}
          </h3>
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => onTakeTest(skill.id, skill.name)}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <span>Take Test</span>
        </button>
      </div>
    </div>
  </div>
);

const Skilltest = () => {
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/user-skills`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      
      setSkills(response.data.data || []);
      setError(null);
    } catch (err) {
      // Handle different error cases with user-friendly messages
      if (err.response?.status === 500) {
        setError("Please Upload Your Resume First");
      } else if (err.response?.status === 401) {
        setError("Your session has expired. Please login again.");
      } else {
        setError("Unable to load skills. Please try again later.");
      }
      console.error("Error fetching skills:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTakeTest = (skillId, skillName) => {
    setSelectedSkill({ id: skillId, name: skillName });
    setIsModalOpen(true);
  };

  return (
    <div className="app-bg-light min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Skills</h2>
        </div> */}
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="ml-4 text-gray-500">Loading...</p>
          </div>
        ) : error ? (
          <div className="app-light-bg rounded-lg shadow-lg p-8 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg mb-4">{error}</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="app-light-bg rounded-lg shadow-lg p-8 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No skills available at the moment. Please add skills and check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <SkillCard 
                key={skill.id} 
                skill={skill} 
                onTakeTest={handleTakeTest}
              />
            ))}
          </div>
        )}
      </div>

      <InstructionsModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProceed={() => setIsModalOpen(false)}
        skillId={selectedSkill?.id}
        skillName={selectedSkill?.name}
      />
    </div>
  );
};

export default Skilltest;