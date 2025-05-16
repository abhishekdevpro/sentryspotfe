
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { HiOutlineLightBulb } from "react-icons/hi";

export default function CareerAdvice() {
  return (
    <div className="career-advice-page">
      <DefaulHeader2 />

      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <HiOutlineLightBulb className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Career Advice</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 space-y-8">
        <section>
          <p>
            <strong>
              At SentrySpot, we’re committed to helping you thrive in the
              security industry.
            </strong>{" "}
            As the one-stop platform for learning, certification, skill testing,
            and job search, we provide everything you need to succeed. From
            creating an AI-enabled resume to applying for your dream job, we’ve
            got you covered every step of the way.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            🔑 Expert Tips to Build a Strong Career
          </h2>
          <p>
            <strong>📈 How to Advance in the Security Industry:</strong> Take
            your career to the next level with our expert advice on gaining
            certifications, enhancing your skills through courses, and using our
            platform to get skill tested and validated. With our AI-enabled
            resume builder, we help you create a standout resume tailored to
            security roles.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            💼 Interview Preparation
          </h2>
          <p>
            Nail your next interview with SentrySpot’s interview tips. Learn how
            to ace technical interviews, showcase your skills, and communicate
            your experience confidently. If you're looking for an edge, use our
            video profile feature to make a strong first impression with
            employers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            🛡️ Skills You Need for the Future
          </h2>
          <p>
            The security industry is evolving rapidly, and our experts are here
            to help you stay ahead. We highlight the top skills needed for
            future roles in cyber defense, physical security, and risk
            management, helping you plan your career growth strategically.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            🎯 Setting Career Goals
          </h2>
          <p>
            We guide you in setting clear, achievable career goals with
            personalized advice on the best courses and certifications to
            pursue. SentrySpot’s skill testing ensures that you are job-ready,
            validated by industry-recognized certifications that boost your
            employability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            🌍 Global Job Market Trends
          </h2>
          <p>
            Stay updated on global trends in security hiring, whether you're
            looking to switch industries or relocate for work. With SentrySpot’s
            AI-powered job matching, you can apply for jobs that fit your skills
            and interests, both locally and internationally.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            SentrySpot: Your One-Stop Career Platform
          </h2>
          <p className="mt-2 mb-2">
            At SentrySpot, we offer more than just career advice—we are your
            complete career solution. Here’s how:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>📚 Courses and Certifications:</strong> Access
              industry-specific courses and get certified in critical security
              areas.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>🔍 Skill Testing:</strong> Validate your expertise with
              AI-powered skill assessments and earn certifications that set you
              apart from the competition.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>🎥 Video Profiles:</strong> Make your profile stand out
              with a professional video introduction that lets employers see
              your skills and personality before the interview.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>📝 AI-Enabled Resumes:</strong> Use our AI-driven resume
              builder to create or improve your resume, ensuring it’s optimized
              for security roles.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>💼 Job Search and Application:</strong> Finally, use your
              polished profile to search for jobs and apply to top companies
              through SentrySpot’s comprehensive job portal.
            </li>
          </ul>
          <p className="mt-4">
            Our platform seamlessly integrates{" "}
            <strong>all these features,</strong> making it easy for you to
            <strong>
              learn, certify, get tested, showcase your talents,{" "}
            </strong>{" "}
            and <strong>find the SentrySpot </strong>job—all in one place.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Explore More Career Advice
          </h2>
          <p>
            <strong>Dive deeper into expert insights and resources</strong> to
            help you navigate and grow in your security career.
          </p>
          <a
            href="https://blog.sentryspot.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-medium"
          >
            👉 Explore More
          </a>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
