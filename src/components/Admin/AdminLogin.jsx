// import { Link } from "react-router-dom";
// // import LoginWithSocial from "./LoginWithSocial";

// const AdminLogin = () => {
//   return (
//     <div className="form-inner">
//       <h3>Admin Login</h3>

//       {/* Admin Login Form */}
//       <form method="post">
//         <div className="form-group">
//           <label>Admin Username</label>
//           <input
//             type="text"
//             name="admin-username"
//             placeholder="Enter Admin Username"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label>Admin Password</label>
//           <input
//             type="password"
//             name="admin-password"
//             placeholder="Enter Admin Password"
//             required
//           />
//         </div>

//         <div className="form-group">
//           <div className="field-outer">
//             <div className="input-group checkboxes square">
//               <input type="checkbox" name="remember-me" id="remember" />
//               <label htmlFor="remember" className="remember">
//                 <span className="custom-checkbox"></span> Remember me
//               </label>
//             </div>
//             <a href="#" className="pwd">
//               Forgot password?
//             </a>
//           </div>
//         </div>

//         <div className="form-group">
//           <button
//             className="theme-btn btn-style-one"
//             type="submit"
//             name="admin-login"
//           >
//             Admin Log In
//           </button>
//         </div>
//       </form>

//       <div className="bottom-box">
//         <div className="text">
//           Not an admin? <Link to="/login">Go to User Login</Link>
//         </div>

//         <div className="divider">
//           <span>or</span>
//         </div>

//         {/* <LoginWithSocial /> */}
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

// import { Link } from "react-router-dom";
// import logo from "../../../public/company_logo.png"
// // import LoginWithSocial from "./LoginWithSocial";

// const AdminLogin = () => {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
//         <img src={logo} alt="" />
//         <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
//           Admin Login
//         </h3>

//         {/* Admin Login Form */}
//         <form method="post" className="space-y-4">
//           <div className="form-group">
//             <label className="block text-gray-700 font-medium mb-1">
//               Admin Username
//             </label>
//             <input
//               type="text"
//               name="admin-username"
//               placeholder="Enter Admin Username"
//               required
//               className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
//             />
//           </div>

//           <div className="form-group">
//             <label className="block text-gray-700 font-medium mb-1">
//               Admin Password
//             </label>
//             <input
//               type="password"
//               name="admin-password"
//               placeholder="Enter Admin Password"
//               required
//               className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
//             />
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center space-x-2 text-gray-600">
//               <input type="checkbox" name="remember-me" className="h-4 w-4" />
//               <span>Remember me</span>
//             </label>
//             <a href="#" className="text-blue-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           <button
//             type="submit"
//             name="admin-login"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Admin Log In
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm">
//           <p className="text-gray-600">
//             Not an admin?{" "}
//             <Link to="/login" className="text-blue-600 hover:underline">
//               Go to User Login
//             </Link>
//           </p>

//           {/* <div className="relative my-4">
//             <span className="absolute inset-0 flex items-center">
//               <span className="w-full border-t"></span>
//             </span>
//             <span className="relative bg-white px-2 text-gray-600">or</span>
//           </div> */}

//           {/* <LoginWithSocial /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../public/company_logo.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/admin/admin-login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Handle successful login
      if (response.data.code == 200) {
        // Store token in localStorage if remember me is checked
        if (rememberMe) {
          localStorage.setItem("adminToken", response.data.data.token);
        }

        // Store token in sessionStorage
        // sessionStorage.setItem('adminToken', response.data.token);

        // Show success toast
        toast.success("Login Successful!");

        // Redirect to admin dashboard after a short delay
        setTimeout(() => {
          navigate("/admin-dashboard/dashboard");
        }, 1500);
      } else {
        // Handle login failure
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      // Handle network or server errors
      if (error.response) {
        // The request was made and the server responded with a status code
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        toast.error("An error occurred. Please try again.");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <img src={logo} alt="Company Logo" className="mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Admin Login
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Admin Email"
              required
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-medium mb-1">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              required
              className="w-full p-2 border rounded-md focus:ring focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4"
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white py-2 rounded-md transition ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Admin Log In"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Not an admin?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Go to User Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
