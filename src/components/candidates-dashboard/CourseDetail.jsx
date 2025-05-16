import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant.js';
import DashboardCandidatesHeader from '../header/DashboardCandidatesHeader';
import CopyrightFooter from '../dashboard-pages/CopyrightFooter';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [myCourses, setMyCourses] = useState([]);
  const [myCoursesLoading, setMyCoursesLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleSaveCourse = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem(Constant.USER_TOKEN);
      await axios.post('https://api.sentryspot.co.uk/api/jobseeker/save-course', 
        { course_id: Number(id) },
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        }
      );
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Failed to save course:', err);
    } finally {
      setSaving(false);
    }
  };

  // Common styles
  const styles = {
    container: {
      background: '#f7f7f7',
      minHeight: '100vh'
    },
    contentWrapper: {
      maxWidth: 1400,
      margin: '40px auto',
      padding: 24
    },
    topSection: {
      display: 'flex',
      gap: 32,
      background: '#393939',
      borderRadius: 16,
      color: '#fff',
      padding: 40,
      alignItems: 'flex-start'
    },
    instructorInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 16
    },
    instructorImage: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      border: '2px solid #fff',
      background: '#fff'
    },
    instructorName: {
      fontWeight: 700,
      fontSize: 22
    },
    instructorTitle: {
      fontSize: 16
    },
    rating: {
      color: '#FFD600',
      fontSize: 20
    },
    ratingCount: {
      color: '#FFD600',
      fontWeight: 600,
      marginLeft: 8
    },
    eligibilityBadge: {
      background: '#FFC94D',
      color: '#393939',
      borderRadius: 20,
      padding: '6px 24px',
      fontWeight: 600,
      fontSize: 18
    },
    courseTitle: {
      fontSize: 32,
      fontWeight: 700,
      margin: '16px 0 12px 0'
    },
    sectionTitle: {
      fontSize: 26,
      fontWeight: 700,
      margin: '16px 0 8px 0',
      color: '#fff'
    },
    description: {
      fontSize: 18,
      color: '#fff',
      marginBottom: 12,
      maxWidth: 800
    },
    readMore: {
      color: '#4da6ff',
      fontWeight: 500,
      fontSize: 18
    },
    courseStats: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      marginTop: 18,
      fontSize: 18
    },
    rightCard: {
      flex: 1,
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: 24,
      color: '#222',
      minWidth: 340,
      maxWidth: 400,
      textAlign: 'center'
    },
    courseImage: {
      width: '100%',
      borderRadius: 12,
      marginBottom: 16
    },
    buttonGroup: {
      display: 'flex',
      gap: 8,
      marginBottom: 16
    },
    button: {
      flex: 1,
      borderRadius: 8,
      padding: '8px 16px',
      border: '1px solid #ccc',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all 0.2s ease'
    },
    buttonPrimary: {
      width: '100%',
      borderRadius: 8,
      background: '#43a047',
      color: '#fff',
      fontWeight: 700,
      fontSize: 18,
      padding: '12px 24px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    buttonSecondary: {
      flex: 1,
      borderRadius: 8,
      background: '#1a237e',
      color: '#fff',
      padding: '8px 16px',
      border: 'none',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all 0.2s ease'
    },
    courseContent: {
      marginTop: 40,
      background: '#fff',
      borderRadius: 16,
      padding: 32
    },
    contentTitle: {
      fontSize: 28,
      fontWeight: 700,
      marginBottom: 24
    },
    accordion: {
      marginBottom: 16,
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #eee',
      borderRadius: 8,
      overflow: 'hidden'
    },
    accordionSummary: {
      background: '#f8f9fa',
      padding: '16px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      userSelect: 'none'
    },
    accordionDetails: {
      padding: '16px',
      background: '#fff'
    },
    expandIcon: {
      width: 24,
      height: 24,
      transition: 'transform 0.2s ease',
      transform: 'rotate(0deg)'
    },
    expandIconExpanded: {
      transform: 'rotate(180deg)'
    },
    lectureContainer: {
      padding: '0 16px'
    },
    lectureItem: {
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    },
    lectureNumber: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 12,
      fontWeight: 600
    },
    lectureInfo: {
      flex: 1
    },
    lectureName: {
      fontWeight: 500,
      fontSize: 16,
      marginBottom: 4
    },
    lectureType: {
      fontSize: 14,
      color: '#666'
    },
    completed: {
      color: '#43a047',
      fontSize: 14
    },
    myCoursesContainer: {
      marginTop: 16,
      borderTop: '1px solid #eee',
      paddingTop: 16
    },
    myCoursesTitle: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 12,
      color: '#333'
    },
    myCoursesList: {
      maxHeight: 200,
      overflowY: 'auto'
    },
    myCourseItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '8px 0',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    myCourseItemHover: {
      backgroundColor: '#f5f5f5'
    },
    myCourseImage: {
      width: 40,
      height: 40,
      borderRadius: 4,
      marginRight: 12,
      objectFit: 'cover'
    },
    myCourseInfo: {
      flex: 1
    },
    myCourseName: {
      fontSize: 14,
      fontWeight: 500,
      color: '#333',
      marginBottom: 2
    },
    myCourseProgress: {
      fontSize: 12,
      color: '#666'
    },
    progressBar: {
      height: 4,
      background: '#e0e0e0',
      borderRadius: 2,
      marginTop: 4
    },
    progressFill: {
      height: '100%',
      background: '#43a047',
      borderRadius: 2
    },
    saveButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      flex: 1,
      borderRadius: 8,
      padding: '8px 16px',
      border: '1px solid #ccc',
      background: '#fff',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 500,
      transition: 'all 0.2s ease',
      color: isSaved ? '#e91e63' : '#666'
    },
    heartIcon: {
      fontSize: 20,
      transition: 'transform 0.2s ease'
    },
    heartIconActive: {
      transform: 'scale(1.2)'
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem(Constant.USER_TOKEN);
        const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/mycourse-details/${id}`, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
        if (response.data?.data) {
          setCourse(response.data.data);
        } else {
          setCourse(null);
        }
      } catch (err) {
        setError('Failed to load course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  useEffect(() => {
    const fetchMyCourses = async () => {
      try {
        setMyCoursesLoading(true);
        const token = localStorage.getItem(Constant.USER_TOKEN);
        const response = await axios.get('https://api.sentryspot.co.uk/api/jobseeker/mycourse-lists', {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
        });
        if (response.data?.data) {
          setMyCourses(response.data.data);
        }
      } catch (err) {
        console.error('Failed to load my courses:', err);
      } finally {
        setMyCoursesLoading(false);
      }
    };
    fetchMyCourses();
  }, []);

  if (loading) return <div style={{ padding: 32, textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: 32, color: 'red', textAlign: 'center' }}>{error}</div>;
  if (!course) return <div style={{ padding: 32, textAlign: 'center' }}>Course not found.</div>;

  return (
    <div style={styles.container}>
      <DashboardCandidatesHeader />
      <div style={styles.contentWrapper}>
        {/* Top Section */}
        <div style={styles.topSection}>
          {/* Left: Info */}
          <div style={{ flex: 2 }}>
            <div style={styles.instructorInfo}>
              <img
                src={course.instructor_image || "https://statinfer.com/wp-content/uploads/dummy-user.png"}
                alt="Instructor"
                style={styles.instructorImage}
              />
              <div>
                <div style={styles.instructorName}>{course.instructor_name || "Trained Professional"}</div>
                <div style={styles.instructorTitle}>{course.instructor_title || "Instructor"}</div>
                <div style={{ marginTop: 4 }}>
                  {Array.from({ length: course.rating || 5 }).map((_, i) => (
                    <span key={i} style={styles.rating}>★</span>
                  ))}
                  <span style={styles.ratingCount}>({course.rating_count || 0})</span>
                </div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <span style={styles.eligibilityBadge}>{course.eligibility || "Any Graduate"}</span>
              </div>
            </div>
            <div style={styles.courseTitle}>{course.course_title}</div>
            <div style={styles.sectionTitle}>Description:</div>
            <div style={styles.description}>{course.description}</div>
            <div>
              <a href="#" style={styles.readMore}>Read More</a>
            </div>
            <div style={styles.courseStats}>
              <span>📚 {course.total_lectures || 0}</span>
              <span>⏰ {course.duration || 0} hrs</span>
              <span>👥 {course.total_students || 0} students enrolled</span>
              <span>⚫ {course.eligibility || "Any Graduate"}</span>
            </div>
          </div>
          {/* Right: Card */}
          <div style={styles.rightCard}>
            <img
              src={course.course_image || "https://api.sentryspot.co.uk/courses/assets/images/course_default.jpg"}
              alt="Course"
              style={styles.courseImage}
            />
            <div style={styles.buttonGroup}>
              <button 
                style={styles.saveButton}
                onClick={handleSaveCourse}
                disabled={saving}
              >
                <span 
                  style={{
                    ...styles.heartIcon,
                    ...(isSaved ? styles.heartIconActive : {})
                  }}
                >
                  {isSaved ? '❤️' : '🤍'}
                </span>
                {saving ? 'Saving...' : (isSaved ? 'Saved' : 'Save Course')}
              </button>
              <button style={styles.buttonSecondary}>Share</button>
            </div>
            <button style={styles.buttonPrimary}>
              Enroll Now
            </button>

            {/* My Courses Section */}
            <div style={styles.myCoursesContainer}>
              <div style={styles.myCoursesTitle}>My Courses</div>
              {myCoursesLoading ? (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>Loading...</div>
              ) : (
                <div style={styles.myCoursesList}>
                  {myCourses.map((myCourse) => (
                    <div
                      key={myCourse.id}
                      style={styles.myCourseItem}
                      onClick={() => navigate(`/course/${myCourse.id}`)}
                    >
                      <img
                        src={myCourse.course_image || "https://api.sentryspot.co.uk/courses/assets/images/course_default.jpg"}
                        alt={myCourse.course_title}
                        style={styles.myCourseImage}
                      />
                      <div style={styles.myCourseInfo}>
                        <div style={styles.myCourseName}>{myCourse.course_title}</div>
                        <div style={styles.myCourseProgress}>
                          {myCourse.progress || 0}% Complete
                        </div>
                        <div style={styles.progressBar}>
                          <div
                            style={{
                              ...styles.progressFill,
                              width: `${myCourse.progress || 0}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        <div style={styles.courseContent}>
          <div style={styles.contentTitle}>Course Content</div>
          {course.section_response?.map((section, index) => (
            <div key={section.id} style={styles.accordion}>
              <div 
                style={styles.accordionSummary}
                onClick={() => toggleSection(section.id)}
              >
                <div >
                  Section {index + 1}: {section.section_name}
                </div>
                <div style={{
                  ...styles.expandIcon,
                  ...(expandedSections[section.id] ? styles.expandIconExpanded : {})
                }}>
                  ▼
                </div>
              </div>
              {expandedSections[section.id] && (
                <div style={styles.accordionDetails}>
                  <div style={styles.lectureContainer}>
                    {section.lectures?.map((lecture, lectureIndex) => (
                      <div
                        key={lecture.id}
                        style={{
                          ...styles.lectureItem,
                          borderBottom: lectureIndex !== section.lectures.length - 1 ? '1px solid #eee' : 'none'
                        }}
                      >
                        <div style={{ 
                          ...styles.lectureNumber,
                          background: lecture.content_viewed ? '#43a047' : '#e0e0e0'
                        }}>
                          {lectureIndex + 1}
                        </div>
                        <div style={styles.lectureInfo}>
                          <div style={styles.lectureName}>
                            {lecture.lecture_name}
                          </div>
                          <div style={styles.lectureType}>
                            {lecture.content_type || 'Text Content'}
                          </div>
                        </div>
                        {lecture.content_viewed && (
                          <div style={styles.completed}>
                            ✓ Completed
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <CopyrightFooter />
    </div>
  );
};

export default CourseDetail; 