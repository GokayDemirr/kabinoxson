"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import Image from "next/image";
import firestore from "@/firebase";
import { FiArrowLeft } from "react-icons/fi";
import PriceCalculator from "@/components/PriceCalculator";
import IconComponent from "@/components/IconComponent";

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
  centerMontagePrice: number;
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
    <div className="pt-20 px-8">
      <div className="fhdustu:mt-12 fhdustu:text-3xl">
        <button
          onClick={() => router.back()}
          className="flex items-center text-md font-semibold text-black/70 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Ürün Seçimine Geri Dön
        </button>
      </div>

      <div className="flex sm:flex-row flex-col gap-8">
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="relative w-92 sm:w-full 2xl:w-3/4 fhdustu:w-full">
            <div className="absolute left-0 top-1/3 md:mt-12 transform -translate-y-1/2">
              <IconComponent
                color="black"
                className="bg-white rounded-3xl p-1 ml-2 lg:h-14 lg:w-14 h-8 w-8"
                onClick={handlePreviousImage}
              />
            </div>
            <div className="flex flex-col  ">
              <Image
                src={product.images[currentImageIndex]}
                alt={product.seriesName}
                width={600}
                height={600}
                className="mb-4 rounded-xl w-full object-cover"
              />
              <div className="gap-4 flex justify-center mt-4">
                {product.images.slice(1).map(
                  (
                    image,
                    index // product.images[0] hariç
                  ) => (
                    <div
                      key={index}
                      className={`sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 ${
                        index === currentImageIndex
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Ürün Resmi ${index + 1}`}
                        layout="responsive"
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="absolute right-0 top-1/3 md:mt-12 transform -translate-y-1/2">
              <IconComponent
                color="black"
                width="48"
                height="48"
                rotate={true}
                className="bg-white rounded-3xl p-1 mr-2 lg:h-14 lg:w-14 h-8 w-8"
                onClick={handleNextImage}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2">
          <div className="text-2xl md:text-3xl fhdustu:text-5xl font-semibold mb-2">
            {product.seriesName} - {product.productCode}
          </div>

          <div className="text-sm md:text-lg font-light tracking-wider fhdustu:text-3xl">
            {seriesDescription ? (
              <p>{seriesDescription}</p>
            ) : (
              <p>Seri Özelliği Yok</p>
            )}
          </div>

          {product.gif && product.gif.trim() !== "" && (
            <div className="w-32 mb-8 fhdustu:w-64">
              <Image
                src={product.gif}
                alt="Product GIF"
                layout="responsive"
                width={100}
                height={100}
                className="object-cover rounded-md "
              />
            </div>
          )}

          <div className="mb-4 overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-sm md:text-base fhdustu:text-2xl">
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

          <div className="flex flex-col w-full lg:w-1/2 lg:items-start items-center ">
            <div className="mt-auto">
              <button
                onClick={openModal}
                className="bg-gray-500 p-2 rounded-md text-white hover:bg-gray-600 fhdustu:w-96 fhdustu:text-2xl "
              >
                Fiyat Hesapla
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PriceCalculator product={product} closeModal={closeModal} />
      )}
    </div>
  );
};

export default ProductDetail;
