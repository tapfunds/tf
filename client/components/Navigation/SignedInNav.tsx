"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { LogoutButton } from "../logout/LogoutButton";

const navigation = [
  { name: "Overview", href: "/funds", current: true },
  { name: "Budgeting", href: "/budget", current: false },
  { name: "Settings", href: "/settings", current: false },
];

const userNavigation = [
  { name: "Your Profile", href: "/settings/profile" },
  { name: "Settings", href: "/settings" },
];

const user = {
  name: "Harold Melvin",
  email: "Harold@example.com",
  imageUrl: "/images/icon.png",
};

export const SignedInNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Image
                      src="/images/icon.svg"
                      alt="Workflow"
                      height={100}
                      width={100}
                    />
                  </div>
                  <NavLinks links={navigation} />
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <MenuButton className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                            height={50}
                            width={50}
                          />
                        </MenuButton>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <MenuItem key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={`${
                                    active ? "bg-gray-100" : ""
                                  } block px-4 py-2 text-sm text-gray-700`}
                                >
                                  {item.name}
                                </a>
                              )}
                            </MenuItem>
                          ))}
                          <MenuItem>
                            {({ active }) => <LogoutButton />}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton
                    className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // Toggle mobile menu
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? <>X</> : <>| | |</>}
                  </DisclosureButton>
                </div>
              </div>
            </div>
            <MobileMenu links={navigation} isOpen={isMobileMenuOpen} />{" "}
            {/* Pass isOpen state */}
          </div>
        )}
      </Disclosure>
    </div>
  );
};
