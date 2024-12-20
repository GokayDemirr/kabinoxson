"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firestore from "@/firebase";
import SeriesCard from "@/components/SeriesCard";
import Image from "next/image"; // Image component import

interface Series {
  id: string;
  imageUrl: string;
  seriesName: string;
  seriesDescription: string;
  isPassive: boolean;
  brandName: string; // brandName alanını da ekledik
}

const Products: React.FC = () => {
  const [series, setSeries] = useState<Series[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSeries = async () => {
      const seriesRef = collection(firestore, "Series");

      const snapshot = await getDocs(seriesRef);
      const fetchedSeries: Series[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.isPassive && data.brandName === "Kabinox") {
          fetchedSeries.push({
            id: doc.id,
            imageUrl: data.imageUrl,
            seriesName: data.seriesName,
            seriesDescription: data.seriesDescription,
            isPassive: data.isPassive,
            brandName: data.brandName, // brandName alanını da ekledik
          });
        }
      });
      setSeries(fetchedSeries);
      setLoading(false); // Yüklenme tamamlandığında yüklenme durumu kapanır
    };

    fetchSeries();
  }, []);

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
    <div className="flex flex-col items-center w-full min-h-screen rounded-lg p-4">
      <div className="text-black mt-12 mb-2 tracking-widest text-2xl font-light fhdustu:mt-24 fhdustu:text-4xl fhdustu:mb-12">
        ÜRÜNLER
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {series.map((serie) => (
          <SeriesCard
            key={serie.id}
            id={serie.id} // `id` prop'u ekleniyor
            imageUrl={serie.imageUrl}
            seriesName={serie.seriesName}
            seriesDescription={serie.seriesDescription}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
