import { useEffect, useState, useCallback } from "react";
import HeroImageNavigationButton from "@/components/HeroImageNavigationButton";

interface ImageSliderProps {
  images: string[];
  titles: string[];
  descriptions: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  titles,
  descriptions,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // handleNextImage fonksiyonunu useCallback ile sarmalıyoruz
  const handleNextImage = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  }, [isAnimating, images.length]);

  const handlePrevImage = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  }, [isAnimating, images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage(); // 5 saniyede bir sonraki resme geçiş
    }, 5000);

    return () => clearInterval(interval); // Temizleme işlemi
  }, [handleNextImage]); // handleNextImage'yi bağımlılık listesine ekledik

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }} // Geçişi kaydırma ile sağla
        onTransitionEnd={() => setIsAnimating(false)} // Animasyon bittiğinde durumu sıfırla
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-screen flex-shrink-0 relative">
            {/* Resim */}
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            {/* Sadece currentIndex'e denk gelen başlık ve açıklamayı göster */}
            {currentIndex === index && (
              <div className="absolute bottom-10 left-10 text-white">
                <h2 className="text-4xl font-bold">{titles[index]}</h2>
                <p className="text-xl mt-2">{descriptions[index]}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                  Detaylı Bilgi
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <HeroImageNavigationButton
        direction="prev"
        onClick={handlePrevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
      />
      <HeroImageNavigationButton
        direction="next"
        onClick={handleNextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
};

export default ImageSlider;
