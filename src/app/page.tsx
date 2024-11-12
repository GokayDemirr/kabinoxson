"use client";
import ImageSlider from "@/components/ImageSlider";
import Link from "next/link";

const images = [
  "/Kabinox_banner_01.jpg",
  "/Kabinox_banner_02.jpg",
  "/Kabinox_banner_03.jpg",
  "/Kabinox_banner_04.jpg",
  "/Kabinox_banner_05.jpg",
  "/Kabinox_banner_06.jpg",
  "/Kabinox_banner_07.jpg",
];

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center w-full h-full">
      {/* Hero Section */}
      <section className="w-full relative">
        <ImageSlider images={images} />
        <div className="absolute top-0 left-0 w-full min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-30 px-4 sm:px-6 md:px-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-center">
            KABINOX
          </h1>
          <p className="text-white text-base sm:text-lg md:text-2xl text-center max-w-2xl mb-4 sm:mb-6">
            Bir SR Design markası
          </p>
          <p className="text-white text-base sm:text-lg md:text-2xl text-center max-w-2xl mb-8">
            Paslanmaz çelikte yenilikçi tasarımlar, titanyum kaplama ve özel
            tasarım farkıyla tanışın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/tasarimlarimiz"
              className="hover:text-custom-teal w-full sm:w-auto"
            >
              <button className="mt-6 px-8 py-3 bg-custom-color5 text-white rounded-full shadow-md hover:bg-blue-700 transition">
                Tasarımlarımız
              </button>
            </Link>
            <Link
              href="/kabinini-tasarla"
              className="hover:text-custom-teal w-full sm:w-auto"
            >
              <button className="mt-6 px-8 py-3 bg-custom-color5 text-white rounded-full shadow-md hover:bg-blue-700 transition">
                Kabinini Tasarla
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
