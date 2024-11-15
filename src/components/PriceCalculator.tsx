import React, { useCallback, useEffect, useState } from "react";
import DimensionValidator from "./DimensionValidator";

// Define a type for dimension options
interface DimensionPriceOption {
  dimension: { min: string; max: string }; // Adjusted to use numbers for easier comparisons
  color1Price: string; // Changed to string for consistency
  color2Price: string; // Changed to string for consistency
  color3Price: string; // Changed to string for consistency
}

// Main interface for the product object
interface PriceCalculatorProps {
  product: {
    cornerShape: string;
    seriesName: string;
    leftWidth: number;
    rightWidth?: number;
    depth: number;
    productCode: string;
    heightOptions: number[];
    centerMontagePrice: string; // Changed to number
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

      // Additional options can be added as needed
    };
    glassThicknessPricing: {
      glassThicknessExtra: string;
      price: string;
    }[];
    dimensions?: {
      // Add dimensions to your Product interface
      width1Min: number;
      width1Max: number;
      width2Min: number;
      width2Max: number;
      depth1Min: number;
      depth1Max: number;
    };
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
  const [isValidDimensions, setIsValidDimensions] = useState(true); // Yeni state

  const [width1, setWidth1] = useState<number | string>("");
  const [width2, setWidth2] = useState<number | string>("");
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
  const [showInputRequiredModal, setShowInputRequiredModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const parseDimension = (value: number | string) => {
    const parsedValue = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const validateDimensions = useCallback(() => {
    const width1Parsed = parseDimension(width1);
    const width2Parsed = parseDimension(width2);

    const leftWidthParsed = parseDimension(leftWidth);
    const rightWidthParsed = rightWidth
      ? parseDimension(rightWidth)
      : undefined;
    const depthParsed = parseDimension(depth);

    // 2030 modeline özel doğrulama
    const is2030Model = product.productCode.includes("2030");

    if (is2030Model) {
      // 2030 modeli için leftWidth ve rightWidth arasındaki ilişkiyi kontrol et
      if (
        width1Parsed < (product.dimensions?.width1Min || 0) ||
        width1Parsed > (product.dimensions?.width1Max || 0) ||
        width2Parsed! < (product.dimensions?.width2Min || 0) ||
        width2Parsed! > (product.dimensions?.width2Max || 0)
      ) {
        setIsValidDimensions(false);
      } else {
        setIsValidDimensions(true);
      }
    } else {
      // 2030 olmayan modeller için genel doğrulama
      if (
        (product.cornerShape === "2duvarAraPanel" &&
          (leftWidthParsed < (product.dimensions?.width1Min || 0) ||
            leftWidthParsed > (product.dimensions?.width1Max || 0) ||
            depthParsed < (product.dimensions?.depth1Min || 0) ||
            depthParsed > (product.dimensions?.depth1Max || 0))) ||
        (product.cornerShape === "2duvar" &&
          (leftWidthParsed < (product.dimensions?.width1Min || 0) ||
            leftWidthParsed > (product.dimensions?.width1Max || 0))) ||
        (product.cornerShape === "kose" &&
          (leftWidthParsed < (product.dimensions?.width1Min || 0) ||
            leftWidthParsed > (product.dimensions?.width1Max || 0) ||
            rightWidthParsed! < (product.dimensions?.width2Min || 0) ||
            rightWidthParsed! > (product.dimensions?.width2Max || 0))) ||
        (product.cornerShape === "duzDuvar" &&
          (leftWidthParsed < (product.dimensions?.width1Min || 0) ||
            leftWidthParsed > (product.dimensions?.width1Max || 0) ||
            depthParsed < (product.dimensions?.depth1Min || 0) ||
            depthParsed > (product.dimensions?.depth1Max || 0)))
      ) {
        setIsValidDimensions(false);
      } else {
        setIsValidDimensions(true);
      }
    }
  }, [leftWidth, rightWidth, depth, product, width1, width2]);

  useEffect(() => {
    validateDimensions(); // validateDimensions'ı useEffect içinde çağırıyoruz
  }, [leftWidth, rightWidth, depth, product, validateDimensions]);

  const handleSubmit = () => {
    // Check if all required fields are filled
    if (
      // For all products except those with '2030' in productCode, 'leftWidth' is required
      (product.productCode.includes("2030") ? false : !leftWidth) || // If '2030' in productCode, don't require 'leftWidth'
      (product.cornerShape === "kose" &&
        product.productCode.includes("2030") &&
        (!width1 || !width2)) || // width1 and width2 required for 'kose' shape with '2030'
      (product.cornerShape === "kose" &&
        !product.productCode.includes("2030") &&
        !rightWidth) || // Right width required for 'kose' shape (except for '2030')
      (product.cornerShape === "duzDuvar" && !depth) || // Depth required for 'duzDuvar' shape
      !cabinetColorOption ||
      !height ||
      !glassThicknessOption ||
      !glassColorOption ||
      !montageOption ||
      !maintenanceOption
    ) {
      // Alert the user if a required field is not filled
      setShowInputRequiredModal(true);
      return; // Prevent form submission
    }

    // If all required fields are filled, proceed with submission
    // Implement your form submission logic here
    setShowConfirmationModal(true); // Show the confirmation modal
  };

  const handleSelectedPrice = (price: string | null) => {
    setSelectedPrice(price);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false); // Close the confirmation modal
    closeModal(); // Close the price calculator modal
  };

  const closeInputRequiredModal = () => {
    setShowInputRequiredModal(false);
  };

  const openInputRequiredModal = () => {};

  const sortedMaintenancePrices = product.maintenancePrices
    ? Object.entries(product.maintenancePrices).sort(
        ([, { year: yearA }], [, { year: yearB }]) => yearA - yearB
      )
    : [];

  const calculateDimensionPrice = (
    dimensionType: string,
    dimensionValue: number | string
  ) => {
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

        return parseFloat(matchingOption[priceKey]);
      } else {
      }
    } else {
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let percentageSum = 0;
    let dimensionPrice = 0;

    // Step 1: Add dimension prices
    if (leftWidth)
      totalPrice += calculateDimensionPrice("leftWidth", leftWidth);
    if (rightWidth)
      totalPrice += calculateDimensionPrice("rightWidth", rightWidth);
    if (depth) totalPrice += calculateDimensionPrice("depth", depth);

    if (selectedPrice) {
      totalPrice += parseFloat(selectedPrice);
    }

    // Step 2: Add height price
    if (height && product.heightPrices) {
      const heightPriceEntry = Object.values(product.heightPrices).find(
        (entry) => entry.height === height.toString()
      );

      // Check if the selected height is not 200, then add the height price
      if (heightPriceEntry && height !== "200") {
        totalPrice += parseFloat(heightPriceEntry.price);
      }
    }

    // Step 3: Apply glass thickness percentage if selected
    if (glassThicknessOption) {
      const selectedThickness = product.glassThicknessPricing.find(
        (option) => option.glassThicknessExtra === glassThicknessOption
      );

      if (selectedThickness) {
        percentageSum += percentageSum + parseFloat(selectedThickness.price);
      }
    }

    // Step 4: Add the selected Glass Color price
    if (product.glassColorPrices && glassColorOption) {
      const selectedColor =
        product.glassColorPrices[
          glassColorOption as keyof typeof product.glassColorPrices
        ];
      if (selectedColor) {
        percentageSum += parseFloat(selectedColor.price);
      }
    }

    if (glassThicknessOption && glassColorOption) {
      totalPrice = totalPrice + (totalPrice * percentageSum) / 100;
    }

    // Step 5: Add the Easy Clean price if selected
    if (isCleaningChecked) {
      totalPrice += parseFloat(product.easyCleanPrice);
    }

    // Step 6: Add the selected Montage price
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

    // Step 7: Add the selected Maintenance price
    if (product.maintenancePrices) {
      const selectedMaintenance =
        product.maintenancePrices[
          `year${maintenanceOption}` as keyof typeof product.maintenancePrices
        ];
      if (selectedMaintenance) {
        totalPrice += selectedMaintenance.price;
      }
    }

    return totalPrice;
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-gray-500 bg-opacity-75">
      <div className="bg-white w-full max-w-md md:max-w-lg lg:max-w-xl  p-4 relative  ">
        <div className="md:text-2xl text-xl tracking-wider text-center  ">
          <div>
            {product.seriesName} - {product.productCode}
          </div>
        </div>

        <div>
          {/* Width Input */}
          {product.cornerShape === "2duvarAraPanel" && (
            <div className="">
              <label className="block text-sm font-medium">
                Genişlik* ({product.dimensions?.width1Min} -{" "}
                {product.dimensions?.width1Max} cm)
              </label>
              <input
                type="number"
                value={leftWidth}
                onChange={(e) => setLeftWidth(e.target.value)}
                className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <label className="block text-sm font-medium">
                Ara Panel Genişlik* ({product.dimensions?.depth1Min} -{" "}
                {product.dimensions?.depth1Max} cm)
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Text between inputs */}
              </div>
            </div>
          )}

          {product.cornerShape === "2duvar" && (
            <div className="">
              <label className="block text-sm font-medium ">
                Genişlik* ({product.dimensions?.width1Min} -{" "}
                {product.dimensions?.width1Max} cm)
              </label>
              <input
                type="number"
                value={leftWidth}
                onChange={(e) => setLeftWidth(e.target.value)}
                className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
          )}
          {/* Left and Right Width Inputs */}
          {product.cornerShape === "kose" &&
            product.productCode.includes("YP") && (
              <div className="">
                <label className="block text-sm font-medium ">
                  Ön Cephe Genişlik* ({product.dimensions?.width1Min} -{" "}
                  {product.dimensions?.width1Max} cm)
                </label>
                <input
                  type="number"
                  value={leftWidth}
                  onChange={(e) => setLeftWidth(e.target.value)}
                  className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500  "
                />
                <label className="block text-sm font-medium">
                  Yan Panel Genişlik* ({product.dimensions?.width2Min} -{" "}
                  {product.dimensions?.width2Max} cm)
                </label>
                <input
                  type="number"
                  value={rightWidth}
                  onChange={(e) => setRightWidth(e.target.value)}
                  className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>
            )}

          {product.cornerShape === "kose" &&
            product.productCode.includes("2030") && (
              <>
                {/* Your existing inputs */}
                <div className="">
                  <label className="block text-sm font-medium">
                    Sol Genişlik* ({product.dimensions?.width1Min} -{" "}
                    {product.dimensions?.width1Max} cm)
                  </label>
                  <input
                    type="number"
                    value={width2}
                    onChange={(e) => setWidth2(e.target.value)}
                    className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="block text-sm font-medium">
                    Sağ Genişlik* ({product.dimensions?.width2Min} -{" "}
                    {product.dimensions?.width2Max} cm)
                  </label>
                  <input
                    type="number"
                    value={width1}
                    onChange={(e) => setWidth1(e.target.value)}
                    className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* DimensionValidator component */}
                <DimensionValidator
                  width1={Number(width1)}
                  width2={Number(width2)}
                  dimensionPrices={product.dimensionPrices}
                  selectedColor={cabinetColorOption} // Renk bilgisi buraya gönderiliyor
                  onPriceSelected={handleSelectedPrice} // selectedPrice'ı burada güncelliyoruz
                />
              </>
            )}

          {product.cornerShape === "kose" &&
            !product.productCode.includes("YP") &&
            !product.productCode.includes("2030") && (
              <div className="">
                <label className="block text-sm font-medium ">
                  Sol Genişlik* ({product.dimensions?.width1Min} -{" "}
                  {product.dimensions?.width1Max} cm)
                </label>
                <input
                  type="number"
                  value={leftWidth}
                  onChange={(e) => setLeftWidth(e.target.value)}
                  className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
                <label className="block text-sm font-medium mb-1">
                  Sağ Genişlik* ({product.dimensions?.width2Min} -{" "}
                  {product.dimensions?.width2Max} cm)
                </label>
                <input
                  type="number"
                  value={rightWidth}
                  onChange={(e) => setRightWidth(e.target.value)}
                  className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
                />
              </div>
            )}

          {/* Width and Depth Inputs */}
          {product.cornerShape === "duzDuvar" && (
            <div className="">
              <label className="block text-sm font-medium ">
                Genişlik* ({product.dimensions?.width1Min} -{" "}
                {product.dimensions?.width1Max} cm)
              </label>
              <input
                type="number"
                value={leftWidth}
                onChange={(e) => setLeftWidth(e.target.value)}
                className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
              <label className="block text-sm font-medium ">
                Derinlik* ({product.dimensions?.depth1Min} -{" "}
                {product.dimensions?.depth1Max} cm)
              </label>
              <input
                type="number"
                value={depth}
                onChange={(e) => setDepth(e.target.value)}
                className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 ">
          {/* Kabin Rengi Seçenekleri Dropdown */}
          <div className="">
            <label className="block text-sm font-medium ">
              Kabin Rengi Seçenekleri*
            </label>
            <select
              value={cabinetColorOption}
              onChange={(e) => setCabinetColorOption(e.target.value)}
              className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
            <label className="block text-sm font-medium ">Yükseklik*</label>
            <select
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
            <label className="block text-sm font-medium ">Cam Kalınlığı*</label>
            <select
              value={glassThicknessOption}
              onChange={(e) => setGlassThicknessOption(e.target.value)}
              className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
            >
              <option value="">Seçiniz</option>

              {/* Check if glassThicknessPricing is defined and is an array */}
              {Array.isArray(product.glassThicknessPricing) &&
                product.glassThicknessPricing.map((thicknessOption) => (
                  <option
                    key={thicknessOption.glassThicknessExtra}
                    value={thicknessOption.glassThicknessExtra}
                  >
                    {thicknessOption.glassThicknessExtra} mm (+%
                    {thicknessOption.price})
                  </option>
                ))}
            </select>
          </div>

          {/* Glass Color Dropdown */}
          <div className="">
            <label className="block text-sm font-medium ">Cam Rengi*</label>
            <select
              value={glassColorOption}
              onChange={(e) => setGlassColorOption(e.target.value)}
              className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2  p-2 text-sm bg-white text-black border border-gray-300 rounded shadow-lg w-72 h-auto">
                    Camın kaydırma özelliğini artıran özel bir işlem sayesinde,
                    temizlik çok daha kolay hale gelir.
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Montage Dropdown */}
          <div className="">
            <label className="block text-sm font-medium ">Montaj*</label>
            <select
              value={montageOption}
              onChange={(e) => setMontageOption(e.target.value)}
              className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
            <label className="block text-sm font-medium  ">
              Yıllık Bakım Programı*
            </label>
            <select
              value={maintenanceOption}
              onChange={(e) => setMaintenanceOption(e.target.value)}
              className="border p-1 rounded-md w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 "
            >
              <option value="">Seçiniz</option>
              <option value="Yok">Yok</option>
              {sortedMaintenancePrices.map(([key, { year, price }]) => (
                <option key={key} value={year}>
                  {year} Yıl (+{price}€)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display the calculated total price */}
        {cabinetColorOption && (
          <div className="flex justify-between ">
            <div className="text-lg font-semibold">
              {isValidDimensions
                ? "Hesaplanan Liste Fiyatı:"
                : "Lütfen ölçüleri uygun aralıklarda giriniz"}
            </div>
            <div className="text-xl font-bold">
              {isValidDimensions ? `${calculateTotalPrice()}€` : ""}
            </div>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={closeModal}
            className="bg-red-500 text-white p-2 rounded-md w-full hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Kapat
          </button>
        </div>
      </div>
      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white w-full md:w-1/2 xl:w-1/4 p-4 rounded-md text-center">
            <div className=" ">Teklifiniz başarıyla verilmiştir.</div>
            <button
              onClick={closeConfirmationModal}
              className="bg-blue-500 text-white p-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Tamam
            </button>
          </div>
        </div>
      )}
      {showInputRequiredModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white w-full md:w-1/2 xl:w-1/4 p-4 rounded-md text-center">
            <div className=" ">Lütfen * ile işaretli alanları doldurunuz.</div>
            <button
              onClick={closeInputRequiredModal}
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
