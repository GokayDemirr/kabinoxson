// MobileNavbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="lg:hidden flex justify-between items-center">
      <button
        onClick={toggleMenu}
        className="text-custom-black focus:outline-none"
      >
        <span className="block w-6 h-0.5 bg-custom-black mb-2"></span>
        <span className="block w-6 h-0.5 bg-custom-black mb-2"></span>
        <span className="block w-6 h-0.5 bg-custom-black"></span>
      </button>

      {/* Mobile Links */}
      {isMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-custom-color6  flex flex-col items-center gap-4 py-4 text-custom-black shadow-lg z-50">
          <li>
            <Link
              href="/kabinini-tasarla"
              className="w-full text-center hover:text-custom-teal"
            >
              Katalog
            </Link>
          </li>
          <li>
            <Link
              href="/kabinini-tasarla"
              className="w-full text-center hover:text-custom-teal"
            >
              Kabinini Tasarla
            </Link>
          </li>
          <li>
            <Link
              href="/urunler"
              className="w-full text-center hover:text-custom-teal"
            >
              Ürünler
            </Link>
          </li>
          <li>
            <Link
              href="/hakkimizda"
              className="w-full text-center hover:text-custom-teal"
            >
              Hakkımızda
            </Link>
          </li>
          <li>
            <Link
              href="/bize-ulasin"
              className="w-full text-center hover:text-custom-teal"
            >
              Bize Ulaşın
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
