"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export const SignedOutNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const signedOutDropdown = (
    <div
      className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
        dropdownOpen ? "block" : "hidden"
      }`}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu"
    >
      <Link
        href="/login"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="hidden lg:block h-8 w-auto"
                src="/images/logo.svg"
                alt="Tapfunds"
                height={50}
                width={50}
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  href="https://medium.com/@tapfunds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <button
                type="button"
                id="user-menu"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <Image
                  className="h-8 w-8 rounded-full"
                  src="/images/dropdown.svg"
                  alt="dropdown"
                  height={50}
                  width={50}
                />
              </button>
              {signedOutDropdown}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default SignedOutNav;
