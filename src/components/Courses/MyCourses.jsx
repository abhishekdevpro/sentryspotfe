import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Constant } from "@/utils/constant/constant";
// import Icon01 from "../path/to/icon01"; // Update with correct import path
// import Icon02 from "../path/to/icon02"; // Update with correct import path
// import banner from "../../assets/img/bg-banner-02.png";

const DynamicCourseGrid = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isClassAdded, setIsClassAdded] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [coursesPerPage] = useState(6);
  const navigate = useNavigate();
  const token = localStorage.getItem(Constant.USER_TOKEN);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get("https://api.sentryspot.co.uk/api/admin/courses-info",{
          headers:{
            Authorization:token
          }
        });
        setCourses(coursesResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleClass = async (index, courseId) => {
    const updatedClasses = [...isClassAdded];
    updatedClasses[index] = !updatedClasses[index];
    setIsClassAdded(updatedClasses);

    try {
      if (!token) {
        toast.error("Please log in to add courses to favorites.");
        navigate("/");
        return;
      }
      await axios.post(
        "https://api.novajobs.us/api/students/course-favorite",
        { course_id: courseId },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Course added to favorites!");
    } catch (error) {
      console.error("Failed to add course to favorites:", error);
      toast.error("Failed to add course to favorites. Please try again.");
    }
  };

  // Pagination logic
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse)|| [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(courses?.length / coursesPerPage);

  const handleAllCoursesClick = () => {
    window.location.href = "/course-list";
  };

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">Loading...</div>;
  }

  return (
    <div 
      className="bg-cover bg-center py-16"
    //   style={{ backgroundImage: `url(${banner})` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Our Popular Online Courses
          </h2>
          {/* <Link 
            to="/course-list" 
            className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            All Courses
          </Link> */}
        </div>
       {/* { console.log(currentCourses,"courses")} */}
        {/* Courses Grid or No Courses Message */}
        {courses?.length === 0 || currentCourses.length===0 ? (
          <div className="text-center text-2xl text-pink-500 mt-8">
            No courses available.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentCourses?.map((course, index) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all border-2 border-gray-100 hover:border-pink-500"
                >
                  <Link to={`/course-info/${course.id}`}>
                    <img 
                      src={`https://api.novajobs.us${course.course_banner_image}`}
                    // src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
                      alt={course.course_title}
                      className="w-full h-48 object-contain hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="p-4">
                    {/* Instructor Info */}
                    <div className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg shadow-sm">
                      <img 
                        src="https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
                        alt="Instructor"
                        className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-gray-200"
                      />
                      <div className="flex-grow">
                        <Link 
                        // to={`/instructor/instructor-profile/${course.trainer_id}`}
                        >
                          <span className="font-bold text-gray-800">
                            {course.trainer_first_name} {course.trainer_last_name}
                          </span>
                        </Link>
                        <p className="text-sm text-gray-500">Instructor</p>
                      </div>
                      <div>
                        <Link 
                          to="#" 
                          onClick={() => toggleClass(index, course.id)}
                          className={`text-gray-500 hover:text-pink-500 ${isClassAdded[course.id] && token ? 'text-pink-500' : ''}`}
                        >
                          <i className="fa-regular fa-heart" />
                        </Link>
                      </div>
                    </div>

                    {/* Course Title */}
                    <Link 
                      to={`/course-info/${course.id}`} 
                      className="block mb-4 hover:text-pink-500"
                    >
                      <h3 className="font-bold text-lg text-gray-800">
                        {course.course_title}
                      </h3>
                    </Link>

                    {/* Course Stats */}
                    <div className="flex justify-between text-gray-600 mb-4">
                      <div className="flex items-center">
                        {/* <img src={Icon01} alt="Students" className="w-5 h-5 mr-2" /> */}
                        <span>{course.students_counts} students</span>
                      </div>
                      <div className="flex items-center">
                        {/* <img src={Icon02} alt="Duration" className="w-5 h-5 mr-2" /> */}
                        <span>{course.time_spent_on_course}</span>
                      </div>
                    </div>

                    {/* Course Pricing */}
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-pink-600 mr-3">
                      £
                      {course.after_discount_price}
                      </span>
                      <span className="text-gray-500 line-through">
                      £
                      {course.course_price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {/* <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-pink-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1 
                    ? 'bg-pink-600 text-white' 
                    : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-pink-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicCourseGrid;