import React from "react";

interface StepProps {
  step: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepProps> = ({ step, totalSteps }) => {
  // Eğer step totalSteps'ten büyükse null döner
  if (step > 3) return null;

  return (
    <div className="mb-4 text-center font-bold text-lg ">
      Adım {step} / {totalSteps}
    </div>
  );
};

export default StepIndicator;
