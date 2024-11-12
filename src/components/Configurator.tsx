// Configurator.js
"use client";
import { useState } from "react";
import Step1ShapeSelection from "./Step1ShapeSelection";
import Step2Dimensions from "./Step2Dimensions";
import StepIndicator from "./StepIndicator";
import Step3OpeningType from "./Step3OpeningType";
import Step4ProductResults from "./Step4ProductResults";

const Configurator = () => {
  const [step, setStep] = useState(1);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [selectedOpeningType, setOpeningType] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({
    width1: 0,
    width2: 0,
    depth1: 0,
  });
  const [height, setHeight] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-custom-color4 flex flex-col items-center justify-center">
      <StepIndicator step={step} totalSteps={4} />
      {step === 1 && (
        <Step1ShapeSelection
          selectedShape={selectedShape}
          setSelectedShape={setSelectedShape}
          nextStep={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2Dimensions
          selectedShape={selectedShape}
          dimensions={dimensions}
          setDimensions={setDimensions}
          height={height}
          setHeight={setHeight}
          prevStep={() => setStep(1)}
          nextStep={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <Step3OpeningType
          selectedOpeningType={selectedOpeningType}
          setOpeningType={setOpeningType}
          prevStep={() => setStep(2)}
          nextStep={() => setStep(4)}
        />
      )}
      {step === 4 && (
        <Step4ProductResults
          dimensions={dimensions}
          height={height}
          selectedOpeningType={selectedOpeningType}
          selectedShape={selectedShape}
          setStep={setStep}
        />
      )}
    </div>
  );
};

export default Configurator;
