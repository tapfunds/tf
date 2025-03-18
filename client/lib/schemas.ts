import { z } from "zod";

// Zod validation schema
export const SignupFormSchema = z
  .object({
    firstname: z.string().min(1, "First name is required").max(255),
    lastname: z.string().min(1, "Last name is required").max(255),
    username: z.string().min(1, "user name is required").max(255),
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
export type SignupForm = z.infer<typeof SignupFormSchema>;

// Define login form schema
export const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
});

export type LoginFormState =
  | {
      error?: string | Record<string, string[]>; // Error can be a string or an object with field-specific errors
    }
  | undefined; // Initial state or no errors

export type FormState =
  | User
  | { error: string | Record<string, string[]> }
  | undefined;

export const UserSchema = z.object({
  id: z.number().int().positive(),
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
export type User = z.infer<typeof UserSchema>;

export const AccountSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  name: z.string().min(1).max(255),
  balance: z.number().nonnegative(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Account = z.infer<typeof AccountSchema>;

export const TransactionSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive().optional(),
  accountId: z.number().int().positive().optional(),
  description: z.string().min(1).max(255),
  member: z.string().min(1).max(255),
  category: z.string().min(1).max(100),
  amount: z.number(),
  date: z.string(),
  action: z.string().optional(),
  merchant: z.string().min(1).max(255),
});
export type Transaction = z.infer<typeof TransactionSchema>;

export const BudgetSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  name: z.string().min(1).max(255),
  limit: z.number().nonnegative(),
  spent: z.number().nonnegative(),
});
export type Budget = z.infer<typeof BudgetSchema>;

export const MemberSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "Name is required").max(255),
  email: z.string().email("Invalid email address"),
  groupId: z.number().int().positive(),
  color: z.string(), // Hex color code for UI display, e.g., "#FF5733"
  totalContribution: z.number(), // Total amount contributed by the member to group expenses
  balance: z.number(), // Positive means the group owes them, negative means they owe money to the group
});
export type Member = z.infer<typeof MemberSchema>;

export const GroupSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  members: z.array(MemberSchema),
  balance: z.number(),
  monthlyBudget: z.number().nonnegative(),
  spent: z.number().nonnegative(),
  transparency: z.enum(["full", "limited"]),
});
export type Group = z.infer<typeof GroupSchema>;

export const users: User[] = [
  {
    id: 1,
    firstname: "John",
    lastname: "Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    password: "securepassword",
    avatarPath: "https://example.com/avatar.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const accounts: Account[] = [
  {
    id: 1,
    userId: 1,
    name: "Checking",
    balance: 2500,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 1,
    name: "Savings",
    balance: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const transactions: Transaction[] = [
  {
    id: 1,
    userId: 1,
    accountId: 1,
    description: "Weekly groceries",
    member: "John",
    action: "paid for groceries",
    category: "Food",
    amount: -50,
    merchant: "Rent",
    date: "2025-03-17",
  },
  {
    id: 2,
    userId: 1,
    accountId: 1,
    description: "Monthly rent payment",
    member: "Alice",
    action: "paid rent",
    category: "Housing",
    amount: -1200,
    merchant: "Grocery Store",
    date: "2025-03-01",
  },
];

export const budgets: Budget[] = [
  { id: 1, userId: 1, name: "Food", limit: 500, spent: 450 },
  { id: 2, userId: 1, name: "Entertainment", limit: 300, spent: 200 },
];

export const members: Member[] = [
  {
    id: 1,
    name: "Dee",
    email: "dee@example.com",
    groupId: 1,
    color: "#FF5733",
    totalContribution: 150,
    balance: 50,
  },
  {
    id: 2,
    name: "Qwe Qwe",
    email: "QweQwe@example.com",
    groupId: 1,
    color: "#33C1FF",
    totalContribution: 200,
    balance: -25,
  },
  {
    id: 3,
    name: "Could be you",
    email: "couldbeyou@example.com",
    groupId: 1,
    color: "#8D33FF",
    totalContribution: 100,
    balance: 75,
  },
];

export const member2: Member[] = [
  {
    id: 4,
    name: "Dee",
    email: "dee@example.com",
    groupId: 2,
    color: "#35DC91FF",
    totalContribution: 300,
    balance: 0,
  },
  {
    id: 5,
    name: "Qwe Qwe",
    email: "qweqwe@example.com",
    groupId: 2,
    color: "#EBFF33FF",
    totalContribution: 250,
    balance: 25,
  },
];

export const group1: Group = {
  id: 1,
  name: "Polycule",
  description: "Group expenses for our polycule",
  members: [...members],
  balance: 5000,
  monthlyBudget: 2000,
  spent: 1500,
  transparency: "full",
};

export const group2: Group = {
  id: 2,
  name: "Household",
  description: "Shared household expenses",
  members: [...member2],
  balance: 3000,
  monthlyBudget: 1500,
  spent: 1200,
  transparency: "limited",
};
