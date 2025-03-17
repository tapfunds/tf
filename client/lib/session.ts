import "server-only";

import { cookies } from "next/headers";
import { cache } from "react";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";

const baseAPIString = process.env.AUTH_API_CONNECTION_STRING;

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: {
  userId: string;
  expiresAt: Date;
  token: string;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt, token });
  const cookieStore = await cookies();
  console.log("Created session for", userId, token);
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = (await cookies()).get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

// add to logout and canelling account
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  return session
    ? {
        userId: session?.userId as string,
        authToken: session?.token as string,
      }
    : null;
});

export async function validateAuthAPIToken(
  token: string | unknown
): Promise<boolean> {
  if (!token) return false;

  try {
    const response = await fetch(`${baseAPIString}/auth/validate/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
