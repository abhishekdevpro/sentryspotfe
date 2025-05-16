import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a value.
 *
 * @param {any} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {any} - The debounced value.
 */
const useDebounce = (value, delay) => {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Effect hook to handle the debouncing logic
  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout when the component unmounts or the value changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // Return the debounced value
  return debouncedValue;
};

export default useDebounce;
