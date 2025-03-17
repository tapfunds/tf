import "server-only";
import { cache } from "react";
import { verifySession } from "./session";
import { User } from "./schemas";
const baseAPIString = process.env.AUTH_API_CONNECTION_STRING;

export const getUser = cache(async (): Promise<User | null> => {
  try {
    const session = await verifySession();
    if (!session) return null;
    console.log("Session Started", session);

    // Extract token from session
    const token = session.authToken;

    const res = await fetch(`${baseAPIString}/users/${session.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user:", res.statusText);
      return null;
    }

    const { response: user } = await res.json(); // Parse the response as JSON
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
});
