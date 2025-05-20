
import DefaulHeader2 from "@/components/header/DefaulHeader2";
import FooterDefault from "@/components/footer/common-footer";
import React from "react";
import { FaShieldAlt } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-page">
      <DefaulHeader2 />

      {/* Hero Section */}
      <div className="bg-[#051947] py-12 text-center">
        <div className="flex justify-center mb-4">
          <FaShieldAlt className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-white text-3xl font-bold">Privacy Policy</h1>
        <p className="text-white mt-2 text-lg">
          How SentrySpot Resume Collects, Uses & Protects Your Information
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2">Introduction</h2>
          <p>
            At SentrySpot Resume, we value your privacy and are committed to
            protecting your personal information. This Privacy Policy outlines
            how we collect, use, and safeguard your data when you use our
            website and services. By accessing our website and using our
            services, you agree to the terms of this Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="font-semibold mt-4">Personal Information</p>
          <p>
            We may collect personal information you provide, including but not
            limited to your name, email address, phone number, mailing address,
            resume details, and payment information.
          </p>
          <p className="font-semibold mt-4">Non-Personal Information</p>
          <p>
            We may also collect non-personal information such as your IP
            address, browser type, device information, and browsing behavior on
            our website. This data helps us improve our services and enhance
            your experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Service Delivery:</strong> We use your personal
              information to provide and manage our services, including resume
              writing, career coaching, and LinkedIn profile optimization.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Communication:</strong> We may use your contact
              information to communicate with you about our services, updates,
              and promotional offers. You can opt-out of these communications at
              any time.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Improvement and Analysis:</strong>Non-personal information
              is used to analyze website usage, improve our services, and ensure
              the security and functionality of our website.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Legal Compliance:</strong> We may disclose your
              information to comply with legal obligations, enforce our terms
              and conditions, or protect the rights, property, or safety of
              SentrySpot Resume, our clients, or others.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction. While we strive to safeguard
            your data, no method of transmission over the internet or electronic
            storage is completely secure. Therefore, we cannot guarantee
            absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            4. Sharing Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Third-Party Providers:</strong> We may share your
              information with trusted third-party service providers who assist
              us in delivering our services, such as payment processors and
              email marketing platforms. These providers are obligated to
              protect your data and use it only for the purposes specified by
              us.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Business Transfers:</strong> In the event of a merger,
              acquisition, or sale of all or a portion of our assets, your
              personal information may be transferred to the acquiring entity.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Legal Requirements:</strong> We may disclose your
              information if required to do so by law or in response to valid
              requests by public authorities.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            5. Your Rights and Choices
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Access and Correction:</strong> You have the right to
              access, update, or correct your personal information at any time.
              Please contact us if you need assistance with this.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Data Deletion:</strong>You may request the deletion of
              your personal information, subject to certain legal and
              contractual limitations. We will take reasonable steps to comply
              with your request.
            </li>
            <li style={{ listStyle: "inside", fontWeight: "400" }}>
              <strong>Opt-Out:</strong> You can opt-out of receiving promotional
              communications from us by following the unsubscribe instructions
              provided in those communications or by contacting us directly.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            6. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar tracking technologies to enhance your
            browsing experience, analyze website traffic, and personalize
            content. You can manage your cookie preferences through your browser
            settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these external
            sites. We encourage you to review the privacy policies of any
            third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">8. Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18.
            We do not knowingly collect personal information from children. If
            we become aware that a child has provided us with personal
            information, we will take steps to delete such information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">
            9. Changes to This Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. Any updates will be
            posted on this page, and the revised policy will indicate the date
            of the latest revision. Your continued use of our website and
            services after any changes signifies your acceptance of the revised
            policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy or
            our data practices, please contact us at:
          </p>
          <p className="mt-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:career@sentryspot.co.uk" className="text-blue-600">
              career@sentryspot.co.uk
            </a>
          </p>
          <p>
            This Privacy Policy is designed to provide clarity on how we handle
            your personal information. If you need any additional details or
            specific clauses included, please let me know!
          </p>
        </section>
      </div>

      <FooterDefault />
    </div>
  );
}
