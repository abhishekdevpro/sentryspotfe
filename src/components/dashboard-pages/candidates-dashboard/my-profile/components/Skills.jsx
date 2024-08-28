import React, { useState } from "react";

const Skills =({ onNext }) => {
  const [skills, setSkills] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!skills.includes(inputValue.trim())) {
        setSkills([...skills, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    // After successful submission, go to the next tab
    onNext();
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="">
        <div>
        <h5 className="text-xl">Skills</h5>
        <div className="form-group col-lg-12 col-md-12 my-4 ">
          <p>Add Skills (Maximum 15) :</p>
          <div className="border  rounded flex items-center flex-wrap gap-2 p-3 ">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-blue-800 text-white  px-2 rounded-xl py-2 flex items-center"
              >
                <span className="mr-2">{skill}</span>
                <button
                  type="button"
                  className="text-white ml-1"
                  onClick={() => handleRemoveSkill(skill)}
                >
                  ×
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-none  focus:outline-none flex-grow"
              placeholder="Enter a skill  "
            />
          </div>
        </div>

        <div className="mt-10">
        <h5 className="text-xl">Recommendations</h5>
        <div className="form-group col-lg-12 col-md-12 my-4 ">
          <p>Request a recommendation  :</p>
          <div className="rounded flex items-center  gap-3  mt-2">
          
            <input
              type="email"
       
            
              className="border-1  py-2 col-lg-8 col-md-12"
              placeholder="example@gmail.com"
            />
            <button className="bg-blue-900 text-white px-5 py-2 rounded-md">Send</button>
          </div>
        </div>
        </div>
        <p className="my-10">You have <strong className="text-blue-700">0 recommendations</strong>. Candidates with recommendations have higher likelihood of being shortlisted.</p>
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one bg-blue-800">
            Save & Next ➤
          </button>
        </div>
      </div>
    </form>
  );
};

export default Skills;
