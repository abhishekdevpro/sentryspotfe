import PropTypes from 'prop-types'; // Import PropTypes
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';

const CompanyInfo = ({ company }) => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        // If company is already an object with all required data, use it directly
        if (typeof company === 'object' && company !== null) {
          setCompanyData(company);
          return;
        }

        // If company is an ID, fetch the data
        const token = localStorage.getItem(Constant.USER_TOKEN);
        const headers = {};
        if (token) {
          headers.Authorization = token;
        }

        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/employeer/companies/${company}`,
          { headers }
        );

        if (response.data && response.data.data) {
          setCompanyData(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching company data:', err);
        setError('Failed to load company information');
      } finally {
        setLoading(false);
      }
    };

    if (company) {
      fetchCompanyData();
    }
  }, [company]);

  if (loading) {
    return <div className="bg-slate-50 p-6 rounded-lg max-w-md">Loading company information...</div>;
  }

  if (error || !companyData) {
    return <div className="bg-slate-50 p-6 rounded-lg max-w-md">Unable to load company information</div>;
  }

  return (
    <div className="bg-slate-50 p-6 rounded-lg max-w-md">
      <Link to={`/showcase/${companyData.id}`} className="text-blue-500 hover:text-blue-600 font-medium block mb-6">
        View company profile
      </Link>

      <div className="space-y-4">
        {companyData.title && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Company Name:</span>
            <span className="text-gray-600">{companyData.title}</span>
          </div>
        )}

        {companyData.company_industry?.name && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Primary industry:</span>
            <span className="text-gray-600">{companyData.company_industry.name}</span>
          </div>
        )}

        {companyData.company_size?.range && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Company size:</span>
            <span className="text-gray-600">{companyData.company_size.range}</span>
          </div>
        )}

        {companyData.founded_date && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Founded in:</span>
            <span className="text-gray-600">{companyData.founded_date}</span>
          </div>
        )}

        {companyData.phone && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Phone:</span>
            <span className="text-gray-600">{companyData.phone}</span>
          </div>
        )}

        {companyData.email && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Email:</span>
            <a href={`mailto:${companyData.email}`} className="text-gray-600 hover:text-blue-500">
              {companyData.email}
            </a>
          </div>
        )}

        {(companyData.city?.name || companyData.country?.name) && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Location:</span>
            <span className="text-gray-600">
              {companyData.city?.name || ""} 
              {companyData.city?.name && companyData.country?.name ? ', ' : ''}
              {companyData.country?.name || ""}
            </span>
          </div>
        )}

        {(companyData.facebook_link || companyData.twitter_link || companyData.linkedin_link) && (
          <div className="flex justify-between items-center">
            <span className="text-gray-900 font-medium">Social media:</span>
            <div className="flex space-x-3">
              {companyData.facebook_link && (
                <a href={companyData.facebook_link} className="text-gray-500 hover:text-blue-500">
                  <Facebook size={18} />
                </a>
              )}
              {companyData.twitter_link && (
                <a href={companyData.twitter_link} className="text-gray-500 hover:text-blue-500">
                  <Twitter size={18} />
                </a>
              )}
              {companyData.linkedin_link && (
                <a href={companyData.linkedin_link} className="text-gray-500 hover:text-blue-500">
                  <Linkedin size={18} />
                </a>
              )}
            </div>
          </div>
        )}

        {companyData.website_link && (
          <a
            href={
              companyData.website_link.startsWith("http://") || companyData.website_link.startsWith("https://")
                ? companyData.website_link
                : `https://${companyData.website_link}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block text-center bg-blue-100 text-blue-500 py-3 rounded-lg hover:bg-blue-200 transition-colors duration-200"
          >
            Company Website
          </a>
        )}
      </div>
    </div>
  );
};

// Prop validation
CompanyInfo.propTypes = {
  company: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
};

export default CompanyInfo;