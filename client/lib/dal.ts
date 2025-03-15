import "server-only";

import { cache } from "react";
import { verifySession } from "./session";
const baseAPIString = process.env.AUTH_API_CONNECTION_STRING;

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  // Extract token from session
  const token = session.authToken;

  try {
    const res = await fetch(`${baseAPIString}/users/${session.userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
      },
    });

    if (!res.ok) {
      console.error("Failed to fetch user:", res.statusText);
      return null;
    }

    const user = await res.json(); // Parse the response as JSON
    return user;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
});
