import { useState } from 'react';
import { Linkedin, Twitter, Facebook, Globe } from 'lucide-react';

// Footer component that takes company data as props
export default function SocialFooter({ 
  companyData = {
    company_name: "Your Company",
    linkedin_link: "#",
    twitter_link: "#",
    facebook_link: "#",
    website_link: "#",
    footer_color: "#4B5563" // Default gray-600
  }
}) {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const currentYear = new Date().getFullYear();
  
  // Social media icons with hover effects
  const socialLinks = [
    { 
      name: 'linkedin', 
      icon: <Linkedin size={24} />, 
      link: companyData.linkedin_link,
      label: "Find us on LinkedIn",
      hoverColor: "#0A66C2" 
    },
    { 
      name: 'twitter', 
      icon: <Twitter size={24} />, 
      link: companyData.twitter_link,
      label: "Find us on Twitter",
      hoverColor: "#1DA1F2" 
    },
    { 
      name: 'facebook', 
      icon: <Facebook size={24} />, 
      link: companyData.facebook_link,
      label: "Find us on Facebook",
      hoverColor: "#1877F2" 
    },
    { 
      name: 'website', 
      icon: <Globe size={24} />, 
      link: companyData.website_link,
      label: "Visit our website",
      hoverColor: "#10B981" 
    }
  ];

  return (
    <footer className="flex flex-col items-center justify-center text-center py-10" style={{ backgroundColor: companyData.footer_color || "#4B5563" }}>
      <h3 className="text-white font-semibold text-2xl mb-6">
        Follow Us
      </h3>
      
      <div className="flex items-center justify-center gap-5 mb-6">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.link}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white bg-opacity-10 transition-all duration-300 hover:bg-opacity-20 transform hover:scale-110"
            onMouseEnter={() => setHoveredIcon(social.name)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div style={{ 
              color: hoveredIcon === social.name ? social.hoverColor : "white"
            }}>
              {social.icon}
            </div>
          </a>
        ))}
      </div>
      
      <div className="text-white font-medium text-sm">
        All rights reserved © {companyData.company_name} {currentYear}
      </div>
    </footer>
  );
}
