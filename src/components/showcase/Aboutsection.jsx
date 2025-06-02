import { Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { MdPhoto, MdEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

// Define default image if URLs are missing
const DEFAULT_IMAGE = "https://placehold.co/600x400/e2e8f0/1e293b?text=Company+Image";

const AboutSection = ({ companyData = {},userInfo, onSave }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: companyData?.title || "About Our Company",
    description: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
  });
  const [editData, setEditData] = useState({
    title: companyData?.title || "About Our Company",
    about: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
  });

  // Update local state when companyData changes
  useEffect(() => {
    setFormData({
      title: companyData?.title || "About Our Company",
      description: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
    });
    setEditData({
      title: companyData?.title || "About Our Company",
      about: companyData?.about || "We are a dedicated team committed to excellence and innovation in everything we do."
    });
  }, [companyData]);

  // Safe image URL getter with BASE_IMAGE_URL handling
  const getImageUrl = (imageKey, index) => {
    // Define placeholder images
    const placeholders = [
      "https://placehold.co/400x300/e2e8f0/1e293b?text=Company+Image+1",
      "https://placehold.co/400x300/e2e8f0/1e293b?text=Company+Image+2",
      "https://placehold.co/800x600/e2e8f0/1e293b?text=Company+Image+3"
    ];

    // Check if companyData or the specific image is missing
    if (!companyData || !companyData[imageKey] || !companyData[imageKey][index] || companyData[imageKey][index] === '') {
      return placeholders[index] || placeholders[0];
    }
    
    // Define BASE_IMAGE_URL
    const BASE_IMAGE_URL = "https://api.sentryspot.co.uk";
    const imageUrl = `${BASE_IMAGE_URL}${companyData[imageKey][index]}`;
    
    // Return the image URL if it exists, otherwise return placeholder
    return imageUrl || placeholders[index] || placeholders[0];
  };

  const handleEditClick = () => {
    navigate('/employers-dashboard/company-profile/?edit=about')
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleSave = () => {
    // Prepare data for saving
    const formData = new FormData();
    formData.append('title', editData.title);
    formData.append('about', editData.about);
    
    // Append images if any
    selectedImages.forEach((image) => {
      formData.append('about_images', image);
    });

    // Call the parent save handler
    if (onSave) {
      onSave(formData);
    }
    
    setIsPopupOpen(false);
    setSelectedImages([]);
  };

  // Function to safely render HTML content
  const renderHTML = (htmlContent) => {
    try {
      return { __html: htmlContent || '' };
    } catch (error) {
      console.error("Error parsing HTML:", error);
      return { __html: '' };
    }
  };

  return (
    <div className='py-8 mx-auto'>
      <section className="py-16 about-section bg-gray-50" id="about">
        <div className="auto-container max-w-7xl mx-auto px-4">
          <div className="row flex flex-col lg:flex-row">
            {/* Content Column - Left side with text */}
            <div className="content-column w-full lg:w-4/12 order-2 lg:order-1 relative mb-10 lg:mb-0">
              <div className="lg:absolute top-1/4 lg:-left-16 bg-white shadow-2xl rounded-3xl p-8 z-10">
                <span className="inline-block border-b-2 border-blue-600 w-36 mb-8"></span>
                <h2 className="title text-2xl sm:text-3xl text-gray-900 font-bold mb-6">
                  {formData.title || "About Our Company"}
                </h2>
                <div className="mb-8 text-gray-700 leading-relaxed">
                  {formData.description ? (
                    <div dangerouslySetInnerHTML={renderHTML(formData.description)} className="prose prose-gray max-w-none"></div>
                  ) : (
                    <p className="text-gray-700">We are a dedicated team committed to excellence and innovation in everything we do.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Image Column - Right side with images */}
            <div className="image-column w-full lg:w-8/12 order-1 lg:order-2">
              <figure className="image relative" data-aos="fade-right">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/3 w-full">
                    <img 
                      src={getImageUrl('about_images', 2)} 
                      alt="Culture 3" 
                      className="object-cover w-full h-full min-h-[300px] p-2 rounded-lg shadow-md" 
                    />
                  </div>
                  <div className="md:w-1/3 w-full grid grid-rows-2 gap-2">
                    <div className="p-2">
                      <img 
                        src={getImageUrl('about_images', 0)} 
                        alt="Culture 1" 
                        className="object-cover w-full h-full min-h-[150px] rounded-lg shadow-md" 
                      />
                    </div>
                    <div className="p-2">
                      <img 
                        src={getImageUrl('about_images', 1)} 
                        alt="Culture 2" 
                        className="object-cover w-full h-full min-h-[150px] rounded-lg shadow-md" 
                      />
                    </div>
                  </div>
                </div>
                <button className="absolute bottom-3 right-3 flex items-center gap-3 rounded-md p-2 px-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors shadow-lg">
                  <MdPhoto size={24} />
                  <span className="hidden sm:inline">View All Photos</span>
                </button>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;