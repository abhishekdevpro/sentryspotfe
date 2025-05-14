import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer";
import React from "react";
import { FaGavel } from "react-icons/fa";

export default function TermsAndConditions() {
  return (
    <div className="terms-conditions-page">
      <DefaulHeader2 />

      {/* Hero Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <FaGavel className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Terms and Conditions</h1>
        <p className="text-white mt-2 text-lg">Last Updated: October 2024</p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
        <section>
          <p>
            Welcome to SentrySpot. By accessing or using our platform, you agree
            to comply with the following Terms and Conditions. These terms apply
            to all users, including job seekers, employers, vendors, companies
            using showcase pages, and general website users. Please read these
            terms carefully.
          </p>
        </section>

        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. General Terms for All Users
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>1.1 Acceptance of Terms:</strong> By using the SentrySpot
              website and its services, you agree to these terms and any
              additional terms posted on the site. If you do not agree, you
              should not use this platform.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>1.2 Modification of Terms:</strong>We may revise these
              terms at any time. Changes will be effective upon posting. Your
              continued use of the platform after changes are posted signifies
              your acceptance of the revised terms.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>1.3 Account Registration:</strong> To access certain
              features, such as applying for jobs or creating company profiles,
              you may need to register for a SentrySpot ID. You are responsible
              for keeping your account details secure. You must provide accurate
              information during registration.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>1.4 Privacy Policy:</strong> Your use of SentrySpot is
              subject to our{" "}
              <a href="/privacy-policy" className="text-blue-600">
                Privacy Policy
              </a>
              . Please review this policy to understand how we collect, use, and
              protect your data.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">2. Job Seekers</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>2.1 Eligibility:</strong>You must be at least 18 years of
              age and legally able to work in the countries for which you are
              applying for jobs. You agree to provide accurate information about
              your qualifications, work history, and credentials.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>2.2 Profile and Resume Information:</strong> You are
              responsible for the accuracy of the information provided in your
              profile and resume. By uploading your resume or creating an
              AI-enabled resume on SentrySpot, you authorize us to share this
              information with potential employers.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>2.3 Job Applications:</strong> Once you apply for a job
              through SentrySpot, we will transmit your application details to
              the relevant employer. SentrySpot is not responsible for the
              hiring decisions made by employers, nor are we liable for any
              employment disputes between you and an employer.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>2.4 Certifications and Skill Testing:</strong> If you
              participate in AI-powered skill testing or obtain certifications
              through SentrySpot, you acknowledge that the results will be
              shared with potential employers. You must ensure that any
              certifications you claim to have earned are valid and accurately
              represented.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>2.5 Prohibited Conduct:</strong>You agree not to post
              false information or apply for jobs that you are not qualified
              for. Any fraudulent activity may result in the suspension or
              termination of your SentrySpot ID and removal of your profile.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">3. Employers</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>3.1 Account and Job Posting:</strong> As an employer, you
              must create an account and provide accurate information about your
              company. You are responsible for ensuring that your job postings
              comply with all relevant employment laws.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>3.2 Hiring Process:</strong> You agree that all hiring
              decisions are solely your responsibility. SentrySpot serves only
              as a facilitator between job seekers and employers. We do not
              guarantee the quality or accuracy of job seeker profiles.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>3.3 Prohibited Job Listings:</strong>You may not post jobs
              that:
              <ul className="list-disc ml-6 space-y-2">
                <li style={{ listStyle: "inside", fontWeight: "400" }}>
                  Violate labor laws.
                </li>
                <li style={{ listStyle: "inside", fontWeight: "400" }}>
                  Involve multi-level marketing (MLM), pyramid schemes, or
                  similar.
                </li>
                <li style={{ listStyle: "inside", fontWeight: "400" }}>
                  Promote discrimination based on age, gender, race, religion,
                  or any other protected category.
                </li>
              </ul>
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>3.4 Candidate Data:</strong>Employers must handle all
              candidate data in compliance with <strong>GDPR </strong>or other
              applicable privacy regulations. You are not permitted to use
              candidate data for any purpose other than recruitment
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Company Showcase Pages
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>4.1 Accurate Representation:</strong>Your company page
              must represent your business accurately. This includes details
              such as your company’s history, values, job opportunities, and
              employee benefits. Misleading information is strictly prohibited.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>4.2 Content Ownership:</strong> You retain ownership of
              the content you upload to your showcase page (e.g., images, logos,
              descriptions). However, by uploading content, you grant SentrySpot
              a license to display, reproduce, and distribute your content for
              promotional purposes.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>4.3 Reviews and Ratings:</strong> Job seekers and website
              users may post reviews and ratings about your company. SentrySpot
              does not endorse these reviews and is not responsible for the
              opinions expressed by users. However, you may contact us to
              challenge or address any defamatory or false reviews.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>4.4 Compliance with Law:</strong> You agree to ensure that
              the content on your company showcase page complies with all
              applicable laws, including labor and intellectual property laws.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">5. Vendors</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>5.1 Vendor Listings:</strong> All vendor listings must be
              truthful and accurately describe the services you offer.
              Misrepresentation of services, qualifications, or pricing may
              result in removal from the platform.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>5.2 Licensing and Compliance:</strong>You are responsible
              for ensuring that you have the appropriate licenses,
              certifications, and permits to offer the services listed.
              SentrySpot reserves the right to request proof of licensing or
              certification at any time.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>5.3 Client Data:</strong> Any data you collect from job
              seekers or employers through SentrySpot must be handled in
              compliance with GDPR or other relevant data protection laws. You
              are not permitted to use data collected on SentrySpot for any
              purpose other than providing the services listed.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">6. Website Users</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>6.1 Limited License to Use:</strong> You are granted a
              limited, revocable, non-exclusive license to access and use the
              SentrySpot website for personal, non-commercial purposes. Any
              misuse or unauthorized use of the website may result in
              termination of your access.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>6.2 Prohibited Activities:</strong> You agree not to:
              <ul className="list-disc ml-6 space-y-2">
                <li style={{ listStyle: "inside", fontWeight: "400" }}>
                  Scrape or collect data from the website without permission.
                </li>
                <li style={{ listStyle: "inside", fontWeight: "400" }}>
                  Use the website for unlawful purposes.
                </li>
                <li style={{ listStyle: "inside", fontWeight: "400" }}>
                  Misrepresent your identity when interacting with the website
                  or its users.
                </li>
              </ul>
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>6.3 Intellectual Property:</strong> All content on
              SentrySpot, including but not limited to text, graphics, logos,
              and software, is the property of SentrySpot or its content
              suppliers and is protected by copyright laws. You may not
              reproduce, distribute, or display any part of the website without
              our written consent.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">
            7. Disclaimer and Limitation of Liability
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>7.1 No Employment Guarantee:</strong> SentrySpot does not
              guarantee that job seekers will find employment or that employers
              will find suitable candidates. We only provide tools to facilitate
              the recruitment process.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>7.2 No Warranties:</strong> The website and services are
              provided "as is" without any warranties, express or implied.
              SentrySpot does not guarantee that the website will be available
              at all times or that it will be free of errors or interruptions.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>7.3 Limitation of Liability:</strong> To the fullest
              extent permitted by law, SentrySpot will not be liable for any
              indirect, incidental, or consequential damages arising from your
              use of the website or services.
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">8. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the
            laws of the United Kingdom. Any disputes arising from your use of
            the platform will be subject to the jurisdiction of the courts of
            the United Kingdom.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
          <p>If you have any questions about these terms, please contact us:</p>
          <p className="mt-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:support@sentryspot.co.uk" className="text-blue-600">
              support@sentryspot.co.uk
            </a>
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
