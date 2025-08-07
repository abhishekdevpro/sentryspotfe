
import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import MobileMenu from "../header/MobileMenu";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";
// import LoginPopup from "../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../header/DashboardCandidatesSidebar";
import BreadCrumb from "../dashboard-pages/BreadCrumb";
import CopyrightFooter from "../dashboard-pages/CopyrightFooter";
import MenuToggler from "../dashboard-pages/MenuToggler";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Constant } from "@/utils/constant/constant.js";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import useCourseActions from "@/hooks/useCourseAction";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Courses");
  const [categories, setCategories] = useState(["All Courses"]);
  const navigate = useNavigate();

  const {
    handleSaveCourse,
    handleEnrollCourse,
    savingCourseId,
    enrollingCourseId,
  } = useCourseActions({ setCourses });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.get(
        "https://api.sentryspot.co.uk/api/jobseeker/get-all-courses",
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.data?.courseResponse) {
        setCourses(response.data.data.courseResponse);
      } else {
        setCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to view your courses");
      } else {
        toast.error("Failed to load courses. Please try again later.");
      }
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses =
    selectedCategory === "All Courses"
      ? Array.isArray(courses)
        ? courses
        : []
      : Array.isArray(courses)
      ? courses.filter(
          (course) => course.course_category_name === selectedCategory
        )
      : [];

  useEffect(() => {
    if (Array.isArray(courses)) {
      const uniqueCategories = [
        ...new Set(
          courses.map((course) => course.course_category_name).filter(Boolean)
        ),
      ];
      setCategories(["All Courses", ...uniqueCategories]);
    }
  }, [courses]);

  return (
    <div className="page-wrapper dashboard app-gradient-bg">
      <span className="header-span"></span>
      {/* <LoginPopup /> */}
      <DashboardCandidatesHeader />
      <DashboardCandidatesSidebar />
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Courses" />
          <MenuToggler />

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget app-light-bg">
                <Box sx={{ p: 3 }}>
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      My Courses
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Track your progress and continue learning
                    </Typography>
                  </Box>

                  {/* <Box
                    sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}
                  >
                    {categories.map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onClick={() => setSelectedCategory(category)}
                        sx={{
                          backgroundColor:
                            selectedCategory === category
                              ? "primary.main"
                              : "transparent",
                          color:
                            selectedCategory === category ? "white" : "inherit",
                          "&:hover": {
                            backgroundColor: "primary.main",
                            color: "white",
                          },
                        }}
                      />
                    ))}
                  </Box> */}

                  {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                      <Typography>Loading courses...</Typography>
                    </Box>
                  ) : filteredCourses.length === 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                      <Typography>No courses found</Typography>
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {filteredCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate(`/courses/${course.id}`)}
                          >
                            <CourseCard
                              course={course}
                              onSave={(e) => handleSaveCourse(course.id, e)}
                              onEnroll={(e) => handleEnrollCourse(course.id, e)}
                              isSaving={savingCourseId === course.id}
                              isEnrolling={enrollingCourseId === course.id}
                            />
                          </div>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CopyrightFooter />
    </div>
  );
};

export default CoursePage;
