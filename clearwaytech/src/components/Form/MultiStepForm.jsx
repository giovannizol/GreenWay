import React, { useState } from "react";
import FormTabs from "./FormTabs";
import DynamicForm from "./DynamicForm";
import "./Form.css";

const MultiStepForm = ({ steps, onComplete, onCancel, initialData = {} }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const isSummaryStep = currentStep === steps.length;

  const handleFinish = () => {
    console.log("Form Submitted:", formData);
    if (onComplete) onComplete(formData);
  };

  return (
    <div className="multistep-form-container">
      <FormTabs
        steps={[...steps, { title: "Riepilogo" }]}
        currentStep={currentStep}
      />

      {isSummaryStep ? (
        <div className="summary-container">
          <h3>Riepilogo Dati</h3>
          <p>
            Controlla i dati inseriti prima di procedere con l'invio del form.
          </p>
          <div style={{ marginTop: "20px" }}>
            {steps
              .flatMap((s) => s.fields)
              .map((field) => (
                <div key={field.name} className="summary-item">
                  <span className="summary-label">{field.label}:</span>
                  <span className="summary-value">
                    {formData[field.name] || "-"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <DynamicForm
          fields={steps[currentStep].fields}
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}

      <div className="form-footer">
        {currentStep > 0 && (
          <button className="btn-prev" onClick={prevStep}>
            Indietro
          </button>
        )}

        {!isSummaryStep ? (
          <button className="btn-next" onClick={nextStep}>
            Prossimo
          </button>
        ) : (
          <button className="btn-next" onClick={handleFinish}>
            Conferma e Chiudi
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
