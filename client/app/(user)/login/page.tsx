"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Card from "@/components/Card";
import { login, LoginForm } from "./action";
import { startTransition, useActionState } from "react";
import { LoginFormSchema } from "@/lib/schemas";

const LoginPage = () => {
  const [state, action, pending] = useActionState(login, undefined);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data: LoginForm) => {
    startTransition(async () => {
      await action(data);
    });
  };

  const isErrorState = (
    state: any
  ): state is { error: string | Record<string, string[]> } =>
    typeof state === "object" && state !== null && "error" in state;

  function renderSignUpRedirect() {
    return (
      <p className="mt-2 text-center text-sm text-gray-600">
        Or{" "}
        <Link
          href="/signup"
          className="font-medium text-tf-blue-dark hover:text-tf-blue"
        >
          tap in with a new account
        </Link>
      </p>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card title="Sign in to your account" footer={renderSignUpRedirect()}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-6"
            noValidate
          >
            {/* Display general error message */}
            {isErrorState(state) && typeof state.error === "string" && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{state.error}</div>
              </div>
            )}

            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-tf-blue focus:border-tf-blue focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      disabled={pending}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
                {isErrorState(state) &&
                  typeof state.error === "object" &&
                  state.error.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {state.error.email}
                    </p>
                  )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
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
                      autoComplete="current-password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-tf-blue focus:border-tf-blue focus:z-10 sm:text-sm"
                      placeholder="Password"
                      disabled={pending}
                    />
                  )}
                />
                {errors.password && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password.message}
                  </p>
                )}
                {isErrorState(state) &&
                  typeof state.error === "object" &&
                  state.error.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {state.error.password}
                    </p>
                  )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Controller
                  name="remember"
                  control={control}
                  render={({
                    field: { onChange, onBlur, value, ref, name },
                  }) => (
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={value}
                      onChange={(e) => onChange(e.target.checked)}
                      onBlur={onBlur}
                      ref={ref}
                      name={name}
                      className="h-4 w-4 text-tf-blue-dark focus:ring-tf-blue border-gray-300 rounded"
                      disabled={pending}
                    />
                  )}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-tf-blue-dark hover:text-tf-blue"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-tf-blue-dark hover:bg-tf-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tf-blue"
                disabled={pending}
              >
                {pending ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
