"use client";
import { useState } from "react";

interface StepProps {
  step: number;
  totalSteps: number;
}

const steps = [
  { label: "2 duvar arası", image: "/2duvar.jpg" },
  { label: "Köşe", image: "/kose.jpg" },
  { label: "Düz duvar", image: "/duzduvar.jpg" },
  { label: "Küvet üstü", image: "/kuvet.jpg" },
];

const heightOptions = Array.from({ length: 11 }, (_, i) => 150 + i * 10);

const Configurator = () => {
  const [step, setStep] = useState(1);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({
    width: "",
    depth: "",
    leftWidth: "",
    rightWidth: "",
    height: "",
  });

  const handleShapeSelect = (shape: string) => {
    setSelectedShape(shape);
  };

  const handleDimensionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setDimensions({
      ...dimensions,
      [e.target.name]: e.target.value,
    });
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4 text-white">
              İstediğiniz köşe şeklini seçiniz
            </h2>
            <div className="flex flex-wrap gap-4">
              {steps.map((shape) => (
                <div
                  key={shape.label}
                  className={`border p-4 rounded-lg text-center cursor-pointer transition flex flex-col items-center ${
                    selectedShape === shape.label ? "bg-gray-200" : "bg-white"
                  }`}
                  onClick={() => handleShapeSelect(shape.label)}
                >
                  <img
                    src={shape.image}
                    alt={shape.label}
                    className="mx-auto mb-2 w-48 h-48"
                  />
                  <span>{shape.label}</span>
                </div>
              ))}
            </div>
            {selectedShape && (
              <div className="mt-6 flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setStep(2)}
                >
                  Devam Et
                </button>
              </div>
            )}
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Ölçülerinizi Giriniz
            </h2>
            <div className="space-y-4">
              {selectedShape === "2 duvar arası" && (
                <>
                  <label className="block text-sm font-medium text-white">
                    Genişlik (cm)
                  </label>
                  <input
                    type="text"
                    name="width"
                    placeholder="Genişlik"
                    value={dimensions.width}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium text-white">
                    Yükseklik (cm)
                  </label>
                  <select
                    name="height"
                    value={dimensions.height}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  >
                    {heightOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {selectedShape === "Köşe" && (
                <>
                  <label className="block text-sm font-medium text-white">
                    Sol Genişlik (cm)
                  </label>
                  <input
                    type="text"
                    name="leftWidth"
                    placeholder="Sol Genişlik"
                    value={dimensions.leftWidth}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium text-white">
                    Sağ Genişlik (cm)
                  </label>
                  <input
                    type="text"
                    name="rightWidth"
                    placeholder="Sağ Genişlik"
                    value={dimensions.rightWidth}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium text-white">
                    Yükseklik (cm)
                  </label>
                  <select
                    name="height"
                    value={dimensions.height}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  >
                    {heightOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {selectedShape === "Düz duvar" && (
                <>
                  <label className="block text-sm font-medium text-white">
                    Genişlik (cm)
                  </label>
                  <input
                    type="text"
                    name="width"
                    placeholder="Genişlik"
                    value={dimensions.width}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium text-white">
                    Derinlik (cm)
                  </label>
                  <input
                    type="text"
                    name="depth"
                    placeholder="Derinlik"
                    value={dimensions.depth}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium text-white">
                    Yükseklik (cm)
                  </label>
                  <select
                    name="height"
                    value={dimensions.height}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  >
                    {heightOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              )}
              {selectedShape === "Küvet üstü" && (
                <>
                  <label className="block text-sm font-medium text-white">
                    Genişlik (cm)
                  </label>
                  <input
                    type="text"
                    name="width"
                    placeholder="Genişlik"
                    value={dimensions.width}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  />
                  <label className="block text-sm font-medium text-white">
                    Yükseklik (cm)
                  </label>
                  <select
                    name="height"
                    value={dimensions.height}
                    onChange={handleDimensionChange}
                    className="w-full p-2 border rounded"
                  >
                    <option value="150">150</option>
                    <option value="160">160</option>
                  </select>
                </>
              )}
            </div>
            <div className="mt-6 flex justify-center gap-4">
              {step > 1 && (
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setStep(step - 1)}
                >
                  Önceki Adım
                </button>
              )}
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setStep(3)}
              >
                Devam Et
              </button>
            </div>
          </>
        );
      case 3:
        return (
          <div>
            Sonraki adım
            <div className="mt-6 flex justify-center gap-4">
              {step > 1 && (
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setStep(step - 1)}
                >
                  Önceki Adım
                </button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 flex items-center justify-center h-screen">
      {" "}
      {/* Ekranı ortala */}
      <div>
        {" "}
        {/* İçeriği ortalamak için bir kapsayıcı */}
        <StepIndicator step={step} totalSteps={3} />
        {renderStepContent()}
      </div>
    </div>
  );
};

const StepIndicator: React.FC<StepProps> = ({ step, totalSteps }) => (
  <div className="mb-6 font-bold text-lg text-white">
    Adım {step} / {totalSteps}
  </div>
);

export default Configurator;
