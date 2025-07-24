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
import ServiceProgramCards from "./ServiceProgramCards";

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
          setEmail("")
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
    setHoveredElements((prev) => ({
      ...prev,
      [elementId]: true,
    }));
  };

  const handleMouseLeave = (elementId) => {
    setHoveredElements((prev) => ({
      ...prev,
      [elementId]: false,
    }));
  };

  return (
    <>
      <div>
        <div className="">
          <HomeBanner />
        </div>

        <ServiceProgramCards
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          hoveredElements={hoveredElements}
        />
        {/* join community section */}
        <div className="FAQs py-8 sm:py-10">
          <div className="container">
            <div className="FaqBox ">
              <div className="FaqImage ">
                <img src={faqimge} className="w-full h-auto rounded-lg" />
              </div>
              <div className="FaqText ">
                <p className="">
                  SentrySpot Community
                </p>
                <h2 className="">
                  Join community to gain the support and resources you need for
                  a smooth transition to a better career.
                </h2>
                <details
                  className="rounded-3xl"
                  style={{
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    ":hover": {
                      borderColor: "#003479",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    },
                  }}
                >
                  <summary
                    style={{
                      padding: "1.25rem 1.5rem",
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                      position: "relative",
                      listStyle: "none",
                      border: "none",
                      fontSize: "1.125rem",
                      transition: "all 0.3s ease",
                      ":hover": {
                        backgroundColor: "#e8e8e8",
                      },
                    }}
                  >
                    What is SentrySpot Community?
                  </summary>
                  <div
                    className="content text-white"
                    style={{
                      backgroundColor: "#003479",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#ffffff",
                        padding: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      The SentrySpot Community is an online platform where job
                      seekers can connect, learn new skills, and receive
                      guidance to advance their careers in the security services
                      industry.
                    </p>
                  </div>
                </details>
                <details
                  className="rounded-3xl"
                  style={{
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <summary
                    style={{
                      padding: "1.25rem 1.5rem",
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                      position: "relative",
                      listStyle: "none",
                      border: "none",
                      fontSize: "1.125rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Is it free to use?
                  </summary>
                  <div
                    className="content"
                    style={{
                      backgroundColor: "#003479",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#ffffff",
                        padding: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      Yes, the SentrySpot Community is free to join and use for
                      job seekers looking to enhance their skills and career
                      opportunities.
                    </p>
                  </div>
                </details>
                <details
                  className="rounded-3xl"
                  style={{
                    marginBottom: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <summary
                    style={{
                      padding: "1.25rem 1.5rem",
                      backgroundColor: "#f0f0f0",
                      cursor: "pointer",
                      position: "relative",
                      listStyle: "none",
                      border: "none",
                      fontSize: "1.125rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    How is this platform different?
                  </summary>
                  <div
                    className="content"
                    style={{
                      backgroundColor: "#003479",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#ffffff",
                        padding: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      SentrySpot stands out with its AI-driven platform tailored
                      specifically for the security services industry, offering
                      personalized job recommendations, resume-building tools,
                      and a supportive online community to help users advance
                      their careers efficiently.
                    </p>
                  </div>
                </details>
                <div className="FaqBtn">
                  <Link to={"/login"}>
                    <button
                      type="button"
                      onMouseEnter={() => handleMouseEnter("button1")}
                      onMouseLeave={() => handleMouseLeave("button1")}
                      style={{
                        padding: "16px 32px",
                        border: "none",
                        backgroundColor: hoveredElements["button1"]
                          ? "#d1026a"
                          : "#e60278",
                        borderRadius: "12px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#fff",
                        transition: "all 0.3s ease",
                        transform: hoveredElements["button1"]
                          ? "translateY(-2px)"
                          : "none",
                        boxShadow: hoveredElements["button1"]
                          ? "0 4px 12px rgba(230, 2, 120, 0.3)"
                          : "none",
                      }}
                    >
                      Signin to view our community
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* job Slider */}
        <div className="Help ">
          <div className="container ">
            <div className="StatsBox">
              <div className="HelpBox mb-6">
                <div className="HelpText">
                  <p className="">Verified Job Listings</p>
                  <h2 className="mt-2">
                    Creating impact every step of the way
                  </h2>
                  <div className="StatsBtn mt-4">
                    <Link to={"/job-list-v3"}>
                      <button type="button" className="w-full sm:w-auto">
                        View All Jobs
                      </button>
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
                      <div
                        className="relative bg-blue-900 shadow-md rounded-lg p-4 flex flex-col"
                        style={{
                          transition: "all 0.3s ease",
                          borderRadius: "12px",
                          ":hover": {
                            transform: "translateY(-5px)",
                            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                          },
                        }}
                      >
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
        {/* courses section */}
        <div className="TabSection">
          <div className="container">
            <div className="TabHead">
              <p>
                SentrySpot Careers - Training Programs &amp; Certifications
              </p>
              <h2 className="">
                With over 100,000 customers, from individuals to some of the
                most respected global brands
              </h2>
            </div>
            <CoursesTabs />
          </div>
        </div>
        <PricingSection />

        {/* Blog section */}
        <div className="Blog">
          <div className="container">
            <div className="BlogHeading ">
              Career guidance by SentrySpot Editorial
            </div>
            <div className="BlogsCards ">
              <Link
                to="https://blog.sentryspot.co.uk/"
                onMouseEnter={() => handleMouseEnter("blogCard1")}
                onMouseLeave={() => handleMouseLeave("blogCard1")}
                style={{
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  transform: hoveredElements["blogCard1"]
                    ? "translateY(-5px)"
                    : "none",
                }}
              >
                <div
                  className="BlogBoxs"
                  // style={{
                  //   width: "100%",
                  //   backgroundColor: "#fff",
                  //   borderRadius: "12px",
                  //   boxShadow: hoveredElements["blogCard1"]
                  //     ? "0 8px 24px rgba(0, 0, 0, 0.15)"
                  //     : "0px 4px 7px 0px #aeaeaf",
                  //   transition: "all 0.3s ease",
                  //   transform: hoveredElements["blogCard1"]
                  //     ? "translateY(-5px)"
                  //     : "none",
                  // }}
                >
                  <div className="Blogs-Text">
                    <img src="https://blog.sentryspot.co.uk/wp-content/uploads/2024/08/Untitled-design-5.jpg" />
                    <div className="BlogInfoContainer">
                      <div className="Category w-full text-center ">
                        Career Discovery
                      </div>
                      <div className="CardInfo">
                        <div className="Heading">
                          Key Features to Look for in an AI Resume Builder
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to="https://blog.sentryspot.co.uk/"
                onMouseEnter={() => handleMouseEnter("blogCard2")}
                onMouseLeave={() => handleMouseLeave("blogCard2")}
                style={{
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  transform: hoveredElements["blogCard2"]
                    ? "translateY(-5px)"
                    : "none",
                }}
              >
                <div
                  className="BlogBoxs"
                  style={{
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    boxShadow: hoveredElements["blogCard2"]
                      ? "0 8px 24px rgba(0, 0, 0, 0.15)"
                      : "0px 4px 7px 0px #aeaeaf",
                    transition: "all 0.3s ease",
                    transform: hoveredElements["blogCard2"]
                      ? "translateY(-5px)"
                      : "none",
                  }}
                >
                  <div className="Blogs-Text">
                    <img src="https://blog.sentryspot.co.uk/wp-content/uploads/2024/08/Untitled-design-4.jpg" />
                    <div className="BlogInfoContainer">
                      <div className="Category w-full text-center ">
                        Career Discovery
                      </div>
                      <div className="CardInfo">
                        <div className="Heading">
                          Exploring How AI Can Perpetuate or Reduce Bias in the
                          Hiring Process
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to="https://blog.sentryspot.co.uk/"
                onMouseEnter={() => handleMouseEnter("blogCard3")}
                onMouseLeave={() => handleMouseLeave("blogCard3")}
                style={{
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  transform: hoveredElements["blogCard3"]
                    ? "translateY(-5px)"
                    : "none",
                }}
              >
                <div
                  className="BlogBoxs"
                  // style={{
                  //   width: "100%",
                  //   backgroundColor: "#fff",
                  //   borderRadius: "12px",
                  //   boxShadow: hoveredElements["blogCard3"]
                  //     ? "0 8px 24px rgba(0, 0, 0, 0.15)"
                  //     : "0px 4px 7px 0px #aeaeaf",
                  //   transition: "all 0.3s ease",
                  //   transform: hoveredElements["blogCard3"]
                  //     ? "translateY(-5px)"
                  //     : "none",
                  // }}
                >
                  <div className="Blogs-Text">
                    <img src="https://blog.sentryspot.co.uk/wp-content/uploads/2024/08/Untitled-design.jpg" />
                    <div className="BlogInfoContainer">
                      <div className="w-full text-center Category">
                        Career Discovery
                      </div>
                      <div className="CardInfo">
                        <div className="Heading">
                          Most Common Resume Mistakes and How to Avoid Them
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div
              className="BlogBtn"
              // style={{
              //   display: "flex",
              //   justifyContent: "center",
              //   marginTop: "2rem",
              // }}
            >
              <Link
                to={"https://blog.sentryspot.co.uk/"}
                style={{
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  display: "inline-block",
                }}
              >
                <button
                  type="button"
                  onMouseEnter={() => handleMouseEnter("blogButton")}
                  onMouseLeave={() => handleMouseLeave("blogButton")}
                  style={{
                    padding: "12px 32px",
                    backgroundColor: hoveredElements["blogButton"]
                      ? "#003479"
                      : "#0046a8",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform: hoveredElements["blogButton"]
                      ? "translateY(-2px)"
                      : "none",
                    boxShadow: hoveredElements["blogButton"]
                      ? "0 4px 12px rgba(0, 52, 121, 0.2)"
                      : "0 2px 4px rgba(0, 0, 0, 0.1)",
                    minWidth: "200px",
                    maxWidth: "250px",
                  }}
                >
                  Visit our Blog Section
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Talk section */}
        <div className="Talk md:pt-20">
          <div className="container">
            <div className="Talkbox ">
              <div
                className="TalkInfo "
              >
                <h2 className="" style={{}}>
                  Interested in becoming a SentrySpot partner?
                </h2>
                <div className="TalkBox">
                  <button
                    type="button"
                    onClick={() =>
                      (window.location.href =
                        "mailto:Partners@sentryspot.co.uk")
                    }
                    onMouseEnter={() => handleMouseEnter("talkButton")}
                    onMouseLeave={() => handleMouseLeave("talkButton")}
                    style={{
                      textDecoration: "none",
                      padding: "14px 32px",
                      backgroundColor: hoveredElements["talkButton"]
                        ? "#0055cc"
                        : "#0046a8", // lighter hover
                      color: "#ffffff",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      transform: hoveredElements["talkButton"]
                        ? "translateY(-2px)"
                        : "none",
                      boxShadow: hoveredElements["talkButton"]
                        ? "0 4px 12px rgba(0, 52, 121, 0.1)"
                        : "0 2px 4px rgba(0, 0, 0, 0.2)",
                      display: "inline-block",
                      minWidth: "160px",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    Let's Talk
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <img
                  src="https://htmlsentryspot.vercel.app/img/Partner-CTA-block.webp"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="FooterSection py-8 sm:py-10"
          style={{
            backgroundColor: "#003479",
          }}
        >
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="FooterCTA flex flex-col lg:flex-row gap-8">
              <div className="CtaInfo w-full lg:w-1/2 text-center lg:text-left">
                <span className="flex items-center justify-center lg:justify-start mb-4">
                  <i className="fa-solid fa-angles-right text-white" />
                  <h3 className="text-xl sm:text-2xl ml-2 text-white">
                    Explore top careers, training, and jobs
                  </h3>
                </span>
                <div className="Footerbtn mt-4">
                  <Link to={"/sentry-spot"}>
                    <button
                      type="button"
                      onMouseEnter={() => handleMouseEnter("journeyButton")}
                      onMouseLeave={() => handleMouseLeave("journeyButton")}
                      style={{
                        padding: "14px 32px",
                        backgroundColor: hoveredElements["journeyButton"]
                          ? "#0046a8"
                          : "#ffffff",
                        color: hoveredElements["journeyButton"]
                          ? "#ffffff"
                          : "#003479",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "16px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: hoveredElements["journeyButton"]
                          ? "translateY(-2px)"
                          : "none",
                        boxShadow: hoveredElements["journeyButton"]
                          ? "0 4px 12px rgba(0, 52, 121, 0.2)"
                          : "0 2px 4px rgba(0, 0, 0, 0.1)",
                        minWidth: "180px",
                      }}
                    >
                      Start Your Journey
                    </button>
                  </Link>
                </div>
              </div>
              <div className="NewsletterConatiner w-full lg:w-1/2">
                <h3 className="text-xl sm:text-2xl text-center lg:text-left text-white mb-4">
                  Get monthly newsletters and career resources
                </h3>
                <div className="LetterForm mt-4">
                  <form
                    method
                    style={{ width: "100%" }}
                    onSubmit={handleSubmit}
                  >
                    <div className="From_Section flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onMouseEnter={() => handleMouseEnter("emailInput")}
                        onMouseLeave={() => handleMouseLeave("emailInput")}
                        required
                        style={{
                          flex: "1",
                          padding: "14px 16px",
                          background: "#ffffff",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "16px",
                          transition: "all 0.3s ease",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          outline: "none",
                        }}
                      />
                      <div className="FormBTn">
                        <button
                          type="submit"
                          onMouseEnter={() => handleMouseEnter("submitButton")}
                          onMouseLeave={() => handleMouseLeave("submitButton")}
                          style={{
                            padding: "14px 32px",
                            backgroundColor: hoveredElements["submitButton"]
                              ? "#0046a8"
                              : "#ffffff",
                            color: hoveredElements["submitButton"]
                              ? "#ffffff"
                              : "#003479",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            transform: hoveredElements["submitButton"]
                              ? "translateY(-2px)"
                              : "none",
                            boxShadow: hoveredElements["submitButton"]
                              ? "0 4px 12px rgba(0, 52, 121, 0.2)"
                              : "0 2px 4px rgba(0, 0, 0, 0.1)",
                            minWidth: "120px",
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
