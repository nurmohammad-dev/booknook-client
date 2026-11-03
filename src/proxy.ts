import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  // `/books` itself is a public route — only `/books/:id` is private
  if (request.nextUrl.pathname === "/books") {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    const loginUrl = new URL("/login", request.url);
    const redirectParam = request.nextUrl.pathname + request.nextUrl.search;
    loginUrl.searchParams.set("redirect", redirectParam);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-book",
    "/my-books",
    "/my-borrows",
    "/books/:path*",
  ],
};