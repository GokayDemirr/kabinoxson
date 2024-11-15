import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Kabinox | Paslanmaz Duşkabinin Tek Adresi",
  description: "Paslanmaz Duşkabinin Tek Adresi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
