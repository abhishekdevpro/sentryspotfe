
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import CompanyCard from "../ui/CompanyCard";
import { useEffect, useState } from "react";

export default function AboutSection2({ companyData }) {
  const navigate = useNavigate();

  const images =
    companyData?.about_images?.length > 0
      ? companyData.about_images.map(
          (img) => `https://api.sentryspot.co.uk${img}`
        )
      : [
          "https://picsum.photos/500/400?1",
          "https://picsum.photos/500/400?2",
          "https://picsum.photos/500/400?3",
        ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <CompanyCard
      id="why-choose-us"
      style={{ maxHeight: "calc(100vh - 300px)" }}
      // className="bg-gradient-to-br from-blue-200 to-blue-100 py-20"
    >
      <div className="max-w-6xl mx-auto md:px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="flex-1 text-left">
          <h2 className="app-text-h1 !text-blue-700 mb-8">
            {companyData?.company_name}
          </h2>

          {companyData?.about && (
            <div
              className="app-text-p"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(companyData.about),
              }}
            />
          )}
         
        </div>

        {/* Right Image */}
        <div className="flex-1 flex flex-col items-center">
          {/* Image */}
          <div className="w-full max-w-[500px] h-[400px] overflow-hidden rounded-xl shadow-lg border border-blue-100">
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out"
            />
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 w-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "bg-blue-500 scale-110"
                    : "bg-blue-200 hover:bg-blue-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </CompanyCard>
  );
}