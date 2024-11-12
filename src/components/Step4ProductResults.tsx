import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // Your previously defined ProductCard component
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import firestore from "@/firebase";
import { FiArrowLeft } from "react-icons/fi"; // Import the left arrow icon
import Link from "next/link";

interface Step4ProductResultsProps {
  dimensions: {
    width1: number;
    width2: number;
    depth1: number;
  };
  height: number | null;
  selectedOpeningType: string | null;
  selectedShape: string | null;
  setStep: (step: number) => void; // Add setStep prop
}

const Step4ProductResults: React.FC<Step4ProductResultsProps> = ({
  dimensions,
  height,
  selectedOpeningType,
  selectedShape,
  setStep,
}) => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const productsRef = collection(firestore, "Products");
      const snapshot = await getDocs(productsRef);
      const fetchedProducts: any[] = [];

      snapshot.forEach((doc) => {
        const product = doc.data();
        if (product.isPassive) return;

        const width1Valid =
          dimensions.width1 >= product.dimensions.width1Min &&
          dimensions.width1 <= product.dimensions.width1Max;
        const width2Valid =
          dimensions.width2 === 0 ||
          (dimensions.width2 >= product.dimensions.width2Min &&
            dimensions.width2 <= product.dimensions.width2Max);
        const depth1Valid =
          dimensions.depth1 === 0 ||
          (dimensions.depth1 >= product.dimensions.depth1Min &&
            dimensions.depth1 <= product.dimensions.depth1Max);

        const heightValid =
          height !== null && product.heightOptions.includes(height);
        const openingStyleValid = selectedOpeningType === product.openingStyle;
        const shapeValid = selectedShape === product.cornerShape;

        if (
          width1Valid &&
          width2Valid &&
          depth1Valid &&
          heightValid &&
          openingStyleValid &&
          shapeValid
        ) {
          fetchedProducts.push(product);
        }
      });

      setProducts(fetchedProducts);
      setIsLoading(false);
    };

    fetchProducts();
  }, [dimensions, height, selectedOpeningType, selectedShape]);

  const handleBackClick = () => {
    setStep(1); // Navigate back to Step 1
  };

  return (
    <div className="flex flex-col py-24">
      <div className="flex flex-start gap-24">
        <button
          onClick={handleBackClick}
          className="flex items-center text-xl font-semibold text-black/70 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Kabin Tasarlama Aracına Geri Dön
        </button>
        <div className="sm:text-3xl text-xl text-center m-4">
          Seçimlerinize uygun ürünlerimiz
        </div>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <p>Size uygun ürünler aranıyor...</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <Link
              key={`${product.seriesName}-${product.productCode}`} // Combine seriesName and productCode for a unique key
              href={`/${product.seriesName}-${product.productCode}`}
            >
              <ProductCard product={product} />
            </Link>
          ))
        ) : (
          <p>Uygun ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default Step4ProductResults;
