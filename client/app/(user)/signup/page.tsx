import type { NextPage } from "next";
import Link from "next/link";
import Card from "../../components/Card";

const SignupPage: NextPage = () => {
  function renderFormContent() {
    return (
      <>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div className="py-4">
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
          <div className="py-2">
            <label htmlFor="firstname" className="sr-only">
              First Name
            </label>
            <input
              id="first-name"
              name="firstname"
              autoComplete="fname"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-tf-blue focus:border-tf-blue focus:z-10 sm:text-sm"
              placeholder="First Name"
            />
          </div>
          <div className="py-2">
            <label htmlFor="firstname" className="sr-only">
              Last Name
            </label>
            <input
              id="last-name"
              name="lastname"
              autoComplete="lname"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-tf-blue focus:border-tf-blue focus:z-10 sm:text-sm"
              placeholder="Last Name"
            />
          </div>
          <div className="py-2">
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
          <div className="py-2">
            <label htmlFor="password" className="sr-only">
              Verify Password
            </label>
            <input
              id="verify-password"
              name="verify-password"
              type="password"
              autoComplete="verify-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-tf-blue focus:border-tf-blue focus:z-10 sm:text-sm"
              placeholder="Verify Password"
            />
          </div>
        </div>
      </>
    );
  }

  function renderRedirectAndPasswordReset() {
    return (
      <div className="flex items-center justify-between">
        <div className="text-sm">
          Have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-tf-blue-dark hover:text-tf-blue"
          >
            login
          </Link>
        </div>

        <div className="text-sm">
          <Link
            href="#"
            className="font-medium text-tf-blue-dark hover:text-tf-blue"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    );
  }

  return (
    <Card
      headerText="Sign Up"
      formContent={renderFormContent()}
      helpElement={renderRedirectAndPasswordReset()}
      buttonText="Sign up"
    />
  );
};

export default SignupPage;
