import React, { useState } from "react";
import { Link } from "react-router-dom";
import home2 from "./img/home-2.webp";
import home1 from "./img/home-1.webp";
import home3 from "./img/home-3.webp";

const HomeBanner = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      image: home1,
      heading1: "Resume Build for Security Services",
      heading2: "Upgraded Job opportunity",
      heading3: "Job seeker",
    },
    {
      image: home2,
      heading1: "Enrolled course for IT",
      heading2: "Secured Job in IT",
      heading3: "Job seeker",
    },
    {
      image: home3,
      heading1: "Managed documentation in Sentry ID",
      heading2: "Multiple Job opportunity",
      heading3: "Verified Job seeker",
    },
  ];

  const plusSlides = (n) => {
    const newIndex = (slideIndex + n + slides.length) % slides.length;
    setSlideIndex(newIndex);
  };

  return (
    <div className="">
      <div className="container">
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
              {slides.map((slide, index) => (
                <div
                  className={`HeroSliderone ${
                    index === slideIndex ? "active" : ""
                  }`}
                  key={index}
                >
                  <img src={slide.image} alt={`Slide ${index + 1}`} />
                  <div className="BannerText">
                    <div className="BannerTextUpper">
                      <i className="fa-solid fa-medal" />
                      <span>
                        <h2>
                          <strong>{slide.heading1}</strong>
                        </h2>
                      </span>
                    </div>
                    <div className="BannerTextUpper">
                      <i className="fa-solid fa-compass" />
                      <span>
                        <h2>{slide.heading2}</h2>
                      </span>
                    </div>
                    <div className="BannerTextDowe">
                      <h2>{slide.heading3}</h2>
                    </div>
                  </div>
                </div>
              ))}
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
      </div>
    </div>
  );
};

export default HomeBanner;
