
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { FaSearch } from "react-icons/fa";

export default function JobSearch() {
  return (
    <>
      <DefaulHeader2 />

      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <FaSearch className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">
          Job Search on SentrySpot
        </h1>
        <p className="text-white mt-2 text-lg">
          Your Path to Security Opportunities
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 space-y-10">
        <section>
          <p>
            At <strong>SentrySpot</strong>, finding your next security job is
            easier than ever. Whether you're looking for roles in cybersecurity,
            physical security, or risk management, our AI-powered platform
            matches your skills with relevant job opportunities. Follow these
            simple steps to land your dream security role.
          </p>
        </section>
        <h1 className="text-2xl font-semibold mb-2">
          Step-by-Step Guide to Job Search on SentrySpot
        </h1>
        {/* Step 1 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🛡️ 1. Create Your SentrySpot ID
          </h2>
          <p className="mb-2">
            Before you begin your job search, you’ll need a SentrySpot ID. This
            gives you access to our full range of services, including AI-powered
            job matching, skill assessments, and certification programs.
          </p>
          <ul className="list-disc list-inside mb-2">
            <li className="m-2" style={{ listStyle: "inside" }}>
              <strong>Sign Up:</strong> Click{" "}
              <strong>"Create SentrySpot ID"</strong> and fill in basic details
              like your email, name, and password.
            </li>
            <li className="m-2" style={{ listStyle: "inside" }}>
              <strong>Verify Your Email:</strong> A verification link will be
              sent to your email. Click the link to activate your account.
            </li>
          </ul>
          <div className="text-sm text-gray-600">
            ✔️ Checklist:
            <ul className="list-disc list-inside ml-4 ">
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Valid email address for sign-up
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Strong password for account security
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Verified email to access the platform
              </li>
            </ul>
          </div>
          <a
            href="/login" // ✅ Adjust to your real sign-up route
            className=" mt-5 rounded-md font-semibold "
          >
            👉 Create Your SentrySpot ID Now
          </a>
        </section>

        {/* Step 2 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🔍 2. Set Up Your Job Profile
          </h2>
          <p className="mb-2">
            After creating your SentrySpot ID, it's time to build your{" "}
            <strong>professional job profile. </strong> This helps our AI
            recommend the most suitable job listings for you.
          </p>
          <ul className="list-disc list-inside mb-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Add Your Skills: List your core skills such as cybersecurity
              analysis, threat detection, or access control systems.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Upload Your Resume: Use our AI-powered resume builder to create or
              upload a professional resume.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Complete Your Profile: Fill in key details like your education,
              experience, and certifications.
            </li>
          </ul>

          <div className="text-sm text-gray-600">
            ✔️ Checklist:
            <ul className="list-disc list-inside ml-4">
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Detailed skills list
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Resume uploaded or created with SentrySpot's AI
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Education and work experience fully listed
              </li>
            </ul>
          </div>
        </section>

        {/* Step 3 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🎯 3. Start Your Job Search
          </h2>
          <p className="mb-2">
            Now that your profile is ready, you can begin searching for jobs
            tailored to your experience and interests.
          </p>
          <h3 className="text-lg font-semibold mb-2">Filter and Find Jobs:</h3>
          <ul className="list-disc list-inside mb-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Use Filters: Narrow down job listings by role, location, salary,
              and other preferences (e.g., full-time, part-time, remote).
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              AI-Powered Recommendations: Our AI engine matches you with jobs
              that best fit your qualifications and interests.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Bookmark Jobs: If you're not ready to apply yet, you can bookmark
              jobs to save them for later.
            </li>
          </ul>
          <div className="text-sm text-gray-600">
            ✔️ Checklist:
            <ul className="list-disc list-inside ml-4">
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Set your job filters (location, role, etc.)
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Review AI job recommendations
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Bookmark any jobs of interest
              </li>
            </ul>
          </div>
        </section>

        {/* Step 4 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">📄 4. Apply for Jobs</h2>
          <p className="mb-2">
            Found the SentrySpot job? Here’s how to apply directly on
            SentrySpot.
          </p>
          <ul className="list-disc list-inside mb-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Quick Apply: Many listings allow you to apply in just one click.
              Review your profile and submit!
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Customize Your Application: For some roles, you can tailor your
              resume or add a personalized cover letter for a better chance of
              success.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Track Application Status: Once submitted, you can monitor the
              progress of your application through your dashboard.
            </li>
          </ul>
          <div className="text-sm text-gray-600">
            ✔️ Checklist:
            <ul className="list-disc list-inside ml-4">
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Customize your resume and cover letter (if applicable)
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Use the "Quick Apply" feature for easy submissions
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Track application status in real-time
              </li>
            </ul>
          </div>
        </section>

        {/* Step 5 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            📊 5. Skill Testing and Certification
          </h2>
          <p className="mb-2">
            Boost your profile with <strong>AI skill assessments</strong> and{" "}
            <strong>certifications. </strong>
            These not only help you stand out but also make sure you're
            job-ready.
          </p>
          <ul className="list-disc list-inside mb-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Take Skill Tests: Choose from a range of assessments based on your
              job role (e.g., penetration testing, physical security, risk
              management).
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Earn Certifications: Once you pass, your certifications are added
              directly to your profile, making it visible to recruiters.
            </li>
          </ul>
          <div className="text-sm text-gray-600">
            ✔️ Checklist:
            <ul className="list-disc list-inside ml-4">
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Identify relevant skill tests for your field
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Complete tests to improve your profile
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                {" "}
                Showcase certifications in your application
              </li>
            </ul>
          </div>
        </section>

        {/* Step 6 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            📝 6. Monitor Job Applications and Interviews
          </h2>
          <p className="mb-2">
            Once you've applied for a job, it's important to stay on top of your
            applications and prepare for interviews.
          </p>
          <ul className="list-disc list-inside mb-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Application Tracker: Track the status of your job applications
              (e.g., submitted, in review, interview scheduled).
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Interview Notifications: If you’re selected for an interview,
              you’ll be notified via email and on your dashboard.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Interview Prep: Access our interview preparation guides and tips
              to help you succeed in your interviews.
            </li>
          </ul>
          <div className="text-sm text-gray-600">
            ✔️ Checklist:
            <ul className="list-disc list-inside ml-4">
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Regularly check your application tracker
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Prepare for upcoming interviews with SentrySpot resources
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Attend interviews with confidence
              </li>
            </ul>
          </div>
        </section>

        {/* Step 7 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            🚀 7. Get Hired and Stay Updated
          </h2>
          <p className="mb-2">
            Once you land a job, congratulations! But it doesn't stop there—
            <strong>SentrySpot</strong> helps you stay connected to the latest
            industry trends, skill tests, and job opportunities for future
            growth.
          </p>
          <ul className="list-disc list-inside mb-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Get Job Alerts: Stay informed about new opportunities by setting
              up job alerts.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Continue Learning: Participate in advanced skill assessments and
              earn certifications to enhance your career.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Join the SentrySpot Community: Network with other professionals
              and stay updated on the latest in security.
            </li>
          </ul>
          <div className="text-sm text-gray-600">
            ✔️ Checklist:
            <ul className="list-disc list-inside ml-4">
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Set job alerts for ongoing opportunities
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Take advanced certifications for career growth
              </li>
              <li style={{ listStyle: "inside", fontWeight: "400" }}>
                Engage with the SentrySpot community
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center pt-10">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Secure Your Future?
          </h2>
          <p className="mb-6">
            Join SentrySpot today and take the first step towards your next
            career opportunity in the security industry. Whether you're just
            starting out or looking for the next big move,
            <strong>SentrySpot </strong> is here to help.
          </p>
          <a
            href="/login" // ✅ Adjust to your real sign-up route
            className="bg-[#051947] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0b2c70] transition"
          >
            👉 Create Your SentrySpot ID Now
          </a>
          <p className="mt-3">
            Start building your future with the best tools in security career
            management.
          </p>
        </section>
      </div>
      <FooterDefault />
    </>
  );
}
