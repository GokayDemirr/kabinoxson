import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // React icons kullanıyoruz

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
      handleNextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [handleNextImage]);

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden mt-32">
      {/* Ok İşaretleri */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10"
        onClick={handlePrevImage}
        aria-label="Previous Slide"
      >
        <FaArrowLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none z-10"
        onClick={handleNextImage}
        aria-label="Next Slide"
      >
        <FaArrowRight size={24} />
      </button>

      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <Image
              src={image}
              alt={`Slide ${index}`}
              layout="responsive"
              width={1920}
              height={1080}
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
