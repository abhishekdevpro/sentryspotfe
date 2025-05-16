
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { MdSupportAgent } from "react-icons/md";

export default function GrievanceRedressal() {
  return (
    <div className="grievance-redressal-page">
      <DefaulHeader2 />

      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <MdSupportAgent className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Grievance Redressal</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 space-y-8">
        <section>
          <p>
            At <strong>SentrySpot</strong>, we are committed to providing the
            best possible experience for all our users. We understand that from
            time to time, issues may arise that require resolution, and we take
            such matters seriously. To ensure a prompt and effective response,
            we have established a dedicated Grievance Redressal process.
          </p>
          <p>
            If you have any concerns, complaints, or issues related to our
            services, we encourage you to reach out to our team. We are here to
            assist with any problems you may face—from technical difficulties to
            issues with your account or job applications.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            How to File a Grievance
          </h2>
          <p>
            <strong>Step 1:</strong> Draft an email detailing your concern. Be
            sure to include the following:
          </p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Your full name
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Contact information
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              SentrySpot ID (if applicable)
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              A clear description of the issue you're facing
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Any supporting documents or screenshots that may help us
              understand the problem better
            </li>
          </ul>

          <p className="mt-4">
            <strong>Step 2:</strong> Send the email to our Grievance Redressal
            Team at:
          </p>
          <p className="mt-2 text-blue-700 font-semibold">
            📧 Grievance@sentryspot.co.uk
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">What Happens Next?</h2>
          <p>Once we receive your grievance, our team will:</p>
          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Acknowledge your email within <strong>24 hours</strong>
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Investigate the issue thoroughly
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              Provide a resolution or further steps within{" "}
              <strong>5 working days</strong>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p>
            We are dedicated to resolving any grievances in a fair, respectful,
            and timely manner. Your concerns matter to us, and we strive to
            improve our platform based on your feedback.
          </p>
          <p className="mt-2">
            If you have any questions, don’t hesitate to reach out.{" "}
            <strong>We are here to support you.</strong>
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
