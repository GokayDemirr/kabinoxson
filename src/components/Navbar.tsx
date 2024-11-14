// Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="hidden lg:block">
      <ul className="flex flex-wrap justify-center gap-12 text-custom-black fhdustu:text-2xl">
        <li className="mx-2">
          <Link
            href="/kabinoxkatalog2025"
            className=" hover:bg-white hover:rounded-xl hover:p-2 "
          >
            Katalog
          </Link>
        </li>
        <li className="mx-2">
          <Link
            href="/kabinimi-bul"
            className=" hover:bg-white hover:rounded-xl hover:p-2 "
          >
            Kabinimi Bul
          </Link>
        </li>
        <li className="mx-2">
          <Link
            href="/urunler"
            className=" hover:bg-white hover:rounded-xl hover:p-2 "
          >
            Ürünler
          </Link>
        </li>
        <li className="mx-2">
          <Link
            href="/hakkimizda"
            className=" hover:bg-white hover:rounded-xl hover:p-2 "
          >
            Hakkımızda
          </Link>
        </li>
        <li className="mx-2">
          <Link
            href="/bize-ulasin"
            className=" hover:bg-white hover:rounded-xl hover:p-2 "
          >
            Bize Ulaşın
          </Link>
        </li>
      </ul>
    </nav>
  );
}
