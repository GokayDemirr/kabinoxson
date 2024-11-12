"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FC } from "react";

interface LogoProps {
  className?: string;
}

const Logo: FC<LogoProps> = ({ className }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Function to handle screen size check
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1920); // Check for 2xl breakpoint (1536px)
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set dimensions based on screen size
  const width = isLargeScreen ? 400 : 256;
  const height = isLargeScreen ? 400 : 256;

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src="/logo.png"
        alt="Site Logo"
        width={width}
        height={height}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
