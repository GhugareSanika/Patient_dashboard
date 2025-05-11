import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authTokenCookie = req.cookies.get("authToken");
  const authToken = authTokenCookie ? authTokenCookie.value : undefined;

  const url = req.nextUrl.clone();

  if (authToken) {
    // Logged-in users trying to access public pages are redirected to dashboard
    if (
      url.pathname === "/login" ||
      url.pathname === "/signup" ||
      url.pathname === "/"
    ) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  } else {
    // Not logged in, block access to protected pages
    if (url.pathname.startsWith("/dashboard")) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/"],
};
