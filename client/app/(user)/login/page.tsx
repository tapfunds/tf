import type { NextPage } from "next";
import Link from "next/link";
import Card from "../../../components/Card";

const LoginPage: NextPage = () => {
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

  function renderFormContent() {
    return (
      <>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-tf-blue focus:border-tf-blue focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-tf-blue focus:border-tf-blue focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
      </>
    );
  }

  function renderRememberAndPasswordReset() {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-tf-blue-dark focus:ring-tf-blue border-gray-300 rounded"
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
    );
  }

  return (
    <Card
      title="Sign in to your account" // Changed from headerText to title
      footer={renderSignUpRedirect()} // Moved to footer
    >
      <form className="mt-8 space-y-6" action="#" method="POST">
        {renderFormContent()}
        {renderRememberAndPasswordReset()}
      </form>
    </Card>
  );
};

export default LoginPage;
