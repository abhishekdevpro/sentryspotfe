import React, { useCallback, useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addExperience } from "../../../features/filter/filterSlice";
import { experienceLavelCheck } from "../../../features/job/jobSlice";
import axios from "axios";

const ExperienceLevel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { experienceLavel } = useSelector((state) => state.job) || {};
  const dispatch = useDispatch();
  const [experienceLevels, setExperienceLevels] = useState([]);

  // Fetch experience levels from API
  useEffect(() => {
  const fetchExperienceLevels = async () => {
    try {
      const response = await axios.get("https://api.sentryspot.co.uk/api/jobseeker/experience-level");
      setExperienceLevels(response.data.data); // Extract the 'data' property
    } catch (error) {
      console.error("Failed to fetch experience levels:", error);
    }
  };

  fetchExperienceLevels();
}, []);

  // Get array of selected experience IDs from URL
  const selectedExperienceLevelIds = useMemo(() => {
    const idsFromUrl = searchParams.get("experience_id");
    return idsFromUrl ? idsFromUrl.split("+").map(Number) : [];
  }, [searchParams]);

  // Experience handler to toggle selection
  const experienceHandler = useCallback(
    (id) => {
      const isSelected = selectedExperienceLevelIds.includes(id);
      let newSelectedIds;

      if (isSelected) {
        // Remove ID if already selected
        newSelectedIds = selectedExperienceLevelIds.filter(
          (selectedId) => selectedId !== id
        );
        dispatch(experienceLavelCheck(id)); // Uncheck in Redux
      } else {
        // Add new ID to selection
        newSelectedIds = [...selectedExperienceLevelIds, id];
        dispatch(experienceLavelCheck(id)); // Check in Redux
      }

      // Update URL with new selection
      const currentParams = Object.fromEntries(searchParams);
      if (newSelectedIds.length > 0) {
        currentParams["experience_id"] = newSelectedIds.join("+");
      } else {
        delete currentParams["experience_id"];
      }

      // Update URL and Redux state
      setSearchParams(
        Object.keys(currentParams).length > 0 ? currentParams : {},
        { replace: true }
      );
      dispatch(addExperience(newSelectedIds.length > 0 ? newSelectedIds : null));
    },
    [selectedExperienceLevelIds, dispatch, searchParams, setSearchParams]
  );

  // Sync initial state
  useEffect(() => {
    if (selectedExperienceLevelIds.length > 0) {
      // Reset all checked states first
      experienceLavel?.forEach((item) => {
        if (item.isChecked && !selectedExperienceLevelIds.includes(item.id)) {
          dispatch(experienceLavelCheck(item.id));
        }
      });

      // Set checked states based on URL
      selectedExperienceLevelIds.forEach((id) => {
        const itemToCheck = experienceLavel?.find((item) => item.id === id);
        if (itemToCheck && !itemToCheck.isChecked) {
          dispatch(experienceLavelCheck(id));
        }
      });

      dispatch(addExperience(selectedExperienceLevelIds));
    }
  }, [selectedExperienceLevelIds, experienceLavel, dispatch]);

  if (!experienceLevels || experienceLevels.length === 0) {
    return (
      <div className="w-full space-y-2">
        <div className="text-sm text-gray-500 text-center py-2">
          No experience levels found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      <ul className="space-y-2">
        {experienceLevels.map((item) => (
          <li key={item.id} className="w-full">
            <label className="flex items-center group cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={selectedExperienceLevelIds.includes(item.id)}
                  onChange={() => experienceHandler(item.id)}
                />
                <div
                  className="w-11 h-6 bg-gray-200 rounded-2xl peer 
                                peer-checked:bg-blue-500 
                                peer-focus:ring-4 peer-focus:ring-blue-300 
                                dark:peer-focus:ring-blue-800"
                ></div>
                <div
                  className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                                transition-all duration-300 ease-in-out
                                peer-checked:translate-x-5"
                ></div>
              </div>
              <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-grow truncate">
                {item.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(ExperienceLevel);