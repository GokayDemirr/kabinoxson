// pages/index.tsx
"use client";
import ImageSlider from "@/components/ImageSlider";

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
      <ImageSlider images={images} />
    </main>
  );
}
