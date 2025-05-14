import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { FaFileAlt } from "react-icons/fa";

export default function AIResumeBuilder() {
  return (
    <div className="ai-resume-enhancer-page">
      <DefaulHeader2 />

      {/* Hero Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <FaFileAlt className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Ai Resume Builder</h1>
        <p className="text-white mt-2 text-lg">
          Revolutionizing the Job Application Process
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
        <section>
          <p>
            Welcome to SentrySpot Resume’s AI Resume Builder – an innovative
            solution designed to streamline the resume creation process and help
            you land your dream job. Our cutting-edge AI technology simplifies
            the resume writing experience, ensuring that your professional
            achievements and skills are presented in the best possible light.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Key Features of Our AI Resume Builder
          </h2>
          <ul className="list-decimal ml-6 space-y-3">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong> Intelligent Content Generation:</strong> Our AI Resume
              Builder analyzes your input and generates tailored content that
              highlights your qualifications, experience, and skills. It ensures
              that your resume aligns with industry standards and is optimized
              for Applicant Tracking Systems (ATS).
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong> Customizable Templates:</strong>Choose from a wide range
              of professionally designed templates that suit various industries
              and job roles. Our templates are fully customizable, allowing you
              to adjust the layout, fonts, and colors to match your personal
              brand.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Skills and Keywords Optimization:</strong> The AI scans
              job descriptions and identifies relevant skills and keywords to
              include in your resume. This increases your chances of getting
              noticed by recruiters and passing through ATS filters.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Real-Time Feedback and Suggestions :</strong> Receive
              instant feedback on your resume’s content, structure, and overall
              impact. Our AI provides actionable suggestions to enhance your
              resume, ensuring that it effectively communicates your strengths
              and achievements.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Easy-to-Use Interface :</strong>Our user-friendly
              interface guides you through each step of the resume creation
              process. Whether you’re a recent graduate or a seasoned
              professional, our AI Resume Builder makes it easy to craft a
              compelling resume.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong> Experience-Specific Sections:</strong> Tailor your resume
              with sections that are specific to your career stage and industry.
              Our AI suggests the most relevant sections, such as work
              experience, education, certifications, and projects, ensuring a
              comprehensive and organized resume.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Multilingual Support:</strong>Our AI Resume Builder
              supports multiple languages, allowing you to create resumes for
              international job applications. This feature ensures that your
              resume meets the linguistic and cultural expectations of employers
              worldwide.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <ul className="list-decimal ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong> Sign Up and Input Your Information:</strong> Create an
              account on SentrySpot Resume and provide your career details,
              including your job history, education, skills, and achievements.
              The more detailed your input, the more personalized and effective
              your resume will be.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Choose a Template :</strong> Browse our collection of
              professional templates and select the one that best fits your
              industry and style preferences. Each template is designed to be
              visually appealing and ATS-friendly.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong> Generate and Customize Your Resume:</strong> The AI
              Resume Builder will generate a draft based on your input. You can
              then customize the content, layout, and design to match your
              personal brand. Make use of the real-time feedback to refine your
              resume.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Download and Apply:</strong> Once you’re satisfied with
              your resume, download it in your preferred format (PDF, DOCX,
              etc.). You’re now ready to start applying for jobs with a
              polished, professional resume that stands out.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Benefits of Using Our AI Resume Builder
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Efficiency and Speed :</strong> Create a high-quality
              resume in minutes, saving you time and effort. Our AI technology
              automates the writing process, allowing you to focus on your job
              search.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Professional Quality :</strong> Benefit from expertly
              crafted content and design elements that enhance your resume’s
              appeal. Our AI ensures that your resume is both professional and
              impactful.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Increased Visibility :</strong> Optimize your resume for
              ATS and keyword searches, increasing your chances of getting
              noticed by recruiters and hiring managers.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Continuous Improvement :</strong> Our AI Resume Builder is
              constantly learning and improving based on user feedback and
              industry trends. This means you always have access to the latest
              and most effective resume-building tools.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            Start Building Your SentrySpot Resume Today
          </h2>
          <p>
            Transform your job application process with SentrySpot Resume’s AI
            Resume Builder. Sign up now and take the first step towards landing
            your dream job with a professionally crafted resume that showcases
            your unique strengths and qualifications.
          </p>
          <p className="mt-4 font-semibold">Get Started</p>
          <p>
            Ready to create your SentrySpot resume? Visit our AI Resume Builder
            page and start building your resume today!
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
