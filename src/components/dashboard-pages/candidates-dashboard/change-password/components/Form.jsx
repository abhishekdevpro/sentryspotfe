// import { useState } from "react";
// import axios from "axios";
// import { Constant } from "@/utils/constant/constant";

// const Form = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setMessage("New password and confirm password do not match.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem(Constant.USER_TOKEN); // Replace this with your actual token
//       const response = await axios.post(
//         "https://api.sentryspot.co.uk/api/jobseeker/change-password",
//         {
//           old_password: oldPassword,
//           new_password: newPassword,
//           confirm_password: confirmPassword,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setMessage("Password changed successfully.");
//       }
//     } catch (error) {
//       setMessage("Error changing password. Please try again.");
//     }
//   };

//   return (
//     <form className="default-form" onSubmit={handleSubmit}>
//       <div className="row">
//         <div className="form-group col-lg-12 col-md-12">
//           <label>Old Password</label>
//           <input
//             type={showOldPassword ? "text" : "password"}
//             name="oldPassword"
//             required
//             value={oldPassword}
//             onChange={(e) => setOldPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             className="border rounded-lg mt-2 float-end bg-blue-800 text-white"
//             onClick={() => setShowOldPassword((prev) => !prev)}
//           >
//             {showOldPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         <div className="form-group col-lg-12 col-md-12">
//           <label>New Password</label>
//           <input
//             type={showNewPassword ? "text" : "password"}
//             name="newPassword"
//             required
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={() => setShowNewPassword((prev) => !prev)}
//             className="border rounded-lg mt-2 float-end bg-blue-800 text-white"
//           >
//             {showNewPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         <div className="form-group col-lg-12 col-md-12">
//           <label>Confirm Password</label>
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirmPassword"
//             required
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             className="border rounded-lg mt-2 float-end bg-blue-800 text-white"
//             onClick={() => setShowConfirmPassword((prev) => !prev)}
//           >
//             {showConfirmPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         {message && (
//           <div className="form-group col-lg-12">
//             <p>{message}</p>
//           </div>
//         )}

//         <div className="form-group col-lg-6 col-md-12">
//           <button type="submit" className="theme-btn btn-style-one">
//             Update
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default Form;
import { useState } from "react";
import axios from "axios";
import { Constant } from "@/utils/constant/constant";

const Form = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.post(
        "https://api.sentryspot.co.uk/api/jobseeker/change-password",
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Password changed successfully.");
      }
    } catch (error) {
      setMessage("Error changing password. Please try again.");
    }
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Old Password</label>
        <div className="relative">
          <input
            type={showOldPassword ? "text" : "password"}
            name="oldPassword"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            onClick={() => setShowOldPassword((prev) => !prev)}
          >
            <i className={`fas ${showOldPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">New Password</label>
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            onClick={() => setShowNewPassword((prev) => !prev)}
          >
            <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            <i className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
          </button>
        </div>
      </div>

      {message && (
        <p className="text-center text-red-600 font-medium mb-4">{message}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        Update
      </button>
    </form>
  );
};

export default Form;
