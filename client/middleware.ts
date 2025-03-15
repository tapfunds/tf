import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt, validateAuthAPIToken } from "./lib/session";

const protectedRoutes = ["/budget", "/funds", "/settings", "/logout"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  // const isValidToken = await validateToken(sessionToken);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/funds")
  ) {
    return NextResponse.redirect(new URL("/funds", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
