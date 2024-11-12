// components/FloatingText.tsx
import { useEffect, useState } from "react";

const texts = [
  "Paslanmaz çelik",
  "Özel tasarım",
  "Titanyum kaplama",
  "Yenilikçi tasarımlar",
  "SR Design markası",
];

const FloatingText: React.FC = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prev) => (prev + 1) % texts.length);
    }, 2000); // Text change every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 right-0 p-4 text-white">
      <p
        className={`transform opacity-0 transition-opacity duration-1000 ${
          visibleIndex === 0 ? "opacity-100" : ""
        }`}
      >
        {texts[0]}
      </p>
      <p
        className={`transform opacity-0 transition-opacity duration-1000 ${
          visibleIndex === 1 ? "opacity-100" : ""
        }`}
      >
        {texts[1]}
      </p>
      <p
        className={`transform opacity-0 transition-opacity duration-1000 ${
          visibleIndex === 2 ? "opacity-100" : ""
        }`}
      >
        {texts[2]}
      </p>
      <p
        className={`transform opacity-0 transition-opacity duration-1000 ${
          visibleIndex === 3 ? "opacity-100" : ""
        }`}
      >
        {texts[3]}
      </p>
      <p
        className={`transform opacity-0 transition-opacity duration-1000 ${
          visibleIndex === 4 ? "opacity-100" : ""
        }`}
      >
        {texts[4]}
      </p>
    </div>
  );
};

export default FloatingText;
