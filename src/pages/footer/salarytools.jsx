import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer/index";
import React from "react";
import { FaMoneyCheckAlt } from "react-icons/fa";

export default function SalaryTools() {
  return (
    <div className="salary-tools-page">
      <DefaulHeader2 />

      {/* Header Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <FaMoneyCheckAlt className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">
          Salary Tools for Job Seekers
        </h1>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Navigate Your Career with Confidence
          </h2>
          <p>
            Understanding your market value and negotiating your salary are
            crucial steps in your job search and career advancement. At
            SentrySpot Resume, we provide access to a variety of salary tools
            and resources that empower you to make informed decisions about your
            compensation. These tools help you research industry standards,
            evaluate job offers, and negotiate the best possible salary.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Comprehensive Salary Tools
          </h2>

          <p className="mb-4">
            <strong>💰 Salary Calculators:</strong> Salary calculators allow you
            to input your job title, location, and experience level to get an
            estimate of the typical salary range for your position. These tools
            take into account factors such as industry trends, geographic
            variations, and company size to provide accurate salary data.
            Popular salary calculators include those offered by Glassdoor,
            PayScale, and Indeed.
          </p>

          <p className="mb-4">
            <strong>📊 Industry Reports:</strong> Accessing detailed industry
            reports can give you a broader understanding of salary trends within
            your field. These reports often include information on average
            salaries, benefits, and compensation packages for various roles and
            experience levels. Resources like the Bureau of Labor Statistics
            (BLS) and professional associations often publish these reports
            annually.
          </p>

          <p className="mb-4">
            <strong>🏙️ Cost of Living Comparisons:</strong> When considering job
            offers in different locations, it’s important to factor in the cost
            of living. Cost of living comparison tools help you understand how
            far your salary will go in different cities. Websites like Numbeo
            and Expatistan provide detailed comparisons of living expenses,
            allowing you to make informed decisions about relocating for a job.
          </p>

          <p className="mb-4">
            <strong>📈 Salary Surveys:</strong> Participating in salary surveys
            or accessing their results can provide valuable insights into what
            others in your profession are earning. These surveys are often
            conducted by industry associations, professional networks, and
            recruitment agencies. They offer a snapshot of current compensation
            trends and can be a useful benchmark for your salary negotiations.
          </p>

          <p className="mb-4">
            <strong>🏢 Company Reviews:</strong> Websites like Glassdoor and
            Indeed offer company reviews where current and former employees
            share their experiences, including information about salaries and
            benefits. Reviewing these insights can give you a sense of what to
            expect from a potential employer and help you gauge whether their
            compensation packages are competitive.
          </p>

          <p>
            <strong>🤝 Negotiation Resources:</strong> Negotiating your salary
            can be intimidating, but with the right resources, you can approach
            it with confidence. There are numerous online guides, articles, and
            videos that offer strategies for effective salary negotiation.
            Websites like The Muse and LinkedIn Learning provide valuable tips
            on how to present your case, handle counteroffers, and secure the
            best possible compensation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            How SentrySpot Resume Can Help
          </h2>

          <p className="mb-4">
            <strong>Personalized Salary Reports</strong> At SentrySpot Resume,
            we offer personalized salary reports tailored to your specific job
            title, industry, and location. Our experts analyze current market
            data to provide you with a comprehensive understanding of your
            earning potential, helping you make informed decisions during your
            job search.
          </p>

          <p className="mb-4">
            Our career coaches provide one-on-one guidance on salary research
            and negotiation. We help you prepare for salary discussions, develop
            negotiation strategies, and build the confidence to ask for what you
            deserve. With our support, you’ll be well-equipped to navigate
            salary conversations and secure a compensation package that reflects
            your value.
          </p>

          <p>
            As a SentrySpot Resume client, you’ll gain access to exclusive
            resources, including industry reports, salary surveys, and
            negotiation workshops. Our comprehensive toolkit ensures that you
            have all the information and skills needed to advocate for yourself
            effectively.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Start Maximizing Your Earning Potential Today
          </h2>
          <p>
            Don’t leave your salary to chance. Take control of your career and
            maximize your earning potential with the help of SentrySpot Resume’s
            salary tools and resources. Contact us today to learn more about how
            we can support you in your job search and salary negotiations.
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
