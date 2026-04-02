import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/src/i18n/config";

function hasLocale(pathname: string) {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    hasLocale(pathname)
  ) {
    return;
  }

  const nextUrl = request.nextUrl.clone();
  nextUrl.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(nextUrl);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
