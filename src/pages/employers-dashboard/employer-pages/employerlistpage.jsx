import { useState, useEffect } from "react";
import { FaToggleOn, FaToggleOff, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import LoginPopup from "@/components/common/form/login/LoginPopup";
import DashboardHeader from "@/components/header/DashboardHeader";
import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";
import BreadCrumb from "@/components/dashboard-pages/BreadCrumb";
import MenuToggler from "@/components/dashboard-pages/MenuToggler";
import CopyrightFooter from "@/components/dashboard-pages/CopyrightFooter";
import { useNavigate } from "react-router-dom";

const EmployersListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("https://api.sentryspot.co.uk/api/admin/employee-list", {
        headers: {
          "Content-Type": "application/json",
          Authorization: adminToken, // Ensure proper token format
        },
      })
      .then((response) => {
        if (response.data.status === "success") {
          // Add a local status state for each employee
          const updatedEmployees = response.data.data.employeer_detail
          setEmployees(updatedEmployees);
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, []);

  // Toggle status locally (without API call)
  const toggleStatus = (empId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === empId
          ? { ...emp, is_active: emp.is_active === 1 ? 0 : 1 }
          : emp
      )
    );
  };

  return (
    

    <div className="page-wrapper dashboard">
    <span className="header-span"></span>
    {/* <!-- Header Span for hight --> */}

    <LoginPopup />
    {/* End Login Popup Modal */}

    <DashboardHeader />
    {/* End Header */}

    {/* End Header */}
    {/* End MobileMenu */}

    <DashboardEmployerSidebar />
    {/* <!-- End User Sidebar Menu --> */}

    {/* <!-- Dashboard --> */}
    <section className="user-dashboard">
      <div className="dashboard-outer">
        <BreadCrumb title="Employers" />
        {/* breadCrumb */}

        <MenuToggler />
        {/* Collapsible sidebar button */}

        <div className="row">
          <div className="col-lg-12">
            {/* <!-- Ls widget --> */}
            {/* <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Employers List</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <button onClick={()=>navigate('/admin-dashboard/employers')}> back</button>
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="py-3 px-4 border">First Name</th>
                <th className="py-3 px-4 border">Last Name</th>
                <th className="py-3 px-4 border">Contact</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{emp.first_name}</td>
                  <td className="py-2 px-4">{emp.last_name}</td>
                  <td className="py-2 px-4">{emp.phone}</td>
                  <td className="py-2 px-4">{emp.email}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => toggleStatus(emp.id)}
                      className="text-xl focus:outline-none"
                    >
                      {emp.is_active === 1 ? (
                        <FaToggleOn className="text-green-500" />
                      ) : (
                        <FaToggleOff className="text-gray-400" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div> */}
     <div className="container mx-auto p-6 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Employers List</h2>
          <button
            onClick={() => navigate('/admin-dashboard/employers')}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-gray-700"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back </span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.length > 0 ? (
                  employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {emp.first_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {emp.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => toggleStatus(emp.id)}
                          className="focus:outline-none"
                          aria-label={emp.is_active ? "Deactivate user" : "Activate user"}
                        >
                          {emp.is_active === 1 ? (
                            <FaToggleOn className="text-green-500 text-2xl" />
                          ) : (
                            <FaToggleOff className="text-gray-400 text-2xl" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                      No employers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Total Employers: {employees.length} • Active: {employees.filter(emp => emp.is_active === 1).length}
          </p>
        </div> */}
      </div>
    </div>
          </div>
        </div>
        {/* End .row */}
      </div>
      {/* End dashboard-outer */}
    </section>
    {/* <!-- End Dashboard --> */}

    <CopyrightFooter />
    {/* <!-- End Copyright --> */}
  </div>
  );
};

export default EmployersListPage;
