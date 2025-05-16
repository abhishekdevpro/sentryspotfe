// import React from 'react';

// const ProgressBar = ({ currentStep, totalSteps }) => {
//   const progress = (currentStep / totalSteps) * 100;

//   return (
//     <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
//       <div
//         className="bg-blue-600 h-2.5 rounded-full"
//         style={{ width: `${progress}%` }}
//       ></div>
//     </div>
//   );
// };

// export default ProgressBar;
import React from 'react';

const ProgressSteps = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between w-full px-4 py-2">
      {[...Array(totalSteps)].map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        
        return (
          <div key={stepNumber} className="flex flex-col items-center">
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center 
                ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
                font-bold transition-all duration-300
              `}
            >
              {stepNumber}
            </div>
            {index < totalSteps - 1 && (
              <div 
                className={`
                  w-16 h-1 mx-2 my-2 
                  ${stepNumber < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
                  transition-all duration-300
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressSteps;
