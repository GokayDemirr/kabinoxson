import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex flex-wrap justify-center  gap-12 text-white">
        <li className="mx-2">
          <Link href="/kabinini-tasarla" className="hover:text-custom-teal">
            Kabinini Tasarla
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/tasarimlarimiz" className="hover:text-custom-teal">
            Tasarımlarımız
          </Link>
        </li>
        <li className="mx-2">
          <Link href="/teknolojilerimiz" className="hover:text-custom-teal">
            Teknolojilerimiz
          </Link>
        </li>

        <li className="mx-2">
          <Link href="/hizmetlerimiz" className="hover:text-custom-teal">
            Hizmetlerimiz
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
