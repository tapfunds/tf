"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "./Dropdown";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";

const signedOutLinks = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
];

const signedOutDropdownItems = [
  { name: "Login", href: "/login" },
  { name: "Sign Up", href: "/signup" },
];

export const SignedOutNav = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

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
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
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
            <NavLinks links={signedOutLinks} />
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
              <Dropdown items={signedOutDropdownItems} isOpen={dropdownOpen} />
            </div>
          </div>
        </div>
      </div>
      <MobileMenu links={signedOutLinks} isOpen={isMobileMenuOpen} />{" "}
      {/* Pass isOpen state */}
    </nav>
  );
};
