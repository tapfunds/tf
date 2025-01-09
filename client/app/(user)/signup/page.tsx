import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Card from "../../../components/Card";

// Zod validation schema
const userSchema = z
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

export type UserFormData = z.infer<typeof userSchema>;

export default function SignupPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Form data submitted:", data);
    // Here you can hook up to your API call for submission
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card
          title="Sign Up"
          footer={
            <div className="flex items-center justify-between text-sm">
              <div>
                Already have an account?{" "}
                <a
                  href="/login"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Login
                </a>
              </div>
              <a href="#" className="font-medium text-blue-500 hover:underline">
                Forgot your password?
              </a>
            </div>
          }
        >
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="firstname"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your first name"
                    />
                  )}
                />
                {errors.firstname && (
                  <p className="text-xs text-red-500">
                    {/* {errors.firstname.message} */}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="lastname"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your last name"
                    />
                  )}
                />
                {errors.lastname && (
                  <p className="text-xs text-red-500">
                    {/* {errors.lastname.message} */}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  )}
                />
                {errors.email && <p className="text-xs text-red-500">hhhhh</p>}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="password"
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your password"
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {/* {errors.password.message} */}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Confirm your password"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-red-500">
                    {/* {errors.confirmPassword.message} */}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full mt-8 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
