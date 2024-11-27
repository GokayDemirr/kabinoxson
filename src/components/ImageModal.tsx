// components/ImageModal.tsx
import React from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface ImageModalProps {
  image: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative max-w-full max-h-full w-[90%] h-[90%]">
        {/* Çarpı Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black bg-white bg-opacity-70 p-2 rounded-full z-10"
        >
          <FaTimes size={20} />
        </button>
        {/* Resim */}
        <Image
          src={image}
          alt="Selected Image"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
          unoptimized
        />
      </div>
    </div>
  );
};

export default ImageModal;
