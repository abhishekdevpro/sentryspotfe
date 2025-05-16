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

const FilterJobsBox = () => {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
          "https://api.sentryspot.co.uk/api/jobseeker/job-list"
        );
        setJobs(response.data.data); // Adjusted to point to the 'data' array in the response
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchJobs();
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
    dots: false, // Hide navigation dots
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 4, // Show 4 jobs at a time
    slidesToScroll: 4, // Scroll 4 jobs per click
    nextArrow: <NextArrow />, // Custom Next button
    prevArrow: <PrevArrow />, // Custom Prev button
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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

  return (
    <>
      <div>
        <div className="">
          {/* <div className="container">
            <div className="HomeBannerContent">
              <div className="BannerContent">
                <h2>One Stop AI Enabled Career Portal</h2>
                <h1>Your Career Journey Starts at SentrySpot</h1>
                <p>
                  Your AI-powered gateway to a successful career in security
                  services. Start your journey with smart tools for job
                  searching, resume building, and more.
                </p>
                <div className="BannerBtn">
                  <Link to={"/sentry-spot"}>
                    <button type="button">Get Started Now</button>
                  </Link>
                </div>
              </div>
              <div className="HomeHeroMedia">
                <div className="HomeSlider">
                  <div className="HeroSliderone">
                    <img src="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=" alt="Slide 1" />
                    <div className="BannerText">
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-medal" />
                        <span>
                          <h2>
                            <strong>Resume Build</strong> for Security Services
                          </h2>
                        </span>
                      </div>
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-compass" />
                        <span>
                          <h2>Upgraded Job opportunity</h2>
                        </span>
                      </div>
                      <div className="BannerTextDowe">
                        <h2>Job seeker</h2>
                      </div>
                    </div>
                  </div>
                  <div className="HeroSliderone">
                    <img src={home2} alt="Slide 2" />
                    <div className="BannerText">
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-medal" />
                        <span>
                          <h2>
                            <strong>Enrolled course</strong> for IT
                          </h2>
                        </span>
                      </div>
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-compass" />
                        <span>
                          <h2>Secured Job in IT</h2>
                        </span>
                      </div>
                      <div className="BannerTextDowe">
                        <h2>Job seeker</h2>
                      </div>
                    </div>
                  </div>
                  <div className="HeroSliderone">
                    <img src={home3} alt="Slide 3" />
                    <div className="BannerText">
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-medal" />
                        <span>
                          <h2>
                            <strong>Managed documentation</strong> in Sentry ID
                          </h2>
                        </span>
                      </div>
                      <div className="BannerTextUpper">
                        <i className="fa-solid fa-compass" />
                        <span>
                          <h2>Multiple Job opportunity</h2>
                        </span>
                      </div>
                      <div className="BannerTextDowe">
                        <h2>Verified Job seeker</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="NavigationBtn">
                  <div className="NavPre" onClick={() => plusSlides(-1)}>
                    <i className="fa-solid fa-chevron-left" />
                  </div>
                  <div className="NavNext" onClick={() => plusSlides(1)}>
                    <i className="fa-solid fa-chevron-right" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <HomeBanner />
        </div>
        <div className="ServiceCard">
          <div className="container">
            <div className="CardTop">
              <p className="font-extrabold">
                How We Spot Career Growth For You
              </p>
              <h2>AI-Powered Tools to Enhance Your Job Search</h2>
            </div>
            <div className="ProgramCards owl-carousel owl-theme">
              <a href="/skilltest" f>
                <div className="program-card tomato ">
                  <i className="fa-solid fa-forward" />
                  <div className="program-card-info">
                    <div className="heading-md">AI Skill Test</div>
                    <button className="button-tertiary tomato">
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
        <div className="FAQs">
          <div className="container">
            <div className="FaqBox">
              <div className="FaqImage">
                <img src={faqimge} />
              </div>
              <div className="FaqText">
                <p className="font-extrabold">SentrySpot Community</p>
                <h2>
                  Join community to gain the support and resources you need for
                  a smooth transition to a better career.
                </h2>
                <details className="rounded-3xl">
                  <summary>What is SentrySpot Community?</summary>
                  <div className="content text-white">
                    <p>
                      The SentrySpot Community is an online platform where job
                      seekers can connect, learn new skills, and receive
                      guidance to advance their careers in the security services
                      industry.
                    </p>
                  </div>
                </details>
                <details className="rounded-3xl">
                  <summary>Is it free to use?</summary>
                  <div className="content">
                    <p>
                      Yes, the SentrySpot Community is free to join and use for
                      job seekers looking to enhance their skills and career
                      opportunities.
                    </p>
                  </div>
                </details>
                <details className="rounded-3xl">
                  <summary>How is this platform different?</summary>
                  <div className="content">
                    <p>
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
                    {" "}
                    <button type="button">Signup to view our community</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Help">
          <div className="container">
            <div className="StatsBox">
              <div className="HelpBox">
                <div className="HelpText ">
                  <p>Verified Job Listings</p>
                  <h2>Creating Impact Every Step of the Way</h2>
                  <div className="StatsBtn">
                    <Link to={"/job-list-v3"}>
                      <button type="button">View All Jobs</button>
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
                      className="flex-shrink-0 w-full md:w-1/4 p-2"
                    >
                      <div className="relative bg-blue-900 shadow-md rounded-lg p-4 flex flex-col">
                        <div className="absolute top-3 left-3 flex flex-col space-y-1">
                          <span className="bg-green-200 text-green-800 text-xs font-medium px-2 py-1 rounded-md">
                            Private
                          </span>

                          <span className="bg-yellow-200 text-yellow-800 text-xs font-medium px-2 py-1 rounded-md">
                            Urgent
                          </span>
                        </div>
                        <span className="absolute top-3 right-3  text-white text-xs font-medium px-2 py-1 rounded-md">
                          Full Time
                        </span>

                        <i className="fa-brands fa-dropbox text-white text-6xl mb-2"></i>
                        <Link to={`/job-single-v1/${job.id}`}>
                          <h2 className="text-xl font-semibold text-white">
                            {job.job_title || "Job Title"}
                          </h2>
                          <div className="Location text-white mb-4 mt-4">
                            <i className="fa-solid fa-location-dot text-white mr-2"></i>
                            {job.city
                              ? `${job.city}, ${job.country}`
                              : "Location Not Available"}
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
                        <div className="flex justify-center flex-wrap gap-2 mt-2">
                          {extraCategories > 0 && (
                            <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                              +{extraCategories}
                            </span>
                          )}
                        </div>
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
        <div className="Blog">
          <div className="container">
            <div className="BlogHeading">
              Career Guidance by SentrySpot Editorial
            </div>
            <div className="BlogsCards">
              <a href="https://blog.sentryspot.co.uk/2024/08/31/key-features-to-look-for-in-an-ai-resume-builder/">
                <div className="BlogBoxs">
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
              <a href="https://blog.sentryspot.co.uk/2024/08/29/ai-and-bias-in-hiring-exploring-how-ai-can-perpetuate-or-reduce-bias-in-the-hiring-process/">
                <div className="BlogBoxs">
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
              <a href="https://blog.sentryspot.co.uk">
                <div className="BlogBoxs">
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
            <div className="BlogBtn">
              <Link to={"https://blog.sentryspot.co.uk/"}>
                <button type="button">Visit our Blog Section</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="Talk">
          <div className="container">
            <div className="Talkbox">
              <div className="TalkInfo">
                <h2>Interested in Becoming a SentrySpot Partner?</h2>
                <div className="TalkBox mt-5">
                  <a href="mailto:Partners@sentryspot.co.uk" className="mt-5">
                    Lets Talk
                  </a>
                </div>
              </div>
              <img src="	https://htmlsentryspot.vercel.app/img/Partner-CTA-block.webp" />
            </div>
          </div>
        </div>
        <div className="FooterSection">
          <div className="container">
            <div className="FooterCTA">
              <div className="CtaInfo ">
                <span>
                  <i className="fa-solid fa-angles-right" />{" "}
                  <h3>Explore Top Careers, Training, and Jobs</h3>
                </span>
                <div className="Footerbtn mt-3">
                  <Link to={"/sentry-spot"}>
                    {" "}
                    <button type="button">Start Your Journey</button>
                  </Link>
                </div>
              </div>
              <div className="NewsletterConatiner ms-5">
                <h3>Get Monthly Newsletters and Career Resources</h3>
                <div className="LetterForm">
                  <form
                    method
                    style={{ width: "100%" }}
                    onSubmit={handleSubmit}
                  >
                    <div className="From_Section">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update the email state
                        required
                      />
                      <div className="FormBTn">
                        <button type="submit"> Submit</button>
                      </div>
                    </div>
                  </form>

                  <p>
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
