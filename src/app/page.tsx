"use client";
import ImageSlider from "@/components/ImageSlider";
import Head from "next/head";
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
    <>
      <Head>
        <title>Kabinox - Anasayfa</title>
        <meta
          name="description"
          content="Kabinox, kaliteli ve özgün içerikler sunan bir platformdur."
        ></meta>
      </Head>
      <main className="relative flex flex-col items-center justify-center w-full h-full">
        {/* Hero Section */}
        <section className="w-full relative">
          <ImageSlider images={images} />
          <div className="absolute top-0 left-0 w-full min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-30 px-6 sm:px-10 md:px-12 lg:px-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center">
              KABINOX
            </h1>
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl mb-6 sm:mb-8">
              Bir SR Design markası
            </p>
            <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl text-center max-w-2xl mb-8 sm:mb-12">
              Paslanmaz çelikte yenilikçi tasarımlar, titanyum kaplama ve özel
              tasarım farkıyla tanışın.
            </p>
            <div className="flex flex-col gap-4 justify-center items-center sm:flex-row sm:gap-6">
              <Link
                href="/urunler"
                className="hover:text-custom-teal w-full sm:w-auto"
              >
                <button className="mt-6 px-8 py-3 bg-custom-color5 text-white rounded-full shadow-md hover:bg-custom-color5/80 transition w-full">
                  Tasarımlarımız
                </button>
              </Link>
              <Link
                href="/kabinimi-bul"
                className="hover:text-custom-teal w-full sm:w-auto"
              >
                <button className="mt-6 px-8 py-3 bg-custom-color5 text-white rounded-full shadow-md hover:bg-custom-color5/80 transition w-full">
                  Kabinimi Bul
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
