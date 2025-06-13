import { useState, useEffect } from 'react';
import { Card, Grid, Typography, Box, Chip, LinearProgress, Button } from '@mui/material';
import MobileMenu from "../header/MobileMenu";
import DashboardCandidatesHeader from "../header/DashboardCandidatesHeader";
import LoginPopup from "../common/form/login/LoginPopup";
import DashboardCandidatesSidebar from "../header/DashboardCandidatesSidebar";
import BreadCrumb from "../dashboard-pages/BreadCrumb";
import CopyrightFooter from "../dashboard-pages/CopyrightFooter";
import MenuToggler from "../dashboard-pages/MenuToggler";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Constant } from "@/utils/constant/constant.js";
import { useNavigate } from 'react-router-dom';

const CoursePage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All Courses');
    const [categories, setCategories] = useState(['All Courses']);
    const [savingCourseId, setSavingCourseId] = useState(null);
    const [enrollingCourseId, setEnrollingCourseId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem(Constant.USER_TOKEN);
            const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/all-courses', {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                }
            });
            // Handle the specific API response structure
            if (response.data?.data?.courseResponse) {
                setCourses(response.data.data.courseResponse);
            } else {
                setCourses([]);
            }
        } catch (error) {
            console.error('Error fetching courses:', error);
            if (error.response?.status === 401) {
                toast.error('Please login to view your courses');
            } else {
                toast.error('Failed to load courses. Please try again later.');
            }
            setCourses([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveCourse = async (courseId, e) => {
        e.stopPropagation(); // Prevent card click event
        try {
            setSavingCourseId(courseId);
            const token = localStorage.getItem(Constant.USER_TOKEN);
            await axios.post('https://api.sentryspot.co.uk/api/jobseeker/save-course', 
                { course_id: Number(courseId) },
                {
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json',
                    },
                }
            );
            
            // Update the course's favorite status in the local state
            setCourses(prevCourses => 
                prevCourses.map(course => 
                    course.id === courseId 
                        ? { ...course, is_course_favorite: !course.is_course_favorite }
                        : course
                )
            );
            
            toast.success('Course saved successfully');
        } catch (err) {
            console.error('Failed to save course:', err);
            toast.error('Failed to save course. Please try again.');
        } finally {
            setSavingCourseId(null);
        }
    };

    const handleEnrollCourse = async (courseId, e) => {
        e.stopPropagation(); // Prevent card click event
        try {
            setEnrollingCourseId(courseId);
            const token = localStorage.getItem(Constant.USER_TOKEN);
            const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/mark-interested/${courseId}`, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.data?.status === "success") {
                // Update the course's enrollment status in the local state
                setCourses(prevCourses => 
                    prevCourses.map(course => 
                        course.id === courseId 
                            ? { 
                                ...course, 
                                is_enrolled: true,
                                enrollment_data: {
                                    id: response.data.data.id,
                                    jobseeker_id: response.data.data.jobseeker_id,
                                    course_id: response.data.data.course_id,
                                    CreatedAt: response.data.data.CreatedAt
                                }
                            }
                            : course
                    )
                );
                toast.success(response.data.message || 'Successfully enrolled in the course!');
            } else {
                toast.error(response.data.message || 'Failed to enroll in the course. Please try again.');
            }
        } catch (err) {
            console.error('Failed to enroll in course:', err);
            if (err.response?.status === 401) {
                toast.error('Please login to enroll in courses');
            } else {
                toast.error('Failed to enroll in the course. Please try again.');
            }
        } finally {
            setEnrollingCourseId(null);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    // Ensure filteredCourses is always an array
    const filteredCourses = selectedCategory === 'All Courses' 
        ? (Array.isArray(courses) ? courses : [])
        : (Array.isArray(courses) ? courses.filter(course => course.course_category_name === selectedCategory) : []);

    useEffect(() => {
        if (Array.isArray(courses)) {
            const uniqueCategories = [...new Set(courses.map(course => course.course_category_name).filter(Boolean))];
            setCategories(['All Courses', ...uniqueCategories]);
        }
    }, [courses]);

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
                    <BreadCrumb title="My Courses" />
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
                                            My Courses
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Track your progress and continue learning
                                        </Typography>
                                    </Box>

                                    {/* Categories */}
                                    <Box sx={{ mb: 4, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {categories.map((category) => (
                                            <Chip
                                                key={category}
                                                label={category}
                                                onClick={() => handleCategoryClick(category)}
                                                sx={{
                                                    backgroundColor: selectedCategory === category ? 'primary.main' : 'transparent',
                                                    color: selectedCategory === category ? 'white' : 'inherit',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>

                                    {/* Course Grid */}
                                    {loading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                            <Typography>Loading courses...</Typography>
                                        </Box>
                                    ) : filteredCourses.length === 0 ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                            <Typography>No courses found</Typography>
                                        </Box>
                                    ) : (
                                        <Grid container spacing={3}>
                                            {filteredCourses.map((course) => (
                                                <Grid item xs={12} sm={6} md={4} key={course.id}>
                                                    <div
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => navigate(`/courses/${course.id}`)}
                                                    >
                                                        <Card
                                                            style={{
                                                                padding: 0,
                                                                height: '100%',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                borderRadius: 16,
                                                                overflow: 'hidden',
                                                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                                            }}
                                                        >
                                                            {/* Course Image */}
                                                            <img
                                                                src={
                                                                    course.course_banner_image
                                                                        ? (course.course_banner_image.startsWith('http')
                                                                            ? course.course_banner_image
                                                                            : `https://api.sentryspot.co.uk${course.course_banner_image}`)
                                                                        : 'https://api.sentryspot.co.uk/courses/assets/images/course_default.jpg'
                                                                }
                                                                alt={course.course_title}
                                                                style={{
                                                                    width: '100%',
                                                                    height: 160,
                                                                    objectFit: 'cover',
                                                                    background: '#f5f5f5',
                                                                }}
                                                            />
                                                            <div style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                                                                <img
                                                                    src={
                                                                        course.trainer_photo
                                                                            ? (course.trainer_photo.startsWith('http')
                                                                                ? course.trainer_photo
                                                                                : `https://api.sentryspot.co.uk${course.trainer_photo}`)
                                                                            : 'https://statinfer.com/wp-content/uploads/dummy-user.png'
                                                                    }
                                                                    alt={course.trainer_display_name}
                                                                    style={{
                                                                        width: 48,
                                                                        height: 48,
                                                                        borderRadius: '50%',
                                                                        objectFit: 'cover',
                                                                        border: '2px solid #eee',
                                                                        background: '#fff',
                                                                    }}
                                                                />
                                                                <div style={{ flex: 1 }}>
                                                                    <div style={{ fontWeight: 700, fontSize: 16 }}>
                                                                        {course.trainer_display_name || 'Trained Professional'}
                                                                    </div>
                                                                    <div style={{ fontSize: 13, color: '#888' }}>Instructor</div>
                                                                </div>
                                                                <div 
                                                                    onClick={(e) => handleSaveCourse(course.id, e)}
                                                                    style={{ 
                                                                        cursor: 'pointer',
                                                                        opacity: savingCourseId === course.id ? 0.5 : 1,
                                                                        transition: 'transform 0.2s ease',
                                                                        transform: course.is_course_favorite ? 'scale(1.2)' : 'scale(1)'
                                                                    }}
                                                                >
                                                                    {course.is_course_favorite ? (
                                                                        <span style={{ color: '#e53935', fontSize: 22 }}>❤️</span>
                                                                    ) : (
                                                                        <span style={{ color: '#bbb', fontSize: 22 }}>🤍</span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div style={{ padding: '0 16px 8px 16px' }}>
                                                                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                                                                    {course.course_title}
                                                                </div>
                                                            </div>
                                                            <div style={{ padding: '0 16px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                                                                <span style={{ color: '#888', fontSize: 18 }}>👥</span>
                                                                <span style={{ fontSize: 14, color: '#888' }}>
                                                                    {course.enrolled_jobseeker_count || 0} User
                                                                </span>
                                                                <span style={{ color: '#888', fontSize: 18, marginLeft: 16 }}>⏰</span>
                                                                <span style={{ fontSize: 14, color: '#888' }}>
                                                                    {course.time_spent_on_course || 20} hrs
                                                                </span>
                                                            </div>
                                                            <div style={{ padding: '0 16px 16px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                                                                <span style={{ fontWeight: 700, fontSize: 20, color: '#e53935' }}>
                                                                    {course.after_discount_price && course.after_discount_price !== course.course_price
                                                                        ? `£${course.after_discount_price}`
                                                                        : `£${course.course_price || 0}`}
                                                                </span>
                                                                {course.after_discount_price && course.after_discount_price !== course.course_price && (
                                                                    <span style={{ fontSize: 16, color: '#888', textDecoration: 'line-through' }}>
                                                                        £{course.course_price}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div style={{ padding: '0 16px 16px 16px', marginTop: 'auto' }}>
                                                                <Button
                                                                    variant="contained"
                                                                    fullWidth
                                                                    onClick={(e) => handleEnrollCourse(course.id, e)}
                                                                    disabled={enrollingCourseId === course.id || course.is_enrolled}
                                                                    style={{ 
                                                                        borderRadius: 8, 
                                                                        fontWeight: 600,
                                                                        backgroundColor: course.is_enrolled ? '#43a047' : '#e53935',
                                                                        opacity: enrollingCourseId === course.id ? 0.7 : 1
                                                                    }}
                                                                >
                                                                    {enrollingCourseId === course.id 
                                                                        ? 'Enrolling...' 
                                                                        : course.is_enrolled 
                                                                            ? 'Enrolled' 
                                                                            : 'Enroll Now'}
                                                                </Button>
                                                            </div>
                                                        </Card>
                                                    </div>
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

export default CoursePage; 