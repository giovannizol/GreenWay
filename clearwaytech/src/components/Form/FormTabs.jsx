import React from 'react';

const FormTabs = ({ steps, currentStep }) => {
  return (
    <div className="form-tabs">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <div 
            key={index} 
            className={`form-tab ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          >
            {step.title}
          </div>
        );
      })}
    </div>
  );
};

export default FormTabs;
