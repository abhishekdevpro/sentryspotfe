import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CoursesTabs = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default images
  const defaultCourseImage = "https://api.sentryspot.co.uk/courses/assets/images/course_default.jpg";
  const defaultTrainerImage = "https://placehold.co/100x100/2563eb/ffffff?text=Trainer";

  const tabs = [
    { id: "1", title: "Health and Safety" },
    { id: "2", title: "First Aid" },
    { id: "3", title: "Security" },
    { id: "4", title: "Hospitality" },
    { id: "5", title: "Teaching & Academics" },
    { id: "6", title: "Construction" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.sentryspot.co.uk/api/jobseeker/all-courses");
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data && data.data && data.data.courseResponse && Array.isArray(data.data.courseResponse)) {
          console.log('Setting courses:', data.data.courseResponse);
          setCourses(data.data.courseResponse);
        } else {
          console.error('Unexpected API response format:', data);
          setCourses([]);
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on active tab
  const filteredCourses = Array.isArray(courses) ? courses.filter(course => {
    if (!course || typeof course !== 'object') return false;
    const category = course.course_category_name?.toLowerCase() || '';
    const tabTitle = tabs.find(tab => tab.id === activeTab)?.title.toLowerCase() || '';
    console.log('Filtering:', { category, tabTitle, matches: category.includes(tabTitle) });
    return category.includes(tabTitle);
  }) : [];

  console.log('Filtered Courses:', filteredCourses);

  if (loading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>Error loading courses: {error}</p>
      </div>
    );
  }

  // Show all courses if no category matches
  const displayCourses = filteredCourses.length > 0 ? filteredCourses : courses;

  return (
    <div className="p-2 sm:p-4 max-w-full">
      {/* Tabs - Now scrollable on mobile */}
      <div className="overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 mb-6 border-b-2 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 sm:px-4 py-2 font-medium whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? "border-b-2 border-black text-black"
                  : "text-gray-700"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={course.course_banner_image || defaultCourseImage}
                  alt={course.course_title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultCourseImage;
                  }}
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {course.course_category_name || "General"}
                </div>
                {course.discount_percent > 0 && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    {course.discount_percent}% OFF
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <img 
                    src={course.trainer_photo || defaultTrainerImage}
                    alt={course.trainer_display_name}
                    className="w-10 h-10 rounded-full mr-3"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultTrainerImage;
                    }}
                  />
                  <div>
                    <p className="font-medium text-gray-800">{course.trainer_display_name}</p>
                    <p className="text-sm text-gray-600">{course.trainer_job_title || "Instructor"}</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{course.course_title}</h3>
                <div className="flex items-center mb-3">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="text-gray-600">{course.rating || 0} ({course.enrolled_jobseeker_count || 0} students)</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.course_description?.replace(/<[^>]*>/g, '') || "No description available"}
                </p>
                <div className="flex justify-between items-center">
                  <div>
                    {course.discount_percent > 0 ? (
                      <div className="flex items-center">
                        <span className="text-gray-500 line-through mr-2">£{course.course_price}</span>
                        <span className="text-blue-600 font-semibold">£{course.after_discount_price}</span>
                      </div>
                    ) : (
                      <span className="text-blue-600 font-semibold">
                        {course.course_price > 0 ? `£${course.course_price}` : 'Free'}
                      </span>
                    )}
                  </div>
                  <Link 
                    to={`/courses/${course.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    {course.is_enrolled ? 'Continue Learning' : 'Learn More'}
                  </Link>
                </div>
                {course.coupon_code && (
                  <div className="mt-3 text-sm text-green-600">
                    Use code: {course.coupon_code}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayCourses.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No courses found in this category.</p>
          </div>
        )}
      </div>

      <div className="BlogBtn mt-6 flex justify-center">
        <Link to="/course" className="block w-auto">
          <button 
            type="button"
            className="w-64 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 text-sm sm:text-base transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Explore All Courses
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CoursesTabs;
