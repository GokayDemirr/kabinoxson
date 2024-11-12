// Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex flex-wrap justify-center gap-12 text-custom-black fhdustu:text-2xl">
        <li className="mx-2">
          <Link href="/kabinoxkatalog2025" className="hover:text-custom-teal">
            Katalog
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/kabinini-tasarla" className="hover:text-custom-teal">
            Kabinini Tasarla
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/urunler" className="hover:text-custom-teal">
            Ürünler
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/hakkimizda" className="hover:text-custom-teal">
            Hakkımızda
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/bize-ulasin" className="hover:text-custom-teal">
            Bize Ulaşın
          </Link>
        </li>
      </ul>
    </nav>
  );
}
