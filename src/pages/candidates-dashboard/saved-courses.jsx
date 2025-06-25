import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Button,
} from "@mui/material";
import MobileMenu from "../../components/header/MobileMenu";
import DashboardCandidatesHeader from "../../components/header/DashboardCandidatesHeader";
import LoginPopup from "../../components/common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../../components/header/DashboardCandidatesSidebar";
import BreadCrumb from "../../components/dashboard-pages/BreadCrumb";
import CopyrightFooter from "../../components/dashboard-pages/CopyrightFooter";
import MenuToggler from "../../components/dashboard-pages/MenuToggler";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Constant } from "@/utils/constant/constant.js";
import { useNavigate } from "react-router-dom";
import CourseCard from "@/components/candidates-dashboard/CourseCard";
import useCourseActions from "@/hooks/useCourseAction";

const SavedCourses = () => {
  const [savedCourses, setSavedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    handleSaveCourse,
    handleEnrollCourse,
    savingCourseId,
    enrollingCourseId,
  } = useCourseActions({setCourses:setSavedCourses });

  useEffect(() => {
    fetchSavedCourses();
  }, []);

  const fetchSavedCourses = async () => {
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/get-all-courses?is_favorite`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        // Check if courseResponse exists and is not null
        if (response.data.data.courseResponse) {
          setSavedCourses(response.data.data.courseResponse);
        } else {
          setSavedCourses([]);
        }
      } else {
        toast.error(response.data.message || "Failed to load saved courses");
        setSavedCourses([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching saved courses:", error);
      toast.error(
        error.response?.data?.message || "Failed to load saved courses"
      );
      setSavedCourses([]);
      setLoading(false);
    }
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.post(
        `https://api.sentryspot.co.uk/api/jobseeker/course/favorite=0`,
        {
          course_id: courseId,
          is_favorite: false,
        },
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        toast.success("Course removed from saved list");
        fetchSavedCourses(); // Refresh the list
      } else {
        toast.error(response.data.message || "Failed to remove course");
      }
    } catch (error) {
      console.error("Error removing course:", error);
      toast.error(error.response?.data?.message || "Failed to remove course");
    }
  };

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <LoginPopup />
      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Saved Courses" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <Box sx={{ p: 3 }}>
                  {/* Header Section */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                      Saved Courses
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Access your saved courses and continue learning
                    </Typography>
                  </Box>

                  {loading ? (
                    <Box sx={{ width: "100%", mt: 2 }}>
                      <LinearProgress />
                    </Box>
                  ) : savedCourses.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        You haven't saved any courses yet
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/courses"
                        sx={{ mt: 2 }}
                      >
                        Browse Courses
                      </Button>
                    </Box>
                  ) : (
                    <Grid container spacing={3}>
                      {savedCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                          <CourseCard
                            key={course.id}
                            course={course}
                            onSave={(e) => handleSaveCourse(course.id, e)}
                            onEnroll={(e) => handleEnrollCourse(course.id, e)}
                            isSaving={savingCourseId === course.id}
                            isEnrolling={enrollingCourseId === course.id}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
  );
};

export default SavedCourses;
