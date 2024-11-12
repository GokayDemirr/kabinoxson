// Header.tsx
import Link from "next/link";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar"; // Import MobileNavbar
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="fixed w-full py-1.5 px-4 flex justify-between items-center bg-custom-color6 backdrop-blur-md z-10">
      <div className="flex justify-between items-center w-full">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Navbar: Hidden on small screens */}
        <Navbar />

        {/* Mobile Navbar (Hamburger Menu): Only visible on small screens */}
        <MobileNavbar />
      </div>
    </header>
  );
}
