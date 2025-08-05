
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Constant } from '@/utils/constant/constant';

const TitleAutocomplete = ({ className, control, setValue, errors, profileData,fieldName }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const token = localStorage.getItem(Constant.USER_TOKEN);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set default job title from profileData
  useEffect(() => {
    if (profileData?.job_title) {
      setValue('job_title', profileData.job_title);
    }
  }, [profileData, setValue]);

  // Fetch job title suggestions
  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/job-title?job_title_keyword=${encodeURIComponent(query)}`,
        { headers: { Authorization: token } }
      );

      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error('Error fetching job titles:', error);
      toast.error('Failed to load job titles');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-group col-lg-6 col-md-12 font-light">
      <label className="block mb-1 text-gray-700 font-semibold">Job Title*</label>
      <Controller
        name={fieldName || "job_title"}
        control={control}
        rules={{ required: 'Job title is required' }}
        render={({ field }) => (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              className={`${className} w-full px-4 py-3 rounded-lg bg-gray-50 border-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Type to search job titles..."
              value={field.value || ''}
              onChange={(e) => {
                const value = e.target.value;
                field.onChange(value); // sync with RHF
                setShowSuggestions(true);
                if (value.length >= 2) {
                  fetchSuggestions(value);
                } else {
                  setSuggestions([]);
                }
              }}
              onFocus={() => {
                setShowSuggestions(true);
                if ((field.value || '').length >= 2) {
                  fetchSuggestions(field.value);
                }
              }}
            />
            {isLoading && (
              <div className="absolute right-3 top-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              </div>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto"
              >
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="cursor-pointer px-4 py-2 hover:bg-blue-50"
                    onClick={() => {
                      field.onChange(suggestion.name); // update RHF
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      />
      {errors?.job_title && (
        <p className="text-red-500 text-sm">{errors.job_title.message}</p>
      )}
    </div>
  );
};

export default TitleAutocomplete;
