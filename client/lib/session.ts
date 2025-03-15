import "server-only";
import { cookies } from "next/headers";

export async function createSession(token: string) {
  const session = token;
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
