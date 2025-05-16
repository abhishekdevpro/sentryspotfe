import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";

/**
 * Display a success notification message.
 *
 * @param {string} message - The message to display in the notification.
 */
export const notifySuccess = (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};

/**
 * Display an error notification message.
 *
 * @param {string} message - The message to display in the notification.
 */
export const notifyError = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_RIGHT, // Position of the toast notification
    autoClose: 3000, // Time in milliseconds before the notification is automatically closed
  });
};

/**
 * Display an information notification message.
 *
 * @param {string} message - The message to display in the notification.
 * @return {void} This function does not return anything.
 */
export const notifyInfo = (message) => {
  toast.info(message, {
    position: toast.POSITION.BOTTOM_RIGHT, // Position of the toast notification
    autoClose: 3000, // Time in milliseconds before the notification is automatically closed
  });
};

/**
 * Display a warning notification message.
 *
 * @param {string} message - The message to display in the notification.
 * @return {void} This function does not return anything.
 */
export const notifyWarning = (message) => {
  toast.warn(message, {
    position: toast.POSITION.BOTTOM_RIGHT, // Position of the toast notification
    autoClose: 3000, // Time in milliseconds before the notification is automatically closed
  });
};
