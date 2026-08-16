import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { isPathEnabled } from "./lib/site";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isPathEnabled(pathname)) {
    const localeMatch = pathname.match(/^\/(en|az|tr|ru)(?=\/|$)/);
    const locale = localeMatch?.[1] ?? routing.defaultLocale;
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/not-found`;
    return NextResponse.rewrite(url);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(az|en|tr|ru)/:path*", "/((?!_next|_vercel|.*\\..*).*)"],
};
