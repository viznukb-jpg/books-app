import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    console.log("No token found, redirecting to login page");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/favorites/:path*"],
};
