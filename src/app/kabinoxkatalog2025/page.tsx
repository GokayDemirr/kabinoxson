"use client";
import React, { useState, useEffect } from "react";
import Catalog from "@/components/Catalog"; // Catalog bileşenini import et

const CatalogPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3 saniye sonra yükleme animasyonunu gizlemek için
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          {/* SVG Yükleme Animasyonu */}
          <img
            src="/spinner.svg" // public klasöründe spinner.svg'yi referans alıyoruz
            alt="Loading..."
            className="w-32 h-32" // Boyutları ayarlayın
          />
        </div>
      ) : (
        <Catalog />
      )}
    </div>
  );
};

export default CatalogPage;
