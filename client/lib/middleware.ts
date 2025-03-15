import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/budget", "/funds", "/settings", "/profile"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session")?.value;

  // Assuming you have a function to validate the token
  const isValidToken = await validateToken(sessionToken);

  if (isProtectedRoute && !isValidToken) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (
    isPublicRoute &&
    isValidToken &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

async function validateToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;

  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error("Token validation failed");
    }

    const data = await response.json();
    return data.isValid; // Assuming your API returns { isValid: true/false }
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}
