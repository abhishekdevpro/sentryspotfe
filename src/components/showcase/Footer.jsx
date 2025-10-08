import { useState } from "react";
import { Linkedin, Twitter, Facebook, Globe } from "lucide-react";
import CompanyCard from "../ui/CompanyCard";

export default function SocialFooter({
  companyData = {
    company_name: "Your Company",
    linkedin_link: "#",
    twitter_link: "#",
    facebook_link: "#",
    website_link: "#",
    footer_color: "#4B5563", // Default gray-600
  },
}) {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "linkedin",
      icon: <Linkedin size={24} />,
      link: companyData.linkedin_link,
      label: "Find us on LinkedIn",
      hoverColor: "#0A66C2",
    },
    {
      name: "twitter",
      icon: <Twitter size={24} />,
      link: companyData.twitter_link,
      label: "Find us on Twitter",
      hoverColor: "#1DA1F2",
    },
    {
      name: "facebook",
      icon: <Facebook size={24} />,
      link: companyData.facebook_link,
      label: "Find us on Facebook",
      hoverColor: "#1877F2",
    },
    {
      name: "website",
      icon: <Globe size={24} />,
      link: companyData.website_link,
      label: "Visit our website",
      hoverColor: "#10B981",
    },
  ];

  return (
    <CompanyCard
      // className="w-full px-4 sm:px-6 md:px-12 py-10 flex flex-col items-center justify-center text-center"
      // style={{ backgroundColor: companyData.footer_color || "#4B5563" }}
    >
      <h3 className="app-text-h1 !text-blue-900 text-center mb-8">
        Follow Us
      </h3>

      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mb-6">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.link}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.5rem",
                      textDecoration: "none",
                    }}
            onMouseEnter={() => setHoveredIcon(social.name)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div
              className={` ${hoveredIcon === social.name} ? text-blue-500 : "text-blue-900"` }
            >
              {social.icon}
            </div>
          </a>
        ))}
      </div>

      <div className="!text-blue-900 text-center app-text-p">
        All rights reserved © {companyData.company_name} {currentYear}
      </div>
    </CompanyCard>
  );
}
