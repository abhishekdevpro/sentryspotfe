// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, Link } from "react-router-dom";
// import DetailsContent from "./detailsContent";
// import CourseDescription from "./CourseDescription";
// import DefaulHeader2 from "../header/DefaulHeader2";
// import LoginPopup from "../common/form/login/LoginPopup";
// import FooterDefault from "../footer/common-footer";

// const CourseDetails = () => {
//   const [courseData, setCourseData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { courseid } = useParams();

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         const url = `https://api.novajobs.us/api/trainers/courses/${courseid}`;
//         const response = await axios.get(url);
//         if (response.data) {
//           setCourseData(response.data);
//         } else {
//           setError("No course content available at this time.");
//         }
//       } catch (error) {
//         console.error("Error fetching course data:", error);
//         setError("Error loading course data. Please try again later.");
//         if (error.response && error.response.status === 401) {
//           window.location.href = "/";
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourseData();
//   }, [courseid]);

//   if (loading)
//     return <div className="text-center py-10 text-lg font-semibold">Loading...</div>;
//   if (error)
//     return <div className="alert alert-warning text-center py-10">{error}</div>;
//   if (!courseData)
//     return (
//       <div className="alert alert-info text-center py-10">
//         No course content available at this time.
//       </div>
//     );

//   const courseDescription = courseData.data.course_description || "";

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       {/* Header */}
//       <LoginPopup />
//       <DefaulHeader2 />

//       {/* Banner Section */}
//       <div className="bg-blue-600 text-white py-12">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
//             {/* Instructor Details */}
//             <div className="flex items-center gap-4">
//               <Link
//                 // to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
//               >
//                 <img
//                   src={`https://api.sentryspot.co.uk${courseData.data.trainer_photo}`}
//                   alt="Instructor"
//                   className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-lg"
//                 />
//               </Link>
//               <div>
//                 <h5 className="text-2xl font-semibold">
//                   <Link
//                     // to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
//                   >
//                     {courseData.data.trainer_first_name}{" "}
//                     {courseData.data.trainer_last_name}
//                   </Link>
//                 </h5>
//                 <p className="text-sm">{courseData.data.trainer_job_title}</p>
//                 <div className="flex gap-1 mt-2">
//                   {Array.from({ length: 5 }).map((_, index) => (
//                     <i
//                       key={index}
//                       className={`fas fa-star ${
//                         index < courseData.data.rating
//                           ? "text-yellow-400"
//                           : "text-gray-400"
//                       }`}
//                     />
//                   ))}
//                   <span className="ml-2 text-sm">
//                     ({courseData.data.rating})
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Course Title */}
//             <div className="flex-1">
//               <h1 className="text-4xl font-bold">{courseData.data.course_title}</h1>
//               <span className="inline-block mt-2 px-3 py-1 bg-white text-blue-600 rounded-full text-sm shadow">
//                 {courseData.course_category_name || "Graduates"}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Course Info */}
//       <div className="container mx-auto px-4 mt-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-xl font-semibold">
//               {courseData.data.total_lectures || "No Lessons"}
//             </p>
//             <p className="text-gray-500 text-sm">Total Lessons</p>
//           </div>
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-xl font-semibold">
//               {courseData.data.time_spent_on_course || "9hr 30min"}
//             </p>
//             <p className="text-gray-500 text-sm">Duration</p>
//           </div>
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-xl font-semibold">
//               {courseData.data.enrolled_student_count || 32} Students
//             </p>
//             <p className="text-gray-500 text-sm">Enrolled</p>
//           </div>
//           <div className="p-4 bg-white shadow rounded-lg">
//             <p className="text-xl font-semibold">
//               {courseData.data.target_audience || "General"}
//             </p>
//             <p className="text-gray-500 text-sm">Target Audience</p>
//           </div>
//         </div>
//       </div>

//       {/* Course Description */}
//       <div className="container mx-auto px-4 mt-10">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
//           <CourseDescription description={courseDescription} />
//         </div>
//       </div>

//       {/* Additional Course Details */}
//       <DetailsContent courseFeatureData={courseData.data} />

//       {/* Footer */}
//       <FooterDefault />
//     </div>
//   );
// };

// export default CourseDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DetailsContent from "./detailsContent";
import CourseDescription from "./CourseDescription";
import DefaulHeader2 from "../header/DefaulHeader2";
import LoginPopup from "../common/form/login/LoginPopup";
import FooterDefault from "../footer/common-footer";
import { Constant } from "@/utils/constant/constant";

const CourseDetails = () => {
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { courseid } = useParams();
  const token = localStorage.getItem(Constant.USER_TOKEN)
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const url = `https://api.sentryspot.co.uk/api/admin/course-detail/${courseid}`;
        const response = await axios.get(url,{
          headers:{
            Authorization:token
          }
        });
        if (response.data) {
          setCourseData(response.data);
        } else {
          setError("No course content available at this time.");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        setError("Error loading course data. Please try again later.");
        // if (error.response && error.response.status === 401) {
        //   window.location.href = "/";
        // }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseid]);

  // Loading State
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center py-10 text-lg font-semibold">
          Loading course details...
        </div>
      </div>
    );

  // Error State
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-warning text-center py-10 px-4">
          {error}
        </div>
      </div>
    );

  // No Course Data State
  if (!courseData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-info text-center py-10 px-4">
          No course content available at this time.
        </div>
      </div>
    );

  const courseDescription = courseData.data.course_description || "";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <LoginPopup />
      <DefaulHeader2 />

      {/* Banner Section - Responsive Layout */}
      <div className="bg-blue-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Instructor Details - Centered on Mobile */}
            <div className="flex flex-col md:flex-row items-center gap-4 w-full text-center md:text-left">
              <Link
                // to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
                className="flex justify-center md:block"
              >
                <img
                  src={`https://api.sentryspot.co.uk${courseData.data.trainer_photo}`}
                  alt="Instructor"
                  className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full border-4 border-white shadow-lg"
                />
              </Link>
              <div>
                <h1 className="text-2xl md:text-4xl font-bold">
                  {courseData.data.course_title}
                </h1>
                <h5 className="text-xl md:text-2xl font-semibold">
                  <Link
                  // to={`/instructor/instructor-profile/${courseData.data.trainer_id}`}
                  >
                    {courseData.data.trainer_first_name}{" "}
                    {courseData.data.trainer_last_name}
                  </Link>
                </h5>
                <p className="text-xs md:text-sm">
                  {courseData.data.trainer_job_title}
                </p>

                <div className="flex justify-center md:justify-start gap-1 mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <i
                      key={index}
                      className={`fas fa-star text-sm ${
                        index < courseData.data.rating
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs md:text-sm">
                    ({courseData.data.rating})
                  </span>
                  <span className="inline-block mt-2 px-3 py-1 bg-white text-blue-600 rounded-full text-xs md:text-sm shadow">
                    {courseData.course_category_name || "Graduates"}
                  </span>
                </div>
              </div>
            </div>

            {/* Course Title - Centered on Mobile */}
            {/* <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
              <h1 className="text-2xl md:text-4xl font-bold">
                {courseData.data.course_title}
              </h1>
              <span className="inline-block mt-2 px-3 py-1 bg-white text-blue-600 rounded-full text-xs md:text-sm shadow">
                {courseData.course_category_name || "Graduates"}
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Course Info - Responsive Grid */}
      <div className="container mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            {
              value: courseData.data.total_lectures || "No Lessons",
              label: "Total Lessons",
            },
            {
              value: courseData.data.time_spent_on_course || "9hr 30min",
              label: "Duration",
            },
            {
              value: `${courseData.data.enrolled_student_count || 32} Students`,
              label: "Enrolled",
            },
            {
              value: courseData.data.target_audience || "General",
              label: "Target Audience",
            },
          ].map((item, index) => (
            <div key={index} className="p-3 md:p-4 bg-white shadow rounded-lg">
              <p className="text-base md:text-xl font-semibold">{item.value}</p>
              <p className="text-gray-500 text-xs md:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Course Description - Full Width, Responsive Padding */}
      <div className="container mx-auto px-4 mt-8 md:mt-10">
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Course Description
          </h2>
          <CourseDescription description={courseDescription} />
        </div>
      </div>

      {/* Additional Course Details */}
      <DetailsContent courseFeatureData={courseData.data} />

      {/* Footer */}
      <FooterDefault />
    </div>
  );
};

export default CourseDetails;
