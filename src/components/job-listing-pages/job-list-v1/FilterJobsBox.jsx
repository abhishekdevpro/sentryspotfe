import "./style.css";
import blog1 from "./img/blog1.webp";
import faqimge from "./img/faqimge.webp";
import home1 from "./img/home-1.webp";
import home2 from "./img/home-2.webp";
import home3 from "./img/home-3.webp";
import tab1 from "./img/Tab1.webp";
import tab2 from "./img/InnerSlider.webp";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CoursesTabs from "./CoursesTabs";
import toast from "react-hot-toast";
import HomeBanner from "./HomeBanner";
import PricingSection from "@/components/Payments/PricingSection";

const FilterJobsBox = () => {
  const [jobs, setJobs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredElements, setHoveredElements] = useState({});
  const jobsPerSlide = 8; // Number of jobs to display per slide
  const [email, setEmail] = useState("");
  const categories = ["App", "Design", "Digital", "More"];

  const extraCategories = categories.length > 3 ? categories.length - 3 : 0;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form default behavior

    axios
      .post(
        "https://api.sentryspot.co.uk/api/jobseeker/user-subscribe",
        { email }, // Directly send object (no need for JSON.stringify)
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (
          response.data?.status === "success" &&
          response.data?.code === 200
        ) {
          toast.success(response.data.message || "Subscribed successfully!"); // Show toast
        } else {
          toast.error(response.data?.message || "Subscription failed.");
        }
      })
      .catch((error) => {
        console.error("Error subscribing:", error);
        toast.error(error.response?.data?.message || "An error occurred.");
      });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/public/job-list"
        );
        setJobs(response.data.data); // Adjusted to point to the 'data' array in the response
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://api.sentryspot.co.uk/api/jobseeker/all-courses"
        );
        if (response.data?.data?.courseResponse) {
          setCourses(response.data.data.courseResponse);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-full z-10"
      onClick={onClick}
    >
      ❮
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white px-3 py-2 rounded-full z-10"
      onClick={onClick}
    >
      ❯
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // Large screens
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false, // Hide arrows on mobile
        },
      },
    ],
  };
  // Calculate total slides
  const totalSlides = Math.ceil(jobs.length / jobsPerSlide);

  // Function to navigate to the next slide
  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 0) % totalSlides);
  // };
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= totalSlides ? 0 : prevIndex + 1
    );
  };

  // Function to navigate to the previous slide
  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 0 + totalSlides) % totalSlides);
  // };
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? totalSlides - 1 : prevIndex - 1
    );
  };
  // Get the jobs for the current slide
  const currentJobs = jobs.slice(
    currentIndex * jobsPerSlide,
    (currentIndex + 1) * jobsPerSlide
  );

  const handleMouseEnter = (elementId) => {
    setHoveredElements(prev => ({
      ...prev,
      [elementId]: true
    }));
  };

  const handleMouseLeave = (elementId) => {
    setHoveredElements(prev => ({
      ...prev,
      [elementId]: false
    }));
  };

  return (
    <>
      <div>
        <div className="">
        
          <HomeBanner />
        </div>
        <div className="ServiceCard">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="CardTop text-center">
              <p className="font-extrabold text-lg sm:text-xl">
                How we spot career growth for you
              </p>
              <h2 className="text-2xl sm:text-3xl mt-2">AI-powered tools to enhance your job search</h2>
            </div>
            <div className="ProgramCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-8">
              <a 
                href="/skilltest"
                onMouseEnter={() => handleMouseEnter('programCard1')}
                onMouseLeave={() => handleMouseLeave('programCard1')}
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  transform: hoveredElements['programCard1'] ? 'translateY(-5px)' : 'none'
                }}
              >
                <div 
                  className="program-card tomato"
                  style={{
                    width: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '40px 24px',
                    boxShadow: hoveredElements['programCard1'] 
                      ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
                      : '0px 4px 14px #afaeae5c',
                    transition: 'all 0.3s ease',
                    transform: hoveredElements['programCard1'] ? 'translateY(-5px)' : 'none'
                  }}
                >
                  <i className="fa-solid fa-forward" />
                  <div className="program-card-info">
                    <div className="heading-md">AI Skill Test</div>
                    <button className="button-tertiary tomato" style={{
                      fontSize: '16px',
                      color: '#ff6969',
                      backgroundColor: 'transparent',
                      border: 'none',
                      padding: '0',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      ':hover': {
                        transform: 'translateY(-2px)',
                        color: '#ff5252'
                      }
                    }}>
                      Get Started
                    </button>
                  </div>
                </div>
              </a>
              <a href="/buildresume">
                <div className="program-card berry">
                  <i className="fa-solid fa-compass" />
                  <div className="program-card-info">
                    <div className="heading-md">Build Your Resume</div>
                    <button className="button-tertiary berry">
                      Explore Careers
                    </button>
                  </div>
                </div>
              </a>
              <a href="/earnjob" ef>
                <div className="program-card teal">
                  <i className="fa-solid fa-medal" />
                  <div className="program-card-info">
                    <div className="heading-md">Earn Job Skills Quickly</div>
                    <button className="button-tertiary teal">
                      Signup to Begin
                    </button>
                  </div>
                </div>
              </a>
              <a href="/talkto">
                <div className="program-card pear">
                  <i className="fa-solid fa-clipboard-list" />
                  <div className="program-card-info">
                    <div className="heading-md">Talk To Industry Experts</div>
                    <button className="button-tertiary pear">
                      With Community
                    </button>
                  </div>
                </div>
              </a>
              <a href="/sentry-spot" f>
                <div className="program-card marigold">
                  <i className="fa-solid fa-handshake" />
                  <div className="program-card-info">
                    <div className="heading-md">
                      Get Spotted with SentrySpot ID
                    </div>
                    <button className="button-tertiary marigold">
                      Get yours now
                    </button>
                  </div>
                </div>
              </a>
              <a href="/job-list-v7" f>
                <div className="program-card marigold">
                  <i className="fa-solid fa-handshake" />
                  <div className="program-card-info">
                    <div className="heading-md">Verified Jobs</div>
                    <button className="button-tertiary marigold">
                      Check Here
                    </button>
                  </div>
                </div>
              </a>
            </div>
            {/* <div className="NavigationBtn" style="justify-content: center;">
				<div className="NavPre" id="leftButton">
					<i className="fa-solid fa-chevron-left"></i>
				</div>
				<div className="NavNext" id="rightButton">
					<i className="fa-solid fa-chevron-right"></i>
				</div>
			</div> */}
          </div>
        </div>
        <div className="FAQs py-8 sm:py-10">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="FaqBox flex flex-col lg:flex-row gap-6">
              <div className="FaqImage w-full lg:w-1/2">
                <img src={faqimge} className="w-full h-auto rounded-lg" />
              </div>
              <div className="FaqText w-full lg:w-1/2">
                <p className="font-extrabold text-lg sm:text-xl">SentrySpot Community</p>
                <h2 className="text-2xl sm:text-3xl mt-2">
                  Join community to gain the support and resources you need for
                  a smooth transition to a better career.
                </h2>
                <details className="rounded-3xl" style={{
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    borderColor: '#003479',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                  }
                }}>
                  <summary style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                    position: 'relative',
                    listStyle: 'none',
                    border: 'none',
                    fontSize: '1.125rem',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      backgroundColor: '#e8e8e8'
                    }
                  }}>What is SentrySpot Community?</summary>
                  <div className="content text-white" style={{
                    backgroundColor: '#003479',
                    transition: 'all 0.3s ease'
                  }}>
                    <p style={{
                      fontSize: '16px',
                      color: '#ffffff',
                      padding: '1rem',
                      textTransform: 'capitalize'
                    }}>
                      The SentrySpot Community is an online platform where job
                      seekers can connect, learn new skills, and receive
                      guidance to advance their careers in the security services
                      industry.
                    </p>
                  </div>
                </details>
                <details className="rounded-3xl" style={{
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  <summary style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                    position: 'relative',
                    listStyle: 'none',
                    border: 'none',
                    fontSize: '1.125rem',
                    transition: 'all 0.3s ease'
                  }}>Is it free to use?</summary>
                  <div className="content" style={{
                    backgroundColor: '#003479',
                    transition: 'all 0.3s ease'
                  }}>
                    <p style={{
                      fontSize: '16px',
                      color: '#ffffff',
                      padding: '1rem',
                      textTransform: 'capitalize'
                    }}>
                      Yes, the SentrySpot Community is free to join and use for
                      job seekers looking to enhance their skills and career
                      opportunities.
                    </p>
                  </div>
                </details>
                <details className="rounded-3xl" style={{
                  marginBottom: '10px',
                  border: '1px solid #ccc',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}>
                  <summary style={{
                    padding: '1.25rem 1.5rem',
                    backgroundColor: '#f0f0f0',
                    cursor: 'pointer',
                    position: 'relative',
                    listStyle: 'none',
                    border: 'none',
                    fontSize: '1.125rem',
                    transition: 'all 0.3s ease'
                  }}>How is this platform different?</summary>
                  <div className="content" style={{
                    backgroundColor: '#003479',
                    transition: 'all 0.3s ease'
                  }}>
                    <p style={{
                      fontSize: '16px',
                      color: '#ffffff',
                      padding: '1rem',
                      textTransform: 'capitalize'
                    }}>
                      SentrySpot stands out with its AI-driven platform tailored
                      specifically for the security services industry, offering
                      personalized job recommendations, resume-building tools,
                      and a supportive online community to help users advance
                      their careers efficiently.
                    </p>
                  </div>
                </details>
                <div className="FaqBtn">
                  <Link to={"/sentry-spot"}>
                    <button 
                      type="button"
                      onMouseEnter={() => handleMouseEnter('button1')}
                      onMouseLeave={() => handleMouseLeave('button1')}
                      style={{
                        padding: '16px 32px',
                        border: 'none',
                        backgroundColor: hoveredElements['button1'] ? '#d1026a' : '#e60278',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#fff',
                        transition: 'all 0.3s ease',
                        transform: hoveredElements['button1'] ? 'translateY(-2px)' : 'none',
                        boxShadow: hoveredElements['button1'] 
                          ? '0 4px 12px rgba(230, 2, 120, 0.3)' 
                          : 'none'
                      }}
                    >
                      Signup to view our community
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Help py-8 sm:py-10">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="StatsBox">
              <div className="HelpBox mb-6">
                <div className="HelpText text-center sm:text-left">
                  <p className="text-lg sm:text-xl">Verified Job Listings</p>
                  <h2 className="text-2xl sm:text-3xl mt-2">Creating impact every step of the way</h2>
                  <div className="StatsBtn mt-4">
                    <Link to={"/job-list-v3"}>
                      <button type="button" className="w-full sm:w-auto">View All Jobs</button>
                    </Link>
                  </div>
                </div>
                {/* <div className="HelpNavigationBtn">
						<div className="HelpNavPre" id="leftButton">
							<i className="fa-solid fa-chevron-left"></i>
						</div>
						<div className="HelpNavNext" id="rightButton">
							<i className="fa-solid fa-chevron-right"></i>
						</div>
					</div> */}
              </div>

              <div className="relative w-full">
                {/* Slick Slider */}
                <Slider
                  {...settings}
                  className="overflow-hidden shadow-lg rounded-lg"
                >
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="flex-shrink-0 w-full h-96 md:w-1/4 p-2"
                    >
                      <div className="relative bg-blue-900 shadow-md rounded-lg p-4 flex flex-col" style={{
                        transition: 'all 0.3s ease',
                        borderRadius: '12px',
                        ':hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                        }
                      }}>
                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          {/* <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded-md">
                            Private
                          </span> */}

                          {/* <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded-md">
                            Urgent
                          </span> */}
                        </div>
                        <span className="absolute top-3 right-3  text-white text-xs font-medium px-2 py-1 rounded-md">
                          {job?.job_type_name || "Full Time"}
                        </span>

                        <i className="fa-brands fa-dropbox text-white text-6xl mb-2"></i>
                        <Link to={`/job-single-v3/${job.id}`}>
                          <h2 className="text-xl font-semibold text-white">
                            {job.job_title || "Job Title"}
                          </h2>
                          <div className="Location text-white mb-4 mt-4">
                            <i className="fa-solid fa-location-dot text-white mr-2"></i>
                            {job.location
                              ? `${job.location}`
                              : "Location Not Available"}
                          </div>
                          <div className="Location text-white mb-4 mt-4">
                            {/* <i className="fa-solid fa-location-dot text-white mr-2"></i> */}
                            {job.functional_area_name
                              ? `${job.functional_area_name}`
                              : "Functional Area Not Available"}
                          </div>
                        </Link>
                        <div className="Job-Tab flex gap-2 mt-auto">
                          <a
                            href="#"
                            className="bg-gray-200 text-sm px-2 py-1 rounded"
                          >
                            App
                          </a>
                          <a
                            href="#"
                            className="bg-gray-200 text-sm px-2 py-1 rounded"
                          >
                            Design
                          </a>
                          <a
                            href="#"
                            className="bg-gray-200 text-sm px-2 py-1 rounded"
                          >
                            Digital
                          </a>
                        </div>
                        {/* <div className="flex justify-center flex-wrap gap-2 mt-2">
                          {extraCategories > 0 && (
                            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                              +{extraCategories}
                            </span>
                          )}
                        </div> */}
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
        <div className="TabSection">
          <div className="container">
            <div className="TabHead">
              <h2>
                SentrySpot Careers - Training Programs &amp; Certifications
              </h2>
              <p>
                With over 100,000 customers, from individuals to some of the
                most respected global brands
              </p>
            </div>
            <CoursesTabs />
          </div>
        </div>
        <PricingSection />
        {/* <div className="CoursesSection py-8 sm:py-10 bg-gray-50">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Featured Courses</h2>
              <p className="text-gray-600 text-sm sm:text-base">Enhance your skills with our curated selection of courses</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
                  <div className="relative">
                    <img 
                      src={ "https://api.sentryspot.co.uk/courses/assets/images/course_default.jpg"} 
                      alt={course.course_title}
                      className="w-full h-48 object-cover"
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
                        src={course.trainer_photo || "https://via.placeholder.com/40"} 
                        alt={course.trainer_display_name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{course.trainer_display_name}</p>
                        <p className="text-sm text-gray-600">{course.trainer_job_title || "Instructor"}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{course.course_title}</h3>
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-gray-600">{course.rating || 0} ({course.enrolled_jobseeker_count} students)</span>
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
            <div className="text-center mt-12">
              <Link 
                to="/course"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Courses
              </Link>
            </div>
          </div>
        </div> */}
        <div className="Blog py-8 sm:py-10">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="BlogHeading text-2xl sm:text-3xl font-bold text-center mb-6">
              Career guidance by SentrySpot Editorial
            </div>
            <div className="BlogsCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <a 
                href="https://blog.sentryspot.co.uk/2024/08/31/key-features-to-look-for-in-an-ai-resume-builder/"
                onMouseEnter={() => handleMouseEnter('blogCard1')}
                onMouseLeave={() => handleMouseLeave('blogCard1')}
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  transform: hoveredElements['blogCard1'] ? 'translateY(-5px)' : 'none'
                }}
              >
                <div 
                  className="BlogBoxs"
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: hoveredElements['blogCard1'] 
                      ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
                      : '0px 4px 7px 0px #aeaeaf',
                    transition: 'all 0.3s ease',
                    transform: hoveredElements['blogCard1'] ? 'translateY(-5px)' : 'none'
                  }}
                >
                  <div className="Blogs-Text">
                    <img src="https://blog.sentryspot.co.uk/wp-content/uploads/2024/08/Untitled-design-5.jpg" />
                    <div className="BlogInfoContainer">
                      <div className="Category w-full text-center ">Career Discovery</div>
                      <div className="CardInfo">
                        <div className="Heading">
                          Key Features to Look for in an AI Resume Builder
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a 
                href="https://blog.sentryspot.co.uk/2024/08/29/ai-and-bias-in-hiring-exploring-how-ai-can-perpetuate-or-reduce-bias-in-the-hiring-process/"
                onMouseEnter={() => handleMouseEnter('blogCard2')}
                onMouseLeave={() => handleMouseLeave('blogCard2')}
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  transform: hoveredElements['blogCard2'] ? 'translateY(-5px)' : 'none'
                }}
              >
                <div 
                  className="BlogBoxs"
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: hoveredElements['blogCard2'] 
                      ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
                      : '0px 4px 7px 0px #aeaeaf',
                    transition: 'all 0.3s ease',
                    transform: hoveredElements['blogCard2'] ? 'translateY(-5px)' : 'none'
                  }}
                >
                  <div className="Blogs-Text">
                    <img src="https://blog.sentryspot.co.uk/wp-content/uploads/2024/08/Untitled-design-4.jpg" />
                    <div className="BlogInfoContainer">
                      <div className="Category w-full text-center ">Career Discovery</div>
                      <div className="CardInfo">
                        <div className="Heading">
                          Exploring How AI Can Perpetuate or Reduce Bias in the
                          Hiring Process
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a 
                href="https://blog.sentryspot.co.uk"
                onMouseEnter={() => handleMouseEnter('blogCard3')}
                onMouseLeave={() => handleMouseLeave('blogCard3')}
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  transform: hoveredElements['blogCard3'] ? 'translateY(-5px)' : 'none'
                }}
              >
                <div 
                  className="BlogBoxs"
                  style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    boxShadow: hoveredElements['blogCard3'] 
                      ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
                      : '0px 4px 7px 0px #aeaeaf',
                    transition: 'all 0.3s ease',
                    transform: hoveredElements['blogCard3'] ? 'translateY(-5px)' : 'none'
                  }}
                >
                  <div className="Blogs-Text">
                    <img src="https://blog.sentryspot.co.uk/wp-content/uploads/2024/08/Untitled-design.jpg" />
                    <div className="BlogInfoContainer">
                      <div className="w-full text-center Category">Career Discovery</div>
                      <div className="CardInfo">
                        <div className="Heading">
                          Most Common Resume Mistakes and How to Avoid Them
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            <div className="BlogBtn" style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem'
            }}>
              <Link 
                to={"https://blog.sentryspot.co.uk/"} 
                style={{
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
              >
                <button 
                  type="button"
                  onMouseEnter={() => handleMouseEnter('blogButton')}
                  onMouseLeave={() => handleMouseLeave('blogButton')}
                  style={{
                    padding: '12px 32px',
                    backgroundColor: hoveredElements['blogButton'] ? '#003479' : '#0046a8',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: hoveredElements['blogButton'] ? 'translateY(-2px)' : 'none',
                    boxShadow: hoveredElements['blogButton'] 
                      ? '0 4px 12px rgba(0, 52, 121, 0.2)' 
                      : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    minWidth: '200px',
                    maxWidth: '250px'
                  }}
                >
                  Visit our Blog Section
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="Talk">
          <div className="container">
            <div className="Talkbox flex flex-col lg:flex-row items-center gap-6">
              <div className="TalkInfo w-full lg:w-1/2" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{
                 
                }}>Interested in becoming a SentrySpot partner?</h2>
                <div className="TalkBox">
                  <a 
                    href="mailto:Partners@sentryspot.co.uk" 
                    onMouseEnter={() => handleMouseEnter('talkButton')}
                    onMouseLeave={() => handleMouseLeave('talkButton')}
                    style={{
                      textDecoration: 'none',
                      padding: '14px 32px',
                      backgroundColor: hoveredElements['talkButton'] ? '#003479' : '#0046a8',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      transform: hoveredElements['talkButton'] ? 'translateY(-2px)' : 'none',
                      boxShadow: hoveredElements['talkButton'] 
                        ? '0 4px 12px rgba(0, 52, 121, 0.2)' 
                        : '0 2px 4px rgba(0, 0, 0, 0.1)',
                      display: 'inline-block',
                      minWidth: '160px'
                    }}
                  >
                    Lets Talk
                  </a>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <img src="https://htmlsentryspot.vercel.app/img/Partner-CTA-block.webp" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="FooterSection py-8 sm:py-10" style={{
          backgroundColor: '#003479'
        }}>
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="FooterCTA flex flex-col lg:flex-row gap-8">
              <div className="CtaInfo w-full lg:w-1/2 text-center lg:text-left">
                <span className="flex items-center justify-center lg:justify-start mb-4">
                  <i className="fa-solid fa-angles-right text-white" />
                  <h3 className="text-xl sm:text-2xl ml-2 text-white">Explore top careers, training, and jobs</h3>
                </span>
                <div className="Footerbtn mt-4">
                  <Link to={"/sentry-spot"}>
                    <button 
                      type="button" 
                      onMouseEnter={() => handleMouseEnter('journeyButton')}
                      onMouseLeave={() => handleMouseLeave('journeyButton')}
                      style={{
                        padding: '14px 32px',
                        backgroundColor: hoveredElements['journeyButton'] ? '#0046a8' : '#ffffff',
                        color: hoveredElements['journeyButton'] ? '#ffffff' : '#003479',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        transform: hoveredElements['journeyButton'] ? 'translateY(-2px)' : 'none',
                        boxShadow: hoveredElements['journeyButton'] 
                          ? '0 4px 12px rgba(0, 52, 121, 0.2)' 
                          : '0 2px 4px rgba(0, 0, 0, 0.1)',
                        minWidth: '180px'
                      }}
                    >
                      Start Your Journey
                    </button>
                  </Link>
                </div>
              </div>
              <div className="NewsletterConatiner w-full lg:w-1/2">
                <h3 className="text-xl sm:text-2xl text-center lg:text-left text-white mb-4">Get monthly newsletters and career resources</h3>
                <div className="LetterForm mt-4">
                  <form method style={{ width: "100%" }} onSubmit={handleSubmit}>
                    <div className="From_Section flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onMouseEnter={() => handleMouseEnter('emailInput')}
                        onMouseLeave={() => handleMouseLeave('emailInput')}
                        required
                        style={{
                          flex: '1',
                          padding: '14px 16px',
                          background: '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '16px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                          outline: 'none'
                        }}
                      />
                      <div className="FormBTn">
                        <button 
                          type="submit" 
                          onMouseEnter={() => handleMouseEnter('submitButton')}
                          onMouseLeave={() => handleMouseLeave('submitButton')}
                          style={{
                            padding: '14px 32px',
                            backgroundColor: hoveredElements['submitButton'] ? '#0046a8' : '#ffffff',
                            color: hoveredElements['submitButton'] ? '#ffffff' : '#003479',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            transform: hoveredElements['submitButton'] ? 'translateY(-2px)' : 'none',
                            boxShadow: hoveredElements['submitButton'] 
                              ? '0 4px 12px rgba(0, 52, 121, 0.2)' 
                              : '0 2px 4px rgba(0, 0, 0, 0.1)',
                            minWidth: '120px'
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="mt-4 text-sm text-white text-center lg:text-left">
                    By entering your email, you agree to our privacy policy and
                    consent to receiving marketing emails from SkillUp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterJobsBox;
