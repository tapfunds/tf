"use server";

import { redirect } from "next/navigation";
import {
  FormState,
  User,
  SignupForm,
  SignupFormSchema,
} from "../../../lib/schemas";
import { createSession } from "../../../lib/session";

export async function signup(
  state: FormState,
  formData: SignupForm
): Promise<FormState> {
  try {
    // Validate input if needed (optional since hook forms likely validates it earlier)
    const validatedFields = SignupFormSchema.safeParse(formData);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
      };
    }
    const response = await fetch("http://localhost:8080/v1/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields),
    });

    // Handle non-success HTTP statuses
    if (!response.ok) {
      const errorResponse = await response.json();
      return { error: errorResponse.message || "An unknown error occurred" };
    }

    // Parse and return the successful response
    const user = await response.json();
    await createSession(user.token);
    // 5. Redirect user
    redirect("/profile");
    return user as User;
  } catch (error) {
    console.error("Error during user signup:", error);
    return { error: "Failed to connect to the server" };
  }
}
