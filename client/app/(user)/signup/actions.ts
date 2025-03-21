"use server";

import { redirect } from "next/navigation";
import {
  FormState,
  User,
  SignupForm,
  SignupFormSchema,
} from "../../../lib/schemas";
import { createSession } from "../../../lib/session";
import { revalidatePath } from "next/cache";
const baseAPIString = process.env.AUTH_API_CONNECTION_STRING;

export async function signup(
  state: FormState,
  formData: SignupForm
): Promise<FormState> {
  try {
    const validatedFields = SignupFormSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
      };
    }
    const { confirmPassword, ...dataToSend } = validatedFields.data;
    const response = await fetch(`${baseAPIString}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return { error: errorResponse.message || "An unknown error occurred" };
    }

    const res = await response.json();
    await createSession(res.user.id, res.user.token);
  } catch (error) {
    console.error("Error during user signup:", error);
    return { error: "Failed to connect to the server" };
  } finally {
    redirect("/funds");
  }
}
