import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Eğer URL'de "/series/" var, bu yolu değiştirmiyoruz
  if (pathname.includes("/series/")) {
    return NextResponse.next();
  }

  // Belirli bir seri ismiyle başlayan yolları kontrol et
  const seriesPrefixes = [
    "zirkon",
    "olivin",
    "beril",
    "granat",
    "opal",
    "spinel",
  ];

  // Eğer URL küçük harfse ve belirtilen prefixlerden birine sahipse, büyük harfe yönlendir
  if (
    seriesPrefixes.some((prefix) => pathname.toLowerCase().includes(prefix)) &&
    pathname !== pathname.toUpperCase()
  ) {
    let uppercasedUrl = pathname.toUpperCase();

    // Eğer URL içinde 'yp' varsa, '%YP' ile değiştir
    if (uppercasedUrl.includes("YP")) {
      uppercasedUrl = uppercasedUrl.replace("YP", "%20YP");
    }

    const url = request.nextUrl.clone();
    url.pathname = uppercasedUrl;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*", // Tüm yolları kontrol et
};
