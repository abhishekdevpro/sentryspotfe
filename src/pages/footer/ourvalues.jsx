import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { FaHandshake } from "react-icons/fa";

export default function OurValues() {
  return (
    <>
      <DefaulHeader2 />

      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          {/* Replace with your actual values icon */}
          <FaHandshake className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Our Values</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 space-y-10">
        <section>
          <h2 className="text-xl font-semibold mb-2">🔒 Security</h2>
          <p>
            We prioritize security in everything we do. From protecting your
            data to ensuring the authenticity of job listings, your safety and
            privacy are our top priorities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🤝 Trust</h2>
          <p>
            We believe in building trust with our users, providing a reliable
            and transparent platform. Our verified job listings and employer
            insights ensure you can make informed career decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">📈 Growth</h2>
          <p>
            SentrySpot is dedicated to helping security professionals advance
            their careers. Through skill assessments, certifications, and a
            wealth of job opportunities, we equip you with the tools you need
            for long-term success.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">💡 Innovation</h2>
          <p>
            Innovation drives our platform. By continuously leveraging AI and
            machine learning, we strive to offer smarter, faster, and more
            effective ways to connect job seekers and employers in the security
            industry.
          </p>
        </section>

        <hr className="my-8" />

        <section>
          <h2 className="text-2xl font-bold text-center mb-4">
            Join SentrySpot Today!
          </h2>
          <p className="text-center mb-6">
            Become part of the most advanced security career platform, and take
            the next step in your professional journey. Whether you're looking
            to advance in cybersecurity, physical security, or any
            security-related field, SentrySpot is here to help you secure your
            future.
          </p>
          <div className="flex justify-center">
            <a
              href="/signup" // ✅ Update this link to your signup page
              className="bg-[#051947] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#0b2c70] transition duration-200"
            >
              Get Started Now
            </a>
          </div>
        </section>
      </div>
      <FooterDefault />
    </>
  );
}
