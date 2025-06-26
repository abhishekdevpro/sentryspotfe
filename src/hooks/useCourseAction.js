// // hooks/useCourseActions.js
// import { useState } from 'react';
// import { Constant } from '@/utils/constant/constant';
// import { toast } from 'react-hot-toast';
// import axios from 'axios';

// const useCourseActions = ({ setCourses }) => {
//   const [savingCourseId, setSavingCourseId] = useState(null);
//   const [enrollingCourseId, setEnrollingCourseId] = useState(null);

//   const token = localStorage.getItem(Constant.USER_TOKEN);

//   const handleSaveCourse = async (courseId, e) => {
//     try {
//       setSavingCourseId(courseId);
//       await axios.post(
//         'https://api.sentryspot.co.uk/api/jobseeker/save-course',
//         { course_id: Number(courseId) },
//         {
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       setCourses((prevCourses) =>
//         prevCourses.map((course) =>
//           course.id === courseId
//             ? { ...course, is_course_favorite: !course.is_course_favorite }
//             : course
//         )
//       );
//       toast.success('Course saved successfully');
//     } catch (err) {
//       console.error('Failed to save course:', err);
//       toast.error('Failed to save course. Please try again.');
//     } finally {
//       setSavingCourseId(null);
//     }
//   };

//   const handleEnrollCourse = async (courseId, e) => {
//     e?.stopPropagation();
//     try {
//       setEnrollingCourseId(courseId);
//       const response = await axios.get(
//         `https://api.sentryspot.co.uk/api/jobseeker/mark-interested/${courseId}`,
//         {
//           headers: {
//             Authorization: token,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data?.status === 'success') {
//         setCourses((prevCourses) =>
//           prevCourses.map((course) =>
//             course.id === courseId
//               ? {
//                   ...course,
//                   is_enrolled: true,
//                   enrollment_data: response.data.data,
//                 }
//               : course
//           )
//         );
//         toast.success(response.data.message || 'Enrolled successfully!');
//       } else {
//         toast.error(response.data.message || 'Enrollment failed.');
//       }
//     } catch (err) {
//       console.error('Enrollment error:', err);
//       toast.error('Failed to enroll in the course. Please try again.');
//     } finally {
//       setEnrollingCourseId(null);
//     }
//   };

//   return {
//     handleSaveCourse,
//     handleEnrollCourse,
//     savingCourseId,
//     enrollingCourseId,
//   };
// };

// export default useCourseActions;
// hooks/useCourseActions.js
import { useState } from 'react';
import { Constant } from '@/utils/constant/constant';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const useCourseActions = ({ setCourses }) => {
  const [savingCourseId, setSavingCourseId] = useState(null);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  const token = localStorage.getItem(Constant.USER_TOKEN);

  const handleSaveCourse = async (courseId, e) => {
    // e?.stopPropagation(); // Add this to prevent navigation when clicking heart
    console.log(courseId,"cID");
    try {
      setSavingCourseId(courseId);
      
      // Make API call to save/unsave course
      const response = await axios.post(
        'https://api.sentryspot.co.uk/api/jobseeker/save-course',
        { course_id: Number(courseId) },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      // Check if API call was successful
      if (response.data?.status === 'success' || response.data.code === 200) {
        // Update the course state based on API response
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === courseId
              ? { 
                  ...course, 
                  is_course_favorite: !course.is_course_favorite 
                }
              : course
          ).filter(course => course.is_course_favorite)
        );
        toast.success(response.data.message);
      } 

    } catch (err) {
      console.error('Failed to save course:', err);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        toast.error('Please login to save courses');
      } else if (err.response?.status === 404) {
        toast.error('Course not found');
      } else {
        toast.error('Failed to save course. Please try again.');
      }
    } finally {
      setSavingCourseId(null);
    }
  };

  const handleEnrollCourse = async (courseId, e) => {
    e?.stopPropagation();
    
    try {
      setEnrollingCourseId(courseId);
      
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/mark-interested/${courseId}`,
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
console.log(courseId,"courseId")
      if (response.data?.status === 'success') {
        setCourses((prevCourses) =>
          
          prevCourses.map((course) =>
            course.id === courseId
              ? {
                  ...course,
                  is_enrolled: true,
                  enrollment_data: response.data.data,
                }
              : course
          )
        );
        toast.success(response.data.message || 'Enrolled successfully!');
      }
       else {
        toast.error(response.data.message || 'Enrollment failed.');
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        toast.error('Please login to enroll in courses');
      } else if (err.response?.status === 404) {
        toast.error('Course not found');
      } else {
        toast.error('Failed to enroll in the course. Please try again.');
      }
    } finally {
      setEnrollingCourseId(null);
    }
  };

  return {
    handleSaveCourse,
    handleEnrollCourse,
    savingCourseId,
    enrollingCourseId,
  };
};

export default useCourseActions;