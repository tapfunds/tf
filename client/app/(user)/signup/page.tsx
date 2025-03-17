"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Card from "@/components/Card";
import { FormState, SignupForm, SignupFormSchema } from "@/lib/schemas";
import { signup } from "./actions";
import { startTransition, useActionState, useEffect } from "react";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // useEffect(() => {
  //   if (state) {
  //     console.log("STATE", state);
  //     if ("error" in state) {
  //       console.error("Signup failed:", state.error);
  //       // Handle error (e.g., show a toast or set an error message state)
  //     }
  //   }
  // }, [state]);

  const onSubmit = async (data: SignupForm) => {
    startTransition(async () => {
      await action(data);
    });
  };
  const isErrorState = (
    state: FormState
  ): state is { error: string | Record<string, string[]> } =>
    typeof state === "object" && state !== null && "error" in state;

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
            {/* Form fields */}
            <div className="space-y-6">
              {/* User Name */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="username"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter your username"
                    />
                  )}
                />
                {errors.username && (
                  <p className="text-xs text-red-500">
                    {errors.username.message}
                  </p>
                )}
                {isErrorState(state) &&
                  typeof state.error === "object" &&
                  state.error.username && (
                    <p className="text-xs text-red-500">
                      {state.error.username}
                    </p>
                  )}
              </div>

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
                    {errors.firstname.message}
                  </p>
                )}
                {isErrorState(state) &&
                  typeof state.error === "object" &&
                  state.error.firstname && (
                    <p className="text-xs text-red-500">
                      {state.error.firstname}
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
                    {errors.lastname.message}
                  </p>
                )}
                {isErrorState(state) &&
                  typeof state.error === "object" &&
                  state.error.lastname && (
                    <p className="text-xs text-red-500">
                      {state.error.lastname}
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
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
                {isErrorState(state) &&
                  typeof state.error === "object" &&
                  state.error.email && (
                    <p className="text-xs text-red-500">{state.error.email}</p>
                  )}
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
                    {errors.password.message}
                  </p>
                )}
                {isErrorState(state) &&
                  typeof state.error === "object" &&
                  state.error.password && (
                    <p className="text-xs text-red-500">
                      {state.error.password}
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
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full mt-8 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={pending}
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
