import { Link } from "react-router-dom";
import { FaUsers, FaStore } from "react-icons/fa";

const EmployersAll = () => {
  return (
    <div className="p-10">
      {/* Cards Section */}
      <div className="flex justify-center mt-10 gap-10">
        {/* List All Employees */}
        <Link to="/admin-dashboard/employerslist" className="w-60">
          <div className="bg-[#1C2957] text-white text-center p-6 rounded-lg shadow-lg hover:bg-opacity-80 transition">
            <FaUsers className="text-5xl mx-auto" />
            <h3 className="mt-3 text-xl font-semibold">List All</h3>
          </div>
        </Link>

        {/* Add Employee */}
        <Link to="/admin-dashboard/addemployer" className="w-60">
          <div className="bg-[#1C2957] text-white text-center p-6 rounded-lg shadow-lg hover:bg-opacity-80 transition">
            <FaStore className="text-5xl mx-auto" />
            <h3 className="mt-3 text-xl font-semibold">Add Employee</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EmployersAll;
