
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { HiIdentification } from "react-icons/hi";

export default function SentrySpotID() {
  return (
    <div className="sentryspot-id-page">
      <DefaulHeader2 />

      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <HiIdentification className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">SentrySpot ID</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            What is a Unique SentrySpot ID?
          </h2>
          <p>
            <strong>
              Your Unique SentrySpot ID is more than just a username—it’s your
              personal gateway to building a successful career in the security
              industry.
            </strong>{" "}
            It provides secure access to all the tools, resources, and
            opportunities SentrySpot offers.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Why Do You Need a Unique SentrySpot ID?
          </h2>
          <p className="mb-3">
            <strong>🔐 Security-Centric Access:</strong> Your SentrySpot ID
            ensures that your personal and professional information is protected
            with end-to-end encryption and secure login. Access your profile,
            applications, certifications, and more—anytime, anywhere.
          </p>
          <p className="mb-3">
            <strong>🎓 Centralized Career Management:</strong> Manage job
            searches, take skill assessments, earn certifications, and connect
            with professionals—all with one ID.
          </p>
          <p>
            <strong>💼 A Profile That Stands Out:</strong> Your SentrySpot ID
            builds your professional identity within the security industry,
            helping top employers discover your qualifications quickly.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            How Does Your Unique SentrySpot ID Work?
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Create Your ID:</strong> Sign up using your email or
              social login. Your ID is unique and gives you full platform
              access.
            </li>
            <li>
              <strong>Manage Your Profile:</strong> Build your resume with AI
              tools, add certifications, and track job applications and
              interviews.
            </li>
            <li>
              <strong>Job Matching:</strong> Get job recommendations tailored to
              your profile using our AI engine every time you log in.
            </li>
            <li>
              <strong>Secure Communication:</strong> Employers and vendors can
              connect with you directly through secure, private messaging.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            The Benefits of Having a Unique SentrySpot ID
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>✔️ Personalized Dashboard:</strong> View job matches,
              track applications, and access certifications—all in one place.
            </li>
            <li>
              <strong>✔️ Exclusive Features:</strong> Enjoy AI-driven job and
              skill suggestions, real-time job alerts, and access to the
              professional security community.
            </li>
            <li>
              <strong>✔️ One-Stop for Career Growth:</strong> Everything you
              need to build and manage your career is integrated into your
              unique SentrySpot ID.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Get Started with Your Unique SentrySpot ID
          </h2>
          <p>
            <strong>Ready to unlock all the benefits of SentrySpot?</strong> 👉{" "}
            <strong>Create Your SentrySpot ID Now</strong> and start your
            journey to career success in the security industry today!
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}