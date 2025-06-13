import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant.js';
import DashboardCandidatesHeader from '../header/DashboardCandidatesHeader';
import CopyrightFooter from '../dashboard-pages/CopyrightFooter';
import { ChevronDown, FileText, PlayCircle, Heart, Share2, CheckCircle, Video, Download, KeyRound, Smartphone, ClipboardList } from 'lucide-react';

const includesList = [
  { icon: <Video className="w-5 h-5 text-pink-500" />, label: 'On-demand video' },
  { icon: <Download className="w-5 h-5 text-pink-500" />, label: 'Downloadable resources' },
  { icon: <KeyRound className="w-5 h-5 text-pink-500" />, label: 'Full access' },
  { icon: <Smartphone className="w-5 h-5 text-pink-500" />, label: 'Access on mobile screen' },
  { icon: <ClipboardList className="w-5 h-5 text-pink-500" />, label: 'Assignments' },
  { icon: <CheckCircle className="w-5 h-5 text-pink-500" />, label: 'Certificate of Completion' },
];

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(Constant.USER_TOKEN);
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleSaveCourse = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem(Constant.USER_TOKEN);
      await axios.post('https://api.sentryspot.co.uk/api/jobseeker/save-course', 
        { course_id: Number(id) },
        { headers: { 'Authorization': token, 'Content-Type': 'application/json' } }
      );
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Failed to save course:', err);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem(Constant.USER_TOKEN);
        const response = await axios.get(`https://api.sentryspot.co.uk/api/jobseeker/mycourse-details/${id}`, {
          headers: { 'Authorization': token, 'Content-Type': 'application/json' },
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

  if (loading) return <div style={{ padding: 32, textAlign: 'center' }}>Loading...</div>;
  if (error) return <div style={{ padding: 32, color: 'red', textAlign: 'center' }}>{error}</div>;
  if (!course) return <div style={{ padding: 32, textAlign: 'center' }}>Course not found.</div>;

  // Placeholder data for trainer, rating, students, hours, image, level
  const trainer = {
    name: 'Nova Homecare',
    title: 'Homecare trainer',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    ratingCount: 5,
  };
  const courseImage = 'https://images.pexels.com/photos/3997986/pexels-photo-3997986.jpeg?auto=compress&w=400';
  const students = 9;
  const hours = 40;
  const lectures = course.section_response.reduce((acc, s) => acc + (s.lectures?.length || 0), 0);
  const level = 'Under Graduates';

  // Description Read More logic
  const desc = 'This course provides a comprehensive understanding of homecare essentials, including elder care, babysitting, pet care, and non-medical support. It equips learners with the skills needed to ensure safety, hygiene, and emotional well-being for individuals and pets under their care. The course is designed to be affordable, flexible, and practical, making it ideal for both personal and professional caregivers.';
  const showReadMore = (course.description || desc).length > 220;
  const descToShow = showFullDesc ? (course.description || desc) : (course.description || desc).slice(0, 220) + (showReadMore ? '...' : '');

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardCandidatesHeader />
      {/* Main Content Container */}
      <div className="flex-1 w-full mt-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="w-full rounded-b-2xl px-0 py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-0 mt-4 bg-white">
            <div className="flex-1 px-0 md:px-8 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img src={trainer.avatar} alt={trainer.name} className="w-16 h-16 rounded-full border-2 border-white object-cover" />
                <div>
                  <div className="font-bold text-lg text-gray-900">{trainer.name}</div>
                  <div className="text-gray-500 text-sm">{trainer.title}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: trainer.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-base">★</span>
                    ))}
                    <span className="ml-2 text-yellow-400 font-semibold">({trainer.ratingCount})</span>
                  </div>
                </div>
                <span className="ml-4 px-4 py-1 rounded-full bg-yellow-300 text-gray-900 font-semibold text-sm">{level}</span>
              </div>
              <div className="mt-2">
                <div className="text-3xl font-bold text-gray-900 mb-2">{course.course_title}</div>
                <div className="text-gray-900 font-semibold mb-1">Description:</div>
                <div className="text-gray-700 text-base mb-2">
                  {descToShow}
                  {showReadMore && (
                    <span className="ml-2 text-blue-600 cursor-pointer font-medium" onClick={() => setShowFullDesc(v => !v)}>
                      {showFullDesc ? 'Show Less' : 'Read More'}
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-6 mt-2 text-pink-700 text-base">
                  <span className="flex items-center gap-1"><FileText className="w-5 h-5 mr-1" />{lectures}</span>
                  <span className="flex items-center gap-1"><Video className="w-5 h-5 mr-1" />{hours} hours</span>
                  <span className="flex items-center gap-1"><span className="text-lg">👥</span>{students} students enrolled</span>
                  <span className="flex items-center gap-1"><span className="text-lg">🎓</span>{level}</span>
                </div>
              </div>
            </div>
            {/* Sidebar Card */}
            <div className="w-full md:w-[350px] flex-shrink-0 px-0 md:px-8">
              <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center">
                <div className="relative w-full h-44 mb-4">
                  <img src={courseImage} alt="Course" className="w-full h-full object-cover rounded-lg" />
                  <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 text-white/90 drop-shadow-lg" />
                </div>
                <div className="flex w-full gap-2 mb-4">
                  <button onClick={handleSaveCourse} disabled={saving} className={`flex-1 flex items-center justify-center gap-2 border rounded-md py-2 font-medium ${isSaved ? 'border-pink-500 text-pink-600' : 'border-gray-300 text-gray-700'} transition-colors`}>
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`} />
                    {isSaved ? 'Wishlisted' : 'Add to Wishlist'}
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 border rounded-md py-2 font-medium border-blue-900 text-blue-900 transition-colors">
                    <Share2 className="w-5 h-5" />Share
                  </button>
                </div>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md text-lg transition-colors mb-2">Enroll Now</button>
              </div>
              {/* Includes */}
              <div className="bg-white rounded-xl shadow-lg p-4 mt-4">
                <div className="font-semibold text-gray-900 mb-3">Includes</div>
                <ul className="space-y-2">
                  {includesList.map((inc, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-base">
                      {inc.icon}
                      {inc.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Course Content */}
          <div className="max-w-5xl mx-auto mt-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-bold text-gray-900">Course Content</div>
                <div className="text-gray-500 font-medium">{course.section_response.length} Sections</div>
              </div>
              <div className="divide-y divide-gray-200">
                {course.section_response.map((section, sectionIndex) => (
                  <div key={section.id}>
                    <button
                      className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span className="font-semibold text-lg text-gray-900">{section.section_name}</span>
                      <ChevronDown className={`w-6 h-6 text-gray-400 transition-transform ${expandedSections[section.id] ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedSections[section.id] && (
                      <div className="pl-4 pb-4">
                        {section.lectures.map((lecture, lectureIndex) => (
                          <div key={lecture.id} className="mb-4">
                            <div className="font-medium text-gray-800 mb-1">{lecture.lecture_name}</div>
                            <div className="prose prose-sm max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: lecture.lecture_content }} />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CopyrightFooter />
    </div>
  );
};

export default CourseDetail; 