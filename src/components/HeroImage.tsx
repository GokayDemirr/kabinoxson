import Image from "next/image";

interface HeroImageProps {
  images: string[];
  currentIndex: number;
  title: string;
  description: string;
  buttonLabel: string; // Buton metni prop'u
}

const HeroImage: React.FC<HeroImageProps> = ({
  images,
  currentIndex,
  title,
  description,
  buttonLabel,
}) => {
  return (
    <div className="relative w-full h-full">
      <Image
        src={images[currentIndex]}
        alt={Image ${currentIndex}}
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-48 left-44 text-white backdrop-blur-md bg-white/20 p-8 rounded-lg max-w-xs">
        {/* Yukarıdaki div arka plan bulanıklığını ve yarı saydamlığı içerir */}
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2 break-words">{description}</p>
        <button className="mt-2 bg-white text-black px-4 py-2 rounded">
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default HeroImage;