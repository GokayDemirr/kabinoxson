import Link from "next/link";
import Navbar from "./Navbar";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="absolute  w-full p-4 flex justify-between items-center bg-black/50  z-10">
      <Link href="/">
        <Logo width={256} height={256} />
      </Link>
      <Navbar />
    </header>
  );
}
