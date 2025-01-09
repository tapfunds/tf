"use server";

import { User, UserFormData } from "../../../lib/schemas";

export async function userSignup(
  data: UserFormData
): Promise<User | { error: string }> {
  try {
    // Validate input if needed (optional since Zod likely validates it earlier)

    // Make a POST request to the backend service via the Docker network
    const response = await fetch("http://auth:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Handle non-success HTTP statuses
    if (!response.ok) {
      const errorResponse = await response.json();
      return { error: errorResponse.message || "An unknown error occurred" };
    }

    // Parse and return the successful response
    const user = await response.json();
    return user as User;
  } catch (error) {
    console.error("Error during user signup:", error);
    return { error: "Failed to connect to the server" };
  }
}
