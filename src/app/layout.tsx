import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kabinox",
  description:
    "Paslanmaz çelikte yenilikçi tasarımlar, titanyum kaplama ve özel tasarımlarla tanışın.",
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
