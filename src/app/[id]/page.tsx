"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import firestore from "@/firebase";
import { FiArrowLeft } from "react-icons/fi";
import PriceCalculator from "@/components/PriceCalculator";
import IconComponent from "@/components/IconComponent";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // React icons kullanıyoruz

interface DimensionPriceOption {
  dimension: { min: string; max: string };
  color1Price: string;
  color2Price: string;
  color3Price: string;
}

interface Product {
  id: string;
  seriesName: string;
  productCode: string;
  coverImage: string;
  doorGlassThicknessOptions: string[];
  fixedGlassThicknessOptions: string[];
  images: string[];
  heightOptions: number[];
  cornerShape: string;
  easyCleanPrice: string;
  montagePrices: any;
  maintenancePrices: any;
  centerMontagePrice: string;
  gif: string;
  glassColorPrices: any;
  heightPrices: any;
  dimensionPrices: {
    option1: DimensionPriceOption;
    option2: DimensionPriceOption;
    // Add more options as needed
  };
  glassThicknessPricing: any;
}

interface Series {
  seriesName: string;
  seriesDescription: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [seriesDescription, setSeriesDescription] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchProductAndSeries = async () => {
      try {
        const decodedId = decodeURIComponent(id);
        const lastHyphenIndex = decodedId.lastIndexOf("-");
        const seriesName = decodedId.slice(0, lastHyphenIndex);
        const productCode = decodedId.slice(lastHyphenIndex + 1);

        const productsRef = collection(firestore, "Products");
        const productQuery = query(
          productsRef,
          where("seriesName", "==", seriesName.trim()),
          where("productCode", "==", productCode.trim())
        );
        const productSnapshot = await getDocs(productQuery);

        if (!productSnapshot.empty) {
          const doc = productSnapshot.docs[0];
          const data = doc.data();

          setProduct({
            images: [data.coverImage, ...data.images],
            id: doc.id,
            seriesName: data.seriesName,
            productCode: data.productCode,
            coverImage: data.coverImage,
            doorGlassThicknessOptions: data.doorGlassThicknessOptions,
            fixedGlassThicknessOptions: data.fixedGlassThicknessOptions,
            heightOptions: data.heightOptions,
            cornerShape: data.cornerShape,
            centerMontagePrice: data.centerMontagePrice,
            easyCleanPrice: data.easyCleanPrice || "Not available",
            montagePrices: data.montagePrices || null,
            maintenancePrices: data.maintenancePrices || null,
            glassColorPrices: data.glassColorPrices || null,
            heightPrices: data.heightPrices || null,
            dimensionPrices: data.dimensionPrices || null,
            gif: data.gif,
            glassThicknessPricing: data.glassThicknessPricing || null,
          });

          const seriesRef = collection(firestore, "Series");
          const seriesQuery = query(
            seriesRef,
            where("seriesName", "==", seriesName.trim())
          );
          const seriesSnapshot = await getDocs(seriesQuery);

          if (!seriesSnapshot.empty) {
            const seriesDoc = seriesSnapshot.docs[0];
            const seriesData = seriesDoc.data();
            setSeriesDescription(seriesData.seriesDescription);
          }
        }
      } catch (error) {
        console.error("Error fetching product and series:", error);
      }
      setLoading(false);
    };

    fetchProductAndSeries();
  }, [id]);

  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePreviousImage = () => {
    if (product) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      );
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src="/spinner.svg" alt="Loading..." width={128} height={128} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-5xl font-bold text-white">Ürün Bulunamadı</h1>
      </div>
    );
  }

  return (
    <div className="pt-16 px-8">
      <div className="fhdustu:mt-12 fhdustu:text-3xl ">
        <button
          onClick={() => router.back()}
          className="flex items-center text-md font-semibold text-black/70 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Ürün Seçimine Geri Dön
        </button>
      </div>
      <div className="flex flex-col lg:flex-row lg:gap-16 gap-4">
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="relative w-full max-w-lg">
            <div className="absolute left-0 top-1/3 transform -translate-y-1/2">
              <FaArrowLeft
                color="black"
                className="bg-white/70 rounded-3xl p-1 ml-2 lg:h-10 lg:w-10 fhdustu:h-14 fhdustu:w-14 h-8 w-8"
                onClick={handlePreviousImage}
              />
            </div>
            <div className="flex flex-col items-center">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.seriesName}
                width={600}
                height={600}
                className="rounded-xl object-cover w-full h-auto"
              />
              <div className="flex gap-4 justify-center mt-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 md:w-32 md:h-32 cursor-pointer ${
                      index === currentImageIndex ? "" : ""
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      layout="responsive"
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-0 top-1/3 transform -translate-y-1/2">
              <FaArrowRight
                className="bg-white/70 rounded-3xl p-1 mr-2 lg:w-10 lg:h-10 fhdustu:h-14 fhdustu:w-14  h-8 w-8"
                onClick={handleNextImage}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 ">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-semibold mb-2">
            {product.seriesName} - {product.productCode}
          </h1>
          <p className="font-light tracking-wider lg:text-xl">
            {seriesDescription || "Seri Özelliği Yok"}
          </p>

          {product.gif && product.gif.trim() !== "" && (
            <div className="w-32 mb-8 fhdustu:w-64">
              <Image
                src={product.gif}
                alt="Product GIF"
                layout="responsive"
                width={100}
                height={100}
                className="object-cover rounded-md "
                unoptimized
              />
            </div>
          )}

          <div className="mb-4 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-sm  fhdustu:text-xl">
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-1">Kapı Cam Kalınlığı</td>
                  <td className="p-1">
                    :{" "}
                    {product.doorGlassThicknessOptions
                      .map((option: string) => `${option}mm`)
                      .join(" - ")}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-1">Sabit Cam Kalınlığı</td>
                  <td className="p-1">
                    :{" "}
                    {product.fixedGlassThicknessOptions
                      .map((option: string) => `${option}mm`)
                      .join(" - ")}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-1">Kabin Yüksekliği</td>
                  <td className="p-1">
                    :{" "}
                    {product.heightOptions
                      .map((option: number) => `${option}cm`)
                      .join(" - ")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="">
            <button
              onClick={openModal}
              className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 w-full lg:w-64"
            >
              Fiyat Hesapla
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <PriceCalculator product={product} closeModal={closeModal} />
      )}{" "}
    </div>
  );
};

export default ProductDetail;
