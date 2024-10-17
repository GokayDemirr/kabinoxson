// pages/index.tsx
"use client";
import ImageSlider from "@/components/ImageSlider";

const images = ["/Matto_A01.jpg", "/Matto_A02.jpg", "/Matto_A03.jpg"];
const titles = ["Acrux Serisi 1", "Acrux Serisi 2", "Acrux Serisi 3"]; // Başlık dizisi
const descriptions = [
  "acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1acrux1",
  "Acrux 2 desc",
  "Acrux 3 desc",
];
export default function Home() {
  return (
    <main className="bg-white relative">
      <ImageSlider
        images={images}
        titles={titles}
        descriptions={descriptions}
      />
    </main>
  );
}
