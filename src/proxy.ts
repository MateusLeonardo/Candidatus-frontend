"use server";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = (await cookies()).get("access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
