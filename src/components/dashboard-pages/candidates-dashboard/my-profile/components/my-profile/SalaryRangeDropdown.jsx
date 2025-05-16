import React from "react";

const SalaryRangeDropdown = ({ salaryRanges }) => {
  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label>Salary Range*</label>
      <select name="salary_range" required>
        <option value="">Select salary range</option>
        {salaryRanges.map((range) => (
          <option key={range.id} value={range.id}>
            {range.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SalaryRangeDropdown; 