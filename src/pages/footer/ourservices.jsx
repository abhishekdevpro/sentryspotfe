import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { MdMiscellaneousServices } from "react-icons/md";

export default function OurServices() {
  return (
    <>
      <DefaulHeader2 />
      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          {/* Replace with your actual services icon */}
          <MdMiscellaneousServices className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Our Services</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-2">
            📄 AI-Enabled Resume Builder
          </h2>
          <p>
            Creating the SentrySpot resume for the security industry can be
            tough. SentrySpot’s AI-powered resume builder simplifies the process
            by automatically crafting a professional resume tailored to your
            skills, experience, and job preferences. Whether you’re just
            starting or updating your profile, this tool ensures your resume is
            optimized to stand out.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            🔍 Skill-Based Job Matching
          </h2>
          <p>
            SentrySpot’s AI-based job-matching engine brings relevant security
            job opportunities directly to you. Forget browsing endless
            listings—our AI scans the market and connects you to jobs that fit
            your profile, skillset, and goals.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            🎓 AI Skill Testing & Certifications
          </h2>
          <p>
            Differentiate yourself from other candidates by proving your
            expertise through our AI-driven skill assessments. These tests cover
            critical areas in the security field, including cybersecurity,
            physical security, and risk assessment. Earn certifications that
            enhance your employability and demonstrate your skill level to
            prospective employers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            ✅ Verified Job Listings
          </h2>
          <p>
            Security professionals need legitimate job listings, and SentrySpot
            ensures this. Our platform verifies job posts to confirm their
            authenticity and relevance. Whether you are a cybersecurity analyst
            or a physical security specialist, you can trust that the
            opportunities listed on SentrySpot are genuine and tailored for you.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            🏢 Comprehensive Company Insights
          </h2>
          <p>
            Before applying for a job, get to know the employer. SentrySpot
            provides AI-driven company exploration tools, allowing you to
            research potential employers thoroughly. Access critical insights
            such as company values, mission statements, employee reviews, and
            salary details to make informed decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            💼 Employer & Vendor Services
          </h2>
          <p>
            For businesses, SentrySpot provides a streamlined dashboard where
            you can post jobs, manage candidates, and find the right talent
            quickly. We also cater to security vendors, offering them a space to
            showcase their services and connect with potential clients.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            🌍 Global Job Opportunities
          </h2>
          <p>
            Whether you’re seeking jobs locally or looking for opportunities
            abroad, SentrySpot connects you with a wide range of security job
            listings globally. Our platform makes it easy to search for and
            apply to positions in different countries and industries.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            🤝 Networking & Community
          </h2>
          <p>
            Being part of the SentrySpot community means having access to a
            network of security professionals. Participate in forums, engage in
            discussions, and keep up with the latest trends in the security
            world. Our community helps you connect, grow, and stay ahead of the
            curve in this evolving field.
          </p>
        </section>
      </div>
      <FooterDefault />
    </>
  );
}
