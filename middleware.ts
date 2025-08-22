import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

/**
 * ใช้ getToken() ใน middleware (Edge runtime)
 * ตั้งค่า NEXTAUTH_SECRET ใน .env แล้วรีสตาร์ท dev server
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow assets and next internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // protect /dashboard and subroutes
  if (pathname.startsWith("/dashboard")) {
    const session = await auth();

    if (!session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
