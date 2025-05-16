// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { FaTrash } from 'react-icons/fa';

// // // Confirmation Dialog Component
// // const ConfirmationDialog = ({ 
// //   isOpen, 
// //   onClose, 
// //   onConfirm, 
// //   title, 
// //   message 
// // }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
// //         <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
// //         <p className="mb-6 text-gray-600">{message}</p>
// //         <div className="flex justify-end space-x-3">
// //           <button 
// //             onClick={onClose}
// //             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
// //           >
// //             Cancel
// //           </button>
// //           <button 
// //             onClick={onConfirm}
// //             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
// //           >
// //             <FaTrash className="mr-2" /> Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default ConfirmationDialog

// // ConfirmationDialog.jsx
// import React from 'react';
// import { FaTrash } from 'react-icons/fa';

// // Confirmation Dialog Component
// // const ConfirmationDialog = ({ 
// //   isOpen, 
// //   onClose, 
// //   onConfirm, 
// //   title, 
// //   message 
// // }) => {
// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
// //         <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
// //         <p className="mb-6 text-gray-600">{message}</p>
// //         <div className="flex justify-end space-x-3">
// //           <button 
// //             onClick={onClose}
// //             className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
// //           >
// //             Cancel
// //           </button>
// //           <button 
// //             onClick={onConfirm}
// //             className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
// //           >
// //             <FaTrash className="mr-2" /> Delete
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// const ConfirmationDialog = ({ 
//     isOpen, 
//     onClose, 
//     onConfirm, 
//     title, 
//     message 
//   }) => {
//     if (!isOpen) return null;
  
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-xl">
//           <h2 className="text-xl font-bold mb-4">{title}</h2>
//           <p className="mb-6">{message}</p>
//           <div className="flex justify-end space-x-4">
//             <button 
//               onClick={onClose}
//               className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={onConfirm}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

// export default ConfirmationDialog;

import React from 'react';

// const ConfirmationDialog = ({ 
//   isOpen, 
//   onClose, 
//   onConfirm, 
//   title, 
//   message 
// }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-xl p-6 w-96">
//         <h2 className="text-xl font-bold mb-4">{title}</h2>
//         <p className="mb-6">{message}</p>
//         <div className="flex justify-end space-x-4">
//           <button 
//             onClick={onClose}
//             className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
//           >
//             Cancel
//           </button>
//           <button 
//             onClick={onConfirm}
//             className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


export default ConfirmationDialog;