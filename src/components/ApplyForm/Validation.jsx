export const validatePersonalInfo = (data) => {
    const errors = {};
    if (!data.firstName) errors.firstName = "First name is required";
    if (!data.lastName) errors.lastName = "Last name is required";
    if (!data.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = "Email is invalid";
    if (!data.phone) errors.phone = "Phone number is required";
    if (!data.location) errors.location = "Location is required";
    return errors;
  };
  
  export const validateEmployeeQuestions = (data) => {
    const errors = {};
    for (let i = 1; i <= 6; i++) {
      if (!data[`question${i}`]) errors[`question${i}`] = `Question ${i} is required`;
    }
    return errors;
  };
  
  export const validateWorkExperience = (data) => {
    const errors = {};
    if (!data.workExperience || data.workExperience.length === 0) {
      errors.workExperience = "At least one work experience entry is required";
    }
    if (!data.education || data.education.length === 0) {
      errors.education = "At least one education entry is required";
    }
    return errors;
  };
  
  