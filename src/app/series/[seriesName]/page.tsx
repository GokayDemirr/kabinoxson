"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import firestore from "@/firebase";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi"; // Importing the left arrow icon
import Image from "next/image"; // Import Image component

interface Product {
  id: string;
  seriesName: string;
  productCode: string;
  coverImage: string;
  fixedGlassThicknessOptions: string[];
  doorGlassThicknessOptions: string[];
  isPassive: boolean;
  gif: string;
}

const SeriesProducts: React.FC = () => {
  const { seriesName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter(); // Hook to access Next.js router

  useEffect(() => {
    const fetchProducts = async () => {
      const productsRef = collection(firestore, "Products");
      const q = query(productsRef, where("seriesName", "==", seriesName));
      const snapshot = await getDocs(q);
      const fetchedProducts: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        fetchedProducts.push({
          id: doc.id,
          seriesName: data.seriesName,
          productCode: data.productCode,
          coverImage: data.coverImage,
          fixedGlassThicknessOptions: data.fixedGlassThicknessOptions || [],
          doorGlassThicknessOptions: data.doorGlassThicknessOptions || [],
          isPassive: data.isPassive,
          gif: data.gif,
        });
      });

      // Filter out passive products and sort the remaining ones
      const activeProducts = fetchedProducts
        .filter((product) => !product.isPassive)
        .sort((a, b) => {
          // First, sort by seriesName alphabetically
          if (a.seriesName < b.seriesName) return -1;
          if (a.seriesName > b.seriesName) return 1;

          // If seriesName is the same, sort by productCode numerically
          return parseInt(a.productCode, 10) - parseInt(b.productCode, 10);
        });

      setProducts(activeProducts);
      setLoading(false);
    };

    fetchProducts();
  }, [seriesName]);

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image
          src="/spinner.svg" // spinner.svg dosyanızın yolu
          alt="Loading..."
          width={128} // Yükleme boyutu
          height={128} // Yükleme boyutu
        />
      </div>
    );
  }

  return (
    <div className="pt-20 px-8 bg-custom-color4 min-h-screen">
      <button
        onClick={handleBackClick}
        className="flex items-center text-xl font-semibold text-black/70 mb-6"
      >
        <FiArrowLeft className="mr-2" /> Seri Seçimine Geri Dön
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 min-h-screen">
        {products.map((product) => (
          <Link
            key={`${product.seriesName}-${product.productCode}`}
            href={`/${product.seriesName}-${product.productCode}`}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SeriesProducts;
