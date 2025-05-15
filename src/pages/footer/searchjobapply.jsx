import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { FiSearch } from "react-icons/fi";

export default function SearchJobsApply() {
  return (
    <div className="search-jobs-apply-page">
      <DefaulHeader2 />

      {/* Hero Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <FiSearch className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Search Jobs & Apply</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Find Your Dream Job with SentrySpot Resume’s Advanced Job Search &
            Apply Tool
          </h2>
          <p>
            At SentrySpot Resume, we aim to simplify your job search and
            application process. Our advanced job search and apply tool
            leverages cutting-edge technology to connect you with opportunities
            that match your skills, experience, and career aspirations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Key Features of Our Job Search & Apply Tool
          </h2>
          <ol className="list-decimal list-inside space-y-4">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Comprehensive Job Search</strong>
              <br />
              Access a vast database of job listings from various industries and
              locations. Our tool aggregates jobs from top job boards, company
              websites, and recruitment agencies, providing you with a
              one-stop-shop for your job search.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Advanced Search Filters</strong>
              <br />
              Refine your job search with advanced filters such as job title,
              location, industry, salary range, company size, and employment
              type (full-time, part-time, contract, etc.). This helps you find
              the most relevant job opportunities faster.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Personalized Job Recommendations</strong>
              <br />
              Our AI-powered recommendation engine analyzes your resume and
              profile to suggest jobs that best match your qualifications and
              career goals. Receive tailored job recommendations that increase
              your chances of finding the right fit.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Real-Time Job Alerts</strong>
              <br />
              Stay updated with real-time notifications about new job postings
              that match your criteria. Set up job alerts to receive instant
              updates via email or mobile notifications, ensuring you never miss
              an opportunity.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Company Insights</strong>
              <br />
              Gain valuable insights into potential employers with detailed
              company profiles. Learn about company culture, values, benefits,
              and recent news to make informed decisions about where to apply.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>One-Click Application</strong>
              <br />
              Streamline the application process with our one-click application
              feature. Save time by applying to multiple jobs quickly and
              efficiently. Our tool auto-fills your resume and other required
              details, making the application process hassle-free.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Resume and Cover Letter Builder</strong>
              <br />
              Create a professional resume and cover letter using our AI-powered
              builder. Choose from a variety of templates and receive guidance
              on content and formatting to ensure your application stands out.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Application Tracking</strong>
              <br />
              Keep track of all your job applications in one place. Our
              dashboard allows you to monitor the status of your applications,
              upcoming interviews, and follow-up tasks.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Interview Preparation</strong>
              <br />
              Prepare for interviews with our comprehensive resources, including
              common interview questions, tips, and mock interview simulations.
              Boost your confidence and increase your chances of success.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Skill Gap Analysis</strong>
              <br />
              Identify skill gaps between your current profile and the job
              requirements. Our tool provides recommendations for courses or
              certifications that can help you qualify for your desired
              positions.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside space-y-4">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Step 1: Create Your Profile</strong>
              <br />
              Sign up on the SentrySpot Resume platform and create your profile.
              Upload your resume and provide details about your skills,
              experiences, and career aspirations.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Step 2: Search for Jobs</strong>
              <br />
              Use the search feature to find job listings that match your
              criteria. Apply advanced filters to narrow down your search and
              find the most relevant opportunities.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Step 3: Receive Job Recommendations</strong>
              <br />
              Receive personalized job recommendations based on your profile and
              preferences. Set up job alerts to stay updated with real-time
              notifications about new job postings.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Step 4: Apply with One Click</strong>
              <br />
              Use the one-click application feature to apply for jobs directly
              through the platform. The tool auto-fills your application
              details, making the process quick and efficient.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Step 5: Track Your Applications</strong>
              <br />
              Monitor the progress of your job applications through the
              dashboard. Receive updates on application status, interview
              schedules, and follow-up actions.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Step 6: Prepare for Interviews</strong>
              <br />
              Access interview preparation resources to boost your confidence
              and improve your chances of success. Use the skill gap analysis
              feature to identify areas for improvement and enhance your
              qualifications.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Benefits of Using Our Job Search & Apply Tool
          </h2>
          <ul className="list-disc list-inside space-y-4">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Efficiency and Convenience</strong>
              <br />
              Save time and effort by accessing a comprehensive database of job
              listings and applying with one click. Manage your entire job
              search process from one platform.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Increased Visibility</strong>
              <br />
              Optimize your job search with personalized recommendations and
              real-time alerts. Stay updated on the latest job opportunities and
              increase your chances of landing interviews.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Professional Quality</strong>
              <br />
              Create high-quality resumes and cover letters with our AI-powered
              builder. Present yourself in the best possible light to potential
              employers.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Comprehensive Support</strong>
              <br />
              Access a wide range of resources, including company insights,
              interview preparation, and skill gap analysis. Receive
              personalized guidance and support throughout your job search
              journey.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            Start Searching for Jobs & Apply Today
          </h2>
          <p>
            Transform your job search with SentrySpot Resume’s advanced job
            search and apply tool. Sign up now to discover job opportunities
            that SentrySpotly match your profile and streamline your path to
            career success.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Get Started</h2>
          <p>
            Ready to find your dream job? Visit our Job Search & Apply page and
            start exploring top job opportunities today!
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
