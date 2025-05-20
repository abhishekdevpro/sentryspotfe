
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { FiInfo } from "react-icons/fi";
export default function AboutUs() {
  return (
    <div className="about-us-page">
      <DefaulHeader2 />
      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <FiInfo className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">About Us</h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">About SentrySpot</h2>
          <p>
            Welcome to <strong>SentrySpot</strong>, your one-stop AI-powered
            career platform exclusively designed for security professionals. At
            SentrySpot, we specialize in empowering individuals and
            organizations in the security sector to find the best opportunities,
            enhance their skills, and build a thriving career. Whether you're a
            cybersecurity expert, a physical security professional, or an
            employer seeking top talent, SentrySpot offers tailored solutions to
            meet your needs.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-2">
            🔐 Our Mission – Secure Your Future
          </h2>
          <p>
            Our mission is to revolutionize the job search and career
            development process for security professionals. By harnessing
            AI-driven tools and industry-specific insights, we ensure that you
            not only find the right job but also grow within the security
            industry with confidence and skill.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">🛡️ Why SentrySpot?</h2>
          <p className="mb-2">
            <strong>Tailored for Security Professionals:</strong> At SentrySpot,
            we understand the unique requirements of the security industry.
            Whether you're an expert in cybersecurity, physical security, risk
            management, or executive protection, our platform is crafted to help
            you find opportunities that align with your expertise.
          </p>
          <p>
            <strong>🤖 AI-Powered Career Tools:</strong> Our cutting-edge AI
            technology simplifies your job search. With AI-enabled resume
            building, job matching, and skill testing, SentrySpot saves you time
            and improves your chances of landing the perfect role. Our AI
            analyzes job postings to highlight those most relevant to your
            qualifications.
          </p>
        </section>
      </div>
      <FooterDefault />
    </div>
  );
}
