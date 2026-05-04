// @ts-ignore
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isRootAdminPath = req.nextUrl.pathname.startsWith("/admin");

    // If accessing admin route without Admin role, redirect to dashboard
    if (isRootAdminPath && (token as any)?.role !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensures user is logged in
    },
  }
);

// Protects these specific routes
export const config = { 
  matcher: ["/dashboard/:path*", "/admin/:path*"] 
};