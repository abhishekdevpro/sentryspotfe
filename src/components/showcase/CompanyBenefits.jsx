import { useState } from 'react';
import { Gift, Heart, Coffee, Baby, Gamepad, Shield, AlertTriangle } from 'lucide-react';

const CompanyBenefits = ({ companyData }) => {
  console.log(companyData, "companyData");

  // Define all benefits with their icons
  const allBenefits = [
    {
      icon: <Heart className="text-red-500" size={24} />,
      name: "Health Insurance",
      description: companyData.health_insurance_value,
      isShow: companyData.health_insurance,
    },
    {
      icon: <Gift className="text-blue-500" size={24} />,
      name: "24 hour Wellness Center",
      description: companyData.wellness_center_value,
      isShow: companyData.wellness_center,
    },
    {
      icon: <Coffee className="text-amber-600" size={24} />,
      name: "Cafeteria",
      description: companyData.cafeteria_value,
      isShow: companyData.cafeteria,
    },
    {
      icon: <Baby className="text-pink-500" size={24} />,
      name: "Maternity and Paternity Leave",
      description: companyData.maternity_leave_value,
      isShow: companyData.maternity_leave,
    },
    {
      icon: <Gamepad className="text-indigo-500" size={24} />,
      name: "Recreational Area",
      description: companyData.recreational_area_value,
      isShow: companyData.recreational_area,
    },
    {
      icon: <Shield className="text-green-500" size={24} />,
      name: "Life Insurance",
      description: companyData.life_insurance_value,
      isShow: companyData.life_insurance,
    },
    {
      icon: <AlertTriangle className="text-yellow-500" size={24} />,
      name: "Personal Accident Insurance",
      description: companyData.personal_accident_insurance_value,
      isShow: companyData?.personal_accident_insurance,
    },
  ];

  // Filter benefits to show only those with true values
  const activeBenefits = allBenefits.filter(item => item.isShow === true);

  return (
    <div className="bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">What Makes Us Unique</h2> */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What Makes Us Unique
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4"></div>

        </div>
        
        {activeBenefits.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {activeBenefits.map((item, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center bg-white p-6 rounded shadow-sm border border-gray-100 w-full sm:w-64"
              >
                <div className="mb-3 rounded-full bg-gray-50 p-3">
                  {item.icon}
                </div>
                <h3 className="font-medium text-gray-800 mb-2 text-center">{item.name}</h3>
                {item.description && (
                  <p className="text-sm text-gray-600 text-center mt-1">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No benefits information available.</p>
        )}
      </div>
    </div>
  );
};

export default CompanyBenefits;