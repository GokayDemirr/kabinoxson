// components/HeroImageNavigationButton.tsx
import React from "react";

interface HeroImageNavigationButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string; // className prop'unu ekleyin
}

const HeroImageNavigationButton: React.FC<HeroImageNavigationButtonProps> = ({
  direction,
  onClick,
  className,
}) => {
  return (
    <button
      className={`absolute top-1/2 transform -translate-y-1/2 text-white bg-black p-2   ${className}`}
      onClick={onClick}
    >
      {direction === "prev" ? <>&#10094;</> : <>&#10095;</>}
    </button>
  );
};

export default HeroImageNavigationButton;
