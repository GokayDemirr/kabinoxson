import React, { useEffect } from "react";

interface DimensionPriceOption {
  width1Min: number;
  width1Max: number;
  width2Min: number;
  width2Max: number;
  color1Price: string; // Fiyat string olarak geliyor
  color2Price: string;
  color3Price: string;
}

interface DimensionValidatorProps {
  width1: number;
  width2: number;
  dimensionPrices: any; // dimensionPrices'ı doğru şekilde alıyoruz
  selectedColor: string; // Kullanıcının seçtiği renk
  onPriceSelected: (price: string | null) => void; // selectedPrice'ı üst bileşene gönderecek callback
}

const DimensionValidator: React.FC<DimensionValidatorProps> = ({
  width1,
  width2,
  dimensionPrices,
  selectedColor,
  onPriceSelected, // Callback prop
}) => {
  useEffect(() => {
    // "2030prices" üzerinden döngü başlatıyoruz
    if (dimensionPrices["2030prices"]) {
      Object.entries(dimensionPrices["2030prices"]).forEach(([key, option]) => {
        if (isDimensionPriceOption(option)) {
          const {
            width1Min,
            width1Max,
            width2Min,
            width2Max,
            color1Price,
            color2Price,
            color3Price,
          } = option;

          // İlk senaryo: width1 ve width2 arasındaki aralıklarla kontrol et
          if (
            width1 >= width1Min &&
            width1 <= width1Max &&
            width2 >= width2Min &&
            width2 <= width2Max
          ) {
            console.log(`Matching option: ${key} for width1 and width2`);

            // Seçilen renk fiyatını belirliyoruz
            let selectedPrice: string | null = getSelectedColorPrice(
              selectedColor,
              color1Price,
              color2Price,
              color3Price
            );

            // selectedPrice'ı üst bileşene gönderiyoruz
            onPriceSelected(selectedPrice);
            return; // Uygun seçenek bulunduğunda döngüden çıkıyoruz
          }

          // İkinci senaryo: width1 ve width2 yer değiştirerek aralıkları kontrol et
          if (
            width2 >= width1Min &&
            width2 <= width1Max &&
            width1 >= width2Min &&
            width1 <= width2Max
          ) {
            console.log(
              `Matching option: ${key} for swapped width1 and width2`
            );

            // Seçilen renk fiyatını belirliyoruz
            let selectedPrice: string | null = getSelectedColorPrice(
              selectedColor,
              color1Price,
              color2Price,
              color3Price
            );

            // selectedPrice'ı üst bileşene gönderiyoruz
            onPriceSelected(selectedPrice);
            return; // Uygun seçenek bulunduğunda döngüden çıkıyoruz
          }
        }
      });
    }
  }, [width1, width2, selectedColor, dimensionPrices, onPriceSelected]);

  return null; // Render etmeden sadece selectedPrice'ı üst bileşene gönderiyoruz
};

// Türü denetleyen yardımcı fonksiyon
function isDimensionPriceOption(
  option: unknown
): option is DimensionPriceOption {
  return (
    typeof option === "object" &&
    option !== null &&
    "width1Min" in option &&
    "width1Max" in option &&
    "width2Min" in option &&
    "width2Max" in option &&
    "color1Price" in option &&
    "color2Price" in option &&
    "color3Price" in option
  );
}

// Seçilen renk fiyatını döndüren yardımcı fonksiyon
function getSelectedColorPrice(
  selectedColor: string,
  color1Price: string,
  color2Price: string,
  color3Price: string
): string | null {
  switch (selectedColor) {
    case "color1":
      return color1Price;
    case "color2":
      return color2Price;
    case "color3":
      return color3Price;
    default:
      return null;
  }
}

export default DimensionValidator;
