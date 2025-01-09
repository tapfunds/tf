import { z } from "zod";

// Zod validation schema
export const userSignUpSchema = z
  .object({
    firstname: z.string().min(1, "First name is required").max(255),
    lastname: z.string().min(1, "Last name is required").max(255),
    email: z.string().email("Invalid email address").max(100),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userSignUpSchema>;

export const userSchema = z.object({
  id: z.number().int().positive().optional(), // ID is optional, as it will be auto-generated
  firstname: z.string().min(1, "First name is required").max(255),
  lastname: z.string().min(1, "Last name is required").max(255),
  username: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username cannot exceed 255 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email cannot exceed 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
  avatarPath: z.string().url("Invalid avatar URL").max(255).optional(),
  createdAt: z.date().optional(), // Automatically generated on the server
  updatedAt: z.date().optional(), // Automatically updated on the server
});
export type User = z.infer<typeof userSchema>;
