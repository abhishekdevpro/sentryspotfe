
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ footerStyle = "" }) => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex flex-col items-start">
              <img
                src="https://htmlsentryspot.vercel.app/img/company_logo_white.png"
                alt="SentrySpot Logo"
                className="h-8 w-auto mb-4"
              />
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.64c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-pink-600 transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-400 transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Our Services Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-gray-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/our-values"
                  className="hover:text-gray-300 transition-colors"
                >
                  Our Values
                </Link>
              </li>
              <li>
                <Link
                  to="/our-services"
                  className="hover:text-gray-300 transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  to="/grievance-redressal"
                  className="hover:text-gray-300 transition-colors"
                >
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Services for Recruiters Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Job Seekers</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/jobsearch"
                  className="hover:text-gray-300 transition-colors"
                >
                  Job Search
                </Link>
              </li>
              <li>
                <Link
                  to="/searchjob-and-apply"
                  className="hover:text-gray-300 transition-colors"
                >
                  Search Jobs & Apply
                </Link>
              </li>
              <li>
                <Link
                  to="/career-advice"
                  className="hover:text-gray-300 transition-colors"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  to="/salary-tools"
                  className="hover:text-gray-300 transition-colors"
                >
                  Salary Tool
                </Link>
              </li>
              <li>
                <Link
                  to="/sentryspot-id"
                  className="hover:text-gray-300 transition-colors"
                >
                  Sentry Spot ID
                </Link>
              </li>
            </ul>
          </div>

          {/* Other Services Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">AI Tools</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/ai-resume-builder"
                  className="hover:text-gray-300 transition-colors"
                >
                  AI Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-cv-parsing"
                  className="hover:text-gray-300 transition-colors"
                >
                  AI CV Parsing
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-resume-enhancer"
                  className="hover:text-gray-300 transition-colors"
                >
                  AI Resume Enhance
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-job-match-&-apply"
                  className="hover:text-gray-300 transition-colors"
                >
                  AI Job Match & Apply
                </Link>
              </li>
            </ul>
          </div>

          {/* Help and Contact Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4"> Legal</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-gray-300 transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
