import React, { useState } from "react";

interface DimensionPriceOption {
  dimension: { min: string; max: string };
  color1Price: string;
  color2Price: string;
  color3Price: string;
}

interface PriceCalculatorProps {
  product: {
    cornerShape: string;
    seriesName: string;
    productCode: string;
    heightOptions: number[];
    centerMontagePrice: string; // Burayı string yerine number yapıyoruz
    easyCleanPrice: string;
    montagePrices: {
      montage1: { name: string; price: number };
      montage2: { name: string; price: number };
      montage3: { name: string; price: number };
    } | null;
    maintenancePrices: {
      year1: { year: number; price: number };
      year2: { year: number; price: number };
      year3: { year: number; price: number };
    } | null;
    glassColorPrices: {
      color1: { color: string; price: string };
      color2: { color: string; price: string };
      color3: { color: string; price: string };
    } | null;
    heightPrices: {
      height1: { height: string; price: string };
      height2: { height: string; price: string };
      height3: { height: string; price: string };
    } | null;
    dimensionPrices: {
      option1: DimensionPriceOption;
      option2: DimensionPriceOption;
      // Other options can go here
    };
    glassThicknessPricing: {
      glassThicknessExtra: string;
      price: string;
    }[];
  };
  closeModal: () => void;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  product,
  closeModal,
}) => {
  const [width, setWidth] = useState<number | string>("");
  const [leftWidth, setLeftWidth] = useState<number | string>("");
  const [rightWidth, setRightWidth] = useState<number | string>("");
  const [depth, setDepth] = useState<number | string>("");
  const [height, setHeight] = useState<number | string>("");
  const [isCleaningChecked, setIsCleaningChecked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [montageOption, setMontageOption] = useState<string>("");
  const [maintenanceOption, setMaintenanceOption] = useState<string>("");
  const [glassColorOption, setGlassColorOption] = useState<string>("");
  const [cabinetColorOption, setCabinetColorOption] = useState<string>("");
  const [glassThicknessOption, setGlassThicknessOption] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSubmit = () => {
    setShowConfirmationModal(true); // Show confirmation modal when button is clicked
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
    closeModal(); // Close the price calculator modal
  };

  const sortedMaintenancePrices = product.maintenancePrices
    ? Object.entries(product.maintenancePrices).sort(
        ([, { year: yearA }], [, { year: yearB }]) => yearA - yearB
      )
    : [];

  const calculateDimensionPrice = (
    dimensionType: string,
    dimensionValue: number | string
  ) => {
    console.log(
      `Checking dimension pricing for ${dimensionType} with value:`,
      dimensionValue
    );

    const dimensionPrice =
      product.dimensionPrices[
        dimensionType as keyof typeof product.dimensionPrices
      ];

    if (dimensionPrice) {
      // Check all options
      const matchingOption = Object.values(dimensionPrice).find((option) => {
        // Convert min and max to numbers for comparison
        const minValue = parseFloat(option.dimension.min);
        const maxValue = parseFloat(option.dimension.max);
        const dimensionValueParsed = parseFloat(dimensionValue.toString());

        return (
          minValue <= dimensionValueParsed && dimensionValueParsed <= maxValue
        );
      });

      if (matchingOption) {
        // Adjust the color price selection to use the cabinet color options
        const priceKey = `color${
          cabinetColorOption === "color1"
            ? 1
            : cabinetColorOption === "color2"
            ? 2
            : 3
        }Price`;

        console.log(`Adding ${priceKey} price:`, matchingOption[priceKey]);
        return parseFloat(matchingOption[priceKey]);
      } else {
        console.log("No matching option found for this dimension value.");
      }
    } else {
      console.log(`No dimension prices found for ${dimensionType}.`);
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Add the Easy Clean price if selected
    if (isCleaningChecked) {
      totalPrice += parseFloat(product.easyCleanPrice);
    }

    // Add the selected Montage price
    if (montageOption === "Merkez") {
      totalPrice += parseFloat(product.centerMontagePrice);
    } else if (product.montagePrices && montageOption) {
      const selectedMontage =
        product.montagePrices[
          montageOption as keyof typeof product.montagePrices
        ];
      if (selectedMontage) {
        totalPrice += selectedMontage.price;
      }
    }

    // Add the selected Maintenance price
    if (product.maintenancePrices) {
      const selectedMaintenance =
        product.maintenancePrices[
          `year${maintenanceOption}` as keyof typeof product.maintenancePrices
        ];
      if (selectedMaintenance) {
        totalPrice += selectedMaintenance.price;
      }
    }

    // Add the selected Glass Color price
    if (product.glassColorPrices && glassColorOption) {
      const selectedColor =
        product.glassColorPrices[
          glassColorOption as keyof typeof product.glassColorPrices
        ];
      if (selectedColor) {
        totalPrice =
          (totalPrice * parseFloat(selectedColor.price)) / 100 + totalPrice;
      }
    }

    // Add dimension prices
    if (leftWidth)
      totalPrice += calculateDimensionPrice("leftWidth", leftWidth);
    if (rightWidth)
      totalPrice += calculateDimensionPrice("rightWidth", rightWidth);
    if (depth) totalPrice += calculateDimensionPrice("depth", depth);

    // Add height price
    if (height && product.heightPrices) {
      const heightPriceEntry = Object.values(product.heightPrices).find(
        (entry) => entry.height === height.toString()
      );

      // Check if the selected height is not 200, then add the height price
      if (heightPriceEntry && height !== "200") {
        totalPrice = totalPrice += parseFloat(heightPriceEntry.price);
      }
    }

    // Add glass thickness price if selected
    if (glassThicknessOption) {
      const selectedThickness = product.glassThicknessPricing.find(
        (option) => option.glassThicknessExtra === glassThicknessOption
      );

      if (selectedThickness) {
        totalPrice += parseFloat(selectedThickness.price);
        console.log("Added Glass Thickness price:", selectedThickness.price);
      }
    }

    return totalPrice;
  };
  console.log("glassThicknessPricing:", product.glassThicknessPricing); // Add this line to log the array

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-gray-500 bg-opacity-75">
      <div className="bg-white w-1/4 p-4 rounded-md relative">
        {/* Modal close button positioned outside the modal content */}
        <button
          onClick={closeModal}
          className="absolute top-8 right-6 text-2xl text-red-500 font-bold"
        >
          X
        </button>

        <div className="text-2xl tracking-wider text-center mt-12">
          <div>
            {product.seriesName} - {product.productCode}
          </div>
        </div>
        <div>
          {/* Width Input */}
          {product.cornerShape === "2duvar" && (
            <div className="">
              <label className="block text-sm font-medium mb-1">Genişlik</label>
              <input
                type="number"
                value={leftWidth}
                onChange={(e) => setLeftWidth(e.target.value)}
                className="border p-1 mb-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Left and Right Width Inputs */}
          {product.cornerShape === "kose" &&
            product.productCode.includes("YP") && (
              <div className="">
                <label className="block text-sm font-medium mb-1">
                  Ön Cephe Genişlik
                </label>
                <input
                  type="number"
                  value={leftWidth}
                  onChange={(e) => setLeftWidth(e.target.value)}
                  className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
                <label className="block text-sm font-medium mb-1">
                  Yan Panel Genişlik
                </label>
                <input
                  type="number"
                  value={rightWidth}
                  onChange={(e) => setRightWidth(e.target.value)}
                  className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

          {product.cornerShape === "kose" &&
            !product.productCode.includes("YP") && (
              <div className="">
                <label className="block text-sm font-medium mb-1">
                  Sol Genişlik
                </label>
                <input
                  type="number"
                  value={leftWidth}
                  onChange={(e) => setLeftWidth(e.target.value)}
                  className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
                <label className="block text-sm font-medium mb-1">
                  Sağ Genişlik
                </label>
                <input
                  type="number"
                  value={rightWidth}
                  onChange={(e) => setRightWidth(e.target.value)}
                  className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

          {/* Width and Depth Inputs */}
          {product.cornerShape === "duzDuvar" && (
            <div className="">
              <label className="block text-sm font-medium mb-1">
                Sol Genişlik
              </label>
              <input
                type="number"
                value={leftWidth}
                onChange={(e) => setLeftWidth(e.target.value)}
                className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <label className="block text-sm font-medium mb-1">
                Yan Panel
              </label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          {/* Kabin Rengi Seçenekleri Dropdown */}
          <div className="">
            <label className="block text-sm font-medium mb-1">
              Kabin Rengi Seçenekleri
            </label>
            <select
              value={cabinetColorOption}
              onChange={(e) => setCabinetColorOption(e.target.value)}
              className="border p-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="">Seçiniz</option>
              {/* Replace this with actual cabinet color options */}
              <option value="color1" className="text-sm">
                Krom / Parlak - Satin - Mat
              </option>
              <option value="color2" className="text-sm">
                PVD - Titanium Coating Bronz - Rose Gold - Gold vs.
              </option>
              <option value="color3" className="text-sm">
                Boya Kaplama / Siyah - Moka - Kum Beji
              </option>
            </select>
          </div>

          <div className="">
            <label className="block text-sm font-medium mb-1">Yükseklik</label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border p-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="">Seçiniz</option>
              {product.heightOptions.map((heightOption) => {
                // Check if there is an associated price for this height in heightPrices
                const heightPriceEntry = product.heightPrices
                  ? Object.values(product.heightPrices).find(
                      (entry) => entry.height === heightOption.toString()
                    )
                  : null;

                return (
                  <option key={heightOption} value={heightOption}>
                    {heightOption === 200
                      ? `${heightOption} cm` // For height 200, display only the height
                      : `${heightOption} cm (+${heightPriceEntry?.price}€)`}{" "}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="">
            <label className="block text-sm font-medium mb-1">
              Cam Kalınlığı
            </label>
            <select
              value={glassThicknessOption}
              onChange={(e) => setGlassThicknessOption(e.target.value)}
              className="border p-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            >
              <option value="">Seçiniz</option>

              {/* Check if glassThicknessPricing is defined and is an array */}
              {Array.isArray(product.glassThicknessPricing) &&
                product.glassThicknessPricing.map((thicknessOption) => (
                  <option
                    key={thicknessOption.glassThicknessExtra}
                    value={thicknessOption.glassThicknessExtra}
                  >
                    {thicknessOption.glassThicknessExtra} mm (+
                    {thicknessOption.price}€)
                  </option>
                ))}
            </select>
          </div>

          {/* Glass Color Dropdown */}
          <div className="">
            <label className="block text-sm font-medium mb-1">
              Özel Renk Cam
            </label>
            <select
              value={glassColorOption}
              onChange={(e) => setGlassColorOption(e.target.value)}
              className="border p-2 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seçiniz</option>
              {product.glassColorPrices &&
                Object.entries(product.glassColorPrices)
                  .sort(
                    ([keyA, { price: priceA }], [keyB, { price: priceB }]) =>
                      parseFloat(priceA) - parseFloat(priceB)
                  ) // Sort by price in ascending order
                  .map(([key, { color, price }]) => (
                    <option key={key} value={key}>
                      {color} (+%{price})
                    </option>
                  ))}
            </select>
          </div>

          {/* Kolay Temizlik Checkbox */}
          <div className="flex items-center ">
            <input
              type="checkbox"
              id="easyCleanCheckbox"
              checked={isCleaningChecked}
              onChange={() => setIsCleaningChecked(!isCleaningChecked)}
              className="mr-2"
            />
            <label
              htmlFor="easyCleanCheckbox"
              className="text-sm cursor-pointer flex gap-2"
            >
              Easy Clean (+{product.easyCleanPrice}€){" "}
              <div
                className="text-blue-600 dark:text-blue-500 hover:underline relative"
                onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
                onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when mouse leaves
              >
                ?{/* Tooltip bubble */}
                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 text-sm bg-white text-black border border-gray-300 rounded shadow-lg w-72 h-auto">
                    Camın kaydırma özelliğini artıran özel bir işlem sayesinde,
                    temizlik çok daha kolay hale gelir.
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Montage Dropdown */}
          <div className="">
            <label className="block text-sm font-medium mb-1">Montaj</label>
            <select
              value={montageOption}
              onChange={(e) => setMontageOption(e.target.value)}
              className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seçiniz</option>
              <option value="Merkez">
                Merkez (+{product.centerMontagePrice}€)
              </option>
              {product.montagePrices &&
                Object.entries(product.montagePrices)
                  .sort(
                    ([keyA, { price: priceA }], [keyB, { price: priceB }]) =>
                      priceA - priceB
                  ) // Sort by price in ascending order
                  .map(([key, { name, price }]) => (
                    <option key={key} value={key}>
                      +{name} km (+{price}€)
                    </option>
                  ))}
            </select>
          </div>

          {/* Yıllık Bakım Programı Dropdown */}
          <div className="">
            <label className="block text-sm font-medium mb-1">
              Yıllık Bakım Programı
            </label>
            <select
              value={maintenanceOption}
              onChange={(e) => setMaintenanceOption(e.target.value)}
              className="border p-3 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seçiniz</option>
              {sortedMaintenancePrices.map(([key, { year, price }]) => (
                <option key={key} value={year}>
                  {year} Yıl (+{price}€)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display the calculated total price */}
        <div className="flex justify-between mt-6 ">
          <div className="text-lg font-semibold">Hesaplanan Liste Fiyatı: </div>
          <div className="text-xl font-bold">{calculateTotalPrice()}€</div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-3 rounded-md w-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Teklif Ver
        </button>
      </div>
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white w-1/4 p-4 rounded-md text-center">
            <h2 className="text-xl font-bold">
              Teklifiniz başarıyla verilmiştir.
            </h2>
            <button
              onClick={closeConfirmationModal}
              className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
