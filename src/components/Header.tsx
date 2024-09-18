"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function Header() {
  const isScrolled = useScrollPosition();
  return (
    <header
      className={`flex justify-between z-10 text-white fixed top-0 left-0 right-0 p-6 transition-colors duration-300 ${
        isScrolled ? "bg-custom-black " : ""
      }`}
    >
      <Link href="/">
        <h1>KABINOX</h1>
      </Link>
      <Navbar />
    </header>
  );
}
