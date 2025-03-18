"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { LoginFormSchema } from "@/lib/schemas";

export type LoginForm = z.infer<typeof LoginFormSchema>;
export type LoginFormState =
  | { error?: string | Record<string, string[]> }
  | undefined;

const baseAPIString = process.env.AUTH_API_CONNECTION_STRING;

export async function login(
  state: LoginFormState,
  formData: LoginForm
): Promise<LoginFormState> {
  try {
    const validatedFields = LoginFormSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const response = await fetch(`${baseAPIString}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();

      // Handle specific error cases
      if (response.status === 401) {
        return { error: "Invalid email or password" };
      }

      return { error: errorResponse.message || "An unknown error occurred" };
    }

    const res = await response.json();
    await createSession(res.user.id, res.user.token);
  } catch (error) {
    console.error("Error during login:", error);
    return { error: "Failed to connect to the server" };
  } finally {
    revalidatePath("/funds");
    revalidatePath("/");
    redirect("/funds");
  }
}
