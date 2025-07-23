import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

import DefaulHeader2 from "@/components/header/DefaulHeader2";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        console.log("Fetching courses...");
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/all-courses",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("API Response:", response.data);
        if (
          response.data.status === "success" &&
          response.data.data?.courseResponse
        ) {
          setCourses(response.data.data.courseResponse);
        } else {
          setError("Invalid response format from server");
        }
        setError(null);
      } catch (err) {
        console.error("Detailed error:", err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch courses. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // For debugging
  // console.log('Current courses state:', courses);
  // console.log('Loading state:', loading);
  // console.log('Error state:', error);

  const filteredCourses = courses.filter(
    (course) =>
      course?.course_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course?.course_description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Public Courses | SentrySpot</title>
        <meta
          name="description"
          content="Browse our collection of public courses"
        />
      </Helmet>

      <DefaulHeader2 />

      <div className="container mx-auto px-4 py-8 ">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Public Courses</h1>
          <p className="text-gray-600">
            Explore our collection of high-quality courses
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="relative w-full max-w-md">
              {/* Search icon */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-400 w-4 h-4" />
              </div>

              {/* Input field */}
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-400"
              />
            </div>
            {/* <Button variant="outline">Filter</Button> */}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-500 py-4">
            <p className="font-medium">Error loading courses</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Courses Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <Link
                  to={`/courses/${course.id}`}
                  key={course.id}
                  className="block"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                    <div className="aspect-video relative">
                      <img
                        src={
                          course.course_banner_image ||
                          "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                        }
                        alt={course.course_title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
                        }}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{course.course_title}</CardTitle>
                      <CardDescription>
                        {course.course_description
                          ? course.course_description
                              .replace(/<[^>]*>/g, "")
                              .substring(0, 150) + "..."
                          : "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Instructor:</span>{" "}
                          {course.trainer_display_name || "Not specified"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Language:</span>{" "}
                          {course.course_language || "Not specified"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Category:</span>{" "}
                          {course.course_category_name || "Not specified"}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Price:</span>{" "}
                          {course.course_price === 0
                            ? "Free"
                            : `$${course.course_price}`}
                        </p>
                      </div>
                      <Button className="w-full mt-4">View Course</Button>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No courses found matching your search.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesPage;
