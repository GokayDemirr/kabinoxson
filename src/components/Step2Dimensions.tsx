"use client";
import React from "react";

interface Step2Props {
  selectedShape: string | null;
  dimensions: {
    width1: number; // Width for "2 duvar" and "Küvet üstü"
    width2: number; // Width for "Köşe"
    depth1: number; // Depth for "Düz duvar"
  };
  setDimensions: React.Dispatch<
    React.SetStateAction<{
      width1: number;
      width2: number;
      depth1: number;
    }>
  >;
  height: number | null; // Height can be null initially
  setHeight: React.Dispatch<React.SetStateAction<number | null>>; // Setter for height
  prevStep: () => void;
  nextStep: () => void;
}

const heightOptions = Array.from({ length: 11 }, (_, i) => 150 + i * 10);

const Step2Dimensions: React.FC<Step2Props> = ({
  selectedShape,
  dimensions,
  setDimensions,
  height,
  setHeight,
  prevStep,
  nextStep,
}) => {
  console.log("Dimensions:", dimensions);
  console.log("Height:", height);

  const handleDimensionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const numericValue = value ? Number(value) : null; // Boş değer durumunu kontrol et
    setDimensions((prev) => ({ ...prev, [name]: numericValue }));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value); // Convert to number
    setHeight(value);
  };

  const handlePrevStep = () => {
    // Reset dimensions and height when going to the previous step
    setDimensions({ width1: 0, width2: 0, depth1: 0 });
    setHeight(null);
    prevStep();
  };

  // Butonun görünür olup olmadığını kontrol et
  const isFormValid = () => {
    const { width1, width2, depth1 } = dimensions;
    const isHeightSelected = height !== null;

    // Genişlik ve derinlik değerlerinin boş olmaması
    return (
      (selectedShape === "2duvar" || selectedShape === "kuvetUstu"
        ? width1 > 0
        : true) &&
      (selectedShape === "kose" ? width1 > 0 && width2 > 0 : true) &&
      (selectedShape === "duzDuvar" ? width1 > 0 && depth1 > 0 : true) &&
      isHeightSelected
    );
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-black">
        Ölçülerinizi Giriniz
      </h2>
      <div className="space-y-4">
        {selectedShape === "2duvar" && (
          <>
            <label className="block text-sm font-medium ">Genişlik (cm)</label>
            <input
              type="number"
              name="width1"
              placeholder="Genişlik"
              value={dimensions.width1 || ""}
              onChange={handleDimensionChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium ">Yükseklik (cm)</label>
            <select
              name="height"
              value={height || ""}
              onChange={handleHeightChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Yükseklik Seçiniz
              </option>{" "}
              {/* Default no selection */}
              {heightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedShape === "kose" && (
          <>
            <label className="block text-sm font-medium ">
              Sol Genişlik (cm)
            </label>
            <input
              type="number"
              name="width1"
              placeholder="Sol Genişlik"
              value={dimensions.width1 || ""}
              onChange={handleDimensionChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium ">
              Sağ Genişlik (cm)
            </label>
            <input
              type="number"
              name="width2"
              placeholder="Sağ Genişlik"
              value={dimensions.width2 || ""}
              onChange={handleDimensionChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium ">Yükseklik (cm)</label>
            <select
              name="height"
              value={height || ""}
              onChange={handleHeightChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Yükseklik Seçiniz
              </option>{" "}
              {/* Default no selection */}
              {heightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedShape === "duzDuvar" && (
          <>
            <label className="block text-sm font-medium ">Genişlik (cm)</label>
            <input
              type="number"
              name="width1"
              placeholder="Genişlik"
              value={dimensions.width1 || ""}
              onChange={handleDimensionChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium ">Derinlik (cm)</label>
            <input
              type="number"
              name="depth1"
              placeholder="Derinlik"
              value={dimensions.depth1 || ""}
              onChange={handleDimensionChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium ">Yükseklik (cm)</label>
            <select
              name="height"
              value={height || ""}
              onChange={handleHeightChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Yükseklik Seçiniz
              </option>{" "}
              {/* Default no selection */}
              {heightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}

        {selectedShape === "kuvetUstu" && (
          <>
            <label className="block text-sm font-medium ">Genişlik (cm)</label>
            <input
              type="number"
              name="width1"
              placeholder="Genişlik"
              value={dimensions.width1 || ""}
              onChange={handleDimensionChange}
              className="w-full p-2 border rounded"
            />
            <label className="block text-sm font-medium ">Yükseklik (cm)</label>
            <select
              name="height"
              value={height || ""}
              onChange={handleHeightChange}
              className="w-full p-2 border rounded"
            >
              <option value="" disabled>
                Yükseklik Seçiniz
              </option>{" "}
              {/* Default no selection */}
              {heightOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-4 py-2 bg-red-500 text-white  rounded hover:bg-red-500/50"
          onClick={handlePrevStep} // Call the modified function
        >
          Önceki Adım
        </button>
        {isFormValid() ? ( // Butonun görünür olup olmadığını kontrol et
          <button
            className="px-4 py-2 bg-black/80 text-white rounded hover:bg-black/50"
            onClick={nextStep}
          >
            Devam Et
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-black/80 text-white rounded opacity-50 cursor-not-allowed"
            disabled // Tıklanamaz hale getir
          >
            Devam Et
          </button>
        )}
      </div>
    </>
  );
};

export default Step2Dimensions;
