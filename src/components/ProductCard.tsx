import React from "react";
import Image from "next/image";

interface ProductCardProps {
  product: {
    doorGlassThicknessOptions: string[];
    fixedGlassThicknessOptions: string[];
    seriesName: string;
    productCode: string;
    coverImage: string;
    gif: string | null; // Add gif field, allowing for null values
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-2 flex flex-col  items-center">
      <span className="text-xl sm:text-2xl font-medium tracking-wider mb-2 ">
        {product.seriesName + " " + product.productCode}
      </span>
      <Image
        src={product.coverImage}
        alt={`${product.seriesName} ${product.productCode}`}
        className="rounded-md  mb-4"
        width={400} // Adjusted for better responsiveness
        height={400} // Adjusted for better responsiveness
      />

      <div className="flex justify-center gap-2 sm:gap-0 sm:justify-between	 lg:px-6 w-full ">
        <div className="flex flex-col items-center ">
          <Image
            src="/thickness-icon.png"
            alt="Thickness Icon"
            className="rounded-md object-cover w-10 h-10 xl:w-12 xl:h-12"
            width={48}
            height={48}
          />
          <span className="font-bold lg:text-base sm:text-sm">
            Cam Kalınlığı
          </span>
          <span className="text-sm sm:text-xs">
            Sabit:{" "}
            {product.fixedGlassThicknessOptions
              .map((option) => `${option}mm`)
              .join(", ")}
          </span>
          <span className="text-sm sm:text-xs">
            Kapı:{" "}
            {product.doorGlassThicknessOptions
              .map((option) => `${option}mm`)
              .join(", ")}
          </span>
        </div>

        <div className="flex flex-col items-center">
          {/* Conditionally render the GIF only if product.gif is not empty or null */}
          {product.gif && product.gif.trim() !== "" ? (
            <div className="overflow-hidden  sm:w-24 sm:h-24 lg:w-32 lg:h-32">
              <Image
                src={product.gif}
                alt="Product GIF"
                width={128}
                height={128}
                className="object-cover transform scale-105 rounded-md"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
