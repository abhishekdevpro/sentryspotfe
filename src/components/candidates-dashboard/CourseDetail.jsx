import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant.js';
import DashboardCandidatesHeader from '../header/DashboardCandidatesHeader';
import CopyrightFooter from '../dashboard-pages/CopyrightFooter';
import { ChevronDown, FileText } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              <p className="text-gray-600 mb-6">{course.description}</p>
              
              {/* Course Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Course Progress</span>
                  <span className="text-sm text-gray-500">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              {/* Lectures List */}
              <div className="space-y-4">
                {course.lectures.map((lecture, index) => (
                  <div 
                    key={lecture.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-base font-medium text-gray-900">{lecture.title}</h3>
                          <p className="text-sm text-gray-500">{lecture.duration} minutes</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-500">
                        <ChevronDown className={`w-5 h-5 transform transition-transform ${expandedSections[index] ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    
                    {expandedSections[index] && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="prose prose-sm max-w-none">
                          {lecture.content}
                        </div>
                        {lecture.resources && lecture.resources.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Resources</h4>
                            <ul className="space-y-2">
                              {lecture.resources.map((resource, idx) => (
                                <li key={idx}>
                                  <a 
                                    href={resource.url}
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FileText className="w-4 h-4 mr-2" />
                                    {resource.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Courses</h2>
              <div className="space-y-4">
                {myCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <img 
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {course.title}
                      </h3>
                      <div className="mt-1">
                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                              <div 
                                className="bg-green-600 h-1.5 rounded-full"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 