"use server";

import { redirect } from "next/navigation";
import { deleteSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function logoutAction() {
  await deleteSession();
  revalidatePath("/");

  redirect("/login");
}
