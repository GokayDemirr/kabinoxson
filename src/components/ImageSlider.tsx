import { useEffect, useState, useCallback } from "react";
import HeroImageNavigationButton from "@/components/HeroImageNavigationButton";

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
    <div className="relative w-full h-full sm:h-[50vh] md:h-[60vh] mt-24">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTransitionEnd={() => setIsAnimating(false)}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0 relative">
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
            {currentIndex === index && (
              <div className="absolute bottom-10 left-10 text-white">
                {/* Additional content (if any) */}
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
