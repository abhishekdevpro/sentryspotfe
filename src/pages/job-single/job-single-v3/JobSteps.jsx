import React from 'react';
import { Briefcase, User, Phone, Rocket } from 'lucide-react';

export default function JobStepsComponent() {
  const steps = [
    {
      icon: <Briefcase size={24} />,
      title: "Apply for job",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <User size={24} />,
      title: "Create profile",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Phone size={24} />,
      title: "Schedule interview",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <Rocket size={24} />,
      title: "Get hired",
      color: "bg-blue-100 text-blue-600"
    }
  ];

  return (
    <div className="w-full bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold text-blue-800 mb-6">Get your career on fast track in 4 simple steps:</h2>
      
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`${step.color} p-3 rounded-full mb-2`}>
              {step.icon}
            </div>
            <span className="text-sm text-blue-800 font-medium text-center">
              {step.title}
            </span>
            
            {index < steps.length - 1 && (
              <div className="hidden sm:block absolute">
                <div className="w-12 h-px bg-blue-200 mx-2 mt-6" style={{ marginLeft: '60px' }}></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}