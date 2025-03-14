"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "../../../components/Card";
import { UserFormData, userSignUpSchema } from "../../../lib/schemas";
import { userSignup } from "./actions";
export default function SignupPage() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSignUpSchema),
  });

  const onSubmit = async (data: UserFormData) => {
    console.log("Form data submitted:", data);
    const result = await userSignup(data);
    if ("error" in result) {
      console.error("Signup failed:", result.error);
      // Handle error (e.g., show a toast or set an error message state)
      return;
    }
    console.log("User created successfully:", result);
    // Proceed with login or redirect to a protected page
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
