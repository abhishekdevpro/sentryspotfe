import React from "react";
import { Link } from "react-router-dom";

const ServiceProgramCards = ({ handleMouseEnter, handleMouseLeave, hoveredElements }) => {
  return (
    <div className="ServiceCard">
      <div className="container">
        <div className="CardTop text-center">
          <p className="">
            How we spot career growth for you
          </p>
          <h2 className="">
            AI-powered tools to enhance your job search
          </h2>
        </div>

        <div className="ProgramCards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-8">
          <Link
            to="/skilltest"
            onMouseEnter={() => handleMouseEnter("programCard1")}
            onMouseLeave={() => handleMouseLeave("programCard1")}
            style={{
              textDecoration: "none",
              transition: "all 0.3s ease",
              transform: hoveredElements["programCard1"] ? "translateY(-5px)" : "none",
            }}
          >
            <div
              className="program-card tomato"
              style={{
                width: "200px",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                padding: "40px 24px",
                boxShadow: hoveredElements["programCard1"]
                  ? "0 8px 24px rgba(0, 0, 0, 0.15)"
                  : "0px 4px 14px #afaeae5c",
                transition: "all 0.3s ease",
                transform: hoveredElements["programCard1"] ? "translateY(-5px)" : "none",
              }}
            >
              <i className="fa-solid fa-forward" />
              <div className="program-card-info">
                <div className="heading-md">AI Skill Test</div>
                <button
                  className="button-tertiary tomato"
                  style={{
                    fontSize: "16px",
                    color: "#ff6969",
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </Link>

          <Link to="/buildresume">
            <div className="program-card berry">
              <i className="fa-solid fa-compass" />
              <div className="program-card-info">
                <div className="heading-md">Build Your Resume</div>
                <button className="button-tertiary berry">Explore Careers</button>
              </div>
            </div>
          </Link>

          <Link to="/login">
            <div className="program-card teal">
              <i className="fa-solid fa-medal" />
              <div className="program-card-info">
                <div className="heading-md">Earn Job Skills Quickly</div>
                <button className="button-tertiary teal">Signin to Begin</button>
              </div>
            </div>
          </Link>

          <Link to="/talkto">
            <div className="program-card pear">
              <i className="fa-solid fa-clipboard-list" />
              <div className="program-card-info">
                <div className="heading-md">Talk To Industry Experts</div>
                <button className="button-tertiary pear">With Community</button>
              </div>
            </div>
          </Link>

          <Link to="/sentry-spot">
            <div className="program-card marigold">
              <i className="fa-solid fa-handshake" />
              <div className="program-card-info">
                <div className="heading-md">Get Spotted with SentrySpot ID</div>
                <button className="button-tertiary marigold">Get yours now</button>
              </div>
            </div>
          </Link>

          <Link to="/job-list-v3">
            <div className="program-card marigold">
              <i className="fa-solid fa-handshake" />
              <div className="program-card-info">
                <div className="heading-md">Verified Jobs</div>
                <button className="button-tertiary marigold">Check Here</button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceProgramCards;
